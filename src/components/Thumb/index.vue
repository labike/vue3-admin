<template>
  <div
    class="thumb"
    :style="{zIndex: zIndex, width: width, height: height}"
  >
    <div class="info">
      <div class="info-role">
        <slot />
      </div>
    </div>
    <div :style="{backgroundImage: `url(${image})`}" class="img"></div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  image: {
    type: String
  },
  zIndex: {
    type: Number,
    default: 1
  },
  width: {
    type: String,
    default: '150px'
  },
  height: {
    type: String,
    default: '150px'
  }
})
</script>

<style lang="scss" scoped>
.thumb {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  cursor: pointer;
  display: inline-block;
  position: relative;
  box-shadow: 0 1px 3px grba(0, 0, 0, 0.2);

  .info {
    position: absolute;
    width: inherit;
    height: inherit;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: inset 0 0 0 5px rgba(0, 0, 0, 0.05);
    .info-role {
      padding: 20px;
      text-align: center;
    }
  }

  .img {
    width: 100%;
    height: 100%;
    background-position: center center;
    background-size: cover;
    border-radius: 50%;
    overflow: hidden;
    position: absolute;
    transform-origin: 95% 40%;
    transition: all 0.3s ease-in-out;
  }
}

.thumb:hover .img {
  transform: rotate(-110deg);
}

.thumb:hover .info p a {
  opacity: 1;
  transform: translateX(0px) rotate(0deg);
}
</style>
