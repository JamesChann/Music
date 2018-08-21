<template>
  <transition name="slide">
    <div class="search-wrapper">
      <!--顶部输入框-->
      <div class="header">
        <div class="back" @click="back">
          <i class="iconfont icon-row"></i>
        </div>
        <div class="search-wrap">
          <div class="search-input">
            <input :placeholder="placeholder" v-model="query" class="input-cont" ref="search" type="text">
            <i @click="clear" v-show="query" class="icon-dismiss"></i>
          </div>
        </div>
      </div>
      <!--热门关键词-->
      <div class="shortcut-wrapper" v-show="!query">
        <div class="shortcut">
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li class="item" @click="addQuery(item)" v-for="(item, index) in hotKey" :key="index">
                <span>{{ item.k }}</span>
              </li>
            </ul>
          </div>
          <!--搜索历史-->
          <div class="search-history" v-show="searchHistory.length>0">
            <h1 class="title">
              <span class="text">搜索历史</span>
            </h1>
            <search-list @delete="deleteSearchHistory" @select="addHistoryQuery" :searches="searchHistory"></search-list>
          </div>
        </div>
      </div>
      <!--搜索结果-->
      <div class="search-result" v-show="query">
        <suggest @select="saveSearch" :query="query"></suggest>
      </div>
      <confirm></confirm>
    </div>
  </transition>
</template>

<script>
import {getHotKey} from 'api/search'
import {ERR_OK} from 'api/config'
import Suggest from 'components/suggest/suggest'
import SearchList from 'base/search-list/search-list'
import Confirm from 'base/confirm/confirm'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'Search',
  components: {
    Suggest,
    SearchList,
    Confirm
  },
  data() {
    return {
      query: '',
      hotKey: []
    }
  },
  computed: {
    placeholder() {
      return '云烟成雨 很好听哦'
    },
    ...mapGetters([
      'searchHistory'
    ])
  },
  created() {
    this._getHotKey()
  },
  activated() {
    this.$refs.search.focus()
  },
  methods: {
    back() {
      this.$router.back()
    },
    clear() {
      this.query = ''
    },
    addQuery(hot) {
      this.query = hot.k
    },
    addHistoryQuery(history) {
      this.query = history
    },
    saveSearch() {
      this.saveSearchHistory(this.query)
    },
    deleteSearchHistory(item) {
      this.deleteSearchHistory(item)
    },
    _getHotKey() {
      getHotKey().then((res) => {
        if (res.code === ERR_OK) {
          this.hotKey = res.data.hotkey.slice(0, 10)
        }
      })
    },
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory'
    ])
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.search-wrapper
  position: fixed
  width: 100%
  top: 0
  bottom: 0
  z-index: 100
  background: $color-background
  &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
  &.slide-enter, &.slide-leave-to
    transform: translate3d(100%, 0, 0)
  .header
    height: 44px
    line-height: 44px
    background: $color-background-header
    .back
      position: absolute
      top: 0
      left: 0
      z-index: 50
      .icon-row
        display: block
        padding: 11px 8px
        transform: rotate(180deg)
        font-size: $font-size-large-x
        color: $color-text-f
    .search-wrap
      width: 100%
      height: 44px
      line-height: 44px
      padding-left: 38px
      padding-right: 15px
      box-sizing: border-box
      .search-input
        width: 100%
        height: 30px
        line-height: 30px
        position: relative
        top: 7px
        border-bottom: 1px solid #f8b1ab
        .input-cont
          width: 100%
          height: 30px
          font-size: $font-size-medium
          box-sizing: border-box
          padding-left: 5px
          padding-right: 30px
          color: #f5c2bf
          caret-color: #ffd1cd
          outline: none
          background: transparent
          &::placeholder
            color: #d1b0ad
        .icon-dismiss
          position: absolute
          top: 50%
          right: 5px
          font-size: 18px
          transform: translateY(-50%)
          color: $color-text-f
  .shortcut-wrapper
    position: fixed
    top: 64px
    bottom: 0
    width: 100%
    .shortcut
      height: 100%
      overflow: hidden
      .hot-key
        margin: 0 20px 20px 20px
        .title
          margin-bottom: 20px
          font-size: $font-size-medium
          color: $color-text-l
        .item
          display: inline-block
          padding: 8px 10px
          margin: 0 20px 10px 0
          border: 1px solid $color-text-l
          border-radius: 20px
          font-size: $font-size-small
          color: $color-text-b
      .search-history
        position: relative
        margin: 0 20px
        .title
          display: flex
          align-items: center
          height: 40px
          font-size: $font-size-medium
          color: $color-text-l
          .text
            flex: 1
</style>
