<template>
  <transition name="slide">
    <div class="userInfo">
      <c-header title="个人信息"></c-header>
      <div class="introduce">个人信息介绍</div>
    </div>
  </transition>
</template>

<script>
import CHeader from 'base/c-header/c-header'

export default {
  name: 'UserInfo',
  components: {
    CHeader
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.userInfo
  position: fixed
  z-index: 500
  top: 0
  left: 0
  right: 0
  bottom: 0
  overflow: hidden
  background: $color-background
  color: #424242
  .introduce
    position: absolute
    top: 65px
    left: 0
.slide-enter-active, .slide-leave-active
  transition: all 0.3s
.slide-enter, .slide-leave-to
  opacity: 0
  transform: translate3d(100%, 0, 0)
</style>
