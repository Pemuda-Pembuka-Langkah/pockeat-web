import { NextRequest, NextResponse } from 'next/server';
import { ApkRepository } from '@/repositories/ApkRepository';
import { ApkCreateInput } from '@/models/ApkModel';

/**
 * Route handler for APK metadata upload
 * Accepts APK metadata with an existing URL (e.g. from GitHub releases) and saves it to Firestore
 */
export async function POST(request: NextRequest) {
  try {
    // Parse the JSON request
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return NextResponse.json(
        { error: 'Content type must be application/json' },
        { status: 400 }
      );
    }

    // Parse the JSON data
    const data = await request.json();

    // Extract required fields
    const { version, versionCode, fileUrl, fileSize, releaseNotes } = data;
    const releaseDate = data.releaseDate || new Date().toISOString();

    // Validate required fields
    if (!version || !versionCode || !fileUrl) {
      return NextResponse.json(
        { error: 'Version, versionCode, and fileUrl are required' },
        { status: 400 }
      );
    }

    // Validate the URL
    try {
      new URL(fileUrl);
    } catch (e) {
      return NextResponse.json(
        { error: 'Invalid fileUrl' },
        { status: 400 }
      );
    }

    // Save the APK metadata to Firestore
    const apkRepository = new ApkRepository();
    const apkData: ApkCreateInput = {
      version,
      versionCode,
      fileSize: fileSize || 0, // Default to 0 if not provided
      fileUrl,
      releaseDate,
      releaseNotes: releaseNotes || '',
    };

    const createdApk = await apkRepository.createApk(apkData);

    return NextResponse.json({
      success: true,
      data: createdApk,
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error uploading APK:', error);
    return NextResponse.json(
      { error: 'Failed to upload APK' },
      { status: 500 }
    );
  }
}

/**
 * Configure max allowed file size (10MB)
 */
export const config = {
  api: {
    bodyParser: false,
    responseLimit: '10mb',
  },
};
