import { useSelector } from "react-redux";

export function Topbar({ checkForNonEmptyTargetNode }) {
  const error = useSelector((state) => state.appState.error);

  return (
    <>
      <div className="bg-gray-200 p-4 content-between flex">
        <div className="flex justify-items-end w-[50%] justify-end">
          {error && (
            <span className="p-2 bg-red-200 rounded-md text-sm">
              Cannot Save Flow
            </span>
          )}
        </div>

        <div className="flex justify-items-end w-[50%] justify-end">
          <button
            className="bg-transparent px-4 py-1 border font-medium rounded-md border-sky-600 text-sky-600"
            onClick={() => {
              checkForNonEmptyTargetNode();
            }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
}
