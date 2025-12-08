// constants/services.ts - EXTRA SAFE VERSION
export const SERVICES = [
  {
    id: 1,
    title: "Eye Examinations",
    description: "Eye health checks",
    icon: "👁️",
    features: [
      "Digital retinal imaging",
      "Visual field testing",
      "Color vision check",
      "Prescription check",
      "Eye pressure measurement",
    ],
    image: "/images/services/eye-exam.png",
    cta: "Book Eye Test",
    duration: "30-45 mins",
  },
  {
    id: 2,
    title: "Contact Lenses",
    description: "Fitting for contact lenses",
    icon: "🔍",
    features: [
      "Daily & monthly disposables",
      "Lenses for astigmatism",
      "Multifocal & bifocal options",
      "Colored lenses",
      "Fitting service",
    ],
    image: "/images/services/contact-lenses.png",
    cta: "Explore Lenses",
    duration: "45-60 mins",
  },
  {
    id: 3,
    title: "Spectacles & Frames",
    description: "Frames with lenses",
    icon: "👓",
    features: [
      "Same-day service available",
      "Frame styles",
      "Blue light protection",
      "Anti-reflective coating",
      "Lens fitting",
    ],
    image: "/images/services/spectacles.png",
    cta: "Browse Frames",
    duration: "1-2 hours",
  },
  {
    id: 4,
    title: "In-House Laboratory",
    description: "Glasses made in our lab",
    icon: "⚙️",
    features: [
      "Same-day making",
      "Lens cutting",
      "Checks in place",
      "Custom tinting available",
      "Repair services",
    ],
    image: "/images/services/laboratory.png",
    cta: "Learn More",
    duration: "2-4 hours",
  },
  {
    id: 5,
    title: "Sunglasses",
    description: "Sunglasses with UV protection",
    icon: "🕶️",
    features: [
      "UV protection",
      "Polarized lenses",
      "Brands available",
      "Prescription sunglasses",
      "Sports frames",
    ],
    image: "/images/services/sunglasses.png",
    cta: "View Collection",
    duration: "30 mins",
  },
  {
    id: 6,
    title: "Eye Care Services",
    description: "Services for vision needs",
    icon: "🎯",
    features: [
      "Low vision help",
      "Diabetic eye checks",
      "Children's eye care",
      "Dry eye help",
      "Visual therapy",
    ],
    image: "/images/services/specialized-care.png",
    cta: "Consult Us",
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
  { branch: "Robinson House", services: "Services + Laboratory" },
  { branch: "Kensington", services: "Eye Tests, Frames, Contact Lenses" },
  {
    branch: "Honeydew Lifestyle Centre",
    services: "Services & Frames",
  },
  { branch: "Chipinge Branch", services: "Services + Rural Outreach" },
  { branch: "Chiredzi Branch", services: "Agricultural Community Services" },
] as const;

export const BRANCH_FEATURES = [
  {
    icon: "⚡",
    title: "Same-Day Service",
    description: "Glasses made same-day",
  },
  {
    icon: "🔬",
    title: "Equipment",
    description: "Eye test equipment available",
  },
  {
    icon: "👨‍⚕️",
    title: "Staff",
    description: "Staff to help you",
  },
  {
    icon: "🏥",
    title: "Medical Aid Accepted",
    description: "Medical aids accepted",
  },
] as const;
