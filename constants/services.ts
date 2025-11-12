export const SERVICES = [
  {
    id: 1,
    title: "Comprehensive Eye Examinations",
    description:
      "Thorough eye health assessments using state-of-the-art diagnostic equipment",
    icon: "👁️",
    features: [
      "Digital retinal imaging",
      "Visual field testing",
      "Color vision assessment",
      "Prescription accuracy check",
      "Eye pressure measurement",
    ],
    image: "/images/services/eye-exam.jpg",
    cta: "Book Eye Test",
    duration: "30-45 mins",
  },
  {
    id: 2,
    title: "Contact Lenses",
    description:
      "Expert fitting for all types of contact lenses with comprehensive aftercare",
    icon: "🔍",
    features: [
      "Daily & monthly disposables",
      "Toric lenses for astigmatism",
      "Multifocal & bifocal options",
      "Cosmetic & colored lenses",
      "Professional fitting service",
    ],
    image: "/images/services/contact-lenses.jpg",
    cta: "Explore Lenses",
    duration: "45-60 mins",
  },
  {
    id: 3,
    title: "Spectacles & Frames",
    description:
      "Premium frames with same-day lens manufacturing in our in-house lab",
    icon: "👓",
    features: [
      "Same-day service available",
      "500+ frame styles",
      "Blue light protection",
      "Anti-reflective coating",
      "Custom lens fitting",
    ],
    image: "/images/services/spectacles.jpg",
    cta: "Browse Frames",
    duration: "1-2 hours",
  },
  {
    id: 4,
    title: "In-House Laboratory",
    description:
      "Same-day spectacle manufacturing with precision and quality guarantee",
    icon: "⚗️",
    features: [
      "Same-day manufacturing",
      "Precision lens cutting",
      "Quality control checks",
      "Custom tinting available",
      "Repair services",
    ],
    image: "/images/services/laboratory.jpg",
    cta: "Learn More",
    duration: "2-4 hours",
  },
  {
    id: 5,
    title: "Sunglasses & Protection",
    description:
      "Premium sunglasses with UV protection and prescription options",
    icon: "🕶️",
    features: [
      "100% UV protection",
      "Polarized lenses",
      "Designer brands available",
      "Prescription sunglasses",
      "Sports & specialty frames",
    ],
    image: "/images/services/sunglasses.jpg",
    cta: "View Collection",
    duration: "30 mins",
  },
  {
    id: 6,
    title: "Specialized Eye Care",
    description:
      "Advanced services for complex vision needs and eye health conditions",
    icon: "🎯",
    features: [
      "Low vision solutions",
      "Diabetic eye screening",
      "Pediatric optometry",
      "Dry eye treatment",
      "Visual therapy",
    ],
    image: "/images/services/specialized-care.jpg",
    cta: "Consult Specialist",
    duration: "60-90 mins",
  },
] as const;

export const MEDICAL_AIDS = [
  "PSMAS",
  "CIMAS",
  "First Mutual Health",
  "Alliance Health",
  "Sovereign Health",
] as const;

export const BRANCH_SERVICES = [
  { branch: "Robinson House", services: "All Services + Main Laboratory" },
  { branch: "Kensington", services: "Eye Tests, Frames, Contact Lenses" },
  {
    branch: "Honeydew Lifestyle Centre",
    services: "Premium Services & Designer Frames",
  },
  { branch: "Chipinge Branch", services: "Full Service + Rural Outreach" },
  { branch: "Chiredzi Branch", services: "Agricultural Community Specialists" },
] as const;

// ... existing SERVICES, MEDICAL_AIDS, BRANCH_SERVICES ...

export const BRANCH_FEATURES = [
  {
    icon: "⚡",
    title: "Same-Day Service",
    description: "Spectacles ready in hours at all locations",
  },
  {
    icon: "🔬",
    title: "Advanced Equipment",
    description: "State-of-the-art technology at every branch",
  },
  {
    icon: "👨‍⚕️",
    title: "Expert Staff",
    description: "Trained optometrists at each location",
  },
  {
    icon: "💳",
    title: "Medical Aid Accepted",
    description: "All major medical aids welcome everywhere",
  },
] as const;
