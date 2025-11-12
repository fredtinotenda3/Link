export const CONTACT_METHODS = [
  {
    icon: "📞",
    title: "Call Us Directly",
    description: "Speak with our friendly team",
    details: "Main Line: +263 242 123 456",
    cta: "Call Now",
    action: "tel:+263242123456",
  },
  {
    icon: "📧",
    title: "Send Us an Email",
    description: "We respond within 24 hours",
    details: "info@linkoptical.co.zw",
    cta: "Send Email",
    action: "mailto:info@linkoptical.co.zw",
  },
  {
    icon: "💬",
    title: "WhatsApp Business",
    description: "Quick answers via WhatsApp",
    details: "+263 77 123 4567",
    cta: "Message Us",
    action: "https://wa.me/263771234567",
  },
  {
    icon: "📍",
    title: "Visit Our Branches",
    description: "5 locations across Zimbabwe",
    details: "Walk-ins welcome",
    cta: "View Locations",
    action: "/branches",
  },
] as const;

export const FAQS = [
  {
    question: "Do I need an appointment for an eye test?",
    answer:
      "While appointments are recommended to avoid waiting, we welcome walk-ins at all our branches. Same-day appointments are often available.",
  },
  {
    question: "How long does a comprehensive eye examination take?",
    answer:
      "A full eye examination typically takes 30-45 minutes, including digital retinal imaging and visual field testing if required.",
  },
  {
    question: "Do you accept medical aid?",
    answer:
      "Yes, we accept all major medical aids including PSMAS, CIMAS, First Mutual Health, Alliance Health, and Sovereign Health.",
  },
  {
    question: "How quickly can I get my spectacles?",
    answer:
      "With our in-house laboratory, we offer same-day service for most prescriptions. Complex lenses may take 24-48 hours.",
  },
  {
    question: "What if I need emergency eye care?",
    answer:
      "We provide emergency eye care services. Please call your nearest branch directly for immediate assistance.",
  },
] as const;
