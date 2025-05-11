import { firestore } from '@/lib/firebase-admin';
import { ApkModel, ApkCreateInput, ApkUpdateInput } from '@/models/ApkModel';
import { CollectionReference, DocumentData, Query } from 'firebase-admin/firestore';

/**
 * Repository class for managing APK records in Firestore
 */
export class ApkRepository {
  private collection: CollectionReference<DocumentData>;
  private collectionName = 'apks';

  constructor() {
    this.collection = firestore.collection(this.collectionName);
  }

  /**
   * Get all APKs, optionally sorted by release date or version code
   */
  async getAllApks(
    orderBy: 'releaseDate' | 'versionCode' = 'releaseDate',
    orderDirection: 'desc' | 'asc' = 'desc'
  ): Promise<ApkModel[]> {
    try {
      const snapshot = await this.collection
        .orderBy(orderBy, orderDirection)
        .get();

      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      } as ApkModel));
    } catch (error) {
      console.error('Error getting APKs:', error);
      throw error;
    }
  }

  /**
   * Get a specific APK by ID
   */
  async getApkById(id: string): Promise<ApkModel | null> {
    try {
      const doc = await this.collection.doc(id).get();
      
      if (!doc.exists) {
        return null;
      }
      
      return {
        id: doc.id,
        ...doc.data()
      } as ApkModel;
    } catch (error) {
      console.error(`Error getting APK with ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Get the latest APK by version code
   */
  async getLatestApk(): Promise<ApkModel | null> {
    try {
      const snapshot = await this.collection
        .orderBy('versionCode', 'desc')
        .limit(1)
        .get();
      
      if (snapshot.empty) {
        return null;
      }
      
      const doc = snapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data()
      } as ApkModel;
    } catch (error) {
      console.error('Error getting latest APK:', error);
      throw error;
    }
  }

  /**
   * Create a new APK record
   */
  async createApk(data: ApkCreateInput): Promise<ApkModel> {
    try {
      const docRef = await this.collection.add({
        ...data,
        releaseDate: data.releaseDate instanceof Date 
          ? data.releaseDate.toISOString() 
          : data.releaseDate
      });
      
      const doc = await docRef.get();
      
      return {
        id: doc.id,
        ...doc.data()
      } as ApkModel;
    } catch (error) {
      console.error('Error creating APK:', error);
      throw error;
    }
  }

  /**
   * Update an existing APK record
   */
  async updateApk(data: ApkUpdateInput): Promise<ApkModel> {
    try {
      const { id, ...updateData } = data;
      
      // Convert Date objects to ISO strings for Firestore
      if (updateData.releaseDate instanceof Date) {
        updateData.releaseDate = updateData.releaseDate.toISOString();
      }
      
      await this.collection.doc(id).update(updateData);
      
      const updatedDoc = await this.collection.doc(id).get();
      
      if (!updatedDoc.exists) {
        throw new Error(`APK with ID ${id} not found after update`);
      }
      
      return {
        id: updatedDoc.id,
        ...updatedDoc.data()
      } as ApkModel;
    } catch (error) {
      console.error(`Error updating APK with ID ${data.id}:`, error);
      throw error;
    }
  }

  /**
   * Delete an APK record
   */
  async deleteApk(id: string): Promise<boolean> {
    try {
      await this.collection.doc(id).delete();
      return true;
    } catch (error) {
      console.error(`Error deleting APK with ID ${id}:`, error);
      throw error;
    }
  }
}
