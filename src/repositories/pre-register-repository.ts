import { firestore } from '@/lib/firebase-admin';
import { PreRegister, CreatePreRegisterDto } from '@/models/pre-register';

export class PreRegisterRepository {
  private collectionName = 'pre-registers';
  constructor() {}

  async create(data: CreatePreRegisterDto): Promise<PreRegister> {
    const now = new Date();
    const preRegister: PreRegister = {
      ...data,
      createdAt: now
    };

    const docRef = await firestore.collection(this.collectionName).add(preRegister);
    return {
      id: docRef.id,
      ...preRegister
    };
  }

  async findByEmail(email: string): Promise<PreRegister | null> {
    const snapshot = await firestore
      .collection(this.collectionName)
      .where('email', '==', email)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return null;
    }

    const doc = snapshot.docs[0];
    const docData = doc.data();
    
    return {
      id: doc.id,
      name: docData.name,
      email: docData.email,
      phone: docData.phone,
      reason: docData.reason,
      // Konversi timestamp Firestore ke Date object
      createdAt: docData.createdAt && docData.createdAt.toDate ? 
        docData.createdAt.toDate() : 
        docData.createdAt
    } as PreRegister;
  }

  async findAll(): Promise<PreRegister[]> {
    const snapshot = await firestore
      .collection(this.collectionName)
      .orderBy('createdAt', 'desc')
      .get();

    return snapshot.docs.map(doc => {
      const data = doc.data();
      
      return {
        id: doc.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        reason: data.reason,
        // Konversi timestamp Firestore ke Date object
        createdAt: data.createdAt && typeof data.createdAt.toDate === 'function' ? 
          data.createdAt.toDate() : 
          data.createdAt
      } as PreRegister;
    });
  }
}
