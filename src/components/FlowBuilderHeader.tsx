import React from 'react';

interface FlowBuilderHeaderProps {
  onSave: () => void;
  errorMessage: string;
}

/**
 * FlowBuilderHeader Component
 * 
 * Header component containing the save button and error messages
 * Features:
 * - Save button to validate and save the flow
 * - Error message display
 * - Clean, minimal design
 */
export const FlowBuilderHeader: React.FC<FlowBuilderHeaderProps> = ({
  onSave,
  errorMessage,
}) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 20px',
      backgroundColor: 'white',
      borderBottom: '1px solid #e2e8f0',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    }}>
      {/* Title */}
      <h1 style={{
        fontSize: '20px',
        fontWeight: '600',
        color: '#1f2937',
        margin: 0,
      }}>
        Chatbot Flow Builder
      </h1>

      {/* Error message */}
      {errorMessage && (
        <div style={{
          flex: 1,
          maxWidth: '400px',
          margin: '0 20px',
        }}>
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500',
          }}>
            {errorMessage}
          </div>
        </div>
      )}

      {/* Save button */}
      <button
        onClick={onSave}
        style={{
          background: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          padding: '10px 20px',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#2563eb';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#3b82f6';
        }}
      >
        Save Changes
      </button>
    </div>
  );
};
