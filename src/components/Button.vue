<template>
  <div class="">
    <button ref="btnRef" v-on:mouseenter="toggleTooltip()" v-on:mouseleave="toggleTooltip()" class="relative">
      <slot></slot>
      <div ref="tooltipRef"  :class="{'hidden': !tooltipShow, 'flex items-center': tooltipShow}">
        <p class="bg-black opacity-50 -right-8 bottom-5 z-10 text-white inline py-2 px-4 rounded-md absolute">{{ tooltip }}</p>
      </div>
    </button>
  </div>
</template>

<script>
import {createPopper} from '@popperjs/core';

export default {
  props: ['tooltip'],
  data(){
    return {
      tooltipShow: false
    }
  },
  methods: {
    toggleTooltip: function(){
      if(this.tooltipShow){
        this.tooltipShow = false;
      } else {
        this.tooltipShow = true;
        createPopper(this.$refs.btnRef, this.$refs.tooltipRef, {
          placement: "top"
        });
      }
    }
  }
}
</script>