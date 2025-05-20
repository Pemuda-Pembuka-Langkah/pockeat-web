import { firestore } from '@/lib/firebase-admin';
import { PlaystoreTester, CreatePlaystoreTesterDto, UpdatePlaystoreTesterDto } from '@/models/playstore-tester';

export class PlaystoreTesterRepository {
  private collectionName = 'playstore-testers';
  constructor() {}

  async create(testerData: CreatePlaystoreTesterDto): Promise<PlaystoreTester> {
    const now = new Date();
    const tester: PlaystoreTester = {
      ...testerData,
      createdAt: now,
      status: 'pending'
    };

    const docRef = await firestore.collection(this.collectionName).add(tester);
    return {
      id: docRef.id,
      ...tester
    };
  }

  async findByEmail(email: string): Promise<PlaystoreTester | null> {
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
      status: docData.status,
      notes: docData.notes,
      // Konversi timestamp Firestore ke Date object
      createdAt: docData.createdAt && docData.createdAt.toDate ? 
        docData.createdAt.toDate() : 
        docData.createdAt
    } as PlaystoreTester;
  }

  async findAll(): Promise<PlaystoreTester[]> {
    const snapshot = await firestore
      .collection(this.collectionName)
      .orderBy('createdAt', 'desc')
      .get();

    return snapshot.docs.map(doc => {
      const data = doc.data();
      
      // Konversi timestamp Firestore ke Date object
      return {
        id: doc.id,
        name: data.name,
        email: data.email,
        status: data.status,
        notes: data.notes,
        // Jika createdAt adalah timestamp, konversi ke tanggal
        createdAt: data.createdAt && data.createdAt.toDate ? 
          data.createdAt.toDate() : 
          data.createdAt
      } as PlaystoreTester;
    });
  }

  async update(id: string, data: UpdatePlaystoreTesterDto): Promise<PlaystoreTester | null> {
    const docRef = firestore.collection(this.collectionName).doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return null;
    }

    await docRef.update({
      ...data,
      updatedAt: new Date()
    });

    const updatedDoc = await docRef.get();
    const updatedData = updatedDoc.data();
    
    if (!updatedData) {
      return null;
    }
    
    return {
      id: updatedDoc.id,
      name: updatedData.name,
      email: updatedData.email,
      status: updatedData.status,
      notes: updatedData.notes,
      // Konversi timestamp Firestore ke Date object
      createdAt: updatedData.createdAt && typeof updatedData.createdAt.toDate === 'function' ? 
        updatedData.createdAt.toDate() : 
        updatedData.createdAt
    } as PlaystoreTester;
  }

  async delete(id: string): Promise<boolean> {
    const docRef = firestore.collection(this.collectionName).doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return false;
    }

    await docRef.delete();
    return true;
  }
}
