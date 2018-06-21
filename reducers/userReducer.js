import { userActions as actions } from '../actions/types';

const initialState = {
	userId: null,
	email: null,
	role: null,
	token: null,
	isAuth: false
};

export default state = (state = initialState, action) => {
	switch(action.type) {
		case actions.SET_USER: return action.payload; break;
		case actions.AUTH_USER: break;
		case actions.DEAUTH_USER:
			return {
				...state,
				token: null,
				isAuth: false
			}
			break;
		default: return state;
	}
}