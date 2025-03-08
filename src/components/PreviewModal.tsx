import React from 'react';

interface PreviewModalProps {
  isOpen: boolean;
  dataUrl: string | null;
  onClose: () => void;
  onSave: () => void;
}

const PreviewModal: React.FC<PreviewModalProps> = ({
  isOpen,
  dataUrl,
  onClose,
  onSave,
}) => {
  if (!isOpen || !dataUrl) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg space-y-4">
        <h2 className="text-xl font-bold">Preview Signature</h2>
        <img src={dataUrl} alt="Signature Preview" className="max-w-full h-auto" />
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;