import React from 'react';
import { getAllApks } from '@/lib/apk-utils';
import { formatDistanceToNow } from 'date-fns';
import { Download, ChevronRight, SmartphoneIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/landing/landing-navbar';
import Footer from '@/components/landing/landing-footer';

export const dynamic = 'force-dynamic';

export default async function DownloadsPage() {
  // Fetch all APKs, ordered by version code (newest first)
  const apks = await getAllApks('versionCode', 'desc');

  // Format the release date
  const formatDate = (dateString: string | Date) => {
    try {
      const date = typeof dateString === 'string' 
        ? new Date(dateString) 
        : dateString;
        
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      return 'Unknown date';
    }
  };

  // Format file size to human-readable format
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-[#FAF7F1] font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 pb-16">
        <div className="mb-12 text-center">
          <div className="flex justify-center mb-3">
            <SmartphoneIcon className="h-10 w-10 text-[#4AB8A1]" />
          </div>
          <h1 className="text-4xl font-bold mb-3">
            <span className="text-[#4AB8A1]">Pock</span>
            <span className="text-[#FF6B35]">eat</span>
            <span className="text-gray-800"> Mobile App</span>
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Download the latest version of our mobile app to track your calories and health with AI-powered features
          </p>
        </div>
        
        {apks.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 shadow-lg text-center max-w-xl mx-auto">
            <div className="flex justify-center mb-4">
              <SmartphoneIcon className="h-16 w-16 text-gray-300" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">No APK versions available</h3>
            <p className="text-gray-500">We're working on it! Check back soon for the first release.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Latest version callout */}
            {apks.length > 0 && (
              <div className="rounded-2xl overflow-hidden bg-white shadow-xl">
                <div className="bg-gradient-to-r from-[#4AB8A1] to-[#FF6B35] p-6 text-white">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="mb-1 flex items-center">
                        <span className="bg-white text-[#4AB8A1] text-xs px-2 py-0.5 rounded-full mr-2 font-medium">
                          LATEST RELEASE
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold">
                        Version {apks[0].version}
                      </h2>
                    </div>
                    <div>
                      <Link href={apks[0].fileUrl} target="_blank" rel="noopener noreferrer">
                        <Button 
                          className="h-12 rounded-full bg-white text-[#4AB8A1] hover:bg-gray-100"
                        >
                          Download
                          <Download className="ml-2 h-5 w-5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-sm text-gray-600 mb-4">
                    Released {formatDate(apks[0].releaseDate)} • {formatFileSize(apks[0].fileSize)}
                  </p>
                  <div className="prose prose-sm max-w-none mb-4">
                    <div className="bg-gray-50 rounded-xl p-5 text-gray-700">
                      <h3 className="text-lg font-medium mb-3 text-gray-900">Release Notes</h3>
                      {apks[0].releaseNotes ? (
                        <pre className="whitespace-pre-wrap font-sans">{apks[0].releaseNotes}</pre>
                      ) : (
                        <p className="italic text-gray-500">No release notes available for this version.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Previous versions */}
            {apks.length > 1 && (
              <div className="mt-10 rounded-2xl bg-white p-6 shadow-lg">
                <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-800">
                  <span className="w-8 h-1 bg-gradient-to-r from-[#4AB8A1] to-[#FF6B35] rounded-full mr-3"></span>
                  Previous Versions
                </h2>
                <div className="space-y-6 divide-y divide-gray-100">
                  {apks.slice(1).map((apk) => (
                    <div key={apk.id} className="pt-6 first:pt-0">
                      <div className="flex justify-between items-start flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-800">
                            Version {apk.version}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3">
                            Released {formatDate(apk.releaseDate)} • {formatFileSize(apk.fileSize)}
                          </p>
                          
                          <details className="group">
                            <summary className="flex cursor-pointer items-center text-sm font-medium text-[#4AB8A1] mb-2">
                              Release Notes
                              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-open:rotate-90" />
                            </summary>
                            <div className="mt-3 rounded-xl bg-gray-50 p-4 text-sm text-gray-700">
                              {apk.releaseNotes ? (
                                <pre className="whitespace-pre-wrap font-sans">{apk.releaseNotes}</pre>
                              ) : (
                                <p className="italic text-gray-500">No release notes available for this version.</p>
                              )}
                            </div>
                          </details>
                        </div>
                        <div>
                          <Link href={apk.fileUrl} target="_blank" rel="noopener noreferrer">
                            <Button 
                              variant="outline"
                              className="rounded-full border-2 border-[#FF6B35] text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white"
                            >
                              Download
                              <Download className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
