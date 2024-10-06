// 접속중인 사용자
const users = [];
// 사용자 추가
export const addUser = (user) => {
    users.push(user);
};
// 사용자 제거
export const removeUser = (socketId) => {
    const index = users.findIndex((user)=> user.socketId === socketId);
    if(index !== -1){
        return users.splice(index, 1)[0];
    }
}
// 사용자 목록 가져오기
export const getUser = ()=>{
    return users;
}