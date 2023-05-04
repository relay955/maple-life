<script lang="ts">
  import Toolbar from "../components/app/main/Toolbar.svelte";
  import Logo from "../components/app/main/Logo.svelte";
  import Title from "../components/shared/Title.svelte";
  import DragDropList from "../components/shared/DragDropList.svelte";
  import type {Character} from "../storage/dto/character";
  import type {Todo} from "../storage/dto/todo";
  import LargeCheckBox from "../components/shared/LargeCheckBox.svelte";

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
      repeatType:"daily",
      isChecked:{
        "썬콜":"checked"
      }
    },
    {
      name:"주간 보스",
      type:"perCharacter",
      repeatType:"weeklyMonday",
      isChecked:{}
    },
    {
      name:"심볼 일퀘",
      type:"perCharacter",
      repeatType:"daily",
      isChecked:{}
    },
    {
      name:"검은 마법사",
      type:"perCharacter",
      repeatType:"monthly",
      isChecked:{}
    },
    {
      name:"우르스 3판",
      type:"perAccount",
      repeatType:"daily",
      isChecked:"checked"
    },
    {
      name:"데일리 기프트 수령",
      type:"perAccount",
      repeatType:"daily",
      isChecked:"unchecked"
    },
    {
      name:"몬스터 파크",
      type:"perAccount",
      repeatType:"daily",
      isChecked:"blocked"
    }
  ];
</script>

<Logo/>
<Toolbar/>
<div class="main">
  <div class="container">
    <div class="header">
      <div class="title">할일</div>
      {#each characters as character}
        <div class="character">
          <div>
            <div class="name">
              {character.name}
            </div>
            <div class="subtitle">
              Lv.{character.level}, {character.classType}
            </div>
          </div>
        </div>
      {/each}
    </div>
    <DragDropList bind:data={todos} let:slotProps={item}>
      <div class="item-title">{item.name}</div>
      {#if item.type === "perCharacter"}
        <div class="item-checkbox-lists">
          {#each characters as character}
            <LargeCheckBox checked="checked"/>
          {/each}
        </div>
      {/if}
      {#if item.type === "perAccount"}
        <LargeCheckBox checked="{item.isChecked}"/>
      {/if}
    </DragDropList>
  </div>
</div>

<style lang="scss">
  .main{
    width:100%;
    text-align: center;
  }
  .container{
    text-align: left;
    display: inline-block;
    width: 1420px;
  }
  .header{
    margin-top: 10px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    position: sticky;
    .title{
      width: 510px;
      font-size: 20px;
      font-weight: bold;
    }
    .character{
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      .name{
        font-size: 16px;
        font-weight: bold;
        text-align: center;
      }
      .subtitle{
        font-size: 12px;
        color: gray;
      }
    }
  }
  @media(max-width: 1420px){
    .container{
      width:calc(100% - 20px)
    }
  }
  .item-title{
    font-weight: bold;
    min-width:500px;
  }
  .item-checkbox-lists{
    display: flex;
    flex-grow: 1;
  }
</style>

