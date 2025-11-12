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
