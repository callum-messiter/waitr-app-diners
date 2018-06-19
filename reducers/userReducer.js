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
		/* first add the isAuth property, since the API does not return this */
		case actions.SET_USER: return action.payload; break;
		case actions.AUTH_USER: /* send back copy of initial state with isAuth set to true */ break;
		case actions.DEAUTH_USER: /* send back copy of initial state with isAuth set to false */ break;
		default: return state;
	}
}