// 스테이지에 따라서 더 높은 점수 획득
// key : uuid, value: array-> stage정보는 배열
const stages = {};

// 초기화
export const createStage = (uuid) => {
    stages[uuid] = [];
}

export const getStage = (uuid) => {
    return stages[uuid];
}

export const setStage = (uuid, id, timestamp) => {
    return stages[uuid].push({ id, timestamp });
}

export const clearStage = (uuid) => {
    stages[uuid] = [];
}