<template>
  <div class="rank">
    <Scroll class="rank-cont" :data="topList">
      <ul>
        <li class="rank-list" @click="selectItem(top)" v-for="top in topList" :key="top.id">
          <div class="list-pic">
            <img class="pic-img" :src="top.picUrl" alt="">
          </div>
          <div class="rank-txt">
            <p class="txt-cont" v-for="(item, index) in top.songList" :key="index">
              {{ index + 1 }}.{{ item.songname }}-{{ item.singername }}
            </p>
          </div>
        </li>
      </ul>
      <div class="loading-container" v-show="!topList.length">
        <loading></loading>
      </div>
    </Scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import {getTopList} from 'api/rank'
import {ERR_OK} from 'api/config'
import {mapMutations} from 'vuex'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'

export default {
  name: 'Rank',
  components: {
    Scroll,
    Loading
  },
  data() {
    return {
      topList: []
    }
  },
  created() {
    this._getTopList()
  },
  methods: {
    selectItem(top) {
      this.$router.push({
        path: `/rank/${top.id}`
      })
      this.setToplist(top)
    },
    _getTopList() {
      getTopList().then((res) => {
        if (res.code === ERR_OK) {
          this.topList = res.data.topList
        }
      })
    },
    ...mapMutations({
      setToplist: 'SET_TOPLIST'
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import "~common/stylus/mixin"

.rank
  position: fixed
  left: 0
  right: 0
  top: 88px
  bottom: 0
  overflow: hidden
  .rank-cont
    height: 100%
    .rank-list
      display: flex
      padding: 10px 20px
      border: 3px solid $color-divider
      .list-pic
        width: 100px
        height: 100px
        .pic-img
          width: 100%
          border-radius: 5px
      .rank-txt
        flex: 1
        display: flex
        flex-direction: column
        justify-content: space-around
        overflow: hidden
        padding-left: 20px
        color: $color-text-b
        font-size: $font-size-small
        .txt-cont
          no-wrap()
    .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
