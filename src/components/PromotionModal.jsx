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

  const handleModalClick = () => {
    if (content.cta_link) {
      window.location.href = content.cta_link;
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl aspect-[4/5] cursor-pointer transform transition-all duration-300 scale-95 hover:scale-100"
        onClick={(e) => {
          e.stopPropagation();
          handleModalClick();
        }}
        style={{ maxHeight: '90vh' }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white rounded-full p-2 hover:bg-red-500/80 transition-colors z-10"
          aria-label="Close promotional message"
        >
          <X size={20} />
        </button>

        {content.image ? (
          <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl">
            <img
              src={getAssetPath(content.image)}
              alt={content.title || 'Promotional image'}
              className="w-full h-full object-cover"
            />
            {(content.title || content.body) && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-8">
                {content.title && (
                  <h2 className="text-3xl font-bold mb-4 text-white drop-shadow-lg">{content.title}</h2>
                )}
                {content.body && (
                  <div
                    className="text-white/90 text-lg drop-shadow-lg prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: content.body }}
                  />
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-2xl w-full h-full flex flex-col justify-center items-center p-8 text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">{content.title}</h2>
            <div
              className="text-gray-600 prose mx-auto text-lg"
              dangerouslySetInnerHTML={{ __html: content.body }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PromotionModal;
