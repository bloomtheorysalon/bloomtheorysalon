import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

// Server central state persistence
const STORE_PATH = path.join(process.cwd(), "server-store.json");

let memoryStore: { services?: any[]; salonInfo?: any } = {};

if (fs.existsSync(STORE_PATH)) {
  try {
    memoryStore = JSON.parse(fs.readFileSync(STORE_PATH, "utf-8"));
    console.log("Loaded central salon database store from server-store.json");
  } catch (err) {
    console.error("Failed to read server-store.json:", err);
  }
}

function persistStore() {
  try {
    fs.writeFileSync(STORE_PATH, JSON.stringify(memoryStore, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to persist server-store.json:", err);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: GET /api/services (Central Price List for all clients)
  app.get("/api/services", (req, res) => {
    return res.json({
      services: memoryStore.services || null,
      salonInfo: memoryStore.salonInfo || null,
      lastUpdated: Date.now()
    });
  });

  // API Route: POST /api/services (Owner updates prices or adds services)
  app.post("/api/services", (req, res) => {
    try {
      const { services } = req.body;
      if (Array.isArray(services)) {
        memoryStore.services = services;
        persistStore();
        return res.json({ success: true, count: services.length, services: memoryStore.services });
      }
      return res.status(400).json({ error: "Invalid services format" });
    } catch (err) {
      console.error("Failed to save services:", err);
      res.status(500).json({ error: "Server failed to save services" });
    }
  });

  // API Route: POST /api/salon-info
  app.post("/api/salon-info", (req, res) => {
    try {
      const { salonInfo } = req.body;
      if (salonInfo) {
        memoryStore.salonInfo = salonInfo;
        persistStore();
        return res.json({ success: true, salonInfo: memoryStore.salonInfo });
      }
      return res.status(400).json({ error: "Invalid salon info" });
    } catch (err) {
      res.status(500).json({ error: "Server failed to save salon info" });
    }
  });

  // API Route: Chatbot for beauty suggestions and salon inquiries
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;

      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const systemPrompt = `You are Bloom, the friendly and expert AI beauty consultant for "Bloom Theory Salon".
Salon Details:
- Name: Bloom Theory Salon
- Phone / WhatsApp: +91 8977774224 (8977774224)
- Email: bloomtheorysalon@gmail.com
- Address: Opposite to Star Bazar, 1st Floor, Mahalaxmi Srinivasam, Bapuji Nagar Road, Hyderabad, Secunderabad, Telangana 500011.
- Google Maps Link: https://www.google.com/maps/place/Bloom+theory+salon/@17.4688756,78.4809198,18.48z
- Working Hours: 10:00 AM to 8:30 PM (Open All Days)
- Services Offered: Hair Cuts, Hair Colouring (L'Oreal, Matrix, INOA, Balayage), Smoothening, Keratin, Hair Spa, Dandruff & Anti-Hairfall Treatments, Facials (O3+, Gold, Pearl, Fruit, Hydra Facial, Derma Bright), D-Tan, Bleach, Waxing (Sleek, Rica, Bio-Soft), Pedicure, Manicure, Heel Peel, Nail Care, Threading, Makeup, Hand Mehndi.

Instructions:
- Be polite, luxurious, helpful, and concise.
- Recommend appropriate services based on the user's gender, skin/hair concern, or budget.
- Guide the user on how to book an appointment directly through the website or via WhatsApp at 8977774224.
- Provide clear answers about service prices and location.`;

      const mistralKeyToUse = process.env.MISTRAL_API_KEY;
      const requestedModel = process.env.MISTRAL_MODEL || "mistral-small-latest";

      // Service catalogue for recommendation matching
      const SAMPLE_RECOMMENDABLE_SERVICES = [
        { id: 'w-fa-8', name: 'O₃+ Facial (Bridal / Whitening)', price: 4000, category: 'Facial', gender: 'women', popular: true, durationMinutes: 75, description: 'Deep whitening and glow facial with peel off mask.' },
        { id: 'w-fa-3', name: 'Gold Facial', price: 1500, category: 'Facial', gender: 'women', popular: true, durationMinutes: 60, description: 'Instant radiance and golden glow for special occasions.' },
        { id: 'w-ht-3', name: 'Keratin Hair Treatment', price: 4000, category: 'Hair Treatment', gender: 'women', popular: true, durationMinutes: 120, description: 'Frizz-free silk smooth hair lasting up to 4 months.' },
        { id: 'w-ht-2', name: 'Hair Smoothening', price: 4000, category: 'Hair Treatment', gender: 'women', popular: true, durationMinutes: 150, description: 'Permanently straight and manageable silky tresses.' },
        { id: 'w-hb-2', name: 'Advance Hair Cut', price: 1500, category: 'Hair Basic', gender: 'women', popular: true, durationMinutes: 50, description: 'Custom layer, feather, or curtain bang precision haircut with styling.' },
        { id: 'm-hb-1', name: 'Gentlemen Hair Cut', price: 300, category: 'Hair Basic', gender: 'men', popular: true, durationMinutes: 30, description: 'Precision fade, buzz cut, or classic styling.' },
        { id: 'm-hb-9', name: 'Matrix Hair Spa', price: 1000, category: 'Hair Basic', gender: 'men', popular: true, durationMinutes: 45, description: 'Scalp nourishing and stress relief hair spa.' },
        { id: 'm-fa-9', name: 'O₃+ Groom Facial', price: 4000, category: 'Facial', gender: 'men', popular: true, durationMinutes: 75, description: 'Premium skin brightening and tan removal for men.' },
        { id: 'm-hc-12', name: 'Men Keratin Treatment', price: 3000, category: 'Hair Treatment', gender: 'men', popular: true, durationMinutes: 120, description: 'Smoothing frizz reduction for men.' },
        { id: 'm-pe-3', name: 'Spa Pedicure', price: 1500, category: 'Pedicure', gender: 'men', popular: true, durationMinutes: 50, description: 'Exfoliating foot soak, massage, and heel therapy.' }
      ];

      const getMatchedServices = (text: string) => {
        const lower = text.toLowerCase();
        return SAMPLE_RECOMMENDABLE_SERVICES.filter(s => {
          const sName = s.name.toLowerCase();
          const sCat = s.category.toLowerCase();
          if (lower.includes("o3") || lower.includes("o₃")) return sName.includes("o3") || sName.includes("o₃");
          if (lower.includes("keratin")) return sName.includes("keratin");
          if (lower.includes("smoothening")) return sName.includes("smoothening");
          if (lower.includes("facial") || lower.includes("skin") || lower.includes("glow")) return sCat.includes("facial");
          if (lower.includes("cut") || lower.includes("haircut")) return sName.includes("cut");
          if (lower.includes("pedicure") || lower.includes("foot")) return sCat.includes("pedicure");
          if (lower.includes("spa")) return sName.includes("spa");
          return false;
        }).slice(0, 3);
      };

      const generateFollowups = (text: string): string[] => {
        const lower = text.toLowerCase();
        if (lower.includes("facial") || lower.includes("skin") || lower.includes("o3")) {
          return ["O3+ Facial cost & benefits", "Hydra Facial vs Gold Facial", "Book skin consultation", "Show Ladies facials"];
        }
        if (lower.includes("hair") || lower.includes("keratin") || lower.includes("smoothening")) {
          return ["Keratin vs Hair Smoothening", "Book Haircut appointment", "Hair Spa prices", "Gentlemen hair care"];
        }
        if (lower.includes("price") || lower.includes("rate") || lower.includes("cost")) {
          return ["Bridal Package rates", "Gentlemen Combo offer", "Book appointment now", "Call Salon Concierge"];
        }
        return ["Haircut & Styling prices", "O3+ Facial details", "Salon location & map", "Book an appointment"];
      };

      // 1. Try Mistral AI when it is configured on the server.
      if (mistralKeyToUse && mistralKeyToUse.trim() !== "") {
        try {
          const mistralResponse = await fetch("https://api.mistral.ai/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${mistralKeyToUse.trim()}`
            },
            body: JSON.stringify({
              model: requestedModel,
              messages: [
                { role: "system", content: systemPrompt },
                ...(history || []).map((h: any) => ({
                  role: h.sender === "user" ? "user" : "assistant",
                  content: h.text
                })),
                { role: "user", content: message }
              ]
            })
          });

          if (mistralResponse.ok) {
            const data = await mistralResponse.json();
            const reply = data.choices?.[0]?.message?.content || "Thank you for reaching out! How can I assist you further with Bloom Theory Salon?";
            const matched = getMatchedServices(message + " " + reply);
            const followups = generateFollowups(message + " " + reply);

            return res.json({
              reply,
              provider: "Ask Bloom AI",
              recommendedServices: matched,
              suggestedFollowups: followups
            });
          } else {
            console.warn("Mistral API call error status:", mistralResponse.status, "Falling back");
          }
        } catch (mErr) {
          console.error("Mistral fetch error:", mErr);
        }
      }

      // 2. Try Gemini API if server GEMINI_API_KEY is configured
      if (process.env.GEMINI_API_KEY) {
        try {
          const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
          const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [
              { role: "user", parts: [{ text: `${systemPrompt}\n\nUser Question: ${message}` }] }
            ]
          });
          const reply = response.text || "I'm here to help you choose the best hair and skin services at Bloom Theory Salon!";
          const matched = getMatchedServices(message + " " + reply);
          const followups = generateFollowups(message + " " + reply);

          return res.json({
            reply,
            provider: "gemini-2.5-flash",
            recommendedServices: matched,
            suggestedFollowups: followups
          });
        } catch (gErr) {
          console.error("Gemini API error:", gErr);
        }
      }

      // 3. Fallback Smart Salon Assistant response
      const lowerMsg = message.toLowerCase();
      let reply = "Welcome to Bloom Theory Salon! We offer premium hair, skin, facial, waxing, and nail services for both Men and Women. You can book an appointment on our site or WhatsApp us at +91 8977774224.";

      if (lowerMsg.includes("price") || lowerMsg.includes("cost") || lowerMsg.includes("rate")) {
        reply = "Our prices start from ₹50 for threading, ₹300 for haircut, ₹1000 for classic facials, and ₹4000 for O3+ Bridal Facials or Keratin Treatments. You can book directly or explore our full price menu above!";
      } else if (lowerMsg.includes("location") || lowerMsg.includes("address") || lowerMsg.includes("where")) {
        reply = "We are located Opposite to Star Bazar, 1st Floor, Mahalaxmi Srinivasam, Bapuji Nagar Road, Secunderabad, Telangana 500011. You can click 'Get Directions' in our contact section for Google Maps!";
      } else if (lowerMsg.includes("hair") || lowerMsg.includes("cut") || lowerMsg.includes("colour") || lowerMsg.includes("keratin")) {
        reply = "For hair transformations, we specialize in Advance Haircuts, Matrix & L'Oréal Global Colours, Balayage, Keratin Treatments, Hair Smoothening, and Dandruff/Anti-Hairfall Spa. Select any hair service to add to your appointment!";
      } else if (lowerMsg.includes("facial") || lowerMsg.includes("skin") || lowerMsg.includes("glow")) {
        reply = "We offer classic Fruit, Gold, & Pearl facials, O3+ Bridal & Whitening facials, and advanced Hydra Facials for radiant glowing skin. Tell me your skin concern for a custom beauty prescription!";
      } else if (lowerMsg.includes("book") || lowerMsg.includes("time") || lowerMsg.includes("appointment")) {
        reply = "Booking is super fast! Simply click 'Book Appointment' on any service card or button below, pick your date & time, and we'll confirm via WhatsApp (+91 8977774224)!";
      } else if (lowerMsg.includes("contact") || lowerMsg.includes("phone") || lowerMsg.includes("email")) {
        reply = "You can call or WhatsApp us directly at +91 8977774224, or email us at bloomtheorysalon@gmail.com.";
      }

      const matched = getMatchedServices(message + " " + reply);
      const followups = generateFollowups(message + " " + reply);

      return res.json({
        reply,
        provider: "bloom-knowledge-engine",
        recommendedServices: matched,
        suggestedFollowups: followups
      });
    } catch (error) {
      console.error("Server /api/chat error:", error);
      res.status(500).json({ error: "Failed to generate AI response" });
    }
  });

  // Vite middleware in development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Bloom Theory Salon server running on http://localhost:${PORT}`);
  });
}

startServer();
