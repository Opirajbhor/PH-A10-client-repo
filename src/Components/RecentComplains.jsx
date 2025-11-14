import axios from "axios";
import React, { useEffect, useState } from "react";

const RecentComplains = () => {
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
          <div key={issue._id} className="card bg-base-100 w-96 border border-green-300 shadow-sm">
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

export default RecentComplains;
