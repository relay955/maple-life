<script lang="ts">
  import type {Character} from "../../../storage/dto/character";
  import MdFavoriteBorder from 'svelte-icons/md/MdFavoriteBorder.svelte'
  import IconButton from "../../shared/basicComponent/IconButton.svelte";
  import MdHelpOutline from 'svelte-icons/md/MdHelpOutline.svelte'
  import Modal from "../../shared/Modal.svelte";
  import type {Todo} from "../../../storage/dto/todo";
  import ProgressBar from "@okrad/svelte-progressbar";
  import {liveQuery} from "dexie";
  import {idb} from "../../../storage/idb";
  import type {Account} from "../../../storage/dto/account";
  import {
    generateCharacterTree,
    lqCharacterTree, swapCharacterOrder
  } from "../../../storage/queries/characterQuery";
  import {toast} from "@zerodevx/svelte-toast";
  import {calcAccountCharacterCount} from "../../../storage/dto/account.js";
  import type {AccountWorld} from "../../../storage/dto/world";
  import {WorldList} from "../../../storage/dto/world";
  import {lqTodos} from "../../../storage/queries/todoQuery";
  import {lqShowCharacterPreview} from "../../../storage/queries/systemQuery";
  import TodoHelpModal from "./TodoHeader/TodoHelpModal.svelte";
  import {swapWorldOrder} from "../../../storage/queries/worldQuery";
  import {swapAccountOrder} from "../../../storage/queries/accountQuery";

  export let onClickCharacter:(character:Character)=>void;
  export let onClickAccountBar:(account:Account)=>void;

  let screenWidth;
  let isMultiAccount = false;
  let isMultiWorld = false;

  let uncheckedDailyTodoCount = 0;
  let checkedDailyTodoCount = 0;
  let totalDailyTodoCount = 0;
  let dailyCheckProgress = 0;

  let uncheckedWeeklyTodoCount = 0;
  let checkedWeeklyTodoCount = 0;
  let totalWeeklyTodoCount = 0;
  let weeklyCheckProgress = 0;

  let effectiveHeight = 45;

  let dragCharacter:Character|undefined = undefined;
  let dragAccount:Account|undefined = undefined;
  let dragWorld:AccountWorld|undefined = undefined;
  let isOpenHelpModal = false;

  lqCharacterTree.subscribe((value)=>{
    isMultiAccount = value.length > 1;
    isMultiWorld = value.some(account => (account.worlds?.length ?? 0) > 1)
  })

  lqTodos.subscribe(async (value) => {
    checkedDailyTodoCount = 0;
    uncheckedDailyTodoCount = 0;
    checkedWeeklyTodoCount = 0;
    uncheckedWeeklyTodoCount = 0;

    let localCharacterTree = await generateCharacterTree()
    let localCharacterIds = (await idb.character.toArray()).map(character => character.id!.toString())

    value.forEach(todo => {
      let iterationTarget: string[] = []
      if (todo.type === "perCharacter") {
        iterationTarget = localCharacterIds;
      } else if (todo.type === "perWorld") {
        iterationTarget = localCharacterTree
          .map(account => account.worlds?.map(world => world.id.toString()) ?? []).flat()
      } else if (todo.type === "perAccount") {
        iterationTarget = localCharacterTree.map(account => account.id!.toString())
      }

      iterationTarget.forEach(key => {
        if (todo.isChecked[key] === "checked") {
          if (todo.repeatType === "daily") checkedDailyTodoCount++;
          else checkedWeeklyTodoCount++
        }
        else if (todo.isChecked[key] === undefined || todo.isChecked[key] === "unchecked") {
          if (todo.repeatType === "daily") uncheckedDailyTodoCount++;
          else uncheckedWeeklyTodoCount++;
        }
      })
    })

    totalDailyTodoCount = checkedDailyTodoCount + uncheckedDailyTodoCount;
    totalWeeklyTodoCount = checkedWeeklyTodoCount + uncheckedWeeklyTodoCount;
    dailyCheckProgress = totalDailyTodoCount === 0 ? 0 : Math.round(checkedDailyTodoCount / totalDailyTodoCount * 100);
    weeklyCheckProgress = totalWeeklyTodoCount === 0 ? 0 : Math.round(checkedWeeklyTodoCount / totalWeeklyTodoCount * 100);
  })

  $:{
    effectiveHeight = 45;
    if(screenWidth <= 750) effectiveHeight += 40;
    if(isMultiWorld) effectiveHeight += 17;
    if(isMultiAccount) effectiveHeight += 17;
    if($lqShowCharacterPreview) effectiveHeight += 50;
  }

  const onDragStartCharacter = (e:Event,character:Character)=> dragCharacter = character
  const onDragEndCharacter = async (e: Event, character: Character) => {
    e.preventDefault()
    if (dragAccount !== undefined) {
      const targetAccount = await idb.account.get(character.accountId)
      await swapAccountOrder(dragAccount, targetAccount!)

    } else if(dragWorld !== undefined){
      const targetWorld = await idb.accountWorld.get(character.worldId)
      if(targetWorld!.accountId !== dragWorld.accountId){
        toast.push("월드 이동은 동일한 계정에서만 가능합니다. 계정의 순서는 윗부분을 드래그하여 옮겨주세요. ")
        resetDragState()
        return;
      }
      await swapWorldOrder(dragWorld, targetWorld!)

    } else if (dragCharacter !== undefined) {
      if (character.accountId !== dragCharacter?.accountId || character.worldId !== dragCharacter?.worldId) {
        toast.push("캐릭터 이동은 동일한 계정, 월드에서만 가능합니다. 계정/월드의 순서는 윗부분을 드래그하여 옮겨주세요. ")
        resetDragState()
        return;
      }
      await swapCharacterOrder(character, dragCharacter)
    }
    resetDragState()
  }

  const onDragStartAccount = (e:Event,account:Account)=> dragAccount = account
  const onDragEndAccount = async (e: Event, account: Account) => {
    e.preventDefault()
    if (dragAccount !== undefined) await swapAccountOrder(account, dragAccount)
    resetDragState()
  }

  const onDragStartWorld = (e:Event,world:AccountWorld)=> dragWorld = world
  const onDragEndWorld = async (e: Event, world: AccountWorld) => {
    e.preventDefault()
    if(dragAccount !== undefined){
      const targetAccount = await idb.account.get(world.accountId)
      await swapAccountOrder(dragAccount,targetAccount!)

    } else if (dragWorld !== undefined) {
      if(world!.accountId !== dragWorld.accountId){
        toast.push("월드 이동은 동일한 계정에서만 가능합니다. 계정의 순서는 윗부분을 드래그하여 옮겨주세요. ")
        resetDragState()
        return;
      }
      await swapWorldOrder(world, dragWorld)
    }
    resetDragState()
  }


  const resetDragState = () => {
    dragCharacter = undefined;
    dragAccount = undefined;
    dragWorld = undefined;
  }

