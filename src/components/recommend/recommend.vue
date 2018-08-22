<template>
  <div class="recommend-wrapper">
    <scroll ref="scroll" :data="playlist" :pulldown="pulldown" @scrollToTop="refreshReady" @scrollRefresh="refreshPage" class="recommend-cont">
      <div>
        <refresh v-show="refreshFlag"></refresh>
        <!--轮播图-->
        <slider v-if="sliders.length">
          <div v-for="item in sliders" :key="item.id">
            <a :href="item.linkUrl">
              <img @load="loadImage" :src="item.picUrl" alt="">
            </a>
          </div>
        </slider>
        <!--热门歌单列表-->
        <div class="hot-list">
          <h2 class="list-tit">
            <span class="list-tit-txt" @click="selectMore">热门歌单推荐</span>
            <i class="iconfont icon-row" @click="selectMore"></i>
          </h2>
          <ul class="list-cont">
            <li class="list-item" @click="selectDisc(item)" v-for="(item, index) in playlist" :key="index">
              <img class="item-img" v-lazy="item.imgurl" alt="">
              <div class="item-txt">
                <p class="txt-tit">{{ item.creator.name }}</p>
                <p class="txt-desc">{{ item.dissname }}</p>
              </div>
            </li>
          </ul>
        </div>
        <!--灰色分割-->
        <div class="divider"></div>
        <!--推荐歌单列表-->
        <div class="recommend-list">
          <h2 class="rec-tit">不要错过一周精选歌单</h2>
          <ul class="rec-cont">
            <li class="rec-item" @click="selectDisc(item)" v-for="(item, index) in recDiscList" :key="index">
              <img class="rec-img" v-lazy="item.imgurl" alt="">
              <div class="rec-txt">
                <div class="txt-tit">
                  <span class="tit-tip"><label>单曲</label></span>
                  <span class="tit-desc">{{ item.dissname }}</span>
                </div>
                <div class="txt-playNumber">
                  <i class="iconfont icon-comments"></i>
                  <span class="txt-comments">{{ item.listennum }}</span>
                </div>
                <div class="txt-article">
                  <img class="mini-img" v-lazy="item.imgurl">
                  <span class="mini-name">{{ item.creator.name }}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!playlist.length">
        <loading></loading>
      </div>
    </scroll>
    <toast v-show="toastFlag"></toast>
    <router-view></router-view>
  </div>
</template>

<script>
import Slider from 'base/slider/slider'
import Loading from 'base/loading/loading'
import Scroll from 'base/scroll/scroll'
import {mapMutations} from 'vuex'
import {getRecommend, getDiscList, getRecommendList} from 'api/recommend'
import {ERR_OK} from 'api/config'
import Refresh from 'base/refresh/refresh'
import Toast from 'base/toast/toast'

export default {
  name: 'Recommend',
  components: {
    Slider,
    Scroll,
    Loading,
    Refresh,
    Toast
  },
  data() {
    return {
      sliders: [],
      playlist: [],
      recDiscList: [],
      refreshFlag: false,
      pulldown: true,
      toastFlag: false
    }
  },
  created() {
    this._getRecommend()
    this._getDiscList()
    this._getRecommendList()
  },
  activated() {
    this.$refs.scroll.refresh()
  },
  methods: {
    selectDisc(item) {
      this.$router.push({
        path: `recommend/${item.dissid}`
      })
      this.setDisc(item)
    },
    selectMore() {
      this.$router.push({
        path: '/disc-list'
      })
    },
    refreshReady() {
      this.refreshFlag = true
    },
    refreshPage() {
      this.refreshFlag = false
      this.$refs.scroll.refresh()
      this.toastFlag = true
      setTimeout(() => {
        this.toastFlag = false
      }, 2000)
    },
    _getRecommend() {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.sliders = res.data.slider
        }
      })
    },
    _getDiscList() {
      getDiscList().then((res) => {
        this.playlist = res.data.list
      })
    },
    _getRecommendList() {
      getRecommendList().then((res) => {
        this.recDiscList = res.data.list
      })
    },
    loadImage() {
      if (!this.checkloaded) {
        this.$refs.scroll.refresh()
        this.checkloaded = true
      }
    },
    ...mapMutations({
      setDisc: 'SET_DISC'
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
@import '~common/stylus/mixin.styl'

.recommend-wrapper
  .recommend-cont
    position: fixed
    top: 88px
    bottom: 0
    left: 0
    right: 0
    overflow: hidden
    /*分割线*/
    .divider
      width: 100%
      height: 4px
      background: $color-divider
    /*===热门歌单列表===*/
    .hot-list
      /*歌单标题*/
      .list-tit
        position: relative
        height: 55px
        line-height: 55px
        text-align: left
        padding: 0 15px
        font-size: $font-size-medium
        color: $color-text
        .list-tit-txt
          line-height: $font-size-medium
          vertical-align: middle
        .icon-row
          vertical-align: middle
          color: $color-text-l
          line-height: $font-size-medium
          font-size: $font-size-small
      /*歌单内容*/
      .list-cont
        width: 100%
        overflow: hidden
        .list-item
          width: 30%
          float: left
          padding: 0 0 20px 9px
          text-align: center
          overflow: hidden
          .item-img
            width: 100%
            border-radius: 5px
          .item-txt
            font-size: $font-size-small-s
            line-height: 20px
            .txt-tit
              no-wrap()
              color: $color-text
            .txt-desc
              no-wrap()
              color: $color-text
    /*推荐歌单*/
    .recommend-list
      .rec-tit
        height: 65px
        line-height: 65px
        padding: 0 15px
        text-align: left
        font-size: $font-size-medium
        color: $color-text
      .rec-item
        display: flex
        box-sizing: border-box
        // align-items: center
        padding: 0 10px 20px 10px
        .rec-img
          width: 110px
          height: 110px
          border-radius: 5px
          margin-right: 20px
        .rec-txt
          flex: 1
          position: relative
          overflow: hidden
          font-size: $font-size-medium
          .txt-tit
            padding-top: 10px
            line-height: 20px
            .tit-tip
              padding:3px 3px 2px 3px
              height: 0
              font-size: 0
              vertical-align: middle
              border: 1px solid $color-theme
              color: $color-theme
              font-size: $font-size-small-s
            .tit-desc
              vertical-align: middle
              color: $color-text-b
              font-size: $font-size-small
              padding: 2px 0
          .txt-playNumber
            padding-top: 10px
            font-size: $font-size-small
            color: $color-text-d
            .icon-comments
              vertical-align: middle
            .txt-comments
              vertical-align: middle
          .txt-article
            width: 100%
            position: absolute
            left: 0
            bottom: 0
            padding-top: 5px
            border-top: 1px solid $color-divider
            .mini-img
              width: 25px
              height: 25px
              vertical-align: middle
              border-radius: 50%
            .mini-name
              vertical-align: middle
              padding-left: 5px
              color: $color-text-b
              font-size: $font-size-small-s
    .loading-container
      position: absolute
      width: 100%
      top: 65%
      transform: translateY(-50%)
</style>
