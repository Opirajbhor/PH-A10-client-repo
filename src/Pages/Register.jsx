import React from "react";
import { Link, useNavigate } from "react-router";
import { auth, googleProvider } from "../Firebase/config.firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
// import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();

  // sign up with google
  const googleSignUp = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        console.log(res);
        navigate("/");
      })

      .catch((error) => console.log(error));
  };
  //   sign up with email and password
  const regex = /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d!@#$%^&*]{6,}$/;
  const signUp = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const image = event.target.image.value;
    const password = event.target.password.value;
    if (!regex.test(password)) {
      return console.error(
        "Password must be at least 6 characters with upper & lower case"
      );
    } else {
      createUserWithEmailAndPassword(auth, email, password).then((res) => {
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: image,
        })
          .then(() => navigate("/"))
        //   .catch(() => toast.error("update error"));
      });
    }
  };

  return (
    <div>
      <div className=" bg-base-200 p-20">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl mb-5 font-bold">Create an account now!</h1>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <form onSubmit={signUp} className="fieldset">
                {/* name */}
                <label className="label">Your Name</label>
                <input
                  type="text"
                  className="input"
                  placeholder="your full name"
                  name="name"
                />
                {/* email */}
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input"
                  placeholder="your Email"
                  name="email"
                />
                {/* Photo URL */}
                <label className="label">Photo URL</label>
                <input
                  type="text"
                  className="input"
                  placeholder="your photo url"
                  name="image"
                />

                <label className="label">Password</label>
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  name="password"
                />
                <div>
                  Already have an account?{" "}
                  <Link to="/login" className="text-green-500 font-bold my-2">
                    Login Here
                  </Link>
                </div>
                <button className="btn bg-green-700 mt-4">Signup</button>
              </form>

              {/* Google */}
              <button
                onClick={googleSignUp}
                className="btn bg-white text-black border-[#e5e5e5]"
              >
                <svg
                  aria-label="Google logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <path d="m0 0H512V512H0" fill="#fff"></path>
                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                    ></path>
                    <path
                      fill="#4285f4"
                      d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                    ></path>
                    <path
                      fill="#fbbc02"
                      d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                    ></path>
                    <path
                      fill="#ea4335"
                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                    ></path>
                  </g>
                </svg>
                Signup with Google
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <Toaster></Toaster> */}
    </div>
  );
};

export default Register;
