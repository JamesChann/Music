<template>
  <div class="progress-bar" ref="progressBar" @click.stop="progressClick">
    <div class="bar-inner" ref="barInner">
      <!--滚动条移动背景-->
      <div class="progress" ref="progress"></div>
      <!--滚动可拖动按钮-->
      <div class="progress-btn-wrapper"
           ref="progressBtn"
           @touchstart.prevent="progressTouchStart"
           @touchmove.prevent="progressTouchMove"
           @touchend="progressTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {prefixStyle} from 'common/js/dom'

const transform = prefixStyle('transform')

export default {
  name: 'ProgressBar',
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  watch: {
    percent(newVal) {
      this._initProgressMove(newVal)
    }
  },
  created() {
    this.touch = {}
  },
  methods: {
    progressTouchStart(e) {
      this.touch.initiated = true
      this.touch.startX = e.touches[0].pageX
      this.touch.left = this.$refs.progress.clientWidth
    },
    progressTouchMove(e) {
      if (!this.touch.initiated) {
        return
      }
      const deltaX = e.touches[0].pageX - this.touch.startX
      const offsetWidth = Math.min(this.$refs.progressBar.clientWidth, Math.max(0, this.touch.left + deltaX))
      this._offset(offsetWidth)
      let newPercent = offsetWidth / this.$refs.progressBar.clientWidth
      this.$emit('percentChange', newPercent)
    },
    progressTouchEnd() {
      this.touch.initiated = false
    },
    progressClick(e) {
      const offsetLeft = this.$refs.progressBar.offsetLeft
      let btnOffsetLeft = e.clientX - offsetLeft
      let newPercent = btnOffsetLeft / this.$refs.progressBar.clientWidth
      this.$emit('percentChange', newPercent)
    },
    _initProgressMove(percent) {
      const barInnerWidth = this.$refs.barInner.clientWidth
      let offsetWidth = percent * barInnerWidth
      this._offset(offsetWidth)
    },
    _offset(offsetWidth) {
      this.$refs.progress.style.width = offsetWidth + 'px'
      this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'

.progress-bar
  width: 100%
  height: 30px
  .bar-inner
    position: relative
    top: 13px
    height: 4px
    background: rgba(0, 0, 0, 0.3)
    .progress
      position: absolute
      height: 100%
      background: $color-theme
    .progress-btn-wrapper
      position: absolute
      width: 16px
      height: 16px
      top: -7px
      left: -8px
      .progress-btn
        box-sizing: border-box
        width: 16px
        height: 16px
        border-radius: 50%
        border: 3px solid $color-text-f
        background: $color-theme
</style>
