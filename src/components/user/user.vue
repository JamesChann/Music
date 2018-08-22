<template>
  <transition name="slide">
    <div class="user"
         @touchstart.prevent="userTouchStart"
         @touchmove.prevent="userTouchMove"
         @touchend="userTouchEnd"
         ref="user"
    >
      <div class="user-cont" @touchstart.stop>
        <div class="cont-header">
          <div class="user-pic">
            <img class="pic-img" src="~common/image/avtar.jpg" alt="">
          </div>
          <div class="user-txt">
            <span class="info">James-Chan lv3</span>
            <span class="sign">签到</span>
          </div>
        </div>
        <ul class="cont-list">
          <li class="user-item" @click="toInfo">
            <i class="iconfont icon-info"></i>
            <span class="item-txt">作者信息</span>
          </li>
          <li class="user-item">
            <i class="iconfont icon-appinfo"></i>
            <span class="item-txt">应用信息</span>
          </li>
          <li class="user-item">
            <i class="iconfont icon-huiyuan"></i>
            <span class="item-txt">会员中心</span>
          </li>
          <li class="user-item">
            <i class="iconfont icon-cloth"></i>
            <span class="item-txt">个性换肤</span>
          </li>
          <li class="user-item">
            <i class="iconfont icon-shopping"></i>
            <span class="item-txt">商城</span>
          </li>
        </ul>
      </div>
      <div class="mask-cont"></div>
    </div>
  </transition>
</template>

<script>

export default {
  name: 'User',
  created() {
    this.touch = {}
  },
  methods: {
    hide() {
      this.$emit('hide')
    },
    userTouchStart(e) {
      this.touch.initiated = true
      const touch = e.touches[0]
      this.touch.startX = touch.pageX
    },
    userTouchMove(e) {
      if (!this.touch.initiated) {
        return
      }
      const touch = e.touches[0]
      const deltaX = touch.pageX - this.touch.startX
      if (deltaX >= 0) {
        return
      }
      const totalX = document.body.offsetWidth
      let movePoint = deltaX / totalX
      if (movePoint > 0 || movePoint < -0.8) {
        return
      }
      let percent = this._toPercent(movePoint)
      this.$refs.user.style.left = `${percent}`
    },
    userTouchEnd() {
      this.touch.initiated = false
      this.hide()
      this.$refs.user.style.left = 0
    },
    toInfo() {
      console.log(0)
      this.$router.push({
        path: '/user-info'
      })
    },
    _toPercent(point) {
      let str = Number(point * 100).toFixed(1)
      str += '%'
      return str
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

.user
  position: fixed
  z-index: 200
  width: 100%
  top: 0
  bottom: 0
  background: transparent
  .user-cont
    position: absolute
    z-index: 200
    width: 70%
    height: 100%
    background: $color-background
    .cont-header
      width: 100%
      height: 130px
      background: $color-text-b
      .user-pic
        width: 100%
        box-sizing: border-box
        text-align: left
        padding-top: 30px
        padding-left: 10px
        .pic-img
          width: 60px
          box-sizing: border-box
          border-radius: 50%
      .user-txt
        width: 100%
        overflow: hidden
        box-sizing: border-box
        padding-left: 10px
        padding-top: 10px
        color: $color-text-f
        font-size: $font-size-medium
        .info
          float: left
        .sign
          padding-right: 10px
          float: right
          font-size: $font-size-small
    .cont-list
      width: 100%
      padding-top: 10px
      .user-item
        height: 50px
        line-height: 50px
        padding: 0 15px
        extend-click()
        .iconfont
          font-size: $font-size-medium
          color: $color-text-d
        .item-txt
          padding-left: 10px
          font-size: $font-size-medium
          color: $color-text-b
  .mask-cont
    position: absolute
    width: 200%
    height: 100%
    z-index: 100
    background: #000
    opacity: 0.5
    transition: opacity 1s linear
.slide-enter-active, .slide-leave-active
  transition: all 0.3s
.slide-enter, .slide-leave-to
  opacity: 0
  transform: translate3d(-100%, 0, 0)
</style>
