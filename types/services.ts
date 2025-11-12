export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: readonly string[];
  image: string;
  cta: string;
  duration: string;
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  text: string;
  rating: number;
}

export interface BranchService {
  branch: string;
  services: string;
}

export interface BranchFeature {
  icon: string;
  title: string;
  description: string;
}
