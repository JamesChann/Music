<template>
  <scroll class="suggest" ref="suggest" :data="songList" :pullup="pullup" @scrollToEnd="searchMore">
    <!-- <img :src="'http://imgcache.qq.com/music/photo/album_300/'+(songList[1].albumid%100)+'/300_albumpic_'+songList[1].albumid+'_0.jpg'" alt=""> -->
    <ul class="suggest-list">
      <li class="suggest-item" v-for="(item, index) in songList" :key="index" @click="selectItem(item)">
        <div v-if="index<2" class="img-wrap">
          <img class="img-cont" :src="getImgIcon(item)" alt="">
        </div>
        <div class="name">
          <div class="text">
            <p class="song-name" v-html="item.albumname"></p>
            <p class="song-singer" v-html="item.singer[0].name"></p>
            <p class="song-switch">{{ item.switch }}</p>
          </div>
        </div>
      </li>
      <div class="loading-container">
        <loading v-show="hasMore"></loading>
      </div>
    </ul>
    <div v-show="!hasMore && !songList.length" class="no-result-warpper">
      <no-result title="很抱歉，未能找到相关搜索结果！"></no-result>
    </div>
  </scroll>
</template>

<script>
import {search} from 'api/search'
import {ERR_OK} from 'api/config'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import NoResult from 'base/no-result/no-result'
import {createSong} from 'common/js/song'
import {mapActions} from 'vuex'

const perpage = 20

export default {
  name: 'Suggest',
  components: {
    Scroll,
    Loading,
    NoResult
  },
  props: {
    query: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      page: 1,
      pullup: true,
      hasMore: true,
      songList: []
    }
  },
  watch: {
    query() {
      setTimeout(() => {
        this._search()
      }, 200)
    }
  },
  methods: {
    getImgIcon(item) {
      return 'http://imgcache.qq.com/music/photo/album_300/' + (item.albumid % 100) + '/300_albumpic_' + item.albumid + '_0.jpg'
    },
    selectItem(item) {
      this.insertSong(createSong(item))
      this.$emit('select')
    },
    searchMore() {
      if (!this.hasMore) {
        return
      }
      this.page++
      search(this.query, this.page, perpage).then((res) => {
        if (res.code === ERR_OK) {
          this.songList = this.songList.concat(res.data.song.list)
          this._checkMore(res.data)
        }
      })
    },
    _search() {
      this.page = 1
      this.hasMore = true
      this.$refs.suggest.scrollTo(0, 0)
      search(this.query, this.page, perpage).then((res) => {
        if (res.code === ERR_OK) {
          this.songList = res.data.song.list
          // console.log(this.songList)
        }
      })
    },
    _checkMore(data) {
      const song = data.song
      if (!song.list.length || (song.curnum + (song.curpage - 1) * perpage) >= song.totalnum) {
        this.hasMore = false
      }
    },
    ...mapActions([
      'insertSong'
    ])
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
@import "~common/stylus/mixin"

.suggest
  position: fixed
  top: 44px
  left: 0
  right: 0
  bottom: 0
  overflow: hidden
  .suggest-list
    .suggest-item
      display: flex
      align-items: center
      padding: 0 10px
      border-bottom: 1px solid #eee
      .img-wrap
        flex: 0 0 60px
        padding: 10px 0
        width: 60px
        font-size: $font-size-medium
        .img-cont
          width: 100%
          border-radius: 5px
      .name
        flex: 1
        padding: 10px
        padding-left: 10px
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          height: 60px
          display: flex
          box-sizing: border-box
          padding: 5px 0
          flex-direction: column
          justify-content: space-between
          no-wrap()
          .song-name
            font-size: $font-size-medium-x
            color: $color-text-b
          .song-singer
            font-size: $font-size-small
            color: #537dad
          .song-switch
            color: $color-text-d
            font-size: $font-size-small
    .loading-container
      margin-top: 20px
  .no-result-wrapper
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>
