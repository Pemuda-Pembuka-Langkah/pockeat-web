import { ApkRepository } from "@/repositories/ApkRepository";
import { ApkModel } from "@/models/ApkModel";

/**
 * Gets the latest APK from the repository
 * Used for the download button on the homepage
 */
export async function getLatestApk(): Promise<ApkModel | null> {
  try {
    const repository = new ApkRepository();
    const latestApk = await repository.getLatestApk();
    return latestApk;
  } catch (error) {
    console.error('Error fetching latest APK:', error);
    return null;
  }
}

/**
 * Gets all APKs ordered by version code or release date
 * Used in the downloads page to list all available APKs
 */
export async function getAllApks(
  orderBy: 'releaseDate' | 'versionCode' = 'releaseDate',
  orderDirection: 'desc' | 'asc' = 'desc'
): Promise<ApkModel[]> {
  try {
    const repository = new ApkRepository();
    const apks = await repository.getAllApks(orderBy, orderDirection);
    return apks;
  } catch (error) {
    console.error('Error fetching APKs:', error);
    return [];
  }
}
