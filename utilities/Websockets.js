import { connect } from 'react-redux';
import io from 'socket.io-client';
import { websocketsBaseUrl } from '../config';
import { updateOrderStatus } from '../actions';
import { store } from '../store';

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
		const u = this.state.user;
		if(!u.isAuth) return;
		const queryString = this.buildConnQueryString(u.userId);
		this.socket = io(websocketsBaseUrl + queryString); /* Connect to server */
		
		/* Add event listeners */
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
			console.log('Order status update: ' + payload)
			store.dispatch( updateOrderStatus(payload) );
			/* TODO: push notification */
		});
	};

	static emitMessage(type, payload) {
		this.socket.emit(type, payload);
	};

	static disconnectFromServer() {
		this.socket.disconnect();
	};

	static buildConnQueryString(userId) {
		const queryString = `?customerId=${userId}`;
		/* TODO: if cart is not empty, append tableData */
		return queryString;
	};

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
}