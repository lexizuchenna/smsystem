import axios from "axios";

const URL =
  import.meta.env.VITE_MODE === "DEV"
    ? import.meta.env.VITE_BASE_URL_TEST
    : import.meta.env.VITE_BASE_URL_LIVE;

const BASEURL = axios.create({ baseURL: `${URL}/api/` });

export const loginUser = async (formData) => {
  try {
    const { data } = await BASEURL.post("login", formData);

    if (data) {
      localStorage.setItem("user", JSON.stringify(data));
    }
    return data;
  } catch (error) {
    const message = error?.response?.data || error.message;
    throw new Error(message);
  }
};

export const logoutUser = () => {
  localStorage.removeItem("user");
};

const actions = {
  loginUser,
  logoutUser,
};

export default actions;
