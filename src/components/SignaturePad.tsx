import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { SignaturePadProps } from '@/types'

const SignaturePad: React.FC<SignaturePadProps> = ({ onSave, onClear }) => {
  const canvasRef = useRef<SignatureCanvas>(null);

  const handleSave = () => {
    if (canvasRef.current && !canvasRef.current.isEmpty()) {
      const canvas = canvasRef.current.getCanvas();
      if (canvas) {
        const dataUrl = canvas.toDataURL('image/png');
        onSave(dataUrl);
      }
    } else {
      alert('Please draw a signature before saving.');
    }
  };

  const handleClear = () => {
    if (canvasRef.current) {
      canvasRef.current.clear();
      onClear();
    }
  };

  return (
    <div className="space-y-4">
      <div className="border border-gray-300 bg-white rounded-md">
        <SignatureCanvas
          ref={canvasRef}
          canvasProps={{
            width: 600,
            height: 300,
            className: 'w-full h-full cursor-crosshair',
          }}
        />
      </div>
      <div className="flex space-x-4">
        <button
          onClick={handleSave}
          className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Save
        </button>
        <button
          onClick={handleClear}
          className="cursor-pointer px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default SignaturePad;