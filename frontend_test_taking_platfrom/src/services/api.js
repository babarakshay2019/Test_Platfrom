import axiosInstance from '../utils/axiosInstance';
import apiUrl from '../utils/apiUrls';

// Login function
export const loginUser = async (credentials) => {
  const response = await axiosInstance.post(apiUrl.LOGIN, credentials);
  return response.data;
};

//Register function
export const registerUser = async (userData) => {
  const response = await axiosInstance.post(apiUrl.REGISTER, userData);
  return response.data;
};

export const logoutUser = async (token) => {
  const response = await axiosInstance.post(apiUrl.LOGOUT, token);
  return response.data;
};

export const getAllTest = async (page) => {
  const response = await axiosInstance.get(`${apiUrl.GETALLTEST}?page=${1}&page_size=${10}`);
  return response.data;
};

export const getQuestionTest = async (id) => {
  const response = await axiosInstance.post(`${apiUrl.STARTTEST}/${id}/start/`);
  return response.data;
};

export const submitTest = async (quizId) => {
  const response = await axiosInstance.post(`${apiUrl.SUBMITANSWER}/${quizId}/complete/`);
  return response.data;
};

export const submitAnswer = async (quizId,questionId,payload) => {
  const response = await axiosInstance.post(`${apiUrl.STARTTEST}/${quizId}/questions/${questionId}/submit/`,payload);
  return response.data;
};

export const TestHistoryApi = async (status) => {
  const response = await axiosInstance.get(`${apiUrl.TESTHISTROY}/?status=${status}`);
  return response.data;
};

export const TestHistoryQuestion = async (id) => {
  const response = await axiosInstance.get(`${apiUrl.TESTHISTROY}/${id}/`);
  return response.data;
};

