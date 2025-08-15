import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { MessageCircle } from 'lucide-react';

/**
 * TextNode Component
 * 
 * Represents a text message node in the chatbot flow
 * Features:
 * - Target handle at the top (can receive multiple connections)
 * - Source handle at the bottom (can have only one outgoing connection)
 * - Editable text content via the settings panel
 */
export const TextNode: React.FC<NodeProps> = ({ data, selected }) => {
  return (
    <div
      style={{
        background: 'white',
        border: `2px solid ${selected ? '#3b82f6' : '#e2e8f0'}`,
        borderRadius: '8px',
        minWidth: '200px',
        boxShadow: selected 
          ? '0 0 0 2px rgba(59, 130, 246, 0.2)' 
          : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        transition: 'all 0.2s ease',
      }}
    >
      {/* Target Handle - Top (can receive multiple connections) */}
      <Handle
        type="target"
        position={Position.Top}
        style={{
          background: '#64748b',
          border: '2px solid white',
          width: '12px',
          height: '12px',
        }}
      />
      
      {/* Node Header */}
      <div
        style={{
          background: '#a7f3d0',
          padding: '8px 12px',
          borderRadius: '6px 6px 0 0',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '12px',
          fontWeight: '600',
          color: '#065f46',
        }}
      >
        <MessageCircle size={14} />
        Send Message
      </div>
      
      {/* Node Content */}
      <div
        style={{
          padding: '12px',
          fontSize: '14px',
          color: '#374151',
          lineHeight: '1.5',
          minHeight: '40px',
          wordWrap: 'break-word',
        }}
      >
        {String(data?.label || 'Enter your message here...')}
      </div>
      
      {/* Source Handle - Bottom (can have only one outgoing connection) */}
      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          background: '#64748b',
          border: '2px solid white',
          width: '12px',
          height: '12px',
        }}
      />
    </div>
  );
};
