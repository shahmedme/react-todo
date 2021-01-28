import axios from "axios";

var axiosInstance = axios.create();

axiosInstance.interceptors.request.use(function (req) {
	req.headers.authorization = "Bearer " + localStorage.getItem("token");
	return req;
});

export default axiosInstance;
