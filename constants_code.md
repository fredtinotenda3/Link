===============================
  constants\booking.ts
===============================
`$lang
export const BOOKING_BRANCHES = [
  "Robinson House",
  "Kensington",
  "Honeydew Lifestyle Centre",
  "Chipinge Branch",
  "Chiredzi Branch",
] as const;

export const SERVICE_TYPES = [
  "Eye Test",
  "Contact Lens Fitting",
  "Contact Lens Aftercare",
  "Dispensing Only",
  "Low Vision",
  "Visual Field Test",
] as const;

```

===============================
  constants\branches.ts
===============================
`$lang
export const BRANCHES = [
  {
    id: 1,
    name: "Robinson House",
    type: "Main Branch & Laboratory",
    address: "Robinson House, CBD, Harare",
    phone: "+263 242 123456",
    hours: {
      weekdays: "8:00 AM - 5:00 PM",
      saturday: "8:00 AM - 1:00 PM",
      sunday: "Closed",
    },
    services: [
      "Full Service",
      "Main Laboratory",
      "Emergency Repairs",
      "All Tests",
    ],
    features: [
      "Same-day spectacles",
      "Free parking",
      "Wheelchair accessible",
      "Medical aid billing",
    ],
    coordinates: { lat: -17.8292, lng: 31.0522 },
    image: "/images/branches/robinson-house.jpg",
  },
  {
    id: 2,
    name: "Kensington",
    type: "Premium Services",
    address: "Kensington Shopping Centre, Harare",
    phone: "+263 242 234567",
    hours: {
      weekdays: "8:30 AM - 5:30 PM",
      saturday: "9:00 AM - 2:00 PM",
      sunday: "Closed",
    },
    services: [
      "Eye Tests",
      "Designer Frames",
      "Contact Lenses",
      "Children's Eye Care",
    ],
    features: [
      "Premium frames collection",
      "Child-friendly",
      "Easy parking",
      "Expert optometrists",
    ],
    coordinates: { lat: -17.81, lng: 31.04 },
    image: "/images/branches/kensington.jpg",
  },
  {
    id: 3,
    name: "Honeydew Lifestyle Centre",
    type: "Luxury & Designer",
    address: "Honeydew Lifestyle Centre, Greendale, Harare",
    phone: "+263 242 345678",
    hours: {
      weekdays: "9:00 AM - 6:00 PM",
      saturday: "9:00 AM - 3:00 PM",
      sunday: "10:00 AM - 1:00 PM",
    },
    services: ["Luxury Frames", "Sunglasses", "Advanced Tests", "VIP Service"],
    features: [
      "Designer brands",
      "Luxury experience",
      "Weekend hours",
      "Personal styling",
    ],
    coordinates: { lat: -17.8, lng: 31.1 },
    image: "/images/branches/honeydew.jpg",
  },
  {
    id: 4,
    name: "Chipinge Branch",
    type: "Community Care",
    address: "Chipinge Town Centre",
    phone: "+263 27 123456",
    hours: {
      weekdays: "8:00 AM - 4:30 PM",
      saturday: "8:00 AM - 12:00 PM",
      sunday: "Closed",
    },
    services: [
      "Full Service",
      "Rural Outreach",
      "Affordable Options",
      "Mobile Clinic",
    ],
    features: [
      "Community focused",
      "Rural outreach",
      "Affordable care",
      "Local expertise",
    ],
    coordinates: { lat: -20.2, lng: 32.62 },
    image: "/images/branches/chipinge.jpg",
  },
  {
    id: 5,
    name: "Chiredzi Branch",
    type: "Agricultural Community",
    address: "Chiredzi Town Centre",
    phone: "+263 31 123456",
    hours: {
      weekdays: "8:00 AM - 4:30 PM",
      saturday: "8:00 AM - 12:00 PM",
      sunday: "Closed",
    },
    services: [
      "Farm Eye Safety",
      "Dust Protection",
      "Sports Glasses",
      "Community Health",
    ],
    features: [
      "Farm safety specialists",
      "Dust-resistant options",
      "Local community",
      "Agricultural focus",
    ],
    coordinates: { lat: -21.05, lng: 31.6667 },
    image: "/images/branches/chiredzi.jpg",
  },
] as const;

```

===============================
  constants\company.ts
===============================
`$lang
export const COMPANY_TIMELINE = [
  {
    year: "2008",
    title: "Foundation During Challenges",
    description:
      "Link Optical established during Zimbabwe's economic challenges, focusing on serving PSMAS patients with quality eye care.",
  },
  {
    year: "2011-2017",
    title: "Rapid Expansion",
    description:
      "Grew to 7 branches across Zimbabwe, becoming a trusted name in optical care with focus on both insured and uninsured clients.",
  },
  {
    year: "2018",
    title: "In-House Laboratory Investment",
    description:
      "Established our own optical laboratory to reduce costs and provide same-day spectacle service to our patients.",
  },
  {
    year: "2020-Present",
    title: "Modernization & Growth",
    description:
      "Implemented VisionPlus system, expanded to serve broader market with 'Eye Care for All' philosophy across 5 strategic branches.",
  },
] as const;

export const COMPANY_VALUES = [
  {
    icon: "ðŸ‘ï¸â€ðŸ—¨ï¸",
    title: "Patient-First Care",
    description:
      "Every decision starts with what's best for our patients' vision and eye health.",
  },
  {
    icon: "âš¡",
    title: "Excellence in Service",
    description:
      "From same-day spectacles to advanced diagnostics, we deliver premium quality.",
  },
  {
    icon: "ðŸ’",
    title: "Accessibility for All",
    description:
      "Quality eye care should be available to everyone, regardless of insurance status.",
  },
  {
    icon: "ðŸ”¬",
    title: "Continuous Innovation",
    description:
      "We invest in the latest technology and training to provide cutting-edge care.",
  },
] as const;

export const CERTIFICATIONS = [
  "Zimbabwe Optometrists Association",
  "World Council of Optometry",
  "Ministry of Health and Child Care",
  "Quality Assurance Certified",
  "Medical Aid Provider Network",
] as const;

export const COMPANY_STATS = {
  yearsExperience: "15+",
  patientsServed: "50,000+",
  branches: "5",
  sameDayService: "Same",
} as const;

export const MISSION_STATEMENT = {
  title: '"Eye Care for All"',
  description:
    "We believe that quality eye care should be accessible to every Zimbabwean. Through our in-house laboratory, affordable pricing, and five strategic branches, we're making premium vision care available to both insured and uninsured patients.",
} as const;

```

===============================
  constants\contact.ts
===============================
`$lang
export const CONTACT_METHODS = [
  {
    icon: "ðŸ“ž",
    title: "Call Us Directly",
    description: "Speak with our friendly team",
    details: "Main Line: +263 242 123 456",
    cta: "Call Now",
    action: "tel:+263242123456",
  },
  {
    icon: "ðŸ“§",
    title: "Send Us an Email",
    description: "We respond within 24 hours",
    details: "info@linkoptical.co.zw",
    cta: "Send Email",
    action: "mailto:info@linkoptical.co.zw",
  },
  {
    icon: "ðŸ’¬",
    title: "WhatsApp Business",
    description: "Quick answers via WhatsApp",
    details: "+263 77 123 4567",
    cta: "Message Us",
    action: "https://wa.me/263771234567",
  },
  {
    icon: "ðŸ“",
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

```

===============================
  constants\frames.ts
