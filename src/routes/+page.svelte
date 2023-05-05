<script lang="ts">
  import Toolbar from "../components/app/main/Toolbar.svelte";
  import Logo from "../components/app/main/Logo.svelte";
  import DragDropList from "../components/shared/DragDropList.svelte";
  import type {Character} from "../storage/dto/character";
  import type {Todo} from "../storage/dto/todo";
  import LargeCheckBox from "../components/shared/LargeCheckBox.svelte";
  import Label from "../components/shared/Label.svelte";
  import {loadCharacters, loadSystemInfo, loadTodos, saveSystemInfo, saveTodos} from "../storage/storage";
  import {onMount} from "svelte";
  import MdAddCircleOutline from 'svelte-icons/md/MdAddCircleOutline.svelte'
  import TodoEditModal from "../components/app/main/TodoEditModal.svelte";
  import moment from "moment";
  import {getDefaultCharacters, getDefaultTodos} from "$lib/preset/defaultItems";

  let characters:Character[] = [];
  let todos:Todo[] = []
  let isAddTodoModalOpen = false;

  onMount(()=>{
    const loadedCharacters = loadCharacters();
    characters = loadedCharacters.length > 0 ? loadedCharacters : getDefaultCharacters();
    const loadedTodos = loadTodos();
    todos = loadedTodos.length > 0 ? loadedTodos : getDefaultTodos();

    setInterval(()=>{
      let systemInfo = loadSystemInfo();
      const lastUpdated = moment(systemInfo.lastUpdated);
      const today = moment().startOf('day')

      if(today.isAfter(lastUpdated)) {
        //일퀘/월요일주간퀘/목요일주간퀘/월간퀘 초기화
        todos.forEach(todo=>{
          if (todo.repeatType === "daily" ||
            (todo.repeatType === "weeklyMonday" && today.day() === 1) ||
            (todo.repeatType === "weeklyThursday" && today.day() === 4) ||
            (todo.repeatType === "monthly" && today.date() === 1)) {

            if (todo.type === "perCharacter") {
              Object.keys(todo.isChecked as object).forEach(key =>
                todo.isChecked[key] = todo.isChecked[key] === "blocked" ? "blocked" : "unchecked"
              )
            } else {
              todo.isChecked = "unchecked";
            }
          }
        })

        systemInfo.lastUpdated = moment().format("YYYY-MM-DD")
        saveSystemInfo(systemInfo)
        todos = todos
      }
    },1000)
  })

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

  const onAddTodo = (todo:Todo) => {
    //이미 이름 같은게 있을경우 key 에러가 발생하므로 예외처리
    if(todos.some(target=>target.name === todo.name))return;

    todos.push(todo);
    todos = todos
    saveTodos(todos)
    isAddTodoModalOpen = false;
  }

</script>

<Logo/>
<Toolbar/>
<div class="main">
  <div class="container">
    <div class="header">
      <div class="title">할일</div>
      {#each characters as character (character.name)}
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
    <DragDropList bind:data={todos} let:slotProps={item} onMove={onMoveTodo} dataIdField="name">
      <div class="item-title-container">
        {#if item.repeatType === "daily"}
          <Label color="#70a5e0">일일</Label>
        {/if}
        {#if item.repeatType === "weeklyMonday"}
          <Label color="#e3b676">주간(월)</Label>
        {/if}
        {#if item.repeatType === "weeklyThursday"}
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
          {#each characters as character (character.name)}
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
  <TodoEditModal isOpen="{isAddTodoModalOpen}"
                 onClose={()=>isAddTodoModalOpen = false}
                 onSubmit={onAddTodo}
  />
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

