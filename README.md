AI - Generated README

### **Koncept: PushGate.dev**

En SaaS-plattform som gör det busenkelt för utvecklare att skicka pushnotiser från script, servrar eller appar direkt till sin iPhone. Istället för att koda egna push-lösningar och hantera Apples certifikat, använder man PushGate som en färdig brygga.

---

### **1. Core-funktionalitet: "The QR-Link"**

- **Onboarding:** Som utvecklare skapar du ett **Projekt** på webben. Du får en unik **API-nyckel** och en **QR-kod**.
- **Koppling:** Du laddar ner iPhone-appen, skannar projektets QR-kod, och vips är din telefon registrerad som mottagare för det projektet.
- **Sändning:** Du skickar notiser via ett enkelt REST-API:
  `POST api.pushgate.dev/send` med din API-nyckel och ett JSON-objekt.
- **Multi-enhet:** Flera personer (eller dina egna olika enheter) kan skanna samma QR-kod för att ta emot samma notiser.

---

### **2. Dashboard & Samarbete**

- **Realtidsloggar:** På webben ser du en live-feed av alla skickade notiser, inklusive status (om de levererats korrekt eller misslyckats).
- **Delad åtkomst:** Du kan bjuda in kollegor till ett projekt via en länk. De får då tillgång till projektets dashboard och ser samma loggar som du i realtid.
- **Historik i appen:** iPhone-appen fungerar inte bara som mottagare, utan har ett snyggt arkiv där du kan bläddra i gamla notiser och se detaljer.

---

### **3. Teknisk Stack**

- **Frontend (App):** **Expo** (React Native). Hanterar push-tokens via Expos smidiga infrastruktur (`expo-notifications`).
- **Backend:** **Convex**. En serverless realtidsdatabas som hanterar API-anrop, lagring av loggar och behörigheter.
- **Webb:** **Next.js** (för dashboarden) kopplat till Convex.
- **Push-leverans:** **Expo Push Service**. Fungerar som mellanhand mellan Convex och Apples servrar (APNs), vilket eliminerar krångel med certifikat.

---

### **4. Roadmap & Strategi**

- **Namn & Domän:** **pushgate.dev** (Kort, professionellt och tydligt).
- **Intäkter (SaaS):** Börja med en gratis-tier (t.ex. 1 projekt, 100 notiser) och en Pro-tier för team med högre volymer och fler projekt.
- **App Store:** För att bli godkänd fokuserar du på "Minimum Functionality" genom att bygga ett snyggt gränssnitt för historik och inställningar.
- **Säkerhet:** API-nycklar lagras hashat, och rate-limiting skyddar tjänsten från missbruk.
