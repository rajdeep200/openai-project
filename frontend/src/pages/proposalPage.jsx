import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Cryptr from "cryptr";
import "react-toastify/dist/ReactToastify.css";
import { Modal, Select } from "antd";
import { CirclesWithBar } from "react-loader-spinner";
import { getResponse } from "../../services/getResponse";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const proposal = () => {
  const [title, setTitle] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobPrice, setJobPrice] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentType, setPaymentType] = useState("fixed");
  const [loading, setLoading] = useState(false);
  const [generatedProposal, setGeneratedProposal] = useState("");
  const [proposalCopied, setProposalCopied] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setProposalCopied(false);
    const cryptr = new Cryptr(publicRuntimeConfig.CRYPTR_SECRET_KEY);
    // setIsModalOpen(true);
    const invalidTitle = title === "" || title === undefined || title === null;
    const invalidjobDesc =
      jobDesc === "" || jobDesc === undefined || jobDesc === null;
    const invalidJobPrice =
      jobPrice === "" || jobPrice === undefined || jobPrice === null;
    const invalidPaymentType =
      paymentType === "" || paymentType === undefined || paymentType === null;

    if (
      !invalidTitle &&
      !invalidjobDesc &&
      !invalidJobPrice &&
      !invalidPaymentType
    ) {
      const { data } = await getResponse(title, jobDesc, jobPrice, paymentType);
      if (data && data.status) {
        setLoading(false);
        const decryptedMessage = cryptr.decrypt(data.response);
        setIsModalOpen(true);
        setGeneratedProposal(decryptedMessage);
      } else {
        toast("Something went wrong");
      }
    } else {
      toast("Something went wrong");
    }
  };
  const paymentOptions = [
    {
      value: "fixed",
      label: "Fixed Payment",
    },
    {
      value: "hourly",
      label: "Hourly Payment",
    },
  ];
  const handlePaymentOptionChange = (value) => {
    setPaymentType(value);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  if (loading) {
    return (
      <CirclesWithBar
        height="70"
        width="70"
        color="black"
        wrapperStyle={{
          height: "100vh",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
        wrapperClass=""
        visible={true}
        outerCircleColor=""
        innerCircleColor=""
        barColor=""
        ariaLabel="circles-with-bar-loading"
      />
    );
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
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Enter Job Description"
              rows={4}
              cols={6}
              className="border-2 border-black p-3 focus:outline-none mb-6 font-noto"
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              required
            />
            <div className="flex justify-between items-center mb-6">
              <div className="font-noto">Price Type: </div>
              <div>
                <Select
                  defaultValue={paymentOptions[0].label}
                  style={{
                    width: 200,
                  }}
                  onChange={handlePaymentOptionChange}
                  options={paymentOptions}
                  className="font-noto font-bold"
                />
              </div>
            </div>
            <input
              type="number"
              placeholder="Enter Job Price In Dollars... Ex: $200, $500 etc..."
              className="border-2 border-black p-3 focus:outline-none mb-6 font-noto"
              value={jobPrice}
              onChange={(e) => setJobPrice(e.target.value)}
            />
            <button
              type="submit"
              className="bg-black p-3 text-white font-noto"
              onClick={handleSubmit}
            >
              Generate My Proposal
            </button>
          </div>
        </div>
        <Modal
          title="Your Job Proposal"
          open={isModalOpen}
          footer={null}
          onCancel={handleCancel}
        >
          <textarea
            rows={12}
            cols={6}
            className="border-2 rounded border-black p-3 focus:outline-none mb-6 font-noto w-full"
            value={generatedProposal}
            onChange={(e) => setGeneratedProposal(e.target.value)}
          />
          <CopyToClipboard
            text={generatedProposal}
            onCopy={() => setProposalCopied(true)}
          >
            <button className="bg-black p-3 text-white font-noto flex justify-center items-center">
              Copy My Proposal
            </button>
          </CopyToClipboard>
        </Modal>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </div>
  );
};

export default proposal;
