
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ImageViewer } from './components/ImageViewer';
import { PromptControls } from './components/PromptControls';
import { Spinner } from './components/Spinner';
import { editImage } from './services/geminiService';
import type { ImageState, EditedImage } from './types';
import { fileToGenerativePart } from './utils/fileUtils';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<ImageState | null>(null);
  const [editedImage, setEditedImage] = useState<EditedImage | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback((file: File) => {
    setOriginalImage({
      file: file,
      url: URL.createObjectURL(file),
    });
    setEditedImage(null);
    setError(null);
    setPrompt('');
  }, []);
  
  const handleReset = useCallback(() => {
    if (originalImage) {
      URL.revokeObjectURL(originalImage.url);
    }
    setOriginalImage(null);
    setEditedImage(null);
    setError(null);
    setPrompt('');
  }, [originalImage]);

  const handleGenerate = useCallback(async () => {
    if (!originalImage || !prompt) {
      setError('Please upload an image and enter a prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setEditedImage(null);

    try {
      const imagePart = await fileToGenerativePart(originalImage.file);
      const result = await editImage(imagePart, prompt);
      
      if (result.imageUrl) {
        setEditedImage(result);
      } else {
        setError(result.text || 'Failed to generate image. The model may not have returned an image.');
      }
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, prompt]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col items-center">
        {!originalImage ? (
          <ImageUploader onImageUpload={handleImageUpload} />
        ) : (
          <div className="w-full max-w-7xl flex flex-col gap-8">
            <PromptControls
              prompt={prompt}
              setPrompt={setPrompt}
              onSubmit={handleGenerate}
              onReset={handleReset}
              isLoading={isLoading}
            />
            {error && <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg text-center" role="alert">{error}</div>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ImageViewer title="Original" imageUrl={originalImage.url} />
              <div className="flex flex-col gap-4">
                {isLoading ? (
                  <div className="w-full aspect-square bg-gray-800 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-600">
                    <Spinner />
                  </div>
                ) : (
                  <ImageViewer
                    title="Edited"
                    imageUrl={editedImage?.imageUrl}
                    editedImage={editedImage}
                  />
                )}
                {editedImage?.text && (
                   <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                      <p className="text-sm text-gray-400 italic">Model's Note:</p>
                      <p className="text-gray-200">{editedImage.text}</p>
                   </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
