"use client";

import { QRCodeCanvas } from "qrcode.react";

export default function Acces() {
  
  const url = "https://ton-projet.vercel.app/employe/connexion";

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-100 to-blue-200 px-4">
      <h1 className="mb-6 text-2xl font-bold text-gray-800 text-center">
        Scannez ce QR Code
      </h1>

      <div className="p-6 bg-white rounded-2xl shadow-lg">
        <QRCodeCanvas
          value={url}     
          size={220}
          bgColor="#ffffff"
          fgColor="#000000"
          level="H"
          includeMargin={true}
        />
      </div>

      <p className="mt-6 text-gray-700 text-center max-w-xs break-words">
        Scannez ce QR code avec votre téléphone pour accéder à la page d'accueil
      </p>

      <p className="mt-2 text-xs text-gray-500 text-center break-words">
        URL directe : <span className="font-mono">{url}</span>
      </p>
    </div>
  );
}
