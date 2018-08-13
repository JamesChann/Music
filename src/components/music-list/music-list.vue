<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImg">
      <div class="play-wrapper">
        <div ref="playBtn" v-show="songs.length>0" class="play">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll :data="songs" @scroll="scroll" :probeType="probeType" :listenScroll="listenScroll" class="list" ref="list">
      <div class="song-list-wrapper">
        <song-list :songs="songs"></song-list>
      </div>
      <div class="loading-container" v-show="!songs.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import SongList from 'base/song-list/song-list'
import Loading from 'base/loading/loading'
import {prefixStyle} from 'common/js/dom'

const RESERVED_HEIGHT = 40
const transform = prefixStyle('transform')
const backdrop = prefixStyle('backdrop-filter')

export default {
  name: 'MusicList',
  components: {
    Scroll,
    SongList,
    Loading
  },
  data() {
    return {
      scrollY: 0
    }
  },
  props: {
    songs: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    },
    bgImg: {
      type: String,
      default: ''
    }
  },
  computed: {
    bgStyle() {
      return `background-image: url(${this.bgImg})`
    }
  },
  created() {
    this.probeType = 3
    this.listenScroll = true
  },
  mounted() {
    this.bgImgHeight = this.$refs.bgImg.clientHeight
    this.$refs.list.$el.style.top = `${this.bgImgHeight}px`
  },
  watch: {
    scrollY(newVal) {
      const bgImgEment = this.$refs.bgImg
      let zIndex = 0
      let scale = 1
      let blur = 0
      const percent = Math.abs(newVal / this.bgImgHeight)

      if (newVal > 0) {
        scale = 1 + percent
        zIndex = 10
      } else {
        blur = Math.min(20, percent * 20)
      }

      if (-newVal >= (this.bgImgHeight - RESERVED_HEIGHT)) {
        zIndex = 10
        bgImgEment.style.paddingTop = '0'
        bgImgEment.style.height = RESERVED_HEIGHT + 'px'
        newVal = this.bgImgHeight - RESERVED_HEIGHT
        this.$refs.playBtn.style.display = 'none'
      } else {
        bgImgEment.style.paddingTop = '70%'
        bgImgEment.style.height = 0
        this.$refs.playBtn.style.display = ''
      }

      bgImgEment.style.zIndex = zIndex
      bgImgEment.style[transform] = `scale(${scale})`
      this.$refs.filter.style[backdrop] = `blur(${blur}px)`
      this.$refs.layer.style[transform] = `translate3d(0, ${newVal}px, 0)`
    }
  },
  methods: {
    scroll(pos) {
      this.scrollY = pos.y
    },
    back() {
      this.$router.back()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
@import '~common/stylus/mixin'

.music-list
  position: fixed
  z-index: 100
  top: 0
  left: 0
  right: 0
  bottom: 0
  background: $color-background
  .back
    position: absolute
    top: 0
    left: 6px
    z-index: 50
    .icon-back
      display: block
      padding: 10px
      font-size: $font-size-large-x
      color: $color-theme
  .title
    position: absolute
    top: 0
    left: 10%
    z-index: 40
    width: 80%
    no-wrap()
    text-align: center
    line-height: 40px
    font-size: $font-size-large
    color: $color-text
  .bg-image
    position: relative
    width: 100%
    height: 0
    padding-top: 70%
    transform-origin: top
    background-size: cover
    .play-wrapper
      position: absolute
      bottom: 20px
      z-index: 50
      width: 100%
      .play
        box-sizing: border-box
        width: 135px
        padding: 7px 0
        color: $color-theme
        border: 1px solid $color-theme
        border-radius: 100px
        margin: 0 auto
        text-align: center
        font-size: 0
        .icon-play
          display: inline-block
          font-size: $font-size-medium-x
          vertical-align: middle
          margin-right: 6px
        .text
          display: inline-block
          font-size: $font-size-small
          vertical-align: middle
    .filter
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      background: rgba(7, 17, 27, 0.4)
  .bg-layer
    position: relative
    height: 100%
    background: $color-background
  .list
    position: absolute
    top: 0
    bottom: 0
    width: 100%
    background: $color-background
    .song-list-wrapper
      padding: 20px 30px
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
