<template>
  <div class="player" v-show="playlist.length > 0">
    <transition name="normal">
      <div class="normal-player" v-show="fullScreen" @click="togglePlayMiddle">
        <!--background-->
        <div class="background">
          <img :src="currentSong.image" width="100%" height="100%">
        </div>
        <!--top-->
        <div class="top">
          <div class="back" @click.stop="back">
            <i class="icon-back"></i>
          </div>
          <h1 class="title" v-html="currentSong.name"></h1>
          <h2 class="subtitle" v-html="currentSong.singer"></h2>
        </div>
        <!--middle-->
        <div class="middle">
          <transition name="middleL">
            <div class="middle-l" v-show="toggleMidShow">
              <div class="cd-wrapper">
                <div class="cd" :class="cdCls">
                  <img :src="currentSong.image" class="image">
                </div>
              </div>
            </div>
          </transition>
          <transition name="middleR">
            <scroll class="middle-r" v-show="!toggleMidShow" ref="lyricList" :data="currentLyric && currentLyric.lines">
              <div class="lyric-wrapper">
                <div v-if="currentLyric">
                  <p class="text" ref="lyricLine" :class="{'current': currentLineNum === index}" v-for="(line, index) in currentLyric.lines" :key="index">{{ line.txt }}</p>
                </div>
              </div>
            </scroll>
          </transition>
        </div>
        <!--bottom-->
        <div class="bottom">
          <div class="dot-wrapper">
            <span class="dot" :class="{'active':currentShow==='cd'}"></span>
            <span class="dot" :class="{'active':currentShow==='lyric'}"></span>
          </div>
          <!--时间滚动条-->
          <div class="progress-wrapper">
            <span class="time time-l">{{ formalTime(currentTime) }}</span>
            <div class="progress-bar-wrapper">
              <progress-bar @percentChange="percentChange" :percent="percent"></progress-bar>
            </div>
            <span class="time time-r">{{ formalTime(currentSong.duration) }}</span>
          </div>
          <!--音乐操作区-->
          <div class="operators">
            <div class="icon i-left">
              <i class="icon-sequence"></i>
            </div>
            <div class="icon i-left" :class="disCls">
              <i class="icon-prev" @click.stop="prev"></i>
            </div>
            <div class="icon i-center" :class="disCls">
              <i :class="playIcon" @click.stop="togglePlaying"></i>
            </div>
            <div class="icon i-right" :class="disCls">
              <i class="icon-next" @click.stop="next"></i>
            </div>
            <div class="icon i-right">
              <i class="icon icon-not-favorite"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="icon">
          <div class="imgWrapper">
            <img width="40" height="40" :src="currentSong.image" :class="cdCls">
          </div>
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.name"></h2>
          <p class="desc" v-html="currentSong.singer"></p>
        </div>
        <div class="control">
          <i :class="miniIcon" @click.stop="togglePlaying"></i>
        </div>
        <div class="control" @click.stop="showPlaylist">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>
    <playlist ref="playlist"></playlist>
    <audio ref="audio" :src="currentSong.url" @timeupdate="updateTime" @canplay="ready" @error="error" @ended="end"></audio>
  </div>
</template>

<script>
import ProgressBar from 'base/progress-bar/progress-bar'
import Scroll from 'base/scroll/scroll'
import {mapGetters, mapMutations} from 'vuex'
import Lyric from 'lyric-parser'
import Playlist from 'components/playlist/playlist'

