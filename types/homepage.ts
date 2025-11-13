export interface HomepageService {
  icon: string;
  title: string;
  description: string;
  link: string;
  features: string[];
}

export interface HomepageFeature {
  icon: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  text: string;
  rating: number;
}
