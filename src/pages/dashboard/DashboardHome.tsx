import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import NotesList from "../../components/NotesList";

const DashboardHome = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div className="min-h-screen w-full flex lg:bg-slate-50 bg-white">
      <div className="flex-grow flex p-5 gap-x-5 w-full">
        {/* sidebar */}
        <Sidebar setShowModal={setShowModal} />

        {/* note list */}
        <NotesList showModal={showModal} setShowModal={setShowModal} />
      </div>
    </div>
  );
};

export default DashboardHome;
