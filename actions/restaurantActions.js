import { restaurantActions as actions } from './types';

export const setRestaurants = (payload) => {
	return {
		type: actions.SET_RESTAURANTS,
		payload: payload
	};
};

export const setRestaurantMenu = (payload) => {
	return {
		type: actions.SET_RESTAURANT_MENU,
		payload: payload
	};
};