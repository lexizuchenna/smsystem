import axios from "axios";

const BASEURL = axios.create({ baseURL: "http://localhost:4000/api/" });

export const createTeacher = async (formData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await BASEURL.post("create-teacher", formData, config);
    
    return data;
  } catch (error) {
    const { response } = error;
    const message = response.data || error.message;
    throw new Error(message);
  }
};

export const createSession = async (formData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await BASEURL.post("create-record", formData, config);
    
    return data;
  } catch (error) {
    const { response } = error;
    const message = response.data || error.message;
    throw new Error(message);
  }
};

export const updateSession = async (formData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await BASEURL.post("update-record", formData, config);
    
    return data;
  } catch (error) {
    const { response } = error;
    const message = response.data || error.message;
    throw new Error(message);
  }
};
export const deleteSession = async (formData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await BASEURL.post("delete-record", formData, config);
    
    return data;
  } catch (error) {
    const { response } = error;
    const message = response.data || error.message;
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
  createTeacher, createSession, approveResult, rejectResult, updateSession, deleteSession
};

export default actions;
