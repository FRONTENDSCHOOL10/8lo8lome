const MapUrl = import.meta.env.VITE_KAKAO_POSTCODE_SCRIPT_URL;
// 주소 검색 스크립트 로딩
export const loadPostcodeScript = () => {
  return new Promise((resolve, reject) => {
    if (window.daum && window.daum.Postcode) {
      resolve(); // 이미 스크립트가 로드된 경우
      return;
    }

    const existingScript = document.querySelector(`script[src="${MapUrl}"]`);
    if (existingScript) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = MapUrl;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('주소 검색 스크립트 로딩 실패'));
    document.body.appendChild(script);
  });
};
