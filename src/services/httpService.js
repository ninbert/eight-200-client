import axios from 'axios'


const HTTP = axios.create({
    baseURL:'http://localhost:8200/api'
})

const get = (route, params) => {
	return HTTP.get(route, { params }).then((res) => res.data);
};
const post = (route, params,headers={}) => {
	return HTTP.post(route,  params ,headers).then((res) => res.data);
};

const put = (route, params) => {
	return HTTP.put(route, params).then((res) => res.data);
};

const patch = (route, params) => {
	return HTTP.patch(route, params).then((res) => res.data);
};

const remove = (route, params) => {
	return HTTP.delete(route, params).then((res) => res.data);
};

export default {
    get,post,patch,remove,put
}