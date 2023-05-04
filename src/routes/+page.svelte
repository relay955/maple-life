<script lang="ts">
  import Toolbar from "../components/app/main/Toolbar.svelte";
  import Logo from "../components/app/main/Logo.svelte";
  import Title from "../components/shared/Title.svelte";
  import DragDropList from "../components/shared/DragDropList.svelte";
  import type {Character} from "../storage/dto/character";
  import type {Todo} from "../storage/dto/todo";
  import type {CheckedData} from "../storage/dto/checkedData";

  let characters:Character[] = [
    {
      name:"보마1",
      imgUrl:"",
      level:235,
      classType:"보우마스터"
    },
    {
      name:"썬콜",
      imgUrl:"",
      level:241,
      classType:"아크메이지 (썬,콜)"
    }
  ];

  let todos:Todo[] = [
    {
      name:"일일 보스",
      type:"perCharacter",
      repeatType:"daily"
    },
    {
      name:"주간 보스",
      type:"perCharacter",
      repeatType:"weeklyMonday"
    },
    {
      name:"심볼 일퀘",
      type:"perCharacter",
      repeatType:"daily"
    },
    {
      name:"검은 마법사",
      type:"perCharacter",
      repeatType:"monthly"
    },
    {
      name:"우르스",
      type:"perAccount",
      repeatType:"daily"
    },
    {
      name:"데일리 기프트",
      type:"perAccount",
      repeatType:"daily"
    }
  ];

  let checkedData:CheckedData[] = [

  ];
</script>

<Logo/>
<Toolbar/>
<div class="main">
  <div class="container">
    <Title text="할일"/>
    <div class="header">

    </div>
    <DragDropList bind:data={todos} let:slotProps={item}>
      <div class="item-title">{item.name}</div>
    </DragDropList>
  </div>
</div>

<style>
  .main{
    width:100%;
    text-align: center;
  }
  .container{
    text-align: left;
    display: inline-block;
    width: 1420px;
  }
  @media(max-width: 1420px){
    .container{
      width:calc(100% - 20px)
    }
  }
  .item-title{
    font-weight: bold;
    width:500px;
  }
</style>

