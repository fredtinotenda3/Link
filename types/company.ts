export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface CompanyValue {
  icon: string;
  title: string;
  description: string;
}

export interface MissionStatement {
  title: string;
  description: string;
}

export interface CompanyStats {
  readonly yearsExperience: string;
  readonly patientsServed: string;
  readonly branches: string;
  readonly sameDayService: string;
}
