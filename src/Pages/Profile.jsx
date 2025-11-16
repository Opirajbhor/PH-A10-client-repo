import React, { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaHome } from "react-icons/fa";
import { PiGooglePhotosLogoFill } from "react-icons/pi";
import { Pencil } from "lucide-react";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth } from "../Firebase/config.firebase";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";

const Profile = () => {
  const navigate = useNavigate();

  const [showBtn, setShowBtn] = useState('')
  const [currentUser, setCurrentUser] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
  }, []);
  const { displayName, email, photoURL, phoneNumber, emailVerified } =
    currentUser;

  const handleUserUpdate = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const photo = event.target.photo.value;
    updateProfile(auth.currentUser, {
      displayName: name?name:displayName,
      photoURL: photo?photo:photoURL,
    })
      .then((res) => navigate('/profile'))
      .catch((error) => toast.error("Update Error", error));
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-8 space-y-8">
      <div>
        <Toaster />
      </div>
      {/* Profile Section */}
      <section className="border mx-auto rounded-lg p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl text-left font-semibold mb-4">Profile</h2>

          {/* The button to open modal */}
          <label htmlFor="my_modal_6" className="btn hover:bg-green-300">
            <Pencil size={14} />
            Edit
          </label>

          <input type="checkbox" id="my_modal_6" className="modal-toggle" />
          <div className="modal" role="dialog">
            <div className="modal-box">
              {/* modal content */}
              <form  onSubmit={handleUserUpdate}>
                <div className="min-h-[300px] flex items-center justify-center bg-gray-50">
                  <div className="w-full max-w-sm bg-white shadow-lg rounded-2xl p-6">
                    {/* Full Name */}
                    <div className="mb-4">
                      <label className="text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <div className="relative mt-1">
                        <input
                          name="name"
                          type="text"
                          placeholder="Your Name"
                          className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        />
                        <FaUser className="absolute left-3 top-3 text-gray-400" />
                      </div>
                    </div>

                    {/* Email Address */}
                    <div className="mb-4">
                      <label className="text-sm font-medium text-gray-700">
                        Photo URL
                      </label>
                      <div className="relative mt-1">
                        <input
                          name="photo"
                          type="text"
                          placeholder="your photo url"
                          className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        />
                        <PiGooglePhotosLogoFill className="absolute left-3 top-3 text-gray-400" />
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="space-y-3">
                      <button className={`w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition cursor-pointer `}>
                        Update Profile
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <div className="modal-action">
                <label htmlFor="my_modal_6" className="btn">
                  Close!
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex my-10 flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={photoURL}
              alt="profile"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg font-bold">{displayName}</h3>
              <p className="text-gray-600">Register User</p>
            </div>
            {/* info */}
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500">Email address</p>
            <p className="font-semibold text-green-600">{email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-semibold">
              {phoneNumber ? phoneNumber : "not available"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">E-mail Verified Status</p>
            <p className="font-semibold">
              {emailVerified ? "Varified" : "Not Varified"}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
