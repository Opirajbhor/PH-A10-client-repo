import React, { useEffect, useState } from "react";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/config.firebase";
import { FaUser, FaEnvelope, FaPhone, FaHome } from "react-icons/fa";
import { PiGooglePhotosLogoFill } from "react-icons/pi";
import toast, { Toaster } from "react-hot-toast";

const MyIssues = () => {
  const serverLink = import.meta.env.VITE_SERVER_URL;
  // current user
  const [currentUser, setCurrentUser] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
  }, []);
  // data
  const [issues, setIssues] = useState([]);
  const issuesLoader = async () => {
    const res = await axios.get(`${serverLink}/allIssues`);
    return setIssues(res.data);
  };
  useEffect(() => {
    issuesLoader();
  }, []);

  const filterUserData = issues.filter(
    (issue) => currentUser.email === issue.email
  );

  const deleteIssue = async (id) => {
    try{

    const confirmed = window.confirm("Are you sure you want to delete?");
    if (!confirmed) return;
    const idApi = await fetch(`${serverLink}/allIssues/${id}`, {
      method: "DELETE",
    });

    const currentID = await idApi.json();
    console.log(currentID)
    if (currentID.success == true) {
      toast.success("Issue Deleted");
     await issuesLoader();
    }
    else {
      toast.error("Delete failed!");
    }
    
  }
  catch (error) {
    toast.error("Something went wrong!");
  } 
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <h1 className="text-2xl my-10 font-bold text-green-600">
          My Issues ({filterUserData.length})
        </h1>
        <table className="table table-xm">
          <thead>
            <tr className="text-[16px] font-bold text-green-600">
              <th>Issue Title</th>
              <th>category</th>
              <th>description</th>
              <th>amount</th>
              <th>status</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          {filterUserData.map((data) => (
            <tbody key={data._id}>
              <tr className=" border-gray-200 border">
                <td>{data.issueTitle}</td>
                <td>{data.category}</td>
                <td>{data.description}</td>
                <td>{data.amount}</td>
                <td>{data.status}</td>
                <td>
                  <button
                    className="btn bg-green-700 hover:bg-green-900"
                    onClick={() =>
                      document.getElementById("my_modal_3").showModal()
                    }
                  >
                    Update
                  </button>
                  <dialog id="my_modal_3" className="modal">
                    <div className="modal-box">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                          ✕
                        </button>
                      </form>

                      <div className="min-h-[300px] flex items-center justify-center bg-gray-50">
                        <div className="w-full max-w-sm bg-white shadow-lg rounded-2xl p-6">
                          <h1 className="text-center text-2xl font-semibold mb-5">
                            Issue Update Page
                          </h1>
                          <h3 className=" font-semibold mb-5">
                            Issue Name - {data.issueTitle}
                          </h3>
                          {/* title */}
                          <div className="mb-4">
                            <label className="text-sm font-medium text-gray-700">
                              Title
                            </label>
                            <div className="relative mt-1">
                              <input
                                name="name"
                                type="text"
                                placeholder="New Title"
                                className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                              />
                            </div>
                          </div>
                          {/* Category */}
                          <div className="mb-4">
                            <label className="font-medium">Category</label>
                            <select
                              name="category"
                              className="w-full border px-3 py-2 rounded-lg mt-1"
                              required
                            >
                              <option value="">Select Category</option>
                              <option value="Illegal Construction">
                                Illegal Construction
                              </option>
                              <option value="Broken Public Property">
                                Broken Public Property
                              </option>
                              <option value="Road Damage">Road Damage</option>
                              <option value="Garbage Issue">
                                Garbage Issue
                              </option>
                            </select>
                          </div>
                          {/* amount */}
                          <div className="mb-4">
                            <label className="text-sm font-medium text-gray-700">
                              Amount
                            </label>
                            <div className="relative mt-1">
                              <input
                                name="amount"
                                type="text"
                                placeholder="New amount"
                                className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                              />
                            </div>
                          </div>
                          {/* description */}
                          <div className="mb-4">
                            <label className="text-sm font-medium text-gray-700">
                              Description
                            </label>
                            <div className="relative mt-1">
                              <input
                                name="description"
                                type="textarea"
                                placeholder="New description"
                                className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                              />
                            </div>
                          </div>

                          {/* Category */}
                          <div className="mb-4">
                            <label className="font-medium">Category</label>
                            <select
                              name="category"
                              className="w-full border px-3 py-2 rounded-lg mt-1"
                              required
                            >
                              <option value="ongoing">ongoing</option>
                              <option value="ended">ended</option>
                            </select>
                          </div>

                          {/* Buttons */}
                          <div className="space-y-3">
                            <button
                              className={`w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition cursor-pointer `}
                            >
                              Update Issue
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </dialog>
                </td>
                <td
                  onClick={() => deleteIssue(data._id)}
                  className="btn bg-red-500 mt-3"
                >
                  Delete
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div>
        <Toaster />
      </div>
    </div>
  );
};

export default MyIssues;
