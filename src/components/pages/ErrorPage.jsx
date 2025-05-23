import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://storage.googleapis.com/pai-images/15b6c469f0ff478bbaf430923923b35a.jpeg)",
        }}
      >
        <div className="hero-overlay bg-[#243E51] bg-opacity-60"></div>
        <div className="hero-content text-center text-[#89A3B6]">
          <div className="max-w-md">
            <h1 className="mb-5 text-9xl font-bold">404</h1>
            <h2 className="mb-5 text-2xl font-bold">Page Not Found</h2>
            <p className="mb-5">
              The page does not exist or is not available. Check that the
              address is correct.
            </p>
            <Link
              to="/"
              className="text-white btn w-full mt-2 bg-gradient-to-br from-[#496980] to-[#5C7B92] hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-[#38576D] font-medium rounded-lg text-md px-5 py-3.5 text-center mr-2 mb-2"
            >
              Back To Home Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
