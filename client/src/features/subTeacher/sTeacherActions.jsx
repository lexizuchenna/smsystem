import axios from "axios";

const URL =
  import.meta.env.VITE_MODE === "DEV"
    ? import.meta.env.VITE_BASE_URL_TEST
    : import.meta.env.VITE_BASE_URL_LIVE;

const BASEURL = axios.create({ baseURL: `${URL}/` });

export const saveResult = async (formData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    
    const { data } = await BASEURL.post("save-result", formData, config);

    return data;
  } catch (error) {
    const { response } = error;
    const message = response.data || error.message;
    console.log(message)
    throw new Error(message);
  }
};

const actions = {
  saveResult,
};

export default actions;
