export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

export interface SessionUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}
