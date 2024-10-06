import { addItem } from '../models/item.model.js';
import { getStage } from '../models/stage.model.js';
import { getGameAssets } from '../init/assets.js';

export const itemPickUpHandler = (userId, payload) => {
  const { items, itemUnlocks } = getGameAssets();
  const { timestamp, itemId } = payload;

  // 현재 스테이지 정보 검증
  const stages = getStage(userId);
  if (!stages) {
    return { status: 'fail', message: '스테이지가 존재하지 않습니다.' };
  }
  
  // 아이템 정보 검증
  const item = items.data.find((item) => item.id === itemId);
  if (!item) {
    return { status: 'fail', message: '존재하지 않는 아이템입니다.' };
  }

  // 현재 스테이지에서 나올 수 있는 아이템 검증  
  const currentStage = stages[stages.length - 1].id;
  const unlockedItems = itemUnlocks.data.find((stage) => stage.stage_id === currentStage).item_id;
  if (!unlockedItems.includes(itemId)) {
    return { status: 'fail', message: '현재 스테이지에서 나올 수 없는 아이템입니다.' };
  }

  // 아이템 기록 추가
  addItem(userId, { id: itemId, timestamp });
  return { status: '아이템 획득' };
};