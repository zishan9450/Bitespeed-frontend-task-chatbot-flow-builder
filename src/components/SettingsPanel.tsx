import React, { useState, useEffect } from 'react';
import { Node } from '@xyflow/react';
import { ArrowLeft } from 'lucide-react';

interface SettingsPanelProps {
  node: Node;
  onUpdateNode: (nodeId: string, data: Record<string, any>) => void;
  onDeselect: () => void;
}

/**
 * SettingsPanel Component
 * 
 * Displays settings for the selected node
 * Features:
 * - Text editing for text nodes
 * - Back button to return to nodes panel
 * - Real-time updates to node content
 */
export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  node,
  onUpdateNode,
  onDeselect,
}) => {
  const [text, setText] = useState(String(node.data?.label || ''));

  // Update local state when node changes
  useEffect(() => {
    setText(String(node.data?.label || ''));
  }, [node.data?.label]);

  /**
   * Handle text change and update node
   */
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    setText(newText);
    onUpdateNode(node.id, { label: newText });
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Header with back button */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px',
        marginBottom: '20px'
      }}>
        <button
          onClick={onDeselect}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#6b7280',
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f3f4f6';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <ArrowLeft size={18} />
        </button>
        <h3 style={{ 
          fontSize: '16px', 
          fontWeight: '600',
          color: '#374151',
          margin: 0
        }}>
          Message
        </h3>
      </div>

      {/* Settings form */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Text label */}
        <div>
          <label
            htmlFor="message-text"
            style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px'
            }}
          >
            Text
          </label>
          
          {/* Text input */}
          <textarea
            id="message-text"
            value={text}
            onChange={handleTextChange}
            placeholder="Enter your message here..."
            style={{
              width: '100%',
              minHeight: '100px',
              padding: '12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              fontFamily: 'inherit',
              resize: 'vertical',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#3b82f6';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
            }}
          />
        </div>

        {/* Node info */}
        <div style={{
          padding: '12px',
          backgroundColor: '#f8fafc',
          borderRadius: '6px',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ 
            fontSize: '12px', 
            color: '#6b7280',
            lineHeight: '1.4'
          }}>
            <strong>Node ID:</strong> {node.id}
          </div>
          <div style={{ 
            fontSize: '12px', 
            color: '#6b7280',
            lineHeight: '1.4',
            marginTop: '4px'
          }}>
            <strong>Type:</strong> {node.type}
          </div>
        </div>

        {/* Instructions */}
        <div style={{
          padding: '12px',
          backgroundColor: '#eff6ff',
          borderRadius: '6px',
          border: '1px solid #bfdbfe'
        }}>
          <p style={{ 
            fontSize: '12px', 
            color: '#1e40af',
            lineHeight: '1.4',
            margin: 0
          }}>
            💡 Changes are saved automatically as you type
          </p>
        </div>
      </div>
    </div>
  );
};
