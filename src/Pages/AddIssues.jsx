import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../Firebase/config.firebase";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AddIssues = () => {
  const serverLink = import.meta.env.VITE_SERVER_URL;
  const [currentUser, setCurrentUser] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
  }, []);


  //   submit button
  const handleSubmit = async (e) => {
    e.preventDefault();
    const issueData = {
      issueTitle: e.target.issueTitle.value,
      category: e.target.category.value,
      location: e.target.location.value,
      description: e.target.description.value,
      amount: e.target.amount.value,
      image: e.target.image.value,
      status: e.target.status.value,
      date: e.target.date.value,
      email: currentUser.email,
    };
    // send data to server then mongodb function

    try {
      const res = await axios.post(`${serverLink}/allIssues`, issueData);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
    e.target.reset();
    toast.success("Successfully Added!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-5"
    >
      <h2 className="text-2xl text-green-600 font-bold text-center">
        Report an Issue
      </h2>

      {/* Issue Title */}
      <div>
        <label className="font-medium text-left">Issue Title</label>
        <input
          type="text"
          name="issueTitle"
          className="w-full border px-3 py-2 rounded-lg mt-1"
          placeholder="Enter Issue Title"
          required
        />
      </div>

      {/* Category */}
      <div>
        <label className="font-medium">Category</label>
        <select
          name="category"
          className="w-full border px-3 py-2 rounded-lg mt-1"
          required
        >
          <option value="">Select Category</option>
          <option value="Illegal Construction">Illegal Construction</option>
          <option value="Broken Public Property">Broken Public Property</option>
          <option value="Road Damage">Road Damage</option>
          <option value="Garbage Issue">Garbage Issue</option>
        </select>
      </div>

      {/* Location */}
      <div>
        <label className="font-medium">Location</label>
        <input
          type="text"
          name="location"
          className="w-full border px-3 py-2 rounded-lg mt-1"
          placeholder="Enter Location"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="font-medium">Description</label>
        <textarea
          name="description"
          className="w-full border px-3 py-2 rounded-lg mt-1"
          placeholder="Write details here..."
          rows="4"
          required
        ></textarea>
      </div>

      {/* Image */}
      <div>
        <label className="font-medium">Image Url</label>
        <input
          type="text"
          name="image"
          className="w-full border px-3 py-2 rounded-lg mt-1"
        />
      </div>

      {/* Budget Amount */}
      <div>
        <label className="font-medium">Suggested Fix Budget (Amount)</label>
        <input
          type="number"
          name="amount"
          className="w-full border px-3 py-2 rounded-lg mt-1"
          placeholder="Enter amount"
          required
        />
      </div>

      {/* Email - Read Only */}
      <div>
        <label className="font-medium">Your Email</label>
        <input
          type="email"
          
          readOnly
          value={currentUser.email}
          className="w-full border px-3 py-2 rounded-lg mt-1 bg-gray-100"
        />
      </div>

      {/* Status - Read Only */}
      <div>
        <label className="font-medium">Issue Status</label>
        <input
          type="text"
          readOnly
          value="ongoing"
          name="status"
          className="w-full border px-3 py-2 rounded-lg mt-1 bg-gray-100"
        />
      </div>

      {/* submit date */}
      <div>
        <label className="font-medium">Issue Submit Date</label>
        <input
          type="text"
          readOnly
          value={new Date().toLocaleDateString("en-UK")}
          name="date"
          className="w-full border px-3 py-2 rounded-lg mt-1 bg-gray-100"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full cursor-pointer bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
      >
        Submit Issue
      </button>
      <div>
        <Toaster />
      </div>
    </form>
  );
};

export default AddIssues;
