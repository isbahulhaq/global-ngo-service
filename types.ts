
export enum ServiceCategory {
  NGO = 'NGO & Social',
  CORPORATE = 'Company & Startup',
  LICENSE = 'Govt. Licenses',
  FINANCE = 'Tax & Audit',
  IPR = 'Trademark & IPR',
  TECH = 'Tech & Digital',
  OTHER = 'Other Legal'
}

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  shortDescription: string;
  description: string;
  price: string;
  features: string[];
  documents: string[];
  process: string[];
  timeframe: string;
  validity: string;
  faqs: { question: string; answer: string }[];
  image: string;
  rating: number;
  reviews: number;
}

export enum UserRole {
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
}

export enum ApplicationStatus {
  PENDING = 'Pending',
  DOCUMENTS_SUBMITTED = 'Documents Submitted',
  UNDER_REVIEW = 'Under Review',
  APPROVED = 'Approved',
  REJECTED = 'Rejected'
}

export interface Application {
  id: string;
  userId: string;
  userName: string;
  serviceId: string;
  serviceName: string;
  status: ApplicationStatus;
  dateApplied: string;
  documents: { name: string; url: string; date: string }[];
}
