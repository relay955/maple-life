<script lang="ts">
  import Space from "./Space.svelte";

  export let title = "";
  export let isOpen = false;
  export let onClose: () => void = ()=>{};
  export let onEnter: () => void = ()=>{};


  const onClickOuter = (e: MouseEvent) => {
    if(e.target !== e.currentTarget) return;
    onClose();
  }
  const onKeyPress = (e: KeyboardEvent) => {
    if(e.key === "Enter"){
      onEnter();
    }
  }
</script>

<div class={`Popup ${isOpen?"opened":""}`}
            on:mousedown={onClickOuter} on:keypress={onKeyPress}>
  <div class="inner-item">
    <div style="display:flex; margin-bottom:10px; height:25px">
      <div class="title">{title}</div>
      <Space/>
      <div class="close-button" on:click={onClose}>
        X
      </div>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</div>

<style lang="scss">
  .close-icon{
    width:25px;
    height:25px;
  }
  .Popup {
    visibility: hidden;
    position: fixed;
    display: flex;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
    transition: 0.3s all;
    z-index: 10;
    left: 0;
    top: 0;

    .inner-item {
      position: relative;
      background: rgba(240,240,240);
      border:1px solid lightgrey;
      border-radius: 10px;
      opacity: 0;
      min-width: 400px;
      min-height: 130px;
      transform: scale(0.8);
      margin: auto;
      padding: 20px;
      box-sizing: border-box;
      transition: 0.3s all;

      .title {
        font-weight: bold;
      }
    }

    &.opened {
      visibility: visible;
      background-color: rgba(0,0,0,0.3);

      .inner-item {
        opacity: 1;
        transform: scale(1);
      }
    }

    .close-button{
      cursor:pointer;
      .close-icon{
        width:25px;
        height:25px;
      }
    }
    .content{
      text-align: left;
    }
  }

</style>
