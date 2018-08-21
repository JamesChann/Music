<template>
  <transition name="slide">
    <div class="disc-list">
      <c-header title="歌单"></c-header>
      <scroll class="disc-cont" ref="scroll" :data="disclist">
        <div>
        <!--歌单标题区域-->
        <div class="disc-titcont" v-if="disclist.length">
          <!--标题图片模拟背景图片-->
          <img class="disc-titleBg" :src="titleInfo.bgImg">
          <!--标题文字图片内容-->
          <div class="disc-title">
            <div class="title-left">
              <img class="left-img" :src="titleInfo.bgImg" alt="">
            </div>
            <div class="title-right">
              <div class="right-title">{{titleInfo.name}}</div>
              <div class="right-desc">{{titleInfo.desc}}</div>
              <div class="right-tip">
                <i class="iconfont icon-comments"></i>
                <span class="num-comments">{{titleInfo.num}}</span>
              </div>
            </div>
          </div>
        </div>
        <!--歌单导航分类-->
        <div class="latest-nav">
          <!--全部歌单-->
          <div class="nav-all">
            <div class="all-btn">
              <span class="btn-txt">全部歌单</span>
              <span class="icon-next btn-icon"></span>
            </div>
          </div>
          <!--分类歌单-->
          <div class="nav-kind">
            <ul class="kind-cont">
              <li class="kind-item kind-a">欧美</li>
              <li class="kind-item kind-b">电子</li>
              <li class="kind-item kind-c">摇滚</li>
            </ul>
          </div>
        </div>
        <!--歌单所有列表-->
        <div class="list-cont">
          <ul class="list-cont-ul">
            <li class="disc-item" @click="selectDisc(item)" v-for="(item, index) in disclist" :key="index">
              <img class="item-img" :src="item.imgurl" alt="">
              <p class="item-txt">{{ item.dissname }}</p>
            </li>
          </ul>
        </div>
        </div>
        <div class="loading-container" v-show="!disclist.length">
          <loading></loading>
        </div>
      </scroll>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
import CHeader from 'base/c-header/c-header'
import {getAllDiscList} from 'api/recommend'
import {ERR_OK} from 'api/config'
import {mapMutations} from 'vuex'
import Loading from 'base/loading/loading'
import Scroll from 'base/scroll/scroll'

export default {
  name: 'DiscList',
  components: {
    CHeader,
    Scroll,
    Loading
  },
  data() {
    return {
      disclist: []
    }
  },
  computed: {
    titleInfo() {
      let ret = {
        bgImg: this.disclist[0].imgurl,
        name: this.disclist[0].creator.name,
        desc: this.disclist[0].dissname,
        num: this.disclist[0].listennum
      }
      return ret
    }
  },
  created() {
    this._getAllDiscList()
  },
  mounted() {
    setTimeout(() => {
      this.$refs.scroll.refresh()
    }, 1000)
  },
  methods: {
    selectDisc(item) {
      this.$router.push({
        path: `disc-list/${item.dissid}`
      })
      this.setDisc(item)
    },
    _getAllDiscList() {
      getAllDiscList().then((res) => {
        if (res.code === ERR_OK) {
          this.disclist = res.data.list
          console.log(this.disclist)
        }
      })
    },
    ...mapMutations({
      setDisc: 'SET_DISC'
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

.disc-list
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  z-index: 100
  overflow: hidden
  background: $color-background
  &.slide-enter-active, &.slide-leave-active
    transition: all 0.3s
  &.slide-enter, &.slide-leave-to
    transform: translate3d(100%, 0, 0)
  .disc-cont
    position: absolute
    top: 44px
    left: 0
    right: 0
    bottom: 0
    overflow: hidden
    /*歌单标题区块*/
    .disc-titcont
      position: relative
      display: flex
      align-items: center
      box-sizing: border-box
      z-index: 1
      width: 100%
      height: 160px
      overflow: hidden
      background: rgba(0, 0, 0, 0.5)
      .disc-titleBg
        position: absolute
        width: 100%
        height: 100%
        overflow: hidden
        top: 0
        left: 0
        z-index: -1
        filter: blur(10px)
      .disc-title
        // padding: 23px 20px 23px 30px
        width: 100%
        display: flex
        box-sizing: border-box;
        padding: 0 25px;
        .title-left
          width: 120px
          .left-img
            width: 100px
            height: 100px
            // border-radius: 25px
            box-shadow 0 0 4px #ccc
        .title-right
          flex: 1
          overflow: hidden
          color: $color-text-f
          .right-title
            padding-top 18px
            margin-bottom 18px
            font-size 18px
            font-family ''Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif'
          .right-desc
            font-size 14px
            line-height: 14px
            margin-bottom 10px
            no-wrap()
          .right-tip
            font-size 12px
            color $color-text-f
            .icon-comments
              vertical-align: middle
            .num-comments
              vertical-align: middle
    /*===歌单导航分类==================================================================================================================================================*/
    .latest-nav
      display flex
      padding 20px 15px
      /*左边按钮导航文字全部歌单*/
      .nav-all
        width 100px
        .all-btn
          padding 5px 5px 5px 5px
          border 1px solid #ccc
          border-radius 10px
          text-align center
          .btn-txt
            font-size 12px
            color $color-text-b
            vertical-align middle
          .btn-icon
            font-size 12px
            vertical-align middle
            color $color-text-b
      /*右边分类选择*/
      .nav-kind
        flex 1
        .kind-cont
          height 100%
          text-align right
          display flex
          justify-content flex-end
          color $color-text-b
          .kind-item
            padding 5px 10px
            font-size 14px
    /*歌单所有列表*/
    .list-cont
      overflow: hidden
      .list-cont-ul
        overflow: hidden
        .disc-item
          float: left
          width: 50%
          text-align: center
          .item-img
            width: 80%
            border-radius: 10px
            box-shadow: 0 0 10px #ccc
          .item-txt
            padding: 5px 13px 15px 13px
            color: $color-text-b
            font-size: $font-size-small
            no-wrap()
  .loading-container
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>
