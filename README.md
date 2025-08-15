# BiteSpeed Chatbot Flow Builder

A modern, extensible chatbot flow builder built with React, TypeScript, and React Flow. This application allows users to create chatbot conversation flows by dragging and dropping message nodes and connecting them together.

## 🚀 Live Demo

**[Deploy on Vercel](https://vercel.com/new/clone?repository-url=https://github.com/your-username/bitespeed-chatbot-flow-builder)**

*Note: Replace with your actual repository URL after pushing to GitHub*

## ✨ Features

### Core Functionality
- **Text Nodes**: Create and edit text message nodes for your chatbot
- **Visual Flow Builder**: Drag and drop interface powered by React Flow
- **Node Connections**: Connect nodes with edges to define conversation flow
- **Settings Panel**: Edit node content with a dedicated settings interface
- **Flow Validation**: Automatic validation ensures proper flow structure

### Technical Features
- **TypeScript**: Full type safety and better development experience
- **Extensible Architecture**: Easy to add new node types and features
- **Modern UI**: Clean, responsive design with smooth animations
- **Drag & Drop**: Intuitive node placement from the nodes panel
- **Real-time Updates**: Live editing with immediate visual feedback

## 🎯 Flow Rules

1. **Source Handles**: Each node's source handle can only have **one** outgoing connection
2. **Target Handles**: Each node's target handle can accept **multiple** incoming connections
3. **Flow Validation**: When saving, at most **one** node can have no incoming connections (the start node)

## 🛠️ Technical Stack

- **Frontend**: React 18 with TypeScript
- **Flow Engine**: React Flow v11
- **Build Tool**: Vite
- **Styling**: CSS-in-JS with custom styling
- **Icons**: Lucide React
- **Deployment**: Vercel

## 🏗️ Project Structure

```
src/
├── components/
│   ├── TextNode.tsx          # Custom text message node component
│   ├── NodesPanel.tsx        # Draggable nodes panel
│   ├── SettingsPanel.tsx     # Node editing interface
│   └── FlowBuilderHeader.tsx # Header with save functionality
├── utils/
│   └── flowValidation.ts     # Flow validation logic
├── App.tsx                   # Main application component
├── main.tsx                  # Application entry point
└── index.css                 # Global styles and React Flow customizations
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/bitespeed-chatbot-flow-builder.git
   cd bitespeed-chatbot-flow-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

### Building for Production

```bash
npm run build
npm run preview
```

## 🎮 How to Use

### Creating Nodes
1. **Drag and Drop**: Drag a "Message" node from the Nodes Panel onto the canvas
2. **Position**: Place the node wherever you want in the flow
3. **Multiple Nodes**: Add as many nodes as needed for your conversation flow

### Editing Nodes
1. **Select**: Click on any node to select it
2. **Edit**: The Settings Panel will appear on the right
3. **Update Text**: Modify the message content in the text area
4. **Auto-save**: Changes are saved automatically as you type

### Connecting Nodes
1. **Source Handle**: Click and drag from the bottom handle of a node (source)
2. **Target Handle**: Drop the connection onto the top handle of another node (target)
3. **Validation**: Source handles can only have one outgoing connection

### Saving the Flow
1. **Save Button**: Click "Save Changes" in the header
2. **Validation**: The system will check for proper flow structure
3. **Error Handling**: Any validation errors will be displayed clearly

## 🔧 Extensibility

The application is designed to be easily extensible:

### Adding New Node Types

1. **Create the Node Component**
   ```typescript
   // src/components/CustomNode.tsx
   export const CustomNode: React.FC<NodeProps> = ({ data }) => {
     return (
       <div>
         <Handle type="target" position={Position.Top} />
         {/* Your custom node content */}
         <Handle type="source" position={Position.Bottom} />
       </div>
     );
   };
   ```

2. **Register the Node Type**
   ```typescript
   // src/App.tsx
   const nodeTypes: NodeTypes = {
     textNode: TextNode,
     customNode: CustomNode, // Add your new node type
   };
   ```

3. **Add to Nodes Panel**
   ```typescript
   // src/components/NodesPanel.tsx
   const nodeTypes = [
     // ... existing nodes
     {
       type: 'customNode',
       label: 'Custom',
       icon: YourIcon,
       description: 'Your custom node',
       color: '#your-color',
     },
   ];
   ```

### Adding New Features

- **Validation Rules**: Extend `src/utils/flowValidation.ts`
- **UI Components**: Add new components in `src/components/`
- **Styling**: Customize `src/index.css` or component styles

## 🐛 Error Handling

The application includes comprehensive error handling:

- **Connection Validation**: Prevents invalid connections
- **Flow Validation**: Ensures proper flow structure before saving
- **User Feedback**: Clear error messages and visual indicators
- **Graceful Degradation**: Handles edge cases smoothly

## 🎨 Design Decisions

### Architecture
- **Component-based**: Modular, reusable components
- **Type Safety**: Full TypeScript implementation
- **Separation of Concerns**: Clear separation between UI and logic

### User Experience
- **Intuitive Interface**: Familiar drag-and-drop interactions
- **Visual Feedback**: Hover effects, animations, and state indicators
- **Responsive Design**: Works across different screen sizes
- **Accessibility**: Keyboard navigation and screen reader support

### Performance
- **Optimized Rendering**: React Flow's built-in optimizations
- **Efficient Updates**: Minimal re-renders with proper state management
- **Lazy Loading**: Components loaded as needed

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

**Built with ❤️ for BiteSpeed Frontend Task**
