import { connect } from 'react-redux';
import io from 'socket.io-client';

class Websockets {
	/* TODO: Get userId from auth state */
	static init() {
		console.log(this.props);
		const userId = 'asd';
		const route = `https://api.waitr.live?customerId=${userId}`
		this.socket = io(route);
		/* TODO: Set websockets state as connected */
	}

	static handleConnection() {
		this.socket.on('connect', () => {
		  	console.log(socket.id);
			console.log(socket.connected);
			/* TODO: Set websockets state as connected */
		});
	}

	static handleDisconnect() {
		this.socket.on('disconnect', () => {
			console.log(socket.id);
			console.log(socket.connected);
			/* TODO: Set websockets state as disconnected */
			socket.connect();
		});
	}

	static handleEvent(type) {

	}

	static emitMessage(type, payload) {
		this.socket.emit(type, payload);
	}
}

const mapPropsToState = (state) => ({
	user: state.user,
	carts: state.carts
});

export default connect(mapPropsToState)(Websockets);

