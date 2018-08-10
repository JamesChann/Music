<template>
  <div class="recommend-wrapper">
    <scroll ref="scroll" :data="playlist" class="recommend-cont">
      <div>
        <!--轮播图-->
        <slider v-if="sliders.length">
          <div v-for="item in sliders" :key="item.id">
            <a :href="item.linkUrl">
              <img @load="loadImage" :src="item.picUrl" alt="">
            </a>
          </div>
        </slider>
        <!--歌单列表-->
        <div class="recommend-list">
          <h2 class="list-tit">热门歌单推荐</h2>
          <ul class="list-cont">
            <li class="list-item" v-for="(item, index) in playlist" :key="index">
              <img class="item-img" v-lazy="item.imgurl" alt="">
              <div class="item-txt">
                <p class="txt-tit">{{ item.creator.name }}</p>
                <p class="txt-desc">{{ item.dissname }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!playlist.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import Slider from 'base/slider/slider'
import Loading from 'base/loading/loading'
import Scroll from 'base/scroll/scroll'
import {getRecommend, getDiscList} from 'api/recommend'
import {ERR_OK} from 'api/config'

export default {
  name: 'Recommend',
  components: {
    Slider,
    Scroll,
    Loading
  },
  data() {
    return {
      sliders: [],
      playlist: []
    }
  },
  created() {
    this._getRecommend()
    this._getDiscList()
  },
  methods: {
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
    loadImage() {
      if (!this.checkloaded) {
        this.$refs.scroll.refresh()
        this.checkloaded = true
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'

.recommend-wrapper
  .recommend-cont
    position: fixed
    top: 88px
    bottom: 0
    left: 0
    right: 0
    overflow: hidden
    /*===歌单列表===*/
    .recommend-list
      /*歌单标题*/
      .list-tit
        height: 55px
        line-height: 55px
        text-align: center
        font-size: $font-size-medium
        color: $color-theme-txt
      /*歌单内容*/
      .list-cont
        .list-item
          display: flex
          padding: 0 20px 20px 25px
          box-sizing: border-box
          .item-img
            width: 70px
            height: 70px
            padding-right: 20px
          .item-txt
            display: flex
            flex-direction: column
            flex: 1
            line-height: 20px
            overflow: hidden
            justify-content: center
            font-size: $font-size-medium
            .txt-tit
              margin-bottom: 10px
              color: $color-text
            .txt-desc
              color: $color-text-d
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
