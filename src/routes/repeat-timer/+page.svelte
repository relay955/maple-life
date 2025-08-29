<script lang="ts">
import Button from "../../components/basicComponent/Button.svelte";
import PageContainer from "../../components/basicComponent/PageContainer.svelte";
import Title from "../../components/basicComponent/Title.svelte";
import DraggableOverlay from "./DraggableOverlay.svelte";


let videoEl: HTMLVideoElement | null = null;
let currentStream: MediaStream | null = null;

const onClickStartScreenCapture = async () => {
  if (videoEl === null) return;
  try {
    // 기존 스트림이 있으면 정리
    if (currentStream) {
      currentStream.getTracks().forEach((t) => t.stop());
      currentStream = null;
    }

    currentStream = await navigator.mediaDevices.getDisplayMedia({
      video: {
        displaySurface: "monitor",
        frameRate: 15
      },
      audio: false
    });

    videoEl.srcObject = currentStream;
    // 자동재생 시도, 자동재생이 막히면 muted로 재시도
    await videoEl.play().catch(() => {
      videoEl!.muted = true;
      return videoEl?.play();
    });

    // 사용자가 브라우저 UI에서 "공유 중지"를 누를 수 있으므로 이벤트 처리
    const [videoTrack] = currentStream.getVideoTracks();
    if (videoTrack) {
      videoTrack.onended = () => {
        videoEl!.srcObject = null;
        currentStream = null;
      };
    }
  } catch (err) {
    alert("화면 캡처 권한이 거부되었거나 지원되지 않습니다.");
  }
}
</script>

<PageContainer>
  <Title text="파운틴 타이머"/>
  <!--  설정 프리셋-->
  <div class="settings">
    알림 시간
    <input type="number" style="width: 50px;" />
    초
  </div>
  <div class="horizontal-center">
  <div class="display-area">
    <video class="display" bind:this={videoEl} autoplay muted></video>
    <DraggableOverlay/>
  </div>
  </div>
  <Button onClick={onClickStartScreenCapture}>녹화 시작</Button>
</PageContainer>

<style lang="scss">
  .settings{
    display: flex;
    gap: 5px;
    margin-bottom: 20px;
    align-items: center;
    background-color: #f1f1f1;
    border-radius: 5px;
    padding: 8px;
  }
  .horizontal-center{
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  .display-area{
    position: relative;
    .display{
      position: relative;
      height: 600px;
      width: auto;
      min-width: 800px;
      border: 1px solid #dddddd;
    }
  }
  .horizontal-center{
    display: flex;
    justify-content: center;
  }
  
</style>
