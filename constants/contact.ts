// constants/contact.ts - REFACTORED VERSION
export const CONTACT_METHODS = [
  {
    icon: "📞",
    title: "Call Us",
    description: "Speak with our team",
    details: "Main Line: +263 242 123 456",
    cta: "Call Now",
    action: "tel:+263242123456",
  },
  {
    icon: "📧",
    title: "Send Email",
    description: "We reply within 24 hours",
    details: "info@linkoptical.co.zw",
    cta: "Send Email",
    action: "mailto:info@linkoptical.co.zw",
  },
  {
    icon: "💬",
    title: "WhatsApp",
    description: "Quick answers via WhatsApp",
    details: "+263 77 123 4567",
    cta: "Message Us",
    action: "https://wa.me/263771234567",
  },
  {
    icon: "📍",
    title: "Visit Branches",
    description: "5 locations in Zimbabwe",
    details: "Walk-ins welcome",
    cta: "View Locations",
    action: "/branches",
  },
] as const;

export const FAQS = [
  {
    question: "Do I need an appointment for an eye test?",
    answer:
      "Appointments help avoid waiting, but we accept walk-ins at all branches. Same-day appointments are often available.",
  },
  {
    question: "How long does an eye examination take?",
    answer:
      "An eye examination typically takes 30-45 minutes, including digital retinal imaging and visual field testing if needed.",
  },
  {
    question: "Do you accept medical aid?",
    answer:
      "Yes, we accept medical aids including PSMAS, CIMAS, First Mutual Health, Alliance Health, and Sovereign Health.",
  },
  {
    question: "How quickly can I get glasses?",
    answer:
      "With our lab, we offer same-day service for most prescriptions. Other lenses may take 24-48 hours.",
  },
  {
    question: "What if I need emergency eye care?",
    answer:
      "We provide emergency eye care. Please call your nearest branch directly for help.",
  },
] as const;
