/**
 * APK Model - Represents a mobile application package for distribution
 * Simple model with essential fields for tracking APK versions
 */

export interface ApkModel {
  id: string;                   // Unique identifier for the APK
  version: string;              // Version number (e.g., "1.0.0")
  versionCode: number;          // Android version code (integer that increases with each release)
  fileSize: number;             // Size of the APK file in bytes
  fileUrl: string;              // Download URL for the APK
  releaseDate: Date | string;   // When this version was released
  releaseNotes: string;         // Detailed release notes, can contain markdown
}

/**
 * APK Create Input - Used when creating a new APK record
 * Omits the id field which will be auto-generated
 */
export type ApkCreateInput = Omit<ApkModel, 'id'>;

/**
 * APK Update Input - Used when updating an existing APK record
 * Makes all fields optional except id
 */
export type ApkUpdateInput = Partial<Omit<ApkModel, 'id'>> & {
  id: string;
};
