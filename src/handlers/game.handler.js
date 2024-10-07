import { getGameAssets } from "../init/assets.js";
import { initItems } from "../models/item.model.js";
import { clearStage, getStage, setStage } from "../models/stage.model.js";
import { calculateTotalScore } from "../utils/calculate.js";

export const gameStart = (uuid, payload) => {

    const { stages } = getGameAssets();

    clearStage(uuid);
    initItems(uuid);
    // stages 배열에서 0번째 = 첫번째 스테이지
    setStage(uuid, stages.data[0].id, payload.timestamp);
    console.log('Stage: ', getStage(uuid));

    return { status: '게임 시작' };
};

export const gameEnd = (uuid, payload) => {
    // 클라이언트는 게임 종료 시 타임스탬프와 총 점수
    const { timestamp: gameEndTime, score } = payload;
    const stages = getStage(uuid);

    if (!stages.length) {
        return { status: 'fail', message: '유저의 스테이지 정보를 불러올 수 없습니다.' };
    }

    // 총 점수 계산 (수정 필요)
    let totalScore = calculateTotalScore(userId);

    // 점수와 타임스탬프 검증 (수정 필요)
    if (Math.abs(score - totalScore) > 5) {
        return { status: 'fail', message: "점수 검증 실패" }
    }

    // DB 저장 가정
    // ex) setResult(userId, score, timestamp) 

    return { status: '게임 종료', message: "게임 종료", score };
};