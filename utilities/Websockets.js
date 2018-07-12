import { connect } from 'react-redux';
import io from 'socket.io-client';
import { websocketsBaseUrl } from '../config';
import { updateOrderStatus } from '../actions';
import { store } from '../store';
import PushNotification from './PushNotification';

export default class Websockets {

	static events = {
		inbound: {
			orderStatusUpdated: 'orderStatusUpdated'
		},
		outbound: {
			newOrder: 'newOrder',
			userJoinedTable: 'userJoinedTable',
			userLeftTable: 'userLeftTable'
		}
	};

	static orderStatuses = {
		sentToServer: 50,
		receivedByServer: 100,
		sentToKitchen: 200,
		receivedByKitchen: 300,
		acceptedByKitchen: 400,
		paymentSuccessful: 500,
		paymentFailed: 998,
		rejectedByKitchen: 999,
		enRouteToCustomer: 1000
	};

	/* On init, connect to the server and add all event listeners */
	static init() {
		this.state = store.getState(); /* Bind state to class */
		if(!this.state.user.isAuth) return;
		var queryString = this.buildConnQueryString(this.state.user.userId);

		/* Upon disconnection, user is no longer active member of table. 
		If user connects with items in cart (state persists), becomes active member again */
		const user = this.userIsActiveTableMember();
		if(user.isActiveTableMember) {
			queryString = queryString.concat(user.tableDataStr);
		}

		this.socket = io( websocketsBaseUrl.concat(queryString) );
		this.listenForOrderStatusUpdates();
		this.handleConnection();
		this.handleDisconnection();
		/* TODO: Set websockets state as connected */
	};

	static handleConnection() {
		this.socket.on('connect', () => {
		  	console.log(this.socket.id + ' connected to WebSockets server.');
			console.log('Connected: ' + this.socket.connected);
			/* TODO: Set websockets state as connected */
		});
	};

	static handleDisconnection() {
		this.socket.on('disconnect', () => {
			console.log('Socket disconnected from WebSockets server.');
			console.log('Connected: ' + this.socket.connected);
			/* TODO: Set websockets state as disconnected */
		});
	};

	static listenForOrderStatusUpdates() {
		const orderStatusUpdated = this.events.inbound.orderStatusUpdated;
		this.socket.on(orderStatusUpdated, (payload) => {
			console.log('Order status update: ' + JSON.stringify(payload))
			store.dispatch( updateOrderStatus(payload) );
			/* This should be handled by a redux middleware */
			PushNotification.send(
		      this.state.pushNotification.token, 
		      'Water Lane Brasserie', // payload.restaurantName
		      payload.userMsg
		    );
		});
	};

	static emitMessage(type, payload) {
		this.socket.emit(type, payload);
	};

	static disconnectFromServer() {
		this.socket.disconnect();
	};

	/*
		A user is considered to be an active member of a table when:
		 
		- they've set their table number for a restaurant
		- they've at least one item in their cart (for that restaurant)

		Throughout the app, these conditions are checked, and when they change the info
		is sent to the API so the respective restaurant can be notified in real time.
	*/
	static sendUserJoinedTableMsg(user, restaurantId, tableNo) {
		const userJoinedTable = this.events.outbound.userJoinedTable;
		this.emitMessage(userJoinedTable, {
			headers: {
				token: user.token
			},
			table: {
				restaurantId: restaurantId,
				customerId: user.userId,
				tableNo: tableNo
			}
	    });
	}

	static sendUserLeftTableMsg(user, restaurantId, tableNo) {
		const userLeftTable = this.events.outbound.userLeftTable;
		this.emitMessage(userLeftTable, {
			headers: {
				token: user.token
			},
			table: {
				restaurantId: restaurantId,
				customerId: user.userId,
				tableNo: tableNo
			}
	    });
	}

	static buildConnQueryString(userId) {
		const queryString = `?customerId=${userId}`;
		/* TODO: if cart is not empty, append tableData */
		return queryString;
	};

	/* Note: carts is an array, but there can only be one cart object (change possibly) */
	static userIsActiveTableMember() {
		var user = { isActiveTableMember: false, tableDataStr: '' }
		for(var cart of this.state.carts) {
			if(!cart.hasOwnProperty('items')) continue;
			if(cart.items.length > 0) {
				user.isActiveTableMember = true;
				user.tableDataStr = '&table=' + JSON.stringify({
					restaurantId: cart.restaurantId,
					customerId: this.state.user.userId,
					tableNo: cart.tableNo
				});
				return user;
			}
		}
		return user;
	}
}