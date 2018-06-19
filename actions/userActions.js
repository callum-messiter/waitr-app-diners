import { userActions as actions } from './types';

export const setUser = (payload) => {
	return {
		type: actions.SET_USER,
		payload: payload
	};
};

export const authenticateUser = () => {
	return {
		type: actions.AUTH_USER
	};
};

export const deauthenticateUser = () => {
	return {
		type: actions.DEAUTH_USER
	};
};