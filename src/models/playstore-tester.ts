export interface PlaystoreTester {
  id?: string;
  name: string;
  email: string;
  createdAt: Date;
  status?: 'pending' | 'approved' | 'rejected';
  notes?: string;
}

export type CreatePlaystoreTesterDto = {
  name: string;
  email: string;
}

export type UpdatePlaystoreTesterDto = {
  status?: 'pending' | 'approved' | 'rejected';
  notes?: string;
}
