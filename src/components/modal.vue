<template>
    <open-modal></open-modal>
</template>

<script>
Vue.component('open-modal',{
  template : `
    <div id="overlay">
        <div id="content">
          <p>これがモーダルウィンドウです。</p>
          <button v-on:click="closeModal">close</button>
        </div>
    </div>
    `
})
</script>
