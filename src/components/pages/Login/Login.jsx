import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FcGoogle } from "react-icons/Fc";

const Login = () => {
  const { signIn, googleLogin } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const notify = () => toast.success("Login Successfully!");
  const notifyGoogle = (e) => toast.success(e);
  const notifyGoogleError = (e) => toast.error(e);
  const notifyError = () => toast.error("Email or Password is invalid!");

  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const email = form.get("email");
    const password = form.get("password");

    signIn(email, password)
      .then((res) => {
        console.log(res.user);
        notify();
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        console.error(error);
        notifyError();
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((res) => {
        notify();
        notifyGoogle(res.user.displayName);
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => notifyGoogleError(error.message));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 ">
      <div className="max-w-md w-full bg-[#1A202C] p-8 rounded-lg shadow-2xl border border-[#243E51] mt-20 mb-10">
        <form onSubmit={handleLogin} className="space-y-6">
          <h5 className="text-2xl font-bold text-center text-[#89A3B6] mb-8">
            Sign in to Samvaada
          </h5>
          
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-[#89A3B6]">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full p-3 bg-[#243E51] text-[#89A3B6] placeholder-[#89A3B6] focus:outline-none focus:ring-2 focus:ring-[#496980]"
                placeholder="name@nmamit.in"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-[#89A3B6]">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="input input-bordered w-full p-3 bg-[#243E51] text-[#89A3B6] placeholder-[#89A3B6] focus:outline-none focus:ring-2 focus:ring-[#496980]"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="checkbox checkbox-sm checkbox-primary"
              />
              <label className="ml-2 text-sm text-[#89A3B6]">Remember me</label>
            </div>
            <a href="#" className="text-sm text-blue-400 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="btn w-full bg-gradient-to-br from-[#496980] to-[#5C7B92] text-white hover:bg-gradient-to-bl transition-all duration-300"
          >
            Sign in
          </button>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="btn w-full bg-white hover:bg-gray-50 text-gray-800 flex items-center justify-center gap-2 mt-4"
          >
            <FcGoogle className="text-2xl" />
            <span>Sign in with Google</span>
          </button>

          <p className="text-sm text-center text-[#89A3B6]">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-400 hover:underline">
              Create one
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
