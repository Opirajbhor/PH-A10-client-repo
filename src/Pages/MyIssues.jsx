import React, { useEffect, useState } from "react";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/config.firebase";
import { FaUser, FaEnvelope, FaPhone, FaHome } from "react-icons/fa";
import { PiGooglePhotosLogoFill } from "react-icons/pi";
import toast, { Toaster } from "react-hot-toast";
import { SyncLoader } from "react-spinners";

const MyIssues = () => {
  const serverLink = import.meta.env.VITE_SERVER_URL;
  // current user
  const [currentUser, setCurrentUser] = useState(null);
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

  // USER filtered data
  const filterUserData = issues.filter(
    (issue) => currentUser.email.toLowerCase() === issue.email.toLowerCase()
  );

  // issue delete function
  const deleteIssue = async (id) => {
    try {
      
      const idApi = await fetch(`${serverLink}/allIssues/${id}`, {
        method: "DELETE",
      });

      const currentID = await idApi.json();
      console.log(currentID);
      if (currentID.success == true) {
        toast.success("Issue Deleted");
        await issuesLoader();
      } else {
        toast.error("Delete failed!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  // issue update function
  const [selectedIssue, setSelectedIssue] = useState(null);
  const updateIssue = async (e) => {
    e.preventDefault();
    const id = e.target._id.value;
    const issueData = {
      issueTitle: e.target.issueTitle.value,
      category: e.target.category.value,
      location: e.target.location.value,
      description: e.target.description.value,
      amount: e.target.amount.value,
      image: e.target.image.value,
      status: e.target.status.value,
      date: e.target.date.value,
    };

    axios
      .patch(`${serverLink}/allIssues/${id}`, issueData)
      .then((res) => {
        document.getElementById("my_modal_3").close();
        setSelectedIssue(null);
        toast.success("update success");
        issuesLoader();
      })
      .catch((err) => {
        toast.error("update failed");
      });
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <h1 className="text-2xl my-10 font-bold text-green-600">
          My Issues ({filterUserData.length})
        </h1>
        <table className="table table-xm">
          <thead>
            <tr className="text-[16px]  font-bold text-green-600">
              <th>Issue Title</th>
              <th>category</th>
              <th className="hidden md:flex lg:flex">description</th>
              <th>amount</th>
              <th>status</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          {/* all user data here---------------------- */}
          {filterUserData.map((data) => (
            <tbody key={data._id}>
              <tr className=" border-gray-200 border ">
                <td>{data.issueTitle}</td>
                <td>{data.category}</td>
                <td className="hidden md:flex lg:flex">{data.description}</td>
                <td>৳{data.amount}</td>
                <td>{data.status}</td>

                {/* update-------------------------- */}
                <td>
                  <button
                    className="btn bg-green-700 hover:bg-green-900"
                    onClick={() => {
                      setSelectedIssue(data);
                      document.getElementById("my_modal_3").showModal();
                    }}
                  >
                    Update
                  </button>
                </td>

                {/* delete------------------------- */}
                <td>
                  <button
                    onClick={() =>
                    document.getElementById("my_modal_5").showModal()
                  }
                    className="btn bg-red-700 hover:bg-red-900"
                  >
                    Delete
                  </button>
                </td>
                
                <dialog
                  id="my_modal_5"
                  className="modal modal-bottom sm:modal-middle"
                >
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">Do you want to delete the Issue?</h3>
                    <div className="modal-action">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                      <button onClick={() => deleteIssue(data._id)} className="btn bg-red-600 p-5  mr-5">Yes Delete</button>

                        <button className="btn bg-green-600">Cancel</button>
                      </form>
                    </div>
                  </div>
                </dialog>
              </tr>
            </tbody>
          ))}
        </table>
        {/* modal update */}
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                onClick={() => setSelectedIssue(null)}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
            </form>

            {selectedIssue && (
              <form
                onSubmit={updateIssue}
                className="min-h-[300px] flex items-center justify-center bg-gray-50"
              >
                <div className="w-full max-w-sm bg-white shadow-lg rounded-2xl p-6">
                  <h1 className="text-center text-2xl font-semibold mb-5">
                    Issue Update Page
                  </h1>

                  {/* title */}
                  <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700">
                      Title
                    </label>
                    <div className="relative mt-1">
                      <input
                        name="issueTitle"
                        defaultValue={selectedIssue.issueTitle}
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
                      defaultValue={selectedIssue.category}
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
                      <option value="Garbage Issue">Garbage Issue</option>
                    </select>
                  </div>
                  {/* location */}
                  <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700">
                      Location
                    </label>
                    <div className="relative mt-1">
                      <input
                        name="location"
                        defaultValue={selectedIssue.location}
                        type="text"
                        placeholder="New location"
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
                    <label className="text-sm font-medium text-gray-700">
                      Image
                    </label>
                    <div className="relative mt-1">
                      <input
                        name="image"
                        defaultValue={selectedIssue.image}
                        type="text"
                        placeholder="New image link"
                        className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  {/* amount */}
                  <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700">
                      Amount
                    </label>
                    <div className="relative mt-1">
                      <span className="absolute left-3 top-2.5">৳</span>
                      <input
                        name="amount"
                        defaultValue={`${selectedIssue.amount}`}
                        type="text"
                        placeholder="New amount"
                        className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  <input type="hidden" name="_id" value={selectedIssue._id} />
                  {/* description */}
                  <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <div className="relative mt-1">
                      <textarea
                        name="description"
                        defaultValue={selectedIssue.description}
                        placeholder="New description"
                        className="w-full  border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      ></textarea>
                    </div>
                  </div>

                  {/* status */}
                  <div className="mb-4">
                    <label className="font-medium">Status</label>
                    <select
                      name="status"
                      defaultValue={selectedIssue.status}
                      className="w-full border px-3 py-2 rounded-lg mt-1"
                      required
                    >
                      <option value="ongoing">ongoing</option>
                      <option value="ended">ended</option>
                    </select>
                  </div>

                  {/* update issue Buttons */}
                  <div className="space-y-3">
                    <button
                      className={`w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition cursor-pointer `}
                    >
                      Update Issue
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </dialog>
      </div>
      <div>
        <Toaster />
      </div>
    </div>
  );
};

export default MyIssues;
