export const openFloatingTimerPip = async (window:Window) => {
  if (!window.documentPictureInPicture) {
    alert("해당 기능을 지원하지 않는 브라우저입니다. (Chrome,Edge 사용 가능)");
    return;
  }

  try {
    const pipWindow = await window.documentPictureInPicture.requestWindow({
      width: 400,
      height: 70,
    });

    // 스타일 추가
    const style = pipWindow.document.createElement('style');
    style.textContent = `
      body {
        margin: 0;
        padding: 20px;
        font-family: Arial, sans-serif;
        background: #000;
        color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        box-sizing: border-box;
      }
      .timer-display {
        font-size: 24px;
        font-weight: bold;
        text-align: center;
      }
      .status {
        font-size: 14px;
        margin-top: 10px;
        opacity: 0.8;
      }
    `;
    pipWindow.document.head.appendChild(style);
    

    // 타이머 콘텐츠 추가
    pipWindow.document.body.innerHTML = `
      <div class="timer-display" id="timer">
        1
      </div>
      <div class="status" id="status">
        2
      </div>
    `;
    return pipWindow;

  } catch (error) {
    alert("플로팅 타이머를 열 수 없습니다.");
  }
}