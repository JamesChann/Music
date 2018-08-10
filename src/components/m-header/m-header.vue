<template>
  <div class="header">
    <div class="header-wrap">
      <div class="header-pic"></div>
      <div class="header-txt">chick music</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MHeader'
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/mixin.styl'
@import '~common/stylus/variable.styl'

.header-wrap
  width: 100%
  height: 44px
  text-align: center
  line-height: 44px
  .header-pic
    display: inline-block
    width: 30px
    height: 32px
    background-size: 30px 32px
    bg-image('./logo')
    vertical-align: middle
    margin-right: 9px
  .header-txt
    display: inline-block
    color: $color-theme
    vertical-align: middle
</style>
