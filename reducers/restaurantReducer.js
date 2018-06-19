import { restaurantActions as actions } from '../actions/types';

const initialState = {
	list: [],
	menu: {
		restaurantId: null,
		restaurantName: null,
		menuId: null,
		menuName: null,
		categories: []
	}
};

export default state = (state = initialState, action) => {
	switch(action.type) {
		case actions.SET_RESTAURANTS: {
			return {
				list: action.payload,
				menu: state.menu
			};
			break;
		};
		case actions.SET_RESTAURANT_MENU: {
			return {
				list: state.list,
				menu: action.payload
			};
			break;
		};
		default: return state;
	}
}