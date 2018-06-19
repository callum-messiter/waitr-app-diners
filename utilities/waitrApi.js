import { apiBaseUrl } from '../config';
import axios from 'axios';

const api = axios.create({
  baseURL: apiBaseUrl
});

function waitrApi_GET(path, token=null) {
	return new Promise((resolve, reject) => {
		const req = { method: 'get', url: path };
		if(token != null) req.headers = {'Authorization': token};
		
		api(req)
		.then((res) => { return resolve(res); })
		.catch((err) => { return reject(err.response); }); 
    });
};

export const user = {
	login(email, password) {
		const queryString = '?email=' + email + '&password=' + password;
		const path = 'auth/login/d' + queryString;
		return waitrApi_GET(path);
	},
	logout(token) {
		return waitrApi_GET('auth/logout', token);
	},
	signup(email, password, fName, lName) {
		const path = 'user/d';
	}
}

/* TODO: a single API path should return all this data together */
export const restaurant = {
	getList(token) {
		return waitrApi_GET('restaurant', token);
	},
	getPaymentDetails(token, restaurantId) {
		const path = 'payment/restaurantDetails/' + restaurantId;
		return waitrApi_GET(path, token);
	},
	getMenu(token, menuId) {
		const path = 'menu/' + menuId;
		return waitrApi_GET(path, token);
	}
}

export const order = {
	getList(token) {
		return waitrApi_GET('order/history', token);
	},
	get(token, orderId) {
		const path = 'order/live/' + orderId;
		return waitrApi_GET(path, token);
	}
}