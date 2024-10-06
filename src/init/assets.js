import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

let gameAssets = {};

// import.meta.url은 현재 모듈의 URL을 나타내는 문자열
// fileURLToPath는 URL 문자열을 파일 시스템의 경로로 변환

// 현재 파일의 절대 경로. 이 경로는 파일의 이름을 포함한 전체 경로
const __filename = fileURLToPath(import.meta.url);
// path.dirname() 함수는 파일 경로에서 디렉토리 경로만 추출 (파일 이름을 제외한 디렉토리의 전체 경로)
const __dirname = path.dirname(__filename);
// 디렉토리 경로 기반 상대경로
const basePath = path.join(__dirname, '../../public/assets'); // assets폴더 경로 이동-/public

// 파일 읽는 함수
// 비동기 병렬로 파일을 읽는다. 
// 파일의 이름을 받아서 JSON.parse를 통해 파싱합니다.
const readFileAsync = (filename) => {
    return new Promise((resolve, reject) => {
      fs.readFile(path.join(basePath, filename), 'utf8', (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(JSON.parse(data));
      });
    });
  };
// Promise.all()
export const loadGameAssets = async () => {
    try {
        const [stages, items, itemUnlocks] = await Promise.all([
            readFileAsync('stage.json'),
            readFileAsync('item.json'),
            readFileAsync('item_unlock.json'),
        ]);

        gameAssets = { stages, items, itemUnlocks };
        return gameAssets;
    } catch (err) {
        throw new Error('Failed to load game assets:' + e.message);
    }
}

export const getGameAssets = () => {
    return gameAssets;
}