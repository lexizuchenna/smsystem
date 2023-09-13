import axios from "axios";

const BASEURL = axios.create({ baseURL: "http://localhost:4000/api/" });

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
