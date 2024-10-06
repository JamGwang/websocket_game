const userItems = {};
//초기화
export const initItems = (userId) => {
    userItems[userId] = [];
};

// 획득 아이템 추가
export const addItem = (userId, item) => {    
    if (userItems[userId]) {
        userItems[userId].push(item);
    }
};
// 획득한 아이템 목록 가져오기
export const getUserItems = (userId) => {
    return userItems[userId] || [];
};