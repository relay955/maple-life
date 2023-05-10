<script lang="ts">
  import type {Character} from "../../../storage/dto/character";
  import MdFavoriteBorder from 'svelte-icons/md/MdFavoriteBorder.svelte'
  import IconButton from "../../shared/IconButton.svelte";
  import MdHelpOutline from 'svelte-icons/md/MdHelpOutline.svelte'
  import Modal from "../../shared/Modal.svelte";
  import type {Todo} from "../../../storage/dto/todo";
  import ProgressBar from "@okrad/svelte-progressbar";
  import {liveQuery} from "dexie";
  import {idb} from "../../../storage/idb";
  import type {Account} from "../../../storage/dto/account";
  import {characterQuery} from "../../../storage/queries/characterQuery";
  import {toast} from "@zerodevx/svelte-toast";
  import {calcAccountCharacterCount} from "../../../storage/dto/account.js";
  import type {AccountWorld} from "../../../storage/dto/world";
  import {WorldList} from "../../../storage/dto/world";

  export let onClickCharacter:(character:Character)=>void;
  export let onClickAccountBar:(account:Account)=>void;

  let characterTree = liveQuery(characterQuery.generateCharacterTree)
  let todos = liveQuery(async () => await idb.todo.toArray());
  let showCharacterPreview =
    liveQuery(async () => (await idb.settings.get("showCharacterPreview"))?.value);

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

  let effectiveHeight = 40;

  let dragCharacter:Character|undefined = undefined;
  let dragAccount:Account|undefined = undefined;
  let dragWorld:AccountWorld|undefined = undefined;
  let isOpenHelpModal = false;

  characterTree.subscribe((value)=>{
    isMultiAccount = value.length > 1;
    isMultiWorld = value.some(account => (account.worlds?.length ?? 0) > 1)
  })

  todos.subscribe(async (value) => {
    checkedDailyTodoCount = 0;
    uncheckedDailyTodoCount = 0;
    checkedWeeklyTodoCount = 0;
    uncheckedWeeklyTodoCount = 0;

    let localCharacterTree = await characterQuery.generateCharacterTree()
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
        if (todo.isChecked[key] === "checked") addCheckedTodoCount(todo)
        else if (todo.isChecked[key] === "unchecked") addUncheckedTodoCount(todo)
        else if (todo.isChecked[key] === undefined) addUncheckedTodoCount(todo)
      })
    })

    totalDailyTodoCount = checkedDailyTodoCount + uncheckedDailyTodoCount;
    totalWeeklyTodoCount = checkedWeeklyTodoCount + uncheckedWeeklyTodoCount;
    dailyCheckProgress = totalDailyTodoCount === 0 ? 0 : Math.round(checkedDailyTodoCount / totalDailyTodoCount * 100);
    weeklyCheckProgress = totalWeeklyTodoCount === 0 ? 0 : Math.round(checkedWeeklyTodoCount / totalWeeklyTodoCount * 100);
  })

  function addCheckedTodoCount(todo:Todo){
    if(todo.repeatType === "daily"){
      checkedDailyTodoCount++;
    }else{
      checkedWeeklyTodoCount++
    }
  }

  function addUncheckedTodoCount(todo:Todo){
    if(todo.repeatType === "daily"){
      uncheckedDailyTodoCount++;
    }else{
      uncheckedWeeklyTodoCount++;
    }
  }


  $:{
    effectiveHeight = 50;
    if(isMultiWorld) effectiveHeight += 10;
    if(isMultiAccount) effectiveHeight += 10;
    if($showCharacterPreview) effectiveHeight += 50;
  }

  const onDragStartCharacter = (e:Event,character:Character)=> dragCharacter = character
  const onDragOverCharacter = (e:Event)=> e.preventDefault()
  const onDragEndCharacter = async (e: Event, character: Character) => {
    e.preventDefault()
    if (dragCharacter !== undefined) {
      if (character.accountId !== dragCharacter?.accountId || character.worldId !== dragCharacter?.worldId) {
        toast.push("캐릭터 이동은 동일한 계정, 월드에서만 가능합니다. 계정/월드의 순서는 윗부분을 드래그하여 옮겨주세요. ")
        resetDragState()
        return;
      }
      await swapCharacter(character, dragCharacter)

    } else if (dragAccount !== undefined) {
      const targetAccount = await idb.account.get(character.accountId)
      await swapAccount(dragAccount, targetAccount!)

    }else if(dragWorld !== undefined){
      const targetWorld = await idb.accountWorld.get(character.worldId)
      if(targetWorld!.accountId !== dragWorld.accountId){
        toast.push("월드 이동은 동일한 계정에서만 가능합니다. 계정의 순서는 윗부분을 드래그하여 옮겨주세요. ")
        resetDragState()
        return;
      }
      await swapWorld(dragWorld, targetWorld!)
    }
    resetDragState()
  }

  const onDragStartAccount = (e:Event,account:Account)=> dragAccount = account
  const onDragOverAccount = (e:Event)=> e.preventDefault()
  const onDragEndAccount = async (e: Event, account: Account) => {
    e.preventDefault()
    if (dragAccount !== undefined) {
      await swapAccount(account, dragAccount)
    }
    resetDragState()
  }

  const onDragStartWorld = (e:Event,world:AccountWorld)=> dragWorld = world
  const onDragOverWorld = (e:Event)=> e.preventDefault()
  const onDragEndWorld = async (e: Event, world: AccountWorld) => {
    e.preventDefault()
    if (dragWorld !== undefined) {
      if(world!.accountId !== dragWorld.accountId){
        toast.push("월드 이동은 동일한 계정에서만 가능합니다. 계정의 순서는 윗부분을 드래그하여 옮겨주세요. ")
        resetDragState()
        return;
      }
      await swapWorld(world, dragWorld)
    } else if (dragAccount !==undefined){
      const targetAccount = await idb.account.get(world.accountId)
      await swapAccount(dragAccount,targetAccount!)
    }
    resetDragState()
  }


  const swapCharacter = async (character: Character, targetCharacter: Character) => {
    const temp = character.order
    character.order = targetCharacter.order
    targetCharacter.order = temp;

    await idb.character.bulkPut([character, targetCharacter])
  }

  const swapAccount = async (account: Account, targetAccount: Account) => {
    const temp = account.order
    account.order = targetAccount.order
    targetAccount.order = temp;

    await idb.account.bulkPut([account, targetAccount])
  }

  const swapWorld = async (world: AccountWorld, targetWorld: AccountWorld) => {
    const temp = world.order
    world.order = targetWorld.order
    targetWorld.order = temp;

    await idb.accountWorld.bulkPut([world, targetWorld])
  }

  const resetDragState = () => {
    dragCharacter = undefined;
    dragAccount = undefined;
    dragWorld = undefined;
  }

</script>
<div class={`${$showCharacterPreview ? "":"hidden-image"} header`}  style={`height:${effectiveHeight}px`}>
  <div class="title">
    <div class="text">
    할일
    </div>
    <IconButton direction="bottom" onClick={()=>isOpenHelpModal=true} style="margin-right: 5px">
      <MdHelpOutline/>
    </IconButton>
    <div class="progress-bar-list">
<!--      #ace594-->
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

  {#each ($characterTree ?? []) as account,i (account.id)}
  {#if calcAccountCharacterCount(account) > 0}
  <div class="account" style={`flex-grow:${calcAccountCharacterCount(account)}`}>
    {#if isMultiAccount}
    <div class="account-bar"
          draggable="true"
           on:click={()=>onClickAccountBar(account)}
          on:dragstart={(e)=>onDragStartAccount(e,account)}
          on:dragover={onDragOverAccount}
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
             on:dragover={onDragOverWorld}
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
               on:dragover={onDragOverCharacter}
               on:drop={(e)=>onDragEndCharacter(e,character)}>
            {#if character.imgUrl !== ""}
              <div class='img'
                   style={`background:url(${character.imgUrl})`}></div>
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
<Modal isOpen={isOpenHelpModal} onClose={()=>isOpenHelpModal = false} title="기본 사용방법">
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
      height: 50px;
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
      height: 130px;

      &.hidden-image{
        height: 80px;
      }

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
          &.multi-world{
            width:30px;
            height:30px;
          }
          &.multi-account{
            width:25px !important;
            height:25px !important;
          }
        }

        .default-img {
          width: 30px;
          height: 30px;
          padding: 3px;
          &.multi-world{
            width:25px;
            height:25px;
          }
          &.multi-account{
            width:20px !important;
            height:20px !important;
          }
        }
      }

    }
  }

  .usage-modal{
    font-size: 15px;
    color: #373737;
  }
</style>
