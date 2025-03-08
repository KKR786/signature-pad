'use client';

import React, { useState } from 'react';
import SignaturePad from '@/components/SignaturePad';
import signatureService from '@/services/signatureService';

const SignaturePage = () => {
  const [isCleared, setIsCleared] = useState(false);

  const handleSave = async (dataUrl: string) => {
    try {
      await signatureService.saveSignature(dataUrl, 'png');
      alert('Signature saved successfully!');
    } catch (error) {
      console.error('Error saving signature:', error);
      alert('Failed to save signature.');
    }
  };

  const handleClear = () => {
    setIsCleared(true);
    setTimeout(() => {
      setIsCleared(false);
    }, 3000)
  };

  return (
    <div className="p-8 max-w-lg mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center">Draw Your Signature</h1>
      <SignaturePad onSave={handleSave} onClear={handleClear} />
      {isCleared && (
        <p className="text-sm text-green-600 text-center border-amber-50 bg-white p-3 rounded">Signature cleared!</p>
      )}
    </div>
  );
};

export default SignaturePage;