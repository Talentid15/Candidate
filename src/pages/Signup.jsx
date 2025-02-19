import React from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import logo from "../assets/logo.png";



const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function submitHandler(data) {
    console.log(data);
  }

  return (
    <div className="flex h-screen">
      <div className="w-full flex flex-col justify-center items-center bg-[#652D96]">
        <div className="w-full max-w-[30rem] p-8 bg-white rounded-lg">
          <div className="flex flex-col justify-center items-center text-center gap-3 mb-6">
                      <img src={logo} alt="TalentID Logo" width={200} height={200} />
          
                      <h2 className="text-3xl font-normal   mt-2 text-slate-700">
                        Candidate SignUp
                      </h2>
                     
                    </div>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="flex px-6 flex-col gap-4 mt-5"
          >
            {/* Name */}
            <div className="relative">
              <label className="text-gray-700 font-medium">Name</label>
              <div className="flex items-center border-2 border-gray-300 focus-within:border-indigo-500 rounded-md overflow-hidden">
                <span className="px-3 text-gray-500">
                  <FaUser />
                </span>
                <input
                  {...register("fullName", {
                    required: "Full Name is Required",
                  })}
                  className="w-full p-3 focus:outline-none"
                  placeholder="Enter your name"
                />
              </div>
              {errors.fullName && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="relative">
              <label className="text-gray-700 font-medium">Email</label>
              <div className="flex items-center border-2 border-gray-300 focus-within:border-indigo-500 rounded-md overflow-hidden">
                <span className="px-3 text-gray-500">
                  <FaEnvelope />
                </span>
                <input
                  {...register("email", { required: "Email is Required" })}
                  className="w-full p-3 focus:outline-none"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <label className="text-gray-700 font-medium">Create new Password</label>
              <div className="flex items-center border-2 border-gray-300 focus-within:border-indigo-500 rounded-md overflow-hidden">
                <span className="px-3 text-gray-500">
                  <FaLock />
                </span>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is Required",
                  })}
                  className="w-full p-3 focus:outline-none"
                  placeholder="Create new password"
                />
              </div>
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex justify-center items-center">
                            <button
                                type="submit"
                                className="bg-black w-1/2 hover:bg-gray-900 transition-all text-white text-lg rounded-full p-3 mt-4 shadow-md"
                            >
                               Create Account
                            </button>
                        </div>
          </form>
          <div className="flex flex-col items-center justify-between mt-4 gap-5">
            <p className="text-gray-600 text-center ">
              Already have an account?{" "}
              <span className="text-purple-600 font-semibold cursor-pointer hover:underline">
                {" "}
                <a href="/login">Log in</a>
              </span>
            </p>
            
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default Signup;
