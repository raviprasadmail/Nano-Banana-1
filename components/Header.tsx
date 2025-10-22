
import React from 'react';

const BananaIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.373a3.001 3.001 0 012.758 3.627C12.808 11.23 10.16 14.5 10 14.5c-.16 0-2.808-3.27-3.758-7.5.314-1.39.06-2.857-.7-4.127A1 1 0 017 2h3zm-1 9c.995 0 2.22-.44 3.25-1.25a.75.75 0 00-.938-1.17C10.74 9.172 10.16 9.5 9 9.5c-1.16 0-1.74-.328-2.312-.92a.75.75 0 00-.938 1.17C6.78 10.56 8.005 11 9 11z" clipRule="evenodd" />
        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM2 10a8 8 0 1116 0 8 8 0 01-16 0z" />
    </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <BananaIcon/>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            Nano Banana <span className="text-yellow-300">Photo Editor</span>
          </h1>
        </div>
      </div>
    </header>
  );
};
