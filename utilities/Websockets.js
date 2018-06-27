import { connect } from 'react-redux';
import io from 'socket.io-client';
import { websocketsBaseUrl } from '../config';
import { orderActions as actions } from '../actions/types';
import { store } from '../store';
let state = store.getState();

export default class Websockets {

	/* On init, connect to the server and add all event listeners */
	static init() {
		this.state = store.getState();
		if(!this.state.user.isAuth) return;

		const queryString = `?customerId=${this.state.user.userId}`;
		/* TODO: if cart is not empty, append tableData */
		this.socket = io(websocketsBaseUrl + queryString);
		this.handleConnection();
		this.handleDisconnection();
		this.listenForOrderStatusUpdates();
		/* TODO: Set websockets state as connected */
	}

	static handleConnection() {
		this.socket.on('connect', () => {
		  	console.log(this.socket.id + ' connected to WebSockets server.');
			console.log('Connected: ' + this.socket.connected);
			/* TODO: Set websockets state as connected */
		});
	}

	static handleDisconnection() {
		this.socket.on('disconnect', () => {
			console.log('Socket disconnected from WebSockets server.');
			console.log('Connected: ' + this.socket.connected);
			/* TODO: Set websockets state as disconnected */
		});
	}

	static listenForOrderStatusUpdates() {
		this.socket.on('orderStatusUpdated', (payload) => {
			store.dispatch(
				actions.updateOrderStatus(payload)
			);
		});
	}

	static emitMessage(type, payload) {
		this.socket.emit(type, payload);
	}

	static disconnectFromServer() {
		this.socket.disconnect();
	}
}

