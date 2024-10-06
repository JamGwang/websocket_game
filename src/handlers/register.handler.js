import { v4 as uuidv4 } from 'uuid';
import { addUser } from '../models/user.model.js';
import { handleConnection, handleDisconnect, handleEvent } from './helper.js';
// 유저 접속시 최초 유저정보를 저장하는 핸들러
const registerHandler = (io) => { // io = 웹 소켓 객체
    io.on('connection', (socket) => { // 'connection' 이벤트 발생 시 콜백함수 호출
        // 최초 커넥션을 맺은 이후 발생하는 각종 이벤트를 처리하는 곳

        const userUUID = uuidv4(); // UUID 생성
        addUser({ uuid: userUUID, socketId: socket.id }); // 사용자 추가
        
        handleConnection(socket, userUUID);

        // 모든 서비스 이벤트 처리
        socket.on('event', (data) => handleEvent(io, socket, data));
        // 접속 해제시 이벤트 처리
        socket.on('disconnect', () => handleDisconnect(socket, userUUID));
    });
};

export default registerHandler;