# 웹소켓 게임 만들기
<br>

### 패킷 구조

| 필드 명 | 타입 | 설명 |
|---|---|---|
| handlerID | int | 요청을 처리할 서버 핸들러의 ID |
| userId | int | 요청을 보내는 유저의 ID
| clientVersion | string | 현재 클라이언트의 버전 |
| payload | JSON | 요청 내용  |