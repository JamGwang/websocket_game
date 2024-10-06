import { getUserItems } from '../models/item.model.js'
import { getGameAssets } from '../init/assets.js'
export function calculateTotalScore(userId) {
    let score = 0;
    const {stages, items} = getGameAssets();
    // 스테이지 별 점수 계산

    // 아이템 점수 추가 
    
    const itemList = getUserItems(userId);
    console.log(itemList);
    for(const userItem of itemList) {
        const item = items.data.find((item) => item.id === userItem.itemId);
        if(!item){
            return {status: 'fail', message:'존재하지 않는 아이템입니다.'};
        }
        socre += item.socre;
    }

    return score;
}