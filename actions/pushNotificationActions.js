import { pushNotificationActions as actions } from './types';

export const setPushNotificationToken = (payload) => {
	return {
		type: actions.SET_PN_TOKEN,
		payload: payload
	};
}