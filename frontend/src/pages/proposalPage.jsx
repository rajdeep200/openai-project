import React, { useState } from "react";
import { getResponse } from "../../services/getResponse";

const proposal = () => {
  const [title, setTitle] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobPrice, setJobPrice] = useState("");
  const handleSubmit = async () => {
    const response = await getResponse(title, jobDesc, jobPrice);
    console.log('response', response);
  }
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col w-11/12 md:w-1/2">
        <div className="text-center my-3 p-3 border-2 border-black bg-black text-white font-noto">
          Fill Out The Following Descriptions
        </div>
        <div className="border-2 border-black p-3">
          <div className="flex flex-col justify-center">
            <input
              type="text"
              placeholder="Enter Job Title"
              className="border-2 border-black p-3 focus:outline-none mb-6 font-noto"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Enter Job Description"
              rows={4}
              cols={6}
              className="border-2 border-black p-3 focus:outline-none mb-6 font-noto"
              value={jobDesc}
              onChange={e => setJobDesc(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Enter Job Price In Dollars... Ex: $200, $500 etc..."
              className="border-2 border-black p-3 focus:outline-none mb-6 font-noto"
              value={jobPrice}
              onChange={e => setJobPrice(e.target.value)}
            />
            <button type="submit" className="bg-black p-3 text-white font-noto" onClick={handleSubmit}>
              Create My Proposal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default proposal;
