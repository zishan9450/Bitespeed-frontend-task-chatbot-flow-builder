# BiteSpeed Chatbot Flow Builder - Demo Guide

## 🎯 Application Overview

This is a fully functional chatbot flow builder built with React, TypeScript, and React Flow. The application allows users to create conversation flows by dragging and dropping message nodes and connecting them.

## 🚀 Key Features Implemented

### ✅ Text Node
- **Custom Node Component**: Created with source and target handles
- **Visual Design**: Matches the mockup with green header and message content
- **Handles**: Target handle (top) accepts multiple connections, source handle (bottom) allows one connection

### ✅ Nodes Panel
- **Extensible Design**: Easy to add new node types
- **Drag & Drop**: Drag message nodes from panel to canvas
- **Visual Feedback**: Hover effects and intuitive UI

### ✅ Settings Panel  
- **Node Editing**: Click on a node to edit its text content
- **Real-time Updates**: Changes reflect immediately on the canvas
- **Back Navigation**: Arrow button to return to nodes panel

### ✅ Edge Connections
- **Visual Connections**: Connect nodes by dragging from source to target handles
- **Validation**: Source handles can only have one outgoing connection
- **Visual Feedback**: Hover effects and selection states

### ✅ Save Functionality
- **Flow Validation**: Ensures proper flow structure before saving
- **Error Handling**: Clear error messages for invalid flows
- **Success Feedback**: Confirmation when flow is saved successfully

## 🎮 How to Use

### 1. Adding Nodes
1. Look at the **Nodes Panel** on the right side
2. **Drag** the "Message" node from the panel
3. **Drop** it anywhere on the canvas
4. Repeat to add multiple nodes

### 2. Editing Node Content
1. **Click** on any node to select it
2. The **Settings Panel** will appear on the right
3. **Edit** the text in the textarea
4. Changes save automatically
5. Click the **back arrow** to return to the nodes panel

### 3. Connecting Nodes
1. **Click and drag** from the bottom handle (source) of a node
2. **Drop** the connection on the top handle (target) of another node
3. The connection will be created with a visual line

### 4. Saving the Flow
1. Click the **"Save Changes"** button in the header
2. The system validates the flow:
   - ✅ Valid: At most one node has no incoming connections
   - ❌ Invalid: Multiple nodes with no incoming connections
3. Success or error message will be displayed

## 🔧 Technical Implementation

### Architecture
```
src/
├── components/
│   ├── TextNode.tsx          # Custom message node
│   ├── NodesPanel.tsx        # Drag source panel
│   ├── SettingsPanel.tsx     # Node editor
│   └── FlowBuilderHeader.tsx # Header with save button
├── utils/
│   └── flowValidation.ts     # Flow validation logic
└── App.tsx                   # Main application
```

### Key Technologies
- **React 18** with TypeScript
- **React Flow** for the flow builder
- **Lucide React** for icons
- **Vite** for build tooling

### Validation Rules
- **Source Handle**: Can only have ONE outgoing connection
- **Target Handle**: Can accept MULTIPLE incoming connections  
- **Flow Rule**: At most ONE node can have no incoming connections (start node)

## 🎨 Design Features

### Visual Elements
- **Modern UI**: Clean, professional design
- **Responsive Layout**: Works on different screen sizes
- **Smooth Animations**: Node creation and interaction feedback
- **Consistent Colors**: Blue theme with green accent for message nodes

### User Experience
- **Intuitive Drag & Drop**: Familiar interaction patterns
- **Visual Feedback**: Hover states, selection indicators
- **Error Handling**: Clear, actionable error messages
- **Accessibility**: Keyboard navigation and focus indicators

## 🚀 Deployment

The application is configured for deployment on Vercel:
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **SPA Routing**: Configured for single-page application

## 🔮 Extensibility

### Adding New Node Types
The architecture makes it easy to add new node types:

1. **Create Node Component**:
```typescript
export const ImageNode: React.FC<NodeProps> = ({ data }) => {
  return (
    <div>
      <Handle type="target" position={Position.Top} />
      {/* Custom content */}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};
```

2. **Register Node Type**:
```typescript
const nodeTypes: NodeTypes = {
  textNode: TextNode,
  imageNode: ImageNode, // Add new type
};
```

3. **Add to Panel**:
```typescript
const nodeTypes = [
  { type: 'textNode', label: 'Message', ... },
  { type: 'imageNode', label: 'Image', ... }, // Add to panel
];
```

## ✨ Code Quality

### Best Practices
- **TypeScript**: Full type safety
- **Component Architecture**: Reusable, modular components
- **Performance**: Optimized re-renders with useCallback and useMemo
- **Code Documentation**: Comprehensive comments and JSDoc

### Error Handling
- **Validation**: Comprehensive flow validation
- **User Feedback**: Clear error messages
- **Graceful Degradation**: Handles edge cases smoothly

This implementation fully meets all the requirements and provides a solid foundation for future enhancements!
