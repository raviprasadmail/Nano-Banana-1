
import React from 'react';
import type { EditedImage } from '../types';

interface ImageViewerProps {
  title: string;
  imageUrl?: string | null;
  editedImage?: EditedImage | null;
}

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

const ImageIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);


export const ImageViewer: React.FC<ImageViewerProps> = ({ title, imageUrl, editedImage }) => {
    
  const handleDownload = () => {
    if (!editedImage?.imageUrl) return;
    const link = document.createElement('a');
    link.href = editedImage.imageUrl;
    link.download = `edited-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
    
  return (
    <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-300">{title}</h3>
            {editedImage?.imageUrl && (
                <button 
                  onClick={handleDownload}
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-all text-sm"
                >
                    <DownloadIcon />
                    Download
                </button>
            )}
        </div>
      <div className="w-full aspect-square bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-600">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-contain" />
        ) : (
          <div className="text-center text-gray-500 flex flex-col items-center">
            <ImageIcon />
            <p>Your {title.toLowerCase()} image will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};
