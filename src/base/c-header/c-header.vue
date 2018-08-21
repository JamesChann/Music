<template>
  <div class="header">
    <div class="back" @click="back">
      <i class="iconfont icon-row"></i>
    </div>
    <div class="title">{{ title }}</div>
  </div>
</template>

<script>
export default {
  name: 'CHeader',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    back() {
      this.$router.back()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.header
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 44px
  background: $color-background-header
  .back
    position: absolute
    top: 50%
    transform: translateY(-50%)
    left: 15px
    z-index: 50
    color: $color-background
    .icon-row
      display: block
      transform: rotate(180deg)
  .title
    position: absolute
    top: 50%
    transform: translateY(-50%)
    left: 45px
    color: $color-background
</style>
