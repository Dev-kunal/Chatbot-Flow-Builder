import { useCallback, useState, useEffect, useRef } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
} from "reactflow";

import "reactflow/dist/style.css";
import CustomNode from "./CustomNode";
import { useDispatch, useSelector } from "react-redux";
import {
  setError,
  setSelectedNode,
  setShowSettings,
  setMessageForSelectedNode,
} from "../app/appSlice";
import Sidebar from "./Sidebar";
import { Topbar } from "./Topbar";

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

export default function FlowBoard() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const reactFlowWrapper = useRef(null);
  const dispatch = useDispatch();
  const message = useSelector((state) => state.appState.messageForSelectedNode);
  const selectedNode = useSelector((state) => state.appState.selectedNode);

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
        data: { label: `node-${getId()}`, value: "text node" },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  // setting the message value in node
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
  }, [message, setNodes, selectedNode]);

  // updating the message of selected node in setting panel
  useEffect(() => {
    if (selectedNode)
      dispatch(
        setMessageForSelectedNode({ message: selectedNode?.data?.value })
      );
  }, [selectedNode, dispatch]);

  // checking for more than one node with empty target
  function checkForNonEmptyTargetNode() {
    const allNodes = nodes.map((n) => n.id);
    const allEdgesTargets = edges.map((e) => e.target);
    const difference = allNodes.filter((n) => !allEdgesTargets.includes(n));
    if (difference.length > 1) dispatch(setError({ value: true }));
    setTimeout(() => dispatch(setError({ value: false })), 2000);
  }

  return (
    <>
      <Topbar checkForNonEmptyTargetNode={checkForNonEmptyTargetNode} />
      <div className="grid grid-cols-5 gap-3">
        <div className="col-span-4">
          <div>
            <ReactFlowProvider>
              <div
                ref={reactFlowWrapper}
                style={{ width: "100%", height: "100vh" }}
              >
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
                    dispatch(setShowSettings({ value: true }));
                    dispatch(setSelectedNode({ node }));
                  }}
                />
              </div>
            </ReactFlowProvider>
          </div>
        </div>
        <div className="p-2 border-l-2">
          <Sidebar />
        </div>
      </div>
    </>
  );
}