</script>

<svelte:window bind:innerWidth={screenWidth} />

<div class={`${$lqShowCharacterPreview ? "":"hidden-image"} header`}  style={`height:${effectiveHeight}px`}>
  <div class="title">
    <div class="text">
    할일
    </div>
    <IconButton direction="bottom" onClick={()=>isOpenHelpModal=true} style="margin-right: 5px">
      <MdHelpOutline/>
    </IconButton>
    <div class="progress-bar-list">
      <div class="progress-bar">
      <ProgressBar series={[{perc:dailyCheckProgress,color:'#70a5e0'}]}
                   height="12" textSize="65"
                   valueLabel={`일일 : ${dailyCheckProgress}% (${checkedDailyTodoCount}/${totalDailyTodoCount})`} />
      </div>
      <div class="progress-bar">
      <ProgressBar series={[{perc:weeklyCheckProgress,color:'#e3b676'}]}
                   height="12" textSize="65"
                   valueLabel={`주간 : ${weeklyCheckProgress}% (${checkedWeeklyTodoCount}/${totalWeeklyTodoCount})`} />
      </div>
    </div>
  </div>

  {#each ($lqCharacterTree ?? []) as account,i (account.id)}
  {#if calcAccountCharacterCount(account) > 0}
  <div class="account" style={`flex-grow:${calcAccountCharacterCount(account)}`}>
    {#if isMultiAccount}
    <div class="account-bar"
          draggable="true"
           on:click={()=>onClickAccountBar(account)}
          on:dragstart={(e)=>onDragStartAccount(e,account)}
          on:dragover={(e)=>e.preventDefault()}
          on:drop={(e)=>onDragEndAccount(e,account)}
         style={`border-bottom:2px solid ${i%2===0 ? "#338cc8":"#bfdbed"}`}>
      {account.name}
    </div>
    {/if}
    <div class="worlds">
      {#each account.worlds as world (world.id)}
      {#if world.characters.length > 0}
      <div class="world" style={`flex-grow:${world.characters.length}`}>
        {#if isMultiWorld}
        <div class="world-bar"
             draggable="true"
             on:dragstart={(e)=>onDragStartWorld(e,world)}
             on:dragover={(e)=>e.preventDefault()}
             on:drop={(e)=>onDragEndWorld(e,world)}
             style={`border-bottom: 2px solid ${WorldList[world.world].color}`}>
          {world.world}
        </div>
        {/if}
        <div class="characters">
          {#each world.characters as character (character.id)}
          <div class="character" on:click={()=>onClickCharacter(character)}
               draggable="true"
               on:dragstart={(e)=>onDragStartCharacter(e,character)}
               on:dragover={(e)=>e.preventDefault()}
               on:drop={(e)=>onDragEndCharacter(e,character)}>
            {#if character.imgUrl !== ""}
              <div class='img' style={`background:url(${character.imgUrl})`}>
              </div>
            {/if}
            {#if character.imgUrl === ""}
              <div class='default-img'>
                <MdFavoriteBorder/>
              </div>
            {/if}
            <div class="name">
              {character.name}
            </div>
            <div class="subtitle">
              Lv.{character.level}, {character.classType}
            </div>
          </div>
          {/each}
        </div>
      </div>
      {/if}
      {/each}
    </div>
  </div>
  {/if}
  {/each}
</div>

<TodoHelpModal bind:isOpen={isOpenHelpModal}/>

<style lang="scss">
  .header {
    position: sticky;
    top: 0;
    z-index: 5;
    padding-top: 2px;
    margin-bottom: 5px;

    display: flex;
    align-items: center;
    background-color: white;

    &.hidden-image{
      .img{
        display: none;
      }
      .default-img{
        display: none;
      }
    }

    .title {
      min-width: 500px;
      height: 100%;
      position: sticky;
      background-color: white;
      left: 50px;
      display: flex;
      align-items: center;
      .text{
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 3px;
        margin-right: 5px;
      }
    }

    .progress-bar-list{
      margin-left: 10px;
      margin-bottom: 8px;
      width:200px;
      .progress-bar{
        display: flex;
        flex-direction: row;
        margin-bottom: -6px;
      }
    }

    .account{
      display: flex;
      flex-direction: column;
      .account-bar{
        text-align: center;
        font-size: 7px;
        box-sizing: border-box;
        transition: 0.2s all;
        cursor:pointer;
      }
      .account-bar:hover{
        background-color: #f5f5f5;
      }
      .worlds{
        display:flex;
        flex-direction:row;
      }
    }

    .world{
      display:flex;
      flex-direction: column;
      .world-bar{
        text-align: center;
        font-size: 7px;
        box-sizing: border-box;
        transition: 0.2s all;
        cursor:pointer;
      }
      .world-bar:hover{
        background-color: #f5f5f5;
      }
      .characters{
        display:flex;
        flex-direction:row;
      }
    }

    .character {
      cursor: pointer;
      flex-grow: 1;
      min-width: 80px;
      width:0;
      padding-bottom: 5px;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition: 0.2s all;

      .name {
        font-size: 16px;
        width: 100%;
        font-weight: bold;
        text-align: center;
        overflow-x: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .subtitle {
        font-size: 12px;
        width: 100%;
        color: gray;
        text-align: center;
        overflow-x: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .img {
        width: 50px;
        height: 50px;
        background-position: 52% 61% !important;
        background-size: 218% !important;
      }

      .default-img {
        width: 40px;
        height: 40px;
        padding: 5px;
      }
    }

    .character:hover {
      background-color: #f5f5f5;
    }
  }

  @media (max-width: 1250px) {
    .header {
      .title {
        min-width: 300px;
        font-size: 16px;
      }
    }
  }

  @media (max-width: 750px){
    .header {
      flex-wrap: wrap;

      .title {
        width: 100%;
        height: 40px;
        font-size: 14px;
      }
      .progress-bar-list {
        flex-grow: 1;
      }

      .character {
        width: 50px;
        .name {
          font-size: 14px;
          font-weight: bold;
          text-align: center;
        }

        .subtitle {
          font-size: 10px;
          color: gray;
        }

        .img {
          width: 36px;
          height: 36px;
          background-position: 52% 61% !important;
          background-size: 218% !important;
        }

        .default-img {
          width: 30px;
          height: 30px;
          padding: 3px;
        }
      }

    }
  }
</style>
