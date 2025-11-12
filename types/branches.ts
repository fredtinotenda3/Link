export interface Branch {
  id: number;
  name: string;
  type: string;
  address: string;
  phone: string;
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  services: readonly string[];
  features: readonly string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  image: string;
}

export interface BranchHours {
  weekdays: string;
  saturday: string;
  sunday: string;
}

export interface BranchCoordinates {
  lat: number;
  lng: number;
}
