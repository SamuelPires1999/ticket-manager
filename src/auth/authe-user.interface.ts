export interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
  document: string;
}
