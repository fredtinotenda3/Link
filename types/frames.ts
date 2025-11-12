export type FrameCategory = "designer" | "premium" | "standard" | "budget";
export type LensType = "single" | "bifocal" | "progressive" | "blue-light";

export interface Frame {
  id: string;
  name: string;
  brand: string;
  category: FrameCategory;
  priceRange: string;
  features: readonly string[];
  description: string;
  image: string;
  availableColors: readonly string[];
}

export interface Lens {
  id: string;
  name: string;
  type: LensType;
  features: readonly string[];
  description: string;
  priceRange: string;
}

export interface FrameCategoryInfo {
  id: string;
  name: string;
  count: number;
}
