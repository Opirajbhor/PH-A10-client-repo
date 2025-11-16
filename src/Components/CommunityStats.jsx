import React from "react";

const CommunityStats = () => {
  return (
    <div>
      <h1 className="my-8 text-2xl font-bold underline">Community Stats</h1>
      <div className="my-10 flex items-center justify-center">
        <div className=" w-[450px] flex items-center justify-center flex-col shadow p-10 h-[250px] ">
          <div className="stat-title text-2xl">Total Registered Users</div>
          <div className="stat-value ">1000+</div>
        </div>
        <div className=" w-[450px] flex items-center justify-center flex-col shadow p-10 h-[250px] ">
          <div className="stat-title text-2xl">Total Issues Resolved</div>
          <div className="stat-value ">3000+</div>
        </div>
        <div className=" w-[450px] flex items-center justify-center flex-col shadow p-10 h-[250px] ">
          <div className="stat-title text-2xl">Pending</div>
          <div className="stat-value ">500+</div>
        </div>
      </div>
    </div>
  );
};

export default CommunityStats;
