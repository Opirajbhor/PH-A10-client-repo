import React from "react";

const Card = () => {
  const issues = [
    {
      title: "Garbage",
      image:
        "https://images.pexels.com/photos/2382894/pexels-photo-2382894.jpeg",
    },
    {
      title: "Illegal Construction",
      image:
        "https://images.pexels.com/photos/13525370/pexels-photo-13525370.jpeg",
    },
    {
      title: "Broken Public Property",
      image:
        "https://img.freepik.com/free-photo/ruined-house-russian-s-war-ukraine_23-2149437902.jpg?semt=ais_hybrid&w=740&q=80",
    },
    {
      title: "Road Damage",
      image:
        "https://c.ndtvimg.com/2022-03/66c9aqug_car_625x300_10_March_22.jpg",
    },
  ];

  return (
    <div className="mt-10 flex flex-wrap justify-center gap-6">
      {issues.map((issue, index) => (
        <div
          key={index}
          className="w-64 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300"
        >
          <img
            className="rounded-t-lg w-full h-48 object-cover"
            src={issue.image}
            alt={issue.title}
          />
          <div className="p-4 text-center">
            <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
              {issue.title}
            </h5>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
