import { sendEvent } from "./Socket.js";

class Score {
  score = 0;
  HIGH_SCORE_KEY = 'highScore';
  currentStage = 1000;  // 스테이지 초기값 1000
  stageChange = [];

  constructor(ctx, scaleRatio, stageData, itemData, itemController) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.scaleRatio = scaleRatio
    this.stageData = stageData;
    this.itemData = itemData;
    this.itemController = itemController; // itemController 의 stage 갱신 전달용
    this.stageChange.push(this.currentStage);
  }

  update(deltaTime) {
    this.score += deltaTime * 0.001;
    const nextStageInfo = this.stageData.data.find((stage) => stage.id === this.currentStage + 1);
    if (Math.floor(this.score) >= nextStageInfo.score && !this.stageChange.includes(nextStageInfo.id)) {
      this.stageChange.push(nextStageInfo.id);
      sendEvent(11, { currentStage: this.currentStage, targetStage: nextStageInfo.id });
      this.currentStage = nextStageInfo.id;
      console.log(this.currentStage);
    }
  }

  getItem(itemId) {
    const itemInfo = this.itemData.data.find((item) => item.id === itemId);
    if (itemInfo) {
      this.score += itemInfo.score;
      sendEvent(21, { itemId, timestamp: Date.now() });
    }
  }

  reset() {
    this.score = 0;

    if (this.itemController) {
      this.itemController.setCurrentStage(this.currentStage);
    }
    //this.stageChange = true;
  }

  setHighScore() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    if (this.score > highScore) {
      localStorage.setItem(this.HIGH_SCORE_KEY, Math.floor(this.score));
    }
  }

  getScore() {
    return this.score;
  }

  draw() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    const y = 20 * this.scaleRatio;

    const fontSize = 20 * this.scaleRatio;
    this.ctx.font = `${fontSize}px serif`;
    this.ctx.fillStyle = '#525250';

    const scoreX = this.canvas.width - 75 * this.scaleRatio;
    const highScoreX = scoreX - 125 * this.scaleRatio;

    const scorePadded = Math.floor(this.score).toString().padStart(6, 0);
    const highScorePadded = highScore.toString().padStart(6, 0);

    this.ctx.fillText(scorePadded, scoreX, y);
    this.ctx.fillText(`HI ${highScorePadded}`, highScoreX, y);
  }
}

export default Score;
