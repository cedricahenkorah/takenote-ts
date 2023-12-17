import { Outlet, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

const AuthLayout = () => {
  const navigate = useNavigate();

  const handleBack = (): void => {
    navigate("/");
  };

  return (
    <div className="min-h-screen w-full flex bg-slate-50">
      <div className="flex justify-center items-center w-full text-white px-5 lg:px-0">
        <div className="bg-white rounded-2xl shadow-lg text-black">
          <div className="px-10 lg:px-20 py-8 lg:py-10">
            <FaArrowLeft size={30} onClick={handleBack} />
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
