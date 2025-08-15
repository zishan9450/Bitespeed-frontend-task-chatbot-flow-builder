import React from 'react';
import { MessageCircle } from 'lucide-react';

interface NodesPanelProps {}

/**
 * NodesPanel Component
 * 
 * Displays available node types that can be added to the flow
 * Features:
 * - Extensible design to easily add new node types
 * - Drag and drop functionality to add nodes to the canvas
 * - Currently supports Text Message nodes
 */
export const NodesPanel: React.FC<NodesPanelProps> = () => {
  /**
   * Handle drag start for node types
   * Sets the data transfer with node type information
   */
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  /**
   * Available node types
   * This array can be extended to add new node types in the future
   */
  const nodeTypes = [
    {
      type: 'textNode',
      label: 'Message',
      icon: MessageCircle,
      description: 'Send a text message',
      color: '#a7f3d0',
    },
    // Future node types can be added here:
    // {
    //   type: 'imageNode',
    //   label: 'Image',
    //   icon: ImageIcon,
    //   description: 'Send an image',
    //   color: '#fbbf24',
    // },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h3 style={{ 
        fontSize: '16px', 
        fontWeight: '600', 
        marginBottom: '16px',
        color: '#374151'
      }}>
        Nodes Panel
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {nodeTypes.map((nodeType) => {
          const IconComponent = nodeType.icon;
          
          return (
            <div
              key={nodeType.type}
              draggable
              onDragStart={(event) => onDragStart(event, nodeType.type)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '16px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                cursor: 'grab',
                backgroundColor: 'white',
                transition: 'all 0.2s ease',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#3b82f6';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
              }}
            >
              {/* Node Icon */}
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  backgroundColor: nodeType.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '8px',
                }}
              >
                <IconComponent size={20} color="#065f46" />
              </div>
              
              {/* Node Label */}
              <div style={{ 
                fontSize: '14px', 
                fontWeight: '500',
                color: '#374151',
                marginBottom: '4px'
              }}>
                {nodeType.label}
              </div>
              
              {/* Node Description */}
              <div style={{ 
                fontSize: '12px', 
                color: '#6b7280',
                textAlign: 'center'
              }}>
                {nodeType.description}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Instructions */}
      <div style={{
        marginTop: '24px',
        padding: '12px',
        backgroundColor: '#f8fafc',
        borderRadius: '6px',
        border: '1px solid #e2e8f0'
      }}>
        <p style={{ 
          fontSize: '12px', 
          color: '#6b7280',
          lineHeight: '1.4'
        }}>
          💡 Drag and drop nodes onto the canvas to build your chatbot flow
        </p>
      </div>
    </div>
  );
};
