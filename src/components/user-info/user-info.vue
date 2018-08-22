<template>
  <transition name="slide">
    <div class="userInfo">
      <c-header title="个人信息"></c-header>
      <div class="introduce">
        <div class="introduce-top">
          <img class="avtar" src="~common/image/avtar.jpg" alt="">
        </div>
        <div class="introduce-desc">
          <p class="name">姓名： JamseChan</p>
          <p class="qq">QQ: 1435624632</p>
          <p class="email">Email: JamseChan51@163.com</p>
        </div>
      </div>
      <div class="talk">
        <p>
          作者简介: 音乐播放器的数据接口调用QQ音乐的接口，虽说功能还未完成全部，但基础小目标已经达成，还有一些细节问题
          以及漏洞需要修复，借用阮一峰大神的一句话-世上并没有拖延症，只是不想做而已。如果可能，应该尽早放弃你没有意愿去做的那些事。而那些没有时间也会去做的事，才是你应该全力以赴的人生方向。
        </p>
      </div>
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
    display: flex
    box-sizing: border-box
    .introduce-top
      box-sizing: border-box
      .avtar
        width: 80px
        height: 120px
        padding-left: 20px
    .introduce-desc
      flex: 1
      display: flex
      flex-direction: column
      justify-content: space-around
      padding-left: 20px
      font-size: $font-size-medium
      color: $color-text-b
  .talk
    position: absolute
    top: 215px
    left: 0
    display: flex
    box-sizing: border-box
    line-height: 30px
    padding: 0 20px
    font-size: $font-size-small
.slide-enter-active, .slide-leave-active
  transition: all 0.3s
.slide-enter, .slide-leave-to
  opacity: 0
  transform: translate3d(100%, 0, 0)
</style>
