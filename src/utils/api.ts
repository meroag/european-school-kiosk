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
    SaveOrder: "mark4/operations/SaveOrder",
    PayOrders: "mark4/operations/PayOrders"
}


const url = `https://fmg.mark4.ge/api/`;

const axiosAutorization = axios.create({
  baseURL: url,
  headers: {
    'Content-Type': 'application/json',
  },
});

// axios instance
const axiosInstance = axios.create({
    baseURL: url,
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

axiosInstance.interceptors.response.use(
  (resp) => {
    if(resp.data.ErrorMessage && resp.data.ErrorMessage.ErrorCode == -300){
      window.location.pathname = "/"
    }
    return resp;
  },
  (err) => Promise.reject(err),
);

// axios operation
const axiosOperationInstance = axios.create({
  baseURL: "https://fmg.mark4.ge/",
  headers: {
    'Accept': 'application/json',
    "Accept-Encoding": "gzip, deflate",
    "Accept-Language": "en-US,en;q=0.9",
  },
});

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