import { FC, useEffect, useState } from "react";
import { MdPostAdd } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { FiMenu } from "react-icons/fi";
import { FcOpenedFolder, FcHome } from "react-icons/fc";
import { Tooltip, Dropdown } from "flowbite-react";
import AddNote from "./AddNote";
// import NoteItem from "./NoteItem";
import { useNotesContext } from "../hooks/useNotesContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { Link } from "react-router-dom";
import { getNotes } from "../lib/client";

interface NotesListProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

const NotesList: FC<NotesListProps> = ({ showModal, setShowModal }) => {
  const { state, dispatch } = useNotesContext();
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  //   const [error, setError] = useState<string | null>("");

  const notes = state;

  interface Note {
    _id: string;
    title: string;
    label: string;
    body: string;
    user_id: string;
    error?: string;
  }

  useEffect(() => {
    const fetchNotes = async () => {
      if (!user || !("token" in user)) {
        // setError("You must be logged in");
        return;
      }

      const token = user.token as string;
      setIsLoading(true);

      try {
        const getPromise = getNotes(token);

        getPromise.then((data: Note) => {
          if (data.error) {
            // setError(data.error);
            console.log(data.error);
          } else if (!data.error) {
            dispatch({ type: "SET_NOTES", payload: data });
            setIsLoading(false);
          }
        });
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false);
    };

    if (user) {
      fetchNotes();
    }
  }, [dispatch, user]);

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {Array.isArray(notes) && !isLoading && notes.length > 0 ? (
        <div className="lg:w-4/5 w-full p-2 lg:p-5 flex flex-col">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <FcOpenedFolder size={25} />
              <h1 className="text-md lg:text-lg font-bold tracking-wider">
                take<span className="text-amber-400">Note</span>
              </h1>
            </div>

            <div className="flex lg:hidden">
              <FcOpenedFolder size={25} onClick={() => setShowModal(true)} />
            </div>

            <h1 className="text-md lg:text-2xl font-semibold text-gray-500">
              {user && <p className="text-black">hi, {user?.username}</p>}
            </h1>

            <div className="md:hidden flex">
              <Dropdown
                arrowIcon={false}
                inline={true}
                label={<FiMenu size={25} />}
              >
                <Dropdown.Header
                  className="flex items-center gap-x-2"
                  onClick={() => setShowModal(true)}
                >
                  <MdPostAdd size={25} />
                  <p>Add note</p>
                </Dropdown.Header>
                <Link to="/">
                  <Dropdown.Item className="flex items-center gap-x-2">
                    <FcHome size={25} />
                    <p>Home</p>
                  </Dropdown.Item>
                </Link>
                <Dropdown.Item
                  className="flex items-center gap-x-2"
                  onClick={handleLogout}
                >
                  <LuLogOut size={20} color="red" />
                  <p>Logout</p>
                </Dropdown.Item>
              </Dropdown>
            </div>
          </div>

          <div className="mt-5 grid lg:grid-cols-4 grid-cols-2 gap-3">
            {/* {notes &&
              notes.map((note) => <NoteItem key={note._id} note={note} />)} */}
          </div>
        </div>
      ) : Array.isArray(notes) && notes.length === 0 ? (
        <div className="lg:w-4/5 w-full p-2 lg:p-5 bg-white rounded-xl border-2 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex lg:hidden">
              <FcOpenedFolder size={25} onClick={() => setShowModal(true)} />
            </div>

            <div className="md:hidden flex">
              <Dropdown
                arrowIcon={false}
                inline={true}
                label={<FiMenu size={25} />}
              >
                <Dropdown.Header
                  className="flex items-center gap-x-2"
                  onClick={() => setShowModal(true)}
                >
                  <MdPostAdd size={25} />
                  <p>Add note</p>
                </Dropdown.Header>
                <Link to="/">
                  <Dropdown.Item className="flex items-center gap-x-2">
                    <FcHome size={25} />
                    <p>Home</p>
                  </Dropdown.Item>
                </Link>
                <Dropdown.Item
                  className="flex items-center gap-x-2"
                  onClick={handleLogout}
                >
                  <LuLogOut size={20} color="red" />
                  <p>Logout</p>
                </Dropdown.Item>
              </Dropdown>
            </div>
          </div>
          <div className="flex justify-center items-center h-full">
            <div className="flex flex-col">
              <img
                src="/assets/man_sitting.png"
                alt="welcome"
                className="h-[250px] lg:h-[300px] w-[250px] lg:w-[300px]"
              />

              <h1 className="text-center text-lg font-semibold">
                It's a bit lonely in here😅, take a{" "}
                <span
                  className="text-blue-500 underline underline-offset-4 cursor-pointer"
                  onClick={() => setShowModal(true)}
                >
                  {" "}
                  note
                </span>
              </h1>
            </div>
          </div>

          <div className="mt-5 flex justify-center">
            <div className="flex flex-col">
              <div className="flex items-center gap-x-2">
                <h1 className="font-bold text-xl lg:text-3xl">
                  <span className="text-amber-400">Create.</span> Organize.
                  Remember
                </h1>

                <img
                  src="/assets/dart.png"
                  alt="dart"
                  className="h-5 lg:h-10"
                />
              </div>

              <div className="flex flex-col lg:flex-row gap-5 items-center">
                <div className="p-3 lg:p-5 bg-slate-100 rounded-xl shadow-lg mt-5 w-80">
                  <h1 className="text-lime-600 font-semibold text-sm lg:text-lg">
                    #ideas
                  </h1>

                  <div className="mt-3 flex flex-col gap-y-1 font-medium lg:font-semibold text-sm">
                    <p>Set up your to-do list</p>
                    <p>Meeting brief</p>
                    <p>Create a project plan</p>
                    <p>Grocery list</p>
                  </div>
                </div>

                <div className="">
                  <div className="">
                    <Tooltip content="add a new note">
                      <FcOpenedFolder
                        size={120}
                        onClick={() => setShowModal(true)}
                      />
                    </Tooltip>

                    <p className="font-semibold text-sm lg:text-base">
                      what's on your mind? put it here...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="lg:w-4/5 w-full h-full p-2 lg:p-5 flex flex-col">
          <div className="flex justify-center items-center h-full">
            <div className="flex flex-col gap-y-3">
              <img
                src="/assets/loading.png"
                alt="loading"
                className="h-64 w-64"
              />
              <p className="text-center text-lg font-semibold">
                hang on tight...😁
              </p>
            </div>
          </div>
        </div>
      )}
      <AddNote showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default NotesList;
