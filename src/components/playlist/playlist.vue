<template>
  <transition name="list-fade">
    <div class="playlist" v-show="showFlag" @click="hide">
      <div class="list-wrapper" @click.stop>
        <div class="list-header">
          <h1 class="title">
            <i class="icon-music"></i>
            <span class="text">播放列表</span>
          </h1>
        </div>
        <scroll ref="listContent" class="list-content" :data="boxPlaylist">
          <ul ref="listItem">
            <li class="item" v-for="(item, index) in boxPlaylist" :key="index" @click="selectItem(item, index)">
              <i class="icon-playlist" :class="{'current':currentIndex===index}"></i>
              <span class="text" :class="{'currentText':currentIndex===index}">{{ item.name }} - {{ item.singer }}</span>
              <span class="like" @click.stop="toggleLike(index)">
                <i ref="likeItem" class="icon-not-favorite"></i>
              </span>
              <span class="delete" @click.stop="deleteItem(index)">
                <i class="icon-delete"></i>
              </span>
            </li>
          </ul>
        </scroll>
        <div class="list-close" @click="hide">
          <span>关闭</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'
import Scroll from 'base/scroll/scroll'

export default {
  name: 'Playlist',
  components: {
    Scroll
  },
  data() {
    return {
      showFlag: false,
      isLike: false
    }
  },
  computed: {
    boxPlaylist() {
      return this.playlist
    },
    toggleIconLike() {
      return this.isLike ? 'icon-favorite' : 'icon-not-favorite'
    },
    ...mapGetters([
      'playlist',
      'currentIndex'
    ])
  },
  methods: {
    show() {
      this.showFlag = true
      setTimeout(() => {
        this.$refs.listContent.refresh()
        this._scrollToCurrentSong()
      }, 20)
    },
    selectItem(item, index) {
      this.selectListPlay(index)
    },
    deleteItem(currentIndex) {
      let newPlaylist = []
      this.playlist.forEach((item, index) => {
        if (index === currentIndex) {
          return
        }
        newPlaylist.push(item)
      })
      this.setPlaylist(newPlaylist)
      this.setPlaying(true)
    },
    toggleLike(index) {
      this.$refs.likeItem[index].className = `${this.toggleIconLike}`
      this.isLike = !this.isLike
    },
    hide() {
      this.showFlag = false
    },
    _scrollToCurrentSong() {
      const childs = this.$refs.listItem.children
      this.$refs.listContent.scrollToElement(childs[this.currentIndex])
    },
    ...mapActions([
      'selectListPlay'
    ]),
    ...mapMutations({
      setPlaylist: 'SET_PLAYLIST',
      setPlaying: 'SET_PLAYING_STATE'
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

.playlist
  position: fixed
  left: 0
  right: 0
  top: 0
  bottom: 0
  z-index: 200
  background-color: $color-background-d
  &.list-fade-enter-active, &.list-fade-leave-active
    transition: opacity 0.3s
    .list-wrapper
      transition: all 0.3s
  &.list-fade-enter, &.list-fade-leave-to
    opacity: 0
    .list-wrapper
      transform: translate3d(0, 100%, 0)
  &.list-fade-enter
  .list-wrapper
    position: absolute
    left: 0
    bottom: 0
    width: 100%
    background-color: $color-highlight-background
    .list-header
      position: relative
      padding: 20px 30px 10px 20px
      .title
        display: flex
        align-items: center
        .icon
          margin-right: 10px
          font-size: 30px
          color: $color-theme-d
        .text
          flex: 1
          padding-left: 10px
          font-size: $font-size-medium
          color: $color-text-l
    .list-content
      max-height: 240px
      overflow: hidden
      .item
        display: flex
        align-items: center
        height: 40px
        padding: 0 30px 0 20px
        overflow: hidden
        &.list-enter-active, &.list-leave-active
          transition: all 0.1s
        &.list-enter, &.list-leave-to
          height: 0
        .icon-playlist
          flex: 0 0 20px
          width: 20px
          font-size: $font-size-small
          color: $color-text-d
        .current
          font-size: $font-size-small
          color: $color-theme
        .text
          flex: 1
          no-wrap()
          padding-left: 10px
          font-size: $font-size-medium
          color: $color-text-d
        .currentText
          color: $color-theme
        .like
          extend-click()
          margin-right: 15px
          font-size: $font-size-small
          color: $color-text-d
          .icon-favorite
            color: $color-sub-theme
        .delete
          extend-click()
          font-size: $font-size-small
          color: $color-text-d
    .list-operate
      width: 140px
      margin: 20px auto 30px auto
      .add
        display: flex
        align-items: center
        padding: 8px 16px
        border: 1px solid $color-text-l
        border-radius: 100px
        color: $color-text-l
        .icon-add
          margin-right: 5px
          font-size: $font-size-small-s
        .text
          font-size: $font-size-small
    .list-close
      text-align: center
      line-height: 40px
      background: $color-background
      font-size: $font-size-medium
      color: $color-text-l
</style>
