export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  expertise: readonly string[]; // ✅ Change to readonly
  image: string;
}
