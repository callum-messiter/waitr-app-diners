import { pushNotificationActions as actions } from '../actions/types';

const initialState = {
	token: null
};

export default state = (state = initialState, action) => {
	switch(action.type) {
		case actions.SET_PN_TOKEN: return { token: action.payload };
		default: return state;
	}
}