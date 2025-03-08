import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { SignaturePadProps } from '@/types'

const SignaturePad: React.FC<SignaturePadProps> = ({ onSave, onClear }) => {
  const canvasRef = useRef<SignatureCanvas>(null);
  const [penColor, setPenColor] = useState<string>('black');
  const [penWidth, setPenWidth] = useState<number>(2);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [history, setHistory] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

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
      setHistory([]);
      setCurrentIndex(-1);
      onClear();
    }
  };

  const handleUndo = () => {
    if (currentIndex > 0) {
        const newIndex = currentIndex - 1;
        setCurrentIndex(newIndex);
        canvasRef.current?.clear();
        canvasRef.current?.fromDataURL(history[newIndex]);
    }
  };

  const handleRedo = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
      canvasRef.current?.clear();
      canvasRef.current?.fromDataURL(history[currentIndex + 1]);
    }
  };

  const handleStrokeEnd = () => {
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL();
      const newHistory = history.slice(0, currentIndex + 1);
      setHistory([...newHistory, dataUrl]);
      setCurrentIndex(newHistory.length);
    }
  };

  return (
    <div className="space-y-4">
      <div className="border border-gray-300 w-full h-[200px] mx-0 my-auto bg-white rounded-md overflow-hidden">
        <SignatureCanvas
          ref={canvasRef}
          penColor={penColor}
          minWidth={penWidth}
          maxWidth={penWidth}
          canvasProps={{
            className: 'w-full h-full cursor-crosshair',
          }}
          onEnd={handleStrokeEnd}
        />
      </div>
      <div className="mt-5 w-full flex flex-wrap justify-between space-x-4">
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
        <button
          onClick={handleUndo}
          disabled={currentIndex <= 0}
          className="px-4 py-2 bg-gray-600 text-white rounded cursor-pointer hover:bg-gray-700 transition w-full sm:w-auto disabled:opacity-50"
        >
          Undo
        </button>
        <button
          onClick={handleRedo}
          disabled={currentIndex >= history.length - 1}
          className="px-4 py-2 bg-gray-600 text-white rounded cursor-pointer hover:bg-gray-700 transition w-full sm:w-auto disabled:opacity-50"
        >
          Redo
        </button>
        <input
          type="color"
          value={penColor}
          onChange={(e) => setPenColor(e.target.value)}
          className="p-1 h-10 w-14 rounded block bg-white border border-gray-200 cursor-grab transition"
          title="Choose your color"
        />
        <input
          type="range"
          min="1"
          max="10"
          value={penWidth}
          onChange={(e) => setPenWidth(Number(e.target.value))}
          className="w-full sm:w-auto"
        />
      </div>
    </div>
  );
};

export default SignaturePad;