// constants/company.ts - EXTRA SAFE VERSION
export const COMPANY_TIMELINE = [
  {
    year: "2008",
    title: "Started",
    description: "Link Optical began providing eye care services in Zimbabwe.",
  },
  {
    year: "2011-2017",
    title: "More branches",
    description: "We opened branches across Zimbabwe.",
  },
  {
    year: "2018",
    title: "Lab added",
    description: "We set up a lab for making glasses.",
  },
  {
    year: "2020-Present",
    title: "Continuing",
    description: "We have 5 branches in Zimbabwe.",
  },
] as const;

export const COMPANY_VALUES = [
  {
    icon: "👁️‍🗨️",
    title: "Care approach",
    description: "We consider patients' vision and eye health.",
  },
  {
    icon: "⚡",
    title: "Service times",
    description: "Same-day glasses and eye tests available.",
  },
  {
    icon: "🤝",
    title: "For all people",
    description: "Services for insured and uninsured patients.",
  },
  {
    icon: "🔬",
    title: "Equipment used",
    description: "We use equipment for eye tests and glasses.",
  },
] as const;

export const CERTIFICATIONS = [
  "Zimbabwe Optometrists Association",
  "World Council of Optometry",
  "Ministry of Health registered",
  "Medical Aid Provider Network",
] as const;

export const COMPANY_STATS = {
  yearsExperience: "Operating since 2008",
  patientsServed: "People served",
  branches: "5",
  sameDayService: "Same",
} as const;

export const MISSION_STATEMENT = {
  title: "Eye care services",
  description:
    "We provide eye tests and glasses in Zimbabwe. With our lab and branches, we help patients.",
} as const;
