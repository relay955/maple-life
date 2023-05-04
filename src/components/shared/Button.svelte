<script lang="ts">
  export let onClick:()=>void;
  export let style:string = "";

</script>
<button on:click={onClick} style={style}><slot></slot></button>

<style>
  button{
    background-color: #70a5e0;
    border: none;
    color: white;
    padding: 5px;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    width: 100%;
    transition: 0.2s all;
  }
  button:hover{
    background-color: #6391c1;
  }
</style>
