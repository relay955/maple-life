<script>
import Modal from "../../../components/Modal.svelte";
export let isOpen;
</script>

<Modal isOpen={isOpen} onClose={()=>isOpen = false} title="기본 사용방법">
  <div class="usage-modal">
    <p>
      일일/주간/월간 해야할 일들을 확인하고 진행후 체크하시면 됩니다.<br/>
      <b>날짜가 지나면 자동으로 해당 할일이 체크해제</b>됩니다.
    </p>
    <ul>
      <li>캐릭터 추가는 <b>하단 중앙의 툴바</b>에서 할 수 있습니다.</li>
      <li>할일들을 <b>위아래로 드래그&드롭</b>하여 위치를 변경할 수 있습니다. 할일을 위에서부터 순서대로 보고싶을때 유용합니다.</li>
      <li>캐릭터들을 <b>좌우로 드래그&드롭</b>하여 위치를 변경할 수 있습니다.</li>
      <li>할일 체크박스를 우클릭하면 <b>블로킹 모드로 전환</b>할 수 있으며, 해당 캐릭터는 해당 할일을 하고싶지 않음을 표시할때 유용합니다.</li>
      <li>할일이 많을때, <b>좁은높이 모드를 사용하거나 캐릭터 사진 보기를 꺼서</b> 더 많은 할일들을 한 화면에 확인할 수 있습니다.</li>
    </ul>
  </div>
</Modal>

<style>
  .usage-modal{
    font-size: 15px;
    color: #373737;
  }
</style>
