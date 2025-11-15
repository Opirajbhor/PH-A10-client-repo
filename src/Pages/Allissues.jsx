import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Allissues = () => {
  const navigate = useNavigate();

  const serverLink = import.meta.env.VITE_SERVER_URL;
  const [issues, setIssues] = useState([]);
  useEffect(() => {
    const issuesLoader = async () => {
      const res = await axios.get(`${serverLink}/allIssues`);
      return setIssues(res.data);
    };
    issuesLoader();
  }, [serverLink]);

  // issueDetail button function
  const issueDetail = (id) => {
    navigate(`/allIssues/${id}`, { state: { state: data } });
  };

  return (
    <div>
      <h1 className="text-2xl my-10 font-bold text-green-600">
        Total Issues ({issues.length})
      </h1>
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
              <div>
                <h2 className="card-title my-3">{issue.issueTitle}</h2>
              </div>

              <div className="card-actions flex gap-3 items-center  ">
                <div className="badge text-[12px] badge-outline">
                  {issue.category}
                </div>
                <div className="badge text-[12px] badge-outline">
                  {issue.location}
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                navigate(`/allissues/${issue._id}`, { state: { issue: issue } });
              }}
              className="btn bg-green-700 hover:bg-green-800"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Allissues;
