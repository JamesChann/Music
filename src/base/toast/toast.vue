<template>
  <transition name="fade">
    <div class="toast">刷新成功</div>
  </transition>
</template>

<script>

</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.toast
  position: fixed
  top: 50%
  left: 0
  right: 0
  width: 100px
  margin-left: auto
  margin-right: auto
  transform: translateY(-50%)
  text-align: center
  border-radius: 5px
  z-index: 1000
  color: $color-text-f
  font-size: $font-size-small
  padding: 10px 0
  background-color: $color-background-b
.fade-enter-active, .fade-leave-active
  transition: all 1s
.fade-enter, .fade-leave-to
  opacity: 0
</style>
