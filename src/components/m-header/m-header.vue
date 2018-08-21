<template>
  <div class="header">
    <div class="header-wrap">
      <div class="header-user" @click="toUser">
        <i class="iconfont icon-user"></i>
      </div>
      <div class="header-txt">天天动听</div>
      <router-link tag="div" class="header-search" to="/search">
        <i class="iconfont icon-search"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MHeader',
  methods: {
    toUser() {
      this.$emit('showUser')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/mixin.styl'
@import '~common/stylus/variable.styl'

.header-wrap
  position: relative
  width: 100%
  height: 44px
  text-align: center
  line-height: 44px
  background: $color-background-header
  .header-pic
    display: inline-block
    width: 30px
    height: 32px
    background-size: 30px 32px
    bg-image('./logo')
    vertical-align: middle
    margin-right: 9px
  .header-user
    position: absolute
    top: 0
    left: 0
    .icon-user
      display: block
      padding: 12px
      font-size: 20px
      color: $color-text-f
  .header-txt
    display: inline-block
    color: #fff
    vertical-align: middle
  .header-search
    position: absolute
    top: 0
    right: 0
    .icon-search
      display: block
      padding: 12px
      font-size: 20px
      color: $color-text-f
</style>
