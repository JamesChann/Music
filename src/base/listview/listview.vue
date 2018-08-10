<template>
  <scroll class="listview" :data="data">
    <ul>
      <li v-for="(group, index) in data" class="list-group" :key="index">
        <h2 class="list-group-title">{{ group.title }}</h2>
        <ul class="list-group-items">
          <li v-for="(item, index) in group.items" class="list-group-item" :key="index">
            <img class="avatar" :src="item.avatar">
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
  </scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'

export default {
  name: 'ListView',
  components: {
    Scroll
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'

.listview
  position: fixed;
  top: 88px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  .list-group
    padding-bottom: 30px
    .list-group-title
      height: 30px
      line-height: 30px
      padding-left: 20px
      color: $color-text-l
      background: $color-highlight-background
      font-size: $font-size-small
    .list-group-items
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          font-size: $font-size-medium
          color: $color-text-l
</style>
