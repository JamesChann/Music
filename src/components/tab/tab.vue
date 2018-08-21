<template>
  <div class="tab-wrapper">
    <router-link tag="div" class="tab-link" to="/recommend">
      <span class="tab-item">推荐</span>
    </router-link>
    <router-link tag="div" class="tab-link" to="/singer">
      <span class="tab-item">歌手</span>
    </router-link>
    <router-link tag="div" class="tab-link" to="/rank">
      <span class="tab-item">排行</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Tab'
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'

  .tab-wrapper
    display: flex
    height: 44px
    line-height: 44px
    font-size: $font-size-medium
    .tab-link
      flex: 1
      text-align: center
      .tab-item
        padding-bottom: 5px
        color: $color-text-l
      &.router-link-active
        .tab-item
          color: $color-theme
          border-bottom: 2px solid $color-theme
</style>
