import React from 'react';
import { getAssetPath } from '../utils/assetPath';
import { X } from 'lucide-react';

const PromotionModal = ({ content, onClose }) => {
  if (!content) return null;

  const handleCTAClick = () => {
    if (content.cta_link) {
      window.location.href = content.cta_link;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full relative transform transition-all duration-300 scale-95 hover:scale-100">
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-slate-800 text-white rounded-full p-2 hover:bg-red-500 transition-colors"
          aria-label="Close promotional message"
        >
          <X size={24} />
        </button>

        {content.image && (
          <img
            src={getAssetPath(content.image)}
            alt={content.title || 'Promotional image'}
            className="w-full h-96 object-cover rounded-t-lg"
          />
        )}

        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">{content.title}</h2>
          <div
            className="text-gray-600 prose mx-auto mb-4"
            dangerouslySetInnerHTML={{ __html: content.body }}
          />
          {content.cta_text && content.cta_link && (
            <button
              onClick={handleCTAClick}
              className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
            >
              {content.cta_text}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromotionModal;
