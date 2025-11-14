import React, { useEffect, useState } from "react";
import axios from "axios";

const Allissues = () => {
  const [issues, setIssues] = useState([]);
  useEffect(() => {
    const issuesLoader = async () => {
      const res = await axios.get("http://localhost:3000/allIssues");
      return setIssues(res.data);
    };
    issuesLoader();
  }, []);

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
              <img src={issue.image} alt={issue.issueTitle} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{issue.issueTitle}</h2>

              <div className="card-actions justify-end">
                <div className="badge badge-outline">{issue.category}</div>
                <div className="badge badge-outline">{issue.location}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Allissues;
