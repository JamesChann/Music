<template>
  <div class="loading">
    <img class="img" width="24" height="24" src="./loading.gif">
    <span class="desc">{{title}}</span>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    title: {
      type: String,
      default: '努力加载中...'
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"

.loading
  width: 100%
  text-align: center
  .img
    vertical-align: middle
  .desc
    line-height: 24px
    vertical-align: middle
    font-size: $font-size-small
    color: $color-text-l
</style>
