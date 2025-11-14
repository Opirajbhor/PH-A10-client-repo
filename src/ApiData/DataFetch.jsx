import React from "react";
import axios from "axios";

export const issuesLoader = async () => {
  const res = await axios.get("http://localhost:5000/allIssues");
  return res.data;
};
const DataFetch = () => {

  return <div></div>;
};

export default DataFetch;
