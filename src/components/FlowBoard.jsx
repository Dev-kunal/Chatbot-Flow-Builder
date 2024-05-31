import { useCallback, useState, useEffect, useRef } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
} from "reactflow";

import "reactflow/dist/style.css";
import CustomNode from "./CustomNode";

const initialNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    type: "custom",
    data: { label: "1", value: "test message 1" },
  },
  {
    id: "2",
    position: { x: 0, y: 100 },
    type: "custom",
    data: { label: "2", value: "test message 2" },
  },
];

const nodeTypes = {
  custom: CustomNode,
};

let id = 0;
const getId = () => `node_${id++}`;
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export default function FlowBoard({
  setShowSettings,
  selectedNode,
  setSelectedNode,
  message,
}) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const reactFlowWrapper = useRef(null);
  //   const [error, setError] = useState(false);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type: "custom",
        position,
        data: { label: `${type} node`, value: "text node" },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  useEffect(() => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === selectedNode?.id) {
          node.data = {
            ...node.data,
            value: message,
          };
        }

        return node;
      })
    );
  }, [message, setNodes]);

  // checking for more than one node with empty target
  function checkForNonEmptyTargetNode() {
    const allNodes = nodes.map((n) => n.id);
    const allEdgesTargets = edges.map((e) => e.target);
    const difference = allNodes.filter((n) => !allEdgesTargets.includes(n));
    if (difference.length > 1) setError(true);
    setTimeout(() => setError(false), 2000);
  }

  return (
    <>
      {/* <div className="bg-gray-200 flex justify-end p-2">
        {error && (
          <span className="p-2 bg-red-200 rounded-md">Cannot Save Flow</span>
        )}
        <button
          className="bg-transparent px-4 py-1 border font-medium rounded-md border-sky-600 text-sky-600"
          onClick={() => {
            checkForNonEmptyTargetNode();
          }}
        >
          Save Changes
        </button>
      </div> */}
      <ReactFlowProvider>
        <div ref={reactFlowWrapper} style={{ width: "100%", height: "100vh" }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onInit={setReactFlowInstance}
            nodeTypes={nodeTypes}
            fitView
            onNodeClick={(e, node) => {
              setShowSettings(true);
              setSelectedNode(node);
            }}
          />
        </div>
      </ReactFlowProvider>
    </>
  );
}
