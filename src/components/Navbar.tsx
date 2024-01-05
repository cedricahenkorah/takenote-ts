// import { FaAlignJustify } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between items-center px-5 lg:px-20 py-5">
      <div>
        <h1 className="font-bold text-xl">
          take<span className="text-amber-400">Note</span>
        </h1>
      </div>

      <div className="hidden lg:flex gap-x-5 xl:gap-x-16">
        <p>Home</p>
        <p>Features</p>
        <p>Support</p>
      </div>

      <div className="hidden lg:flex items-center gap-x-5 xl:gap-x-5">
        <Link to="/auth/login">
          <div className="cursor-pointer">
            <p className="font-semibold">Login</p>
          </div>
        </Link>

        <Link to="/signup">
          <div className="bg-black flex items-center text-white justify-between py-3 px-5 rounded-lg cursor-pointer">
            <p className="font-semibold">Create account</p>
          </div>
        </Link>
      </div>

      {/* dropdown */}
      {/* <div className="md:hidden flex">
        <Dropdown arrowIcon={false} inline={true} label={<FiMenu size={30} />}>
          <Link to="/login">
            <Dropdown.Header>Login</Dropdown.Header>
          </Link>
          <Link to="/signup">
            <Dropdown.Item>Create account</Dropdown.Item>
          </Link>
        </Dropdown>
      </div> */}
    </nav>
  );
};

export default Navbar;
