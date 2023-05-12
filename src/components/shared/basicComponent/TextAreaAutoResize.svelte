<script>
  export let value = '';
  export let onUpdate = (e) => {};

  let maxRows = 20;
  let maxHeight;
  $: maxHeight = maxRows ? `${1 + maxRows * 1}em` : `auto`;
</script>

<div class="container">
	<pre
    aria-hidden="true"
    style="max-height: {maxHeight}"
  >{value + '\n'}</pre>

  <textarea on:input={onUpdate}>{value}</textarea>
</div>

<style>
  .container {
    position: relative;
  }

  pre, textarea {
    font-family: inherit;
    padding: 0.5em;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid rgb(190,190,190);
    line-height: 1.2;
    overflow: auto;
  }

  textarea {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    resize: none;
  }
</style>
