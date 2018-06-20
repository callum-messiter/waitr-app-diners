import { apiBaseUrl } from '../config';
import axios from 'axios';
import { isEmpty as _isEmpty } from 'underscore';

const api = axios.create({
  baseURL: apiBaseUrl
});

function callWaitrApi(method, path, token=null, params={}) {
	return new Promise((resolve, reject) => {
		const req = { method: method, url: path };
		if(!_isEmpty(params)) { req.data = params; };
		if(token != null) {
			req.headers = { 'Authorization': token } 
		};

		api(req)
		.then((res) => { return resolve(res); })
		.catch((err) => { return reject(err.response); }); 
    });
};

export const user = {
	login(email, password) {
		const queryString = '?email=' + email + '&password=' + password;
		const path = 'auth/login/d' + queryString;
		return callWaitrApi('get', path);
	},
	logout(token) {
		return callWaitrApi('get', 'auth/logout', token);
	},
	signup(params) {
		return callWaitrApi('post', 'user/d', null, params);
	}
}

/* TODO: a single API path should return all this data together */
export const restaurant = {
	getList(token) {
		return callWaitrApi('get', 'restaurant', token);
	},
	getPaymentDetails(token, restaurantId) {
		const path = 'payment/restaurantDetails/' + restaurantId;
		return callWaitrApi('get', path, token);
	},
	getMenu(token, menuId) {
		const path = 'menu/' + menuId;
		return callWaitrApi('get', path, token);
	}
}

export const order = {
	getList(token) {
		return callWaitrApi('get', 'order/history', token);
	},
	get(token, orderId) {
		const path = 'order/live/' + orderId;
		return callWaitrApi('get', path, token);
	}
}