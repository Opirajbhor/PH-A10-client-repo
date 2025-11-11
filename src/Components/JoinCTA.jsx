import React from "react";

const JoinCTA = () => {
  return (
    <div
      className="hero min-h-[500px] rounded-2xl"
      style={{
        backgroundImage:
          "url(https://images.pexels.com/photos/6647026/pexels-photo-6647026.jpeg)",
      }}
    >
      <div className="hero-overlay rounded-2xl"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Join Clean Drive</h1>
          <p className="mb-5">
            a community initiative to keep our surroundings clean and green. Report waste issues, raise awareness, and take part in local cleanup events to make your city a healthier place to live.
          </p>
          <button className="btn text-white border-none hover:bg-green-700 bg-green-600">Join Clean Drive</button>
        </div>
      </div>
    </div>
  );
};

export default JoinCTA;
