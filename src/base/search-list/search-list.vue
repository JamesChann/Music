<template>
  <div class="search-list">
    <ul class="search-list-cont">
      <li class="search-item" v-for="(item, index) in searches" :key="index" @click="selectItem(item)">
        <span class="text">{{ item }}</span>
        <span class="icon" @click.stop="deleteOne(item)">
          <i class="icon-delete"></i>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import storage from 'good-storage'

export default {
  name: 'SearchList',
  props: {
    searches: {
      type: Array,
      default: () => []
    }
  },
  created() {
    console.log(this.searches)
    console.log(storage.get('__search__', []))
  },
  methods: {
    deleteOne(item) {
      this.$emit('delete', item)
    },
    selectItem(item) {
      this.$emit('select', item)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

.search-list
  .search-list-cont
    .search-item
      display: flex
      align-items: center
      height: 40px
      overflow: hidden
      border-bottom: 1px solid #eee
      .text
        flex: 1
        color: $color-text-b
        font-size: $font-size-small
      .icon
        extend-click()
        .icon-delete
          font-size: $font-size-small
          color: $color-text-d
</style>
