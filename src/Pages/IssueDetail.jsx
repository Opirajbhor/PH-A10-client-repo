import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useParams } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/config.firebase";
import toast, { Toaster } from "react-hot-toast";

const IssueDetail = () => {
  const location = useLocation();
  const serverLink = import.meta.env.VITE_SERVER_URL;

  const issue = location.state?.issue || {};
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
  }, []);

  if (!issue) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 text-xl">No issue data found!</p>
      </div>
    );
  }

  //   handleContribute button
  const handleContribute = async (e) => {
    e.preventDefault();
    const contributeData = {
      issueId: e.target._id.value,
      issueTitle: e.target.issueTitle.value,
      amount: e.target.amount.value,
      email: e.target.email.value,
      userName: e.target.name.value,
      address: e.target.address.value,
      date: e.target.date.value,
      image: e.target.image.value,
      additional: e.target.additional.value,
    };
    // send data to server then mongodb function
    try {
      const res = await axios.post(
        `${serverLink}/contribution`,
        contributeData
      );

      toast.success("Successfully Added!");
    } catch (error) {
      toast.error("Error to Contribute!");
    }
    e.target.reset();
    document.getElementById("my_modal_3").close();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Issue Card */}
      <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
        <h1 className="text-2xl font-bold text-green-700 mb-4">
          {issue.issueTitle}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-gray-700">
          <p>
            <span className="font-semibold">Category:</span> {issue.category}
          </p>
          <p>
            <span className="font-semibold">Status:</span>{" "}
            <span
              className={`font-bold ${
                issue.status === "ongoing" ? "text-green-600" : "text-gray-500"
              }`}
            >
              {issue.status}
            </span>
          </p>
          <p>
            <span className="font-semibold">Location:</span> {issue.location}
          </p>
          <p>
            <span className="font-semibold">Date:</span> {issue.date}
          </p>
          <p>
            <span className="font-semibold">Reported by:</span> {issue.email}
          </p>
          <p>
            <span className="font-semibold">Amount:</span> ৳{issue.amount}
          </p>
        </div>

        {/* Image */}
        {issue.image ? (
          <img
            src={issue.image}
            alt={issue.issueTitle}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
        ) : (
          <div className="w-full h-64 flex items-center justify-center bg-gray-100 rounded-lg mb-4 text-gray-400">
            No Image Provided
          </div>
        )}

        {/* Description */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h2 className="font-semibold text-lg mb-2">Description</h2>
          <p className="text-gray-700 whitespace-pre-line">
            {issue.description}
          </p>
        </div>
        {/* Contribute button */}
        <h3 className="my-5 font-bold">
          Want to Contribute for Clean-Up?{" "}
          <span className="text-green-600 font-bold">Pay here</span>
        </h3>
        <button
          className="btn bg-green-700 hover:bg-green-900"
          onClick={() => {
            document.getElementById("my_modal_3").showModal();
          }}
        >
          Contribute
        </button>
        {/* modal update */}
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>

            {issue && (
              <form
                onSubmit={handleContribute}
                className="min-h-[300px] flex items-center justify-center bg-gray-50"
              >
                <div className="w-full max-w-sm bg-white shadow-lg rounded-2xl p-6">
                  <h1 className="text-center text-2xl font-semibold mb-5">
                    Contribution Page
                  </h1>

                  {/* title */}
                  <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700">
                      Issue Title
                    </label>
                    <div className="relative mt-1">
                      <input
                        name="issueTitle"
                        readOnly
                        value={issue.issueTitle}
                        type="text"
                        className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  {/* amount */}
                  <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700">
                      Contribution Amount
                    </label>
                    <div className="relative mt-1">
                      <span className="absolute left-3 top-2.5">৳</span>
                      <input
                        required
                        name="amount"
                        type="text"
                        placeholder="Contribution Amount"
                        className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  {/* Contributor Email */}
                  <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700">
                      Contributor Email
                    </label>
                    <div className="relative mt-1">
                      <input
                        readOnly
                        name="email"
                        defaultValue={currentUser?.email}
                        type="text"
                        className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Contributor Name */}
                  <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700">
                      Contributor Name
                    </label>
                    <div className="relative mt-1">
                      <input
                        name="name"
                        readOnly
                        defaultValue={currentUser?.displayName}
                        type="text"
                        placeholder="New Title"
                        className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <div className="relative mt-1">
                      <input
                        required
                        name="address"
                        type="text"
                        placeholder="Your Address"
                        className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  {/* date */}
                  <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700">
                      Date
                    </label>
                    <div className="relative mt-1">
                      <input
                        readOnly
                        value={new Date().toLocaleDateString("en-UK")}
                        type="text"
                        name="date"
                        className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  {/* Image */}
                  <div className="mb-4">
                    <div className="relative mt-1">
                      <input
                        readOnly
                        name="image"
                        defaultValue={currentUser?.photoURL}
                        type="hidden"
                        className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <input type="hidden" name="_id" value={issue._id} />
                  {/* Additional info - (if needed) */}
                  <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700">
                      Additional info - (if needed)
                    </label>
                    <div className="relative mt-1">
                      <textarea
                        name="additional"
                        placeholder="Additional info - (if needed)"
                        className="w-full  border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      ></textarea>
                    </div>
                  </div>

                  {/* Contribute issue Buttons */}
                  <div className="space-y-3">
                    <button
                      className={`w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition cursor-pointer `}
                    >
                      Contribute
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </dialog>
      </div>
      <Toaster />
    </div>
  );
};
export default IssueDetail;
