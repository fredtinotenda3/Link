// constants/branches.ts - UPDATED WITH PNG EXTENSIONS
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
    image: "/images/branches/robinson-house.png", // Changed to .png
  },
  {
    id: 2,
    name: "Kensington",
    type: "Services Branch",
    address: "Kensington Shopping Centre, Harare",
    phone: "+263 242 234567",
    hours: {
      weekdays: "8:30 AM - 5:30 PM",
      saturday: "9:00 AM - 2:00 PM",
      sunday: "Closed",
    },
    services: ["Eye Tests", "Frames", "Contact Lenses", "Children's Eye Care"],
    features: [
      "Frame collection",
      "Child-friendly",
      "Easy parking",
      "Eye care staff",
    ],
    coordinates: { lat: -17.81, lng: 31.04 },
    image: "/images/branches/kensington.png", // Changed to .png
  },
  {
    id: 3,
    name: "Honeydew Lifestyle Centre",
    type: "Branch",
    address: "Honeydew Lifestyle Centre, Greendale, Harare",
    phone: "+263 242 345678",
    hours: {
      weekdays: "9:00 AM - 6:00 PM",
      saturday: "9:00 AM - 3:00 PM",
      sunday: "10:00 AM - 1:00 PM",
    },
    services: ["Frames", "Sunglasses", "Eye Tests", "Services"],
    features: ["Different brands", "Weekend hours", "Personal help"],
    coordinates: { lat: -17.8, lng: 31.1 },
    image: "/images/branches/honeydew.png", // Changed to .png
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
      "Options available",
      "Mobile Clinic",
    ],
    features: [
      "Community focused",
      "Rural outreach",
      "Services available",
      "Local staff",
    ],
    coordinates: { lat: -20.2, lng: 32.62 },
    image: "/images/branches/chipinge.png", // Changed to .png
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
      "Farm safety help",
      "Dust-resistant options",
      "Local community",
      "Agricultural focus",
    ],
    coordinates: { lat: -21.05, lng: 31.6667 },
    image: "/images/branches/chiredzi.png", // Changed to .png
  },
] as const;
