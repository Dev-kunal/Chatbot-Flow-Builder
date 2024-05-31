import { useState, useEffect } from "react";
import FlowBoard from "./components/FlowBoard";
import Sidebar from "./components/Sidebar";

export default function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [messageForSelectedNode, setMessageForSelectedNode] =
    useState("test message");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (selectedNode) setMessageForSelectedNode(selectedNode?.data?.value);
  }, [selectedNode]);

  return (
    <>
      <div className="bg-gray-200 flex justify-end p-2">
        {error && (
          <span className="p-2 bg-red-200 rounded-md">Cannot Save Flow</span>
        )}
        <button
          className="bg-transparent px-4 py-1 border font-medium rounded-md border-sky-600 text-sky-600"
          onClick={() => {
            // checkForNonEmptyTargetNode();
          }}
        >
          Save Changes
        </button>
      </div>
      <div className="grid grid-cols-5 gap-3">
        <div className="col-span-4">
          <div>
            <FlowBoard
              setSelectedNode={setSelectedNode}
              setShowSettings={setShowSettings}
              selectedNode={selectedNode}
              message={messageForSelectedNode}
            />
          </div>
        </div>
        <div className="p-2 border-l-2">
          <Sidebar
            showSettings={showSettings}
            setShowSettings={setShowSettings}
            selectedNode={selectedNode}
            message={messageForSelectedNode}
            setMessage={setMessageForSelectedNode}
          />
        </div>
      </div>
    </>
  );
}
