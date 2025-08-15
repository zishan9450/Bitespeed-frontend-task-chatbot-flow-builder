import React, { useState, useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  BackgroundVariant,
  NodeTypes,
  ConnectionMode,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { FlowBuilderHeader } from './components/FlowBuilderHeader';
import { NodesPanel } from './components/NodesPanel';
import { SettingsPanel } from './components/SettingsPanel';
import { TextNode } from './components/TextNode';
import { validateFlow } from './utils/flowValidation';

// Define the custom node types
const nodeTypes: NodeTypes = {
  textNode: TextNode,
};

// Initial empty state
const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Get the selected node data
  const selectedNode = useMemo(() => {
    return nodes.find((node: Node) => node.id === selectedNodeId);
  }, [nodes, selectedNodeId]);

  /**
   * Handle connection between nodes
   * Validates that source handles can only have one outgoing edge
   */
  const onConnect = useCallback(
    (params: Connection) => {
      // Check if source handle already has an edge
      const sourceHasEdge = edges.some(
        (edge: Edge) => edge.source === params.source && edge.sourceHandle === params.sourceHandle
      );

      if (sourceHasEdge) {
        setErrorMessage('A source handle can only have one outgoing connection.');
        setTimeout(() => setErrorMessage(''), 3000);
        return;
      }

      setEdges((eds: Edge[]) => addEdge(params, eds));
      setErrorMessage('');
    },
    [edges, setEdges]
  );

  /**
   * Handle node selection
   * Updates the selected node state for the settings panel
   */
  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNodeId(node.id);
  }, []);

  /**
   * Handle clicks on empty canvas
   * Deselects any selected node
   */
  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, []);

  /**
   * Add a new node to the flow
   * Called when dragging from the nodes panel
   */
  const addNode = useCallback(
    (type: string, position: { x: number; y: number }) => {
      const id = `${type}_${Date.now()}`;
      const newNode: Node = {
        id,
        type,
        position,
        data: {
          label: type === 'textNode' ? 'text message' : 'New Node',
        },
      };

      setNodes((nds: Node[]) => [...nds, newNode]);
    },
    [setNodes]
  );

  /**
   * Handle drag over event for the canvas
   * Allows dropping of nodes from the panel
   */
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  /**
   * Handle drop event for the canvas
   * Creates a new node at the drop position
   */
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = event.currentTarget.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      if (!type) {
        return;
      }

      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      addNode(type, position);
    },
    [addNode]
  );

  /**
   * Update node data
   * Used by the settings panel to update node content
   */
  const updateNodeData = useCallback(
    (nodeId: string, data: Record<string, any>) => {
      setNodes((nds: Node[]) =>
        nds.map((node: Node) =>
          node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node
        )
      );
    },
    [setNodes]
  );

  /**
   * Save the flow
   * Validates that all nodes (except one) have incoming connections
   */
  const handleSave = useCallback(() => {
    const validation = validateFlow(nodes, edges);
    
    if (!validation.isValid) {
      setErrorMessage(validation.errorMessage);
      setTimeout(() => setErrorMessage(''), 5000);
      return;
    }

    setErrorMessage('');
    console.log('Flow saved successfully!', { nodes, edges });
    alert('Flow saved successfully!');
  }, [nodes, edges]);

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header with Save button */}
      <FlowBuilderHeader onSave={handleSave} errorMessage={errorMessage} />
      
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Main flow canvas */}
        <div style={{ flex: 1 }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            connectionMode={ConnectionMode.Loose}
            fitView
          >
            <Controls />
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          </ReactFlow>
        </div>

        {/* Right sidebar - Nodes Panel or Settings Panel */}
        <div style={{ width: '300px', borderLeft: '1px solid #e2e8f0', background: 'white' }}>
          {selectedNode ? (
            <SettingsPanel
              node={selectedNode}
              onUpdateNode={updateNodeData}
              onDeselect={() => setSelectedNodeId(null)}
            />
          ) : (
            <NodesPanel />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
