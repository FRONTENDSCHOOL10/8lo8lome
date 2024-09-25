# 8lo8lome 파이널 프로젝트

### [배포사이트](https://daitgym.netlify.app)

<div align="center" style="width: 600px; display: flex; justify-content: space-around;">
  <!-- 첫 번째 계정 -->
  <div style="text-align: center; width: 45%;">
    <h3>🕹️ 유저 계정 🕹️</h3>
    <h4>ID</h4>
    <code>user1234@naver.com</code>
    <h4>PASSWORD</h4>
    <code>user1234</code>
  </div>

  <!-- 두 번째 계정 -->
  <div style="text-align: center; width: 45%;">
    <h3>🕹️ 헬스장 계정 🕹️</h3>
    <h4>ID</h4>
    <code>admin1234@naver.com</code>
    <h4>PASSWORD</h4>
    <code>admin1234</code>
  </div>
</div>

</code>
<br />
<hr />

## 목차

- [프로젝트 개요](#프로젝트-개요)
- [유저 플로우](#유저-플로우)
- [화면 구성 & 구현 기능](#화면-구성--구현-기능)
- [기술 스택](#기술-스택)

## 프로젝트 개요

<div align="center" style="width: 600px; display: flex; flex-direction:column; justify-content: center; align-items:center;">
  
내 주변 헬스장 가격, 한눈에 비교!
  
!["다있짐 로고"](home.png)

 <img src="https://camo.githubusercontent.com/6e80a95085a1542f23ab220fa181eb8771c218a67fdc7a736043c47bc4ac8ed6/68747470733a2f2f6170702e6e65746c6966792e636f6d2f71722d636f64652f65794a30655841694f694a4b563151694c434a68624763694f694a49557a49314e694a392e65794a31636d77694f694a6f64485277637a6f764c32526c6347787665533177636d5632615756334c5445344d5330745a47467064476435625335755a58527361575a354c6d467763434a392e66794b5f77466e437766465a48795167584f52533752596156527a6e4a677752447643793032555035496b" alt="QR Code" data-canonical-src="https://app.netlify.com/qr-code/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL2RlcGxveS1wcmV2aWV3LTE4MS0tZGFpdGd5bS5uZXRsaWZ5LmFwcCJ9.fyK_wFnCwfFZHyQgXORS7RYaVRznJgwRDvCy02UP5Ik" style="width: 40%;">
 
 </div>

## 유저 플로우

!["유저 플로우"](image.png)

---

## 화면 구성 & 구현 기능

<div align="center" style="width: 600px; display: flex; flex-direction: column; align-items: center">

### 유저 서비스

**회원가입 및 로그인**  
![회원가입_로그인](https://github.com/user-attachments/assets/031655a4-4310-4f91-90a0-cef72bfb7ed2)

**이메일찾기, 비밀번호 변경**  
![이메일찾기_비밀번호변경](https://github.com/user-attachments/assets/3753d31b-7c70-46b2-b0de-707964f96a05)

**로그아웃, 회원탈퇴**  
![로그아웃_회원탈퇴](https://github.com/user-attachments/assets/896d8a5c-e2e2-4c05-8a8c-23f698f395da)

**프로필 이미지변경, 이메일 변경, 닉네임 변경**  
![프로필변경](https://github.com/user-attachments/assets/c3a039c8-bee0-4253-9c1a-3bef3dd44883)

### 위치 서비스 및 필터

**현재 위치를 기반으로 가장 가까운 헬스장을 보여주며 설정 위치를 변경도 가능합니다.**  
![위치서비스](https://github.com/user-attachments/assets/d4532bad-63d0-42fc-ab9b-e8f07321315b)

**검색과 필터를 사용하여 원하는 항목을 볼 수 있습니다**  
![필터](https://github.com/user-attachments/assets/5cd580e4-4a12-41c0-9477-82ad7431c154)

### 헬스장 상세 페이지
**가격, 운영 시간, 트레이너 정보, 리뷰, 환불 규정 등을 확인할 수 있습니다.**  
![헬스장디테일_리뷰](https://github.com/user-attachments/assets/f5600bd6-f0e1-4773-bb3e-d1043353a24c)


### 결제 기능

**헬스장 이용권과 PT 이용권의 가격을 비교하고 선택할 수 있으며, 회원복 및 락커 요금도 선택한 개월 수에 맞게 추가됩니다. 결제 내역도 확인할 수 있습니다.**  
![결제](https://github.com/user-attachments/assets/9891234b-f3f5-41d3-843d-ddcc006fa1eb)

### 채팅 기능

**헬스장과 실시간 상담 기능을 제공하며, 채팅방 목록을 최신순으로 정렬하여 보여줍니다. 채팅방 삭제 및 채팅 내역 삭제도 가능합니다.**  
![채팅](https://github.com/user-attachments/assets/f6e2a33e-6026-4cad-8e77-9a37d6c19f34)



### 찜 기능

**관심 있는 헬스장을 찜 목록에 추가 및 관리할 수 있으며, 찜한 헬스장은 언제든지 찜 해제 가능합니다.**  
![찜](https://github.com/user-attachments/assets/ba04e859-6d69-4f14-b3d1-d1e590414f53)

</div>


---

## 회고

| 팀원   | 회고 내용                                                                                                                                                                                                   |
| ------   | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 최다경   | 꾸준하고 소통을 잘해 주는 팀원분들을 만나 리액트와 포켓 베이스에 대해서 알게 된 것이 많아 좋았다. 그리고 프로젝트를 하면서 어떻게 공부를 해야 하는지 방향을 잡을 수 있는 경험이었습니다.                    |
| 이희재   | 이 과정을 거치면서 신경 써야 할 부분과 배워야 할 것들이 점점 많아진다는 것을 느꼈다. 아직도 해결해야 할 어려움이 많지만, 이러한 경험들을 통해 성장에 큰 도움이 되었다고 생각합니다.                         |
| 이예린   | 피그마와 리액트에 더 익숙해 질 있었다. 수업때 잘 이해하지 못했던 부분도 직접 부딛쳐보면서 수업 내용이 이해가 가기도 했다. 바닐라 프로젝트를 진행했을때 보다 얼마나 성장했는지 확인해 볼 수 있는 시간이었다! |
| 오정호   | 부족한 점을 개선해 나갈 수 있는 좋은 시간이었다. 협업과 의사소통 능력이 개발 능력만큼 중요하다는 걸 알게 되는 좋은 경험이었습니다.                                                                          |

---

### 기술 스택

**프론트엔드 개발**

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![PocketBase](https://img.shields.io/badge/pocketbase-%236CFF.svg?style=for-the-badge&logo=pocketbase&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)

### 프로그래밍 언어

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

### 스타일링

![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

### 도구 및 플랫폼

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)

### 메신저

![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)
![Discord](https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white)

---

</div>
