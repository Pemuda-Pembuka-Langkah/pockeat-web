export interface PreRegister {
  id?: string;
  name: string;
  email: string;
  phone: string;
  reason?: string;
  createdAt: Date;
}

export type CreatePreRegisterDto = {
  name: string;
  email: string;
  phone: string;
  reason?: string;
}