export default {
  name: 'Player',
  components: {
    ProgressBar,
    Scroll,
    Playlist
  },
  data() {
    return {
      songReady: false,
      currentTime: 0,
      currentLyric: null,
      currentLineNum: 0,
      toggleMidShow: true
    }
  },
  computed: {
    currentShow() {
      return this.toggleMidShow ? 'cd' : 'lyric'
    },
    disCls() {
      return this.songReady ? '' : 'disable'
    },
    cdCls() {
      return this.playing ? 'play' : 'play pause'
    },
    playIcon() {
      return this.playing ? 'icon-pause' : 'icon-play'
    },
    miniIcon() {
      return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
    },
    percent() {
      return this.currentTime / this.currentSong.duration
    },
    ...mapGetters([
      'fullScreen',
      'playlist',
      'currentSong',
      'playing',
      'currentIndex'
    ])
  },
  watch: {
    currentSong(newSong, oldSong) {
      if (newSong.id === oldSong.id) {
        return
      }
      if (this.currentLyric) {
        this.currentLyric.stop()
      }
      this.$nextTick(() => {
        this.$refs.audio.play()
        this.getLyric()
      })
    },
    playing(newPlaying) {
      const audio = this.$refs.audio
      this.$nextTick(() => {
        newPlaying ? audio.play() : audio.pause()
      })
    }
  },
  created() {
    this.touch = {}
  },
  methods: {
    showPlaylist() {
      this.$refs.playlist.show()
    },
    getLyric() {
      this.currentSong.getLyric().then((lyric) => {
        this.currentLyric = new Lyric(lyric, this.handleLyric)
        if (this.playing) {
          this.currentLyric.play()
        }
      })
    },
    handleLyric({lineNum, txt}) {
      this.currentLineNum = lineNum
      this.lyricLineScroll(lineNum)
    },
    lyricLineScroll(lineNum) {
      if (lineNum > 5) {
        let lineEl = this.$refs.lyricLine[lineNum - 5]
        this.$refs.lyricList.scrollToElement(lineEl, 1000)
      } else {
        this.$refs.lyricList.scrollTo(0, 0, 1000)
      }
    },
    back() {
      this.setFullScreen(false)
    },
    open() {
      this.setFullScreen(true)
    },
    end() {
      this.currentTime = 0
      this.next()
    },
    ready() {
      this.songReady = true
    },
    error() {
      this.songReady = true
    },
    togglePlaying() {
      this.setPlayingState(!this.playing)
      if (this.currentLyric) {
        this.currentLyric.togglePlay()
      }
    },
    prev() {
      if (!this.songReady) {
        return
      }
      let index = this.currentIndex - 1
      if (index === -1) {
        index = this.playlist.length - 1
      }
      this.setCurrentIndex(index)
      if (!this.playing) {
        this.togglePlaying(!this.playing)
      }
      this.songReady = false
    },
    next() {
      if (!this.songReady) {
        return
      }
      let index = this.currentIndex + 1
      if (index === this.playlist.length) {
        index = 0
      }
      this.setCurrentIndex(index)
      if (!this.playing) {
        this.togglePlaying(!this.playing)
      }
      this.songReady = false
    },
    percentChange(newPercent) {
      const newCurrentTime = newPercent * this.currentSong.duration
      this.$refs.audio.currentTime = newCurrentTime
      if (this.currentLyric) {
        this.currentLyric.seek(newCurrentTime * 1000)
      }
    },
    updateTime(e) {
      this.currentTime = e.target.currentTime
    },
    formalTime(time) {
      let minutes = Math.floor(time / 60)
      let seconds = Math.floor(time % 60)
      return `${this._pad(minutes)}:${this._pad(seconds)}`
    },
    togglePlayMiddle() {
      this.toggleMidShow = !this.toggleMidShow
    },
    _pad(num) {
      return num < 10 ? '0' + num : num
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX'
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
@import '~common/stylus/mixin.styl'

.player
  .normal-player
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 150
    background: $color-background
    /*===background===*/
    .background
      position: absolute
      width: 100%
      height: 100%
      top: 0
      left: 0
      z-index: -1
      opacity: 0.6
      filter: blur(20px)
    /*===top===*/
    .top
      position: relative
      margin-bottom: 25px
      .back
        position: absolute
        top: 0
        left: 6px
        z-index: 50
        .icon-back
          display: block
          padding: 9px
          font-size: $font-size-large-x
          transform: rotate(-90deg)
      .title
        width: 70%
        margin: 0 auto
        text-align: center
        font-size: $font-size-large
        no-wrap()
        color: $color-text
        line-height: 40px
      .subtitle
        line-height: 20px
        font-size: $font-size-medium
        color: $color-text
        text-align: center
    /*===middle===*/
    .middle
      position: fixed
      width: 100%
      top: 80px
      bottom: 170px
      font-size: 0
      white-space: nowrap
      .middle-l
        display: inline-block
        position: relative
        width: 100%
        height: 0
        vertical-align: top
        padding-top: 80%
        &.middleL-enter-active, &.middleL-leave-active
          transition: all 0.6s
        &.middleL-enter, &.middleL-leave-to
          opacity: 0
        .cd-wrapper
          position: absolute
          left: 10%
          top: 0
          width: 80%
          box-sizing: border-box
          height: 100%
          .cd
            width: 100%
            height: 100%
            border-radius: 50%
            &.play
              animation: rotate 20s linear infinite
            &.pause
              animation-play-state: paused
            .image
              position: absolute
              top: 0
              left: 0
              width: 100%
              height: 100%
              box-sizing: border-box
              border-radius: 50%
              border: 10px solid rgba(255, 255, 255, 0.1)
      .middle-r
        display: inline-block
        width: 100%
        height: 100%
        overflow: hidden
        &.middleR-enter-active, &.middleR-leave-active
          transition: all 2s
        &.middleR-enter, &.middleR-leave-to
          opacity: 0
        .lyric-wrapper
          width: 80%
          margin: 0 auto
          overflow: hidden
          text-align: center
          .text
            line-height: 32px
            color: $color-text-l
            font-size: $font-size-medium
            &.current
              color: $color-text
    /*===bottom===*/
    .bottom
      position: absolute
      bottom: 25px
      width: 100%
      .dot-wrapper
        text-align: center
        .dot
          display: inline-block
          width: 8px
          height: 8px
          border-radius: 50%
          margin: 0 4px
          vertical-align: middle
          background: $color-text-l
          &.active
            width: 20px
            border-radius: 5px
            background: $color-text-ll
      .progress-wrapper
        display: flex
        align-items: center
        width: 80%
        margin: 0 auto
        padding: 10px 0
        .time
          color: $color-text
          font-size: $font-size-small
          flex: 0 0 30px
          line-height: 30px
          &.time-l
            text-align: left
          &.time-r
            text-align: right
        .progress-bar-wrapper
          margin: 0 10px
          flex: 1
      .operators
        display: flex
        align-items: center
        .icon
          flex: 1
          color: $color-theme
          &.disable
            color: $color-theme-d
          i
            font-size: 30px
        .i-left
          text-align: right
        .i-center
          padding: 0 20px
          text-align: center
          i
            font-size: 40px
        .i-right
          text-align: left
        .icon-favorite
          color: $color-sub-theme
    &.normal-enter-active, &.normal-leave-active
      transition: all 0.4s
      .top, .bottom
        transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
    &.normal-enter, &.normal-leave-to
      opacity: 0
      .top
        transform: translate3d(0, -100px, 0)
      .bottom
        transform: translate3d(0, 100px, 0)
  .mini-player
    display: flex
    align-items: center
    position: fixed
    left: 0
    bottom: 0
    width: 100%
    height: 60px
    z-index: 100
    background: $color-highlight-background
    &.mini-enter-active, &.mini-leave-active
      transition: all 0.4s
    &.mini-enter, &.mini-leave-to
      opacity: 0
    .icon
      flex: 0 0 40px
      width: 40px
      height: 40px
      padding: 0 10px 0 20px
      .imgWrapper
        height: 100%
        width: 100%
        img
          border-radius: 50%
          &.play
            animation: rotate 10s linear infinite
          &.pause
            animation-play-state: paused
    .text
      display: flex
      flex-direction: column
      justify-content: center
      flex: 1
      line-height: 20px
      overflow: hidden
      .name
        color: $color-text
        no-wrap()
        margin-bottom: 2px
        font-size: $font-size-medium
      .desc
        color: $color-text-d
        font-size: $font-size-medium
        no-wrap()
    .control
      flex: 0 0 30px
      width: 30px
      padding: 0 10px
      .icon-play-mini, .icon-pause-mini, .icon-playlist
        font-size: 30px
        color: $color-theme-d
@keyframes rotate
  0%
    transform: rotate(0)
  100%
    transform: rotate(360deg)
</style>
