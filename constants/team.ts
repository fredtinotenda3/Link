// constants/team.ts - OPTIMIZED VERSION
export const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Richard Maveneka",
    role: "Founder & Managing Director",
    bio: "Started Link Optical in 2008 to help people in Zimbabwe with eye care services.",
    expertise: ["Optical services", "Patient care", "Business operations"],
    image: "/images/team/richard-maveneka.png",
  },
  {
    id: 2,
    name: "Bismark Mateveka",
    role: "Director & Operations Manager",
    bio: "Helps with day-to-day operations across all our branches in Zimbabwe.",
    expertise: ["Branch operations", "Service coordination", "Customer help"],
    image: "/images/team/bismark-mateveka.png",
  },
  {
    id: 3,
    name: "Lorraine Tsitsi Mhiribidi",
    role: "Director & Finance Manager",
    bio: "Looks after the financial side to keep our services running smoothly.",
    expertise: ["Financial management", "Business planning", "Compliance"],
    image: "/images/team/lorraine-mhiribidi.png",
  },
  {
    id: 4,
    name: "Dr. Tariro Masamba",
    role: "Head Optometrist",
    bio: "Works with our team to provide eye tests and help with eye care services.",
    expertise: [
      "Eye examinations",
      "Contact lens fitting",
      "Children's vision",
    ],
    image: "/images/team/dr-masamba.png",
  },
] as const;
