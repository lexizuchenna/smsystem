import axios from "axios";

const BASEURL = axios.create({ baseURL: "http://localhost:4000/api/" });

export const loginUser = async (formData) => {
  try {
    const { data } = await BASEURL.post("login", formData);

    if (data) {
      localStorage.setItem("user", JSON.stringify(data));
    }
    return data;
  } catch (error) {
    const { response } = error;
    const message = response.data || error.message;
    throw new Error(message);
  }
};

export const logoutUser = () => {
  localStorage.removeItem('user')
}

const actions = {
  loginUser,
  logoutUser
};

export default actions;
