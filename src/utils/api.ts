import axios from "axios";

export const endpoints = {
    Autorization: "Autorization",
    GetProdNashti: "GetProdNashti",
    GetProductList: "Prod/Prod_GetProductList",
    GetProdGroup: "GetProdGroup",
    GetProduct: "GetProduct",
    GetProductPicture: "GetProductPicture",
    GetStore: "GetStore",
    GetSalaro: "GetSalaro",
    GetMdzgoli: "GetMdzgoli",
    SaveOrder: "mark4/operations/SaveOrder"
}


const url = `http://app.mark4.ge:8520/api/`;

const axiosAutorization = axios.create({
  baseURL: url,
  headers: {
    'Content-Type': 'application/json',
  },
});

const axiosInstance = axios.create({
    baseURL: url,
    headers: {
      'Accept': 'application/json',
      "Accept-Encoding": "gzip, deflate",
      "Accept-Language": "en-US,en;q=0.9",
    },
});

const axiosOperationInstance = axios.create({
  baseURL: "http://app.mark4.ge:8520/",
  headers: {
    'Accept': 'application/json',
    "Accept-Encoding": "gzip, deflate",
    "Accept-Language": "en-US,en;q=0.9",
  },
});

axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('markToken');
      if (token != null) {
        config.headers.Authorization = token;
      }
      return config;
    },
    (err) => Promise.reject(err),
);

axiosOperationInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('markToken');
    if (token != null) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (err) => Promise.reject(err),
);
  
export { axiosInstance, axiosAutorization, axiosOperationInstance };