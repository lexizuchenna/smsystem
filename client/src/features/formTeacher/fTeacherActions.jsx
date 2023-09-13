import axios from "axios";

const BASEURL = axios.create({ baseURL: "http://localhost:4000/api/" });

export const createStudent = async (formData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await BASEURL.post("create-student", formData, config);

    return data;
  } catch (error) {
    const { response } = error;
    const message = response.data || error.message;
    console.log(message);
    throw new Error(message);
  }
};

export const updateStudent = async (formData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await BASEURL.post("update-student", formData, config);

    return data;
  } catch (error) {
    const { response } = error;
    const message = response.data || error.message;
    console.log(message);
    throw new Error(message);
  }
};

export const approveResult = async (formData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await BASEURL.post("approve-result", formData, config);

    return data;
  } catch (error) {
    const { response } = error;
    const message = response.data || error.message;
    console.log(message);
    throw new Error(message);
  }
};

export const rejectResult = async (formData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await BASEURL.post("reject-result", formData, config);

    return data;
  } catch (error) {
    const { response } = error;
    const message = response.data || error.message;
    console.log(message);
    throw new Error(message);
  }
};

const actions = {
  createStudent,
  updateStudent,
  approveResult,
  rejectResult,
};

export default actions;
