import axios from "axios";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

export const getResponse = async (title, description, price, paymentType) => {
  const url = publicRuntimeConfig.API_URL;
  const config = {
    headers: {
      "content-type": "application/json",
    }
  };
  const payload = {
    title,
    description,
    price,
    paymentType
  };
  const response = await axios.post(`${url}/chat`, payload, config);
  return response;
};
