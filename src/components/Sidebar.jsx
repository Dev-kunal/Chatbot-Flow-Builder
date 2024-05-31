import { useEffect, useState } from "react";

export default function Sidebar({
  showSettings,
  setShowSettings,
  message,
  setMessage,
}) {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside>
      {!showSettings ? (
        <div
          className="node input p-3 border-2 border-sky-600 rounded-md max-w-[10rem] flex justify-center items-center flex-col text-sky-600"
          onDragStart={(event) => onDragStart(event, "default")}
          draggable
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
            />
          </svg>

          <span> Message</span>
        </div>
      ) : (
        <div className="flex-col border-b-2">
          <div className="flex border-b-2 p-2">
            <button onClick={() => setShowSettings(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                />
              </svg>
            </button>

            <div className="w-full flex justify-center items-center">
              Message
            </div>
          </div>
          <div className="p-2">
            <div className="flex-col">
              <label htmlFor="nodeText">
                <div className="text-gray-400 text-sm py-2">Text</div>
                <textarea
                  className="border rounded border-1 p-2"
                  name="nodeText"
                  id="nodeText"
                  cols="35"
                  rows="3"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </label>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
