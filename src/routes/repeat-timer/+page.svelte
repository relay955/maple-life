<script lang="ts">
import Button from "../../components/basicComponent/Button.svelte";
import PageContainer from "../../components/basicComponent/PageContainer.svelte";
import Title from "../../components/basicComponent/Title.svelte";

const onClick = () => {
  
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
    <div class="display">
      
    </div>
  </div>
  <Button onClick={onClick}>녹화 시작</Button>
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
  .display{
    width: 50vw;
    max-width: 100%; 
    border: 1px solid #dddddd;
    height: 25vw;
    margin-bottom: 20px;
  }
  .horizontal-center{
    display: flex;
    justify-content: center;
  }
  
</style>
