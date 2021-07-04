import axiosService from "../commons/axiosService";

const url = "http://localhost:8080/task";

// eslint-disable-next-line import/prefer-default-export
export const getList = () => {
  return axiosService.get(url);
};
export const add = (data) => {
  return axiosService.post(url, data);
};
