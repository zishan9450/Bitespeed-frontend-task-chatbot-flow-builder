import { Node, Edge } from '@xyflow/react';

export interface FlowValidationResult {
  isValid: boolean;
  errorMessage: string;
}

/**
 * Validates the chatbot flow according to the requirements
 * 
 * Rules:
 * 1. If there are more than one nodes, more than one node cannot have empty target handles
 * 2. In other words: at most one node can have no incoming connections (the start node)
 * 
 * @param nodes - Array of flow nodes
 * @param edges - Array of flow edges
 * @returns Validation result with success status and error message
 */
export const validateFlow = (nodes: Node[], edges: Edge[]): FlowValidationResult => {
  // If there's only one node or no nodes, it's always valid
  if (nodes.length <= 1) {
    return {
      isValid: true,
      errorMessage: '',
    };
  }

  // Find nodes that have no incoming connections (empty target handles)
  const nodesWithoutIncomingConnections = nodes.filter(node => {
    return !edges.some(edge => edge.target === node.id);
  });

  // If more than one node has no incoming connections, it's invalid
  if (nodesWithoutIncomingConnections.length > 1) {
    const nodeIds = nodesWithoutIncomingConnections.map(node => node.id).join(', ');
    return {
      isValid: false,
      errorMessage: `Cannot save Flow: More than one node has empty target handles. Nodes without incoming connections: ${nodeIds}`,
    };
  }

  // Flow is valid
  return {
    isValid: true,
    errorMessage: '',
  };
};

/**
 * Gets statistics about the flow
 * Useful for debugging and monitoring
 */
export const getFlowStats = (nodes: Node[], edges: Edge[]) => {
  const nodesWithoutIncoming = nodes.filter(node => {
    return !edges.some(edge => edge.target === node.id);
  });

  const nodesWithoutOutgoing = nodes.filter(node => {
    return !edges.some(edge => edge.source === node.id);
  });

  return {
    totalNodes: nodes.length,
    totalEdges: edges.length,
    startNodes: nodesWithoutIncoming.length,
    endNodes: nodesWithoutOutgoing.length,
    startNodeIds: nodesWithoutIncoming.map(node => node.id),
    endNodeIds: nodesWithoutOutgoing.map(node => node.id),
  };
};
