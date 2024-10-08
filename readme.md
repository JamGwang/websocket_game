# 웹소켓 게임 만들기
<br>

### 패킷 구조

| 필드 명 | 타입 | 설명 |
|---|---|---|
| handlerID | int | 요청을 처리할 서버 핸들러의 ID |
| userId | int | 요청을 보내는 유저의 ID
| clientVersion | string | 현재 클라이언트의 버전 |
| payload | JSON | 요청 내용  |


---
<br>

+ 스테이지 마다 별도의 획득 점수
+ 스테이지 점수에 따라 아이템 생성
+ 아이템 획득 시 해당 아이템에 지정된 점수 획득

<br>

---

---
| ![](https://velog.velcdn.com/images/twr9680/post/b75a5c73-b542-4450-b5f5-ba36ce80bee6/image.png) |![](https://velog.velcdn.com/images/twr9680/post/d9dd5fee-3e0a-495d-a94a-05b48d0f9efc/image.png)|![](https://velog.velcdn.com/images/twr9680/post/7665f9f8-2561-47cf-8325-afc34cff8599/image.png)|![](https://velog.velcdn.com/images/twr9680/post/9d4a53db-3cd6-4c93-9283-c9b5c83842ae/image.png)|![](https://velog.velcdn.com/images/twr9680/post/2ca60933-3b3b-4e2e-bc4d-0b6871d1f41a/image.png)|![](https://velog.velcdn.com/images/twr9680/post/d875a84b-b57d-440b-9630-083c837412ff/image.png)|
|---|---|---|---|---|---|
| <p align= "center">10점| <p align= "center">20점| <p align= "center">40점| <p align= "center">80점| <p align= "center">160점| <p align= "center">320점|
---
  
  |스테이지|달성 점수|초당 점수|등장 볼|
  |---|---|---|---|
  |스테이지0|0|1|1|1|
  |스테이지1|20|2|1, 2|
  |스테이지2|100|2|1, 2, 3|
  |스테이지3|200|2|2, 3, 4|
  |스테이지4|400|2|2, 3, 4, 5|
  |스테이지5|800|2|4, 5, 6|
  |스테이지6|1600|2|5, 6|
  
  

---

10.08 점수 로직 수정 추가