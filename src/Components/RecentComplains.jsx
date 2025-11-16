import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";


const RecentComplains = () => {
  const navigate = useNavigate();

  const serverLink = import.meta.env.VITE_SERVER_URL;

  const [issues, setIssues] = useState([]);
  useEffect(() => {
    const issuesLoader = async () => {
      const res = await axios.get(`${serverLink}/latestissues`);
      return setIssues(res.data);
    };
    issuesLoader();
  }, []);
  return (
    <div>
      {/* tittle */}
      <h1 className="my-8 text-2xl font-bold underline">Recent Complaints</h1>

      {/* all data here */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3 ">
        {issues.map((issue) => (
          <div
            key={issue._id}
            className="card bg-base-100 w-96 border border-green-300 shadow-sm"
          >
            <figure>
              <img
                src={issue.image ? issue.image : null}
                alt={issue.issueTitle}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{issue.issueTitle}</h2>

              <div className="card-actions justify-end">
                <div className="badge badge-outline">{issue.category}</div>
                <div className="badge badge-outline">{issue.location}</div>
              </div>
              <button
                onClick={() => {
                  navigate(`/allissues/${issue._id}`, {
                    state: { issue: issue },
                  });
                }}
                className="btn bg-green-700 hover:bg-green-800"
              >
                See Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentComplains;
