import { useState, FormEvent, FC } from "react";
// import { Tooltip } from "flowbite-react";
import { useNotesContext } from "../hooks/useNotesContext";
import { FaTrashAlt } from "react-icons/fa";
import { useAuthContext } from "../hooks/useAuthContext";
import { createNote } from "../lib/client";
import toast from "react-hot-toast";

interface AddNoteProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

const AddNote: FC<AddNoteProps> = ({ showModal, setShowModal }) => {
  const { dispatch } = useNotesContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState<string>("");
  const [label, setLabel] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [emptyFields, setEmptyFields] = useState<string[]>([]);

  // create a note
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!user || !("token" in user)) {
      setError("You must be logged in");
      return;
    }

    setIsLoading(true);

    const note = { title, label, body };
    const token = user.token as string;

    try {
      const addPromise = createNote(note, token);

      toast.promise(addPromise, {
        loading: "Creating note...",
        success: <b>Note created successfully</b>,
        error: <b>Could not create note</b>,
      });

      addPromise.then((json) => {
        if (json.error) {
          setError(json.error);
          setEmptyFields(json.emptyFields);
          setIsLoading(false);
        }

        if (!json.error) {
          setTitle("");
          setLabel("");
          setBody("");
          setError(null);
          setEmptyFields([]);
          console.log("new note created", json);
          dispatch({ type: "CREATE_NOTE", payload: json });
          setIsLoading(false);
          setShowModal(false);
        }
      });
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setShowModal(false)}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                {!isLoading ? (
                  <form
                    className="flex flex-col p-3 lg:p-5"
                    onSubmit={handleSubmit}
                  >
                    <h1 className="text-lg lg:text-2xl font-semibold mb-5">
                      Create a note...
                    </h1>

                    <div className="flex flex-col">
                      {error && (
                        <div className="text-sm text-red-500">{error}</div>
                      )}

                      <label>Title</label>
                      <div className="flex items-center gap-x-1">
                        {/* <div className="text-3xl">🎙</div> */}
                        <input
                          type="text"
                          placeholder="title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className={
                            emptyFields.includes("title")
                              ? "w-full bg-gray-200 mb-3 lg:mb-5 mt-2 p-2 lg:p-3 rounded-md border border-red-500 focus:ring-offset-4 focus:ring-2 focus:ring-red-500"
                              : "w-full bg-gray-200 mb-3 lg:mb-5 mt-2 p-2 lg:p-3 rounded-md border border-gray-200 focus:ring-offset-4 focus:ring-2"
                          }
                        />
                      </div>

                      <label>Label</label>
                      <input
                        type="text"
                        placeholder="label"
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                        className={
                          emptyFields.includes("label")
                            ? "w-full bg-gray-200 mb-3 lg:mb-5 mt-2 p-2 lg:p-3 rounded-md border border-red-500 focus:ring-offset-4 focus:ring-2 focus:ring-red-500"
                            : "w-full bg-gray-200 mb-3 lg:mb-5 mt-2 p-2 lg:p-3 rounded-md border border-gray-200 focus:ring-offset-4 focus:ring-2"
                        }
                      />

                      <label>Notes</label>
                      <textarea
                        rows={5}
                        placeholder="notes..."
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        className={
                          emptyFields.includes("body")
                            ? "w-full bg-gray-200 mb-3 lg:mb-5 mt-2 p-2 lg:p-3 rounded-md border border-red-500 focus:ring-offset-4 focus:ring-2 focus:ring-red-500"
                            : "w-full bg-gray-200 mb-3 lg:mb-5 mt-2 p-2 lg:p-3 rounded-md border border-gray-200 focus:ring-offset-4 focus:ring-2"
                        }
                      ></textarea>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <button className="bg-lime-600 py-1 px-4 rounded-lg text-white lg:font-semibold">
                        Save
                      </button>

                      <div className="cursor-pointer">
                        {/* <Tooltip content="cancel"> */}
                        <FaTrashAlt
                          size={20}
                          className="text-red-600"
                          onClick={() => setShowModal(false)}
                        />
                        {/* </Tooltip> */}
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="flex flex-col p-5">
                    <img src="/assets/loading.png" alt="loading" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default AddNote;
