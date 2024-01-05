import Navbar from "../components/Navbar";

const HomePage = () => {
  return (
    <div className="bgimage min-h-screen">
      {/* navbar */}
      <Navbar />

      <div className="flex justify-center pt-20 lg:pt-8 xl:pt-24 px-5 lg:px-0">
        <div className="">
          <h1 className="font-bold text-xl lg:text-3xl xl:text-4xl mb-4 text-center">
            Take <span className="text-amber-400">Notes.</span> Stay Organized.
            Be Productive.
          </h1>

          <p className="text-center text-sm lg:text-base xl:text-lg">
            Never forget an idea again – capture, organize, and access your
            notes anytime, anywhere
          </p>

          <div className="pt-14 flex justify-center text-white">
            {/* <Link to="/signup">
              <div className="bg-black w-48 flex items-center justify-between py-3 px-6 rounded-lg">
                <p className="font-semibold tracking-wide">Get started</p>
                <BsArrowRightCircle />
              </div>
            </Link> */}
          </div>

          <div className="flex justify-center h-[350px] xl:h-[500px]">
            <img src="/assets/hero.png" alt="" className="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
