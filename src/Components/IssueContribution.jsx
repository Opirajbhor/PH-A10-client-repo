import React from "react";

const IssueContribution = ({ issue, issuesContribution }) => {
  const currentIssueContribution = issuesContribution.filter(
    (contribution) => contribution.issueId === issue._id
  );
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Contributions</h2>
          <p className="text-sm text-gray-500 mt-1">
            Recent contributors and contribution amounts
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50 ">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contributor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider  sm:table-cell">
                  Email
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-100">
              {currentIssueContribution.map((data,index) => (
                
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={data.image}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {data.userName}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 text-sm text-gray-500 mr[-25px]  sm:table-cell">
                    {data.email}
                  </td>

                  <td className="px-6 py-4 text-right text-sm font-semibold text-gray-800">
                    ৳{data.amount}
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

export default IssueContribution;