===============================
`$lang
export const FRAMES = [
  {
    id: "1",
    name: "Giorgio Armani",
    brand: "Giorgio Armani",
    category: "designer" as const,
    priceRange: "Premium",
    features: ["Luxury Design", "Lightweight", "Italian Craftsmanship"],
    description:
      "Elegant designer frames combining luxury and comfort with superior Italian craftsmanship.",
    image: "/images/frames/armani.jpg",
    availableColors: ["Black", "Brown", "Gold", "Silver"],
  },
  {
    id: "2",
    name: "Police",
    brand: "Police",
    category: "designer" as const,
    priceRange: "Premium",
    features: ["Bold Style", "Durable", "Fashion Forward"],
    description:
      "Bold and contemporary frames for the fashion-conscious individual.",
    image: "/images/frames/police.jpg",
    availableColors: ["Black", "Blue", "Gunmetal", "Tortoise"],
  },
  {
    id: "3",
    name: "Gucci",
    brand: "Gucci",
    category: "designer" as const,
    priceRange: "Premium",
    features: ["Luxury Brand", "Signature Design", "Premium Materials"],
    description:
      "Iconic Gucci frames featuring signature designs and premium materials.",
    image: "/images/frames/gucci.jpg",
    availableColors: ["Black", "Gold", "Crystal", "Havana"],
  },
  {
    id: "4",
    name: "Felicia",
    brand: "Felicia",
    category: "premium" as const,
    priceRange: "Medium",
    features: ["Comfort Fit", "Stylish", "Quality Materials"],
    description:
      "Beautiful frames combining style with exceptional comfort for daily wear.",
    image: "/images/frames/felicia.jpg",
    availableColors: ["Black", "Brown", "Pink", "Clear"],
  },
  {
    id: "5",
    name: "Classic Comfort",
    brand: "Link Optical",
    category: "standard" as const,
    priceRange: "Affordable",
    features: ["Comfort Focus", "Durable", "Everyday Wear"],
    description: "Reliable and comfortable frames perfect for everyday use.",
    image: "/images/frames/classic.jpg",
    availableColors: ["Black", "Brown", "Grey", "Navy"],
  },
  {
    id: "6",
    name: "Budget Friendly",
    brand: "Link Optical",
    category: "budget" as const,
    priceRange: "Budget",
    features: ["Affordable", "Durable", "Essential Protection"],
    description:
      "Quality frames at an affordable price point for essential vision care.",
    image: "/images/frames/budget.jpg",
    availableColors: ["Black", "Brown"],
  },
] as const;

export const LENSES = [
  {
    id: "l1",
    name: "Single Vision",
    type: "single" as const,
    features: [
      "Clear Distance/Reading",
      "Standard Protection",
      "All-day Comfort",
    ],
    description: "Perfect for distance or reading vision correction.",
    priceRange: "From $50",
  },
  {
    id: "l2",
    name: "Bifocal",
    type: "bifocal" as const,
    features: [
      "Distance & Reading",
      "Seamless Transition",
      "Presbyopia Solution",
    ],
    description: "Ideal for presbyopia with clear distance and reading vision.",
    priceRange: "From $80",
  },
  {
    id: "l3",
    name: "Progressive",
    type: "progressive" as const,
    features: ["No-line Multifocal", "Smooth Transition", "Natural Vision"],
    description:
      "Advanced no-line lenses for seamless vision at all distances.",
    priceRange: "From $120",
  },
  {
    id: "l4",
    name: "Blue Light Protection",
    type: "blue-light" as const,
    features: ["Digital Protection", "Reduced Eye Strain", "Better Sleep"],
    description: "Essential protection for digital device users.",
    priceRange: "From $40",
  },
] as const;

export const FRAME_CATEGORIES = [
  { id: "all", name: "All Frames", count: FRAMES.length },
  {
    id: "designer",
    name: "Designer",
    count: FRAMES.filter((f) => f.category === "designer").length,
  },
  {
    id: "premium",
    name: "Premium",
    count: FRAMES.filter((f) => f.category === "premium").length,
  },
  {
    id: "standard",
    name: "Standard",
    count: FRAMES.filter((f) => f.category === "standard").length,
  },
  {
    id: "budget",
    name: "Budget",
    count: FRAMES.filter((f) => f.category === "budget").length,
  },
] as const;

```

===============================
  constants\index.ts
