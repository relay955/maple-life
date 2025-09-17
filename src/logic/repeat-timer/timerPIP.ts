export const openFloatingTimerPip = async (window:Window) => {
  //@ts-ignore
  if (!window.documentPictureInPicture) {
    alert("해당 기능을 지원하지 않는 브라우저입니다. (Chrome,Edge 사용 가능)");
    return;
  }

  try {
    //@ts-ignore
    const pipWindow = await window.documentPictureInPicture.requestWindow({
      width: 400,
      height: 50,
    });

    // 스타일 추가
    const style = pipWindow.document.createElement('style');
    style.textContent = `
      body {
        margin: 0;
        padding-left: 20px;
        padding-right: 10px;
        height: 100vh;
        font-family: Arial, sans-serif;
        background: #000;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
      }
      .timer-bar {
        flex:1;
        height: 20px;
        background-color: #333;
        border-radius: 10px;
        overflow: hidden;
        margin-right:10px;
      }
      .progress {
        width: 0%;
        height: 100%;
        background-color: #44aaee;
        transition: width 0.2s linear;
      }
      .timer-text {
        font-size: 18px;
        font-weight: bold;
        min-width: 60px;
      }
      .play-pause-btn {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0 5px;
      }
      .play-pause-btn:hover {
        color: #44aaee;
      }
    `;
    pipWindow.document.head.appendChild(style);
    

    // 타이머 콘텐츠 추가
    pipWindow.document.body.innerHTML = `
      <div class="timer-bar">
        <div class="progress" id="timer"></div>
      </div>
      <div class="timer-text" id="timer-text">0초</div>
<!--      <button class="play-pause-btn" id="play-pause-btn">▌▌</button>-->
    `;
    return pipWindow;

  } catch (error) {
    alert("플로팅 타이머를 열 수 없습니다.");
  }
}


export const updateLeftSecond = (pipWindow:any, maxTick:number,  leftTick:number) => {
  const timer = pipWindow.document.getElementById('timer');
  const timerText = pipWindow.document.getElementById('timer-text');
  
  if (timer && timerText) {
    if (maxTick === 0) maxTick = 1;
    timer.style.width = `${Math.min((leftTick/maxTick)*100,100)}%`;
    timerText.textContent = `${Math.floor(leftTick/10)}초`;
    if (leftTick === 0) {
      timerText.textContent = '미탐지';
    }
  }
}