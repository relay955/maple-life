<script lang="ts">
  import Toolbar from "../components/app/main/Toolbar.svelte";
  import Logo from "../components/app/main/Logo.svelte";
  import Title from "../components/shared/Title.svelte";
  import DragDropList from "../components/shared/DragDropList.svelte";
  import type {Character} from "../storage/dto/character";
  import type {Todo} from "../storage/dto/todo";
  import LargeCheckBox from "../components/shared/LargeCheckBox.svelte";
  import Label from "../components/shared/Label.svelte";
  import {loadTodos, saveTodos} from "../storage/storage";
  import {onMount} from "svelte";
  import MdAddCircleOutline from 'svelte-icons/md/MdAddCircleOutline.svelte'
  import Modal from "../components/shared/Modal.svelte";

  onMount(()=>{
    const loadedTodos = loadTodos();
    if(loadedTodos.length > 0) todos = loadedTodos;
  })

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

  let isAddTodoModalOpen = false;

  function onClickCheckbox(item:Todo, character:Character|undefined = undefined) {
    if(character === undefined){
      if(item.isChecked === "checked") {
        item.isChecked = "unchecked";
      }else if(item.isChecked === "unchecked"){
        item.isChecked = "checked";
      }
    }else{
      const targetCharacterChecked = item.isChecked[character.name];
      if(targetCharacterChecked === "checked") {
        item.isChecked[character.name] = "unchecked";
      }else if(targetCharacterChecked === "unchecked" || targetCharacterChecked === undefined){
        item.isChecked[character.name] = "checked";
      }
    }
    todos = todos
    saveTodos(todos)
  }

  function onMoveTodo(){
    todos = todos
    saveTodos(todos)
  }

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
    <DragDropList bind:data={todos} let:slotProps={item} onMove={onMoveTodo}>
      <div class="item-title-container">
        {#if item.repeatType === "daily"}
          <Label color="#70a5e0">일일</Label>
        {/if}
        {#if item.repeatType === "weeklyMonday"}
          <Label color="#e3b676">주간(월)</Label>
        {/if}
        {#if item.repeatType === "weeklyTuesday"}
          <Label color="#e3b676">주간(목)</Label>
        {/if}
        {#if item.repeatType === "monthly"}
          <Label color="#e376e1">월간</Label>
        {/if}
        <div class="title" style={`color:${item.color}`}>
          {item.name}
        </div>
      </div>
      {#if item.type === "perCharacter"}
        <div class="item-checkbox-lists">
          {#each characters as character}
            <LargeCheckBox
              onClick={()=>onClickCheckbox(item, character)}
              checked={item.isChecked[character.name] ?? "unchecked"}/>
          {/each}
        </div>
      {/if}
      {#if item.type === "perAccount"}
        <LargeCheckBox
          onClick={()=>onClickCheckbox(item)}
          checked="{item.isChecked}"/>
      {/if}
    </DragDropList>
    <div class="add-todo-button" on:click={()=>isAddTodoModalOpen = true}>
      <MdAddCircleOutline/>
    </div>
  </div>
  <Modal title="할일 생성" isOpen={isAddTodoModalOpen}
         onClose={()=>isAddTodoModalOpen = false}/>
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
  .item-title-container{
    display: inline-flex;
    min-width:500px;
    align-items: center;
    .title{
      font-size: 16px;
      margin-left: 10px;
    }
  }
  .item-checkbox-lists{
    display: flex;
    flex-grow: 1;
  }
  .add-todo-button{
    box-sizing: border-box;
    width: 100%;
    height:40px;
    display: flex;
    border: 1px solid #589de1;
    border-radius: 4px;
    padding-top:2px;
    padding-bottom:2px;
    background-color: white;
    align-items: center;
    margin-top: 5px;
    cursor: pointer;
    color: #589de1;
    transition: 0.2s all;
  }
  .add-todo-button:hover{
    background-color: #cce3fa;
  }
</style>