===============================
`$lang
export * from "./company";
export * from "./team";
export * from "./services";
export * from "./testimonials";
export * from "./branches";
export * from "./contact";
export * from "./booking";
export * from "./frames"; // âœ… Add this
// We'll add more as we refactor other pages

```

===============================
  constants\services.ts
===============================
`$lang
export const SERVICES = [
  {
    id: 1,
    title: "Comprehensive Eye Examinations",
    description:
      "Thorough eye health assessments using state-of-the-art diagnostic equipment",
    icon: "ðŸ‘ï¸",
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
    icon: "ðŸ”",
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
    icon: "ðŸ‘“",
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
    icon: "âš—ï¸",
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
    icon: "ðŸ•¶ï¸",
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
    icon: "ðŸŽ¯",
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
    icon: "âš¡",
    title: "Same-Day Service",
    description: "Spectacles ready in hours at all locations",
  },
  {
    icon: "ðŸ”¬",
    title: "Advanced Equipment",
    description: "State-of-the-art technology at every branch",
  },
  {
    icon: "ðŸ‘¨â€âš•ï¸",
    title: "Expert Staff",
    description: "Trained optometrists at each location",
  },
  {
    icon: "ðŸ’³",
    title: "Medical Aid Accepted",
    description: "All major medical aids welcome everywhere",
  },
] as const;

```

===============================
  constants\team.ts
===============================
`$lang
export const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Richard Maveneka",
    role: "Founder & Managing Director",
    bio: "With over 15 years in optical care, Richard founded Link Optical in 2008 with a vision to make quality eye care accessible to all Zimbabweans.",
    expertise: [
      "Optical Business Management",
      "Patient Care",
      "Strategic Planning",
    ],
    image: "/images/team/richard-maveneka.jpg",
  },
  {
    id: 2,
    name: "Bismark Mateveka",
    role: "Director & Operations Manager",
    bio: "Bismark brings extensive experience in optical operations and business development, ensuring smooth operations across all branches.",
    expertise: [
      "Operations Management",
      "Business Development",
      "Customer Service",
    ],
    image: "/images/team/bismark-mateveka.jpg",
  },
  {
    id: 3,
    name: "Lorraine Tsitsi Mhiribidi",
    role: "Director & Finance Manager",
    bio: "Lorraine oversees the financial health of Link Optical, ensuring sustainable growth while maintaining our commitment to affordable care.",
    expertise: ["Financial Management", "Strategic Planning", "Compliance"],
    image: "/images/team/lorraine-mhiribidi.jpg",
  },
  {
    id: 4,
    name: "Dr. Tariro Masamba",
    role: "Head Optometrist",
    bio: "Leading our clinical team with 12 years of experience, Dr. Masamba ensures the highest standards of eye care across all branches.",
    expertise: [
      "Advanced Diagnostics",
      "Contact Lens Fitting",
      "Pediatric Optometry",
    ],
    image: "/images/team/dr-masamba.jpg",
  },
] as const;

```

===============================
  constants\testimonials.ts
===============================
`$lang
export const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah M.",
    location: "Harare",
    text: "Got my spectacles the same day! The quality is exceptional and the service was incredibly professional.",
    rating: 5,
  },
  {
    id: 2,
    name: "Thomas C.",
    location: "Chiredzi",
    text: "Best eye test I've ever had. The optometrist explained everything clearly and found issues others missed.",
    rating: 5,
  },
  {
    id: 3,
    name: "Grace K.",
    location: "Chipinge",
    text: "The contact lens fitting was so comfortable. Finally found lenses that work for my sensitive eyes!",
    rating: 5,
  },
  {
    id: 4,
    name: "David L.",
    location: "Kensington",
    text: "Same-day service saved me when I broke my glasses. Amazing quality and fast turnaround!",
    rating: 5,
  },
  {
    id: 5,
    name: "Lisa P.",
    location: "Greendale",
    text: "Professional team that genuinely cares about your eye health. Highly recommended!",
    rating: 5,
  },
] as const;

```

