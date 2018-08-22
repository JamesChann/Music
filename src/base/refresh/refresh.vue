<template>
  <div class="refresh">
    <div class="refresh-img">
      <img class="img-cont" src="~common/image/refresh.gif" alt="">
      <div class="txt">快放开我刷新</div>
    </div>
  </div>
</template>

<script>

</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.refresh
  position: fixed
  top: -100px
  left: 0px
  right: 0px
  width: 100px
  margin-left:auto
  margin-right:auto
  .refresh-img
    width: 100%
    .img-cont
      width: 100px
    .txt
      color: $color-text-b
      font-size: $font-size-small-s
      padding-bottom: 10px
</style>
