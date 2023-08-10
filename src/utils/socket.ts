import { io } from 'socket.io-client';
import { config } from '../config';

export const socket = () => {
    const options = {
        'force new connection': true,
        reconnectionAttempt: 'Infinity',
        timeout: 10000,
        transport: ['websocket'],
        secure: true,
        rejectUnauthorized: false,
    }
    
    return io(
        config.NODE_ENV === 'development'
            ? config.LOCAL_BACKEND_URL
            : config.BACKEND_URL,
        options
    )
}
