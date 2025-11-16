import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../Firebase/config.firebase";

const MyContribution = () => {
  const serverLink = import.meta.env.VITE_SERVER_URL;
  //   allissue
  const [issuesContribution, setIssuesContribution] = useState([]);

  //   current user
  const [currentUser, setCurrentUser] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
  }, []);
  // issue contribution api
  // data
  const issuesLoader = async () => {
    const res = await axios.get(`${serverLink}/contribution`);
    return setIssuesContribution(res.data);
  };
  useEffect(() => {
    issuesLoader();
  }, []);

  const userData = issuesContribution.filter(
    (data) => data.email === currentUser.email
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Contributions ({userData.length})</h2>
          <p className="text-sm text-gray-500 mt-1">
            Recent contributors and contribution amounts
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50 ">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issue Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider  sm:table-cell">
                  Category
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paid Amount
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Download report
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-100">
              {userData.map((data, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-medium text-gray-900">
                        {data.issueTitle}
                      </div>
                    </div>
                  </td>

                  <td className="py-4 text-sm text-gray-500 mr[-25px]  sm:table-cell">
                    {data.category}
                  </td>

                  <td className="px-6 py-4 text-right text-sm font-semibold text-gray-800">
                    ৳{data.amount}
                  </td>
                    <td className="px-6 py-4 text-right text-sm font-semibold text-gray-800">
                        {data.date}
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyContribution;
