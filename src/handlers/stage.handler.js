
// 유저는 스테이지를 하나씩 올라갈 수 있다.
// 유저는 일정 점수가 되면 다음 스테이지로 이동한다.
import { getStage, setStage } from '../models/stage.model.js';
import { getGameAssets } from '../init/assets.js';
import { calculateTotalScore } from '../utils/calculate.js';

export const moveStageHandler = (userId, payload) => {
  // 유저의 현재 스테이지 배열을 가져오고, 최대 스테이지 ID를 찾는다.
  let currentStages = getStage(userId);
  if (!currentStages.length) {
    return { status: 'fail', message: '유저 정보를 읽을 수 없습니다.' };
  }

  // 오름차순 -> 가장 큰 스테이지 ID 확인 <- 유저의 현재 스테이지
  currentStages.sort((a, b) => a.id - b.id);
  const currentStage = currentStages[currentStages.length - 1];

  // payload 의 currentStage 와 비교
  if (currentStage.id !== payload.currentStage) {
    return { status: 'fail', message: '스테이지 정보가 일치하지 않습니다.' };
  }


  const { stages } = getGameAssets();
  // 게임 에셋에서 다음 스테이지의 존재 여부 확인
  const targetStageInfo = stages.data.find((stage) => stage.id === payload.targetStage);
  if (!targetStageInfo) {
    return { status: 'fail', message: '다음 스테이지가 존재하지 않습니다.' };
  }

  // 현재 스테이지 정보

  // 점수 검증
  // 스테이지 달성 조건에 대한 점수 검증 구간. (과제)
  const serverTime = Date.now();
  const elapsedTime = (serverTime - currentStage.timestamp) / 1000; // 초 단위로 계산
  const totalScore = calculateTotalScore(userId) + elapsedTime;
  
  if (targetStageInfo.score > totalScore) {
    console.log("도달 스테이지 점수" + targetStageInfo.score + " 클라이언트 점수" + totalScore);
    return { status: 'fail', message: '비정상적인 점수 입니다.' };
  }

  // 유저의 다음 스테이지 정보 업데이트 + 현재 시간  
  setStage(userId, payload.targetStage, serverTime);
  return { status: '스테이지 이동' };
};