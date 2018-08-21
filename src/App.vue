<template>
  <div id="app">
    <user v-show="showFlag" @hide="hideUser"></user>
    <m-header @showUser="userShow"></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header'
import Tab from 'components/tab/tab'
import Player from 'components/player/player'
import User from 'components/user/user'

export default {
  name: 'App',
  components: {
    MHeader,
    Tab,
    Player,
    User
  },
  data() {
    return {
      showFlag: false
    }
  },
  methods: {
    userShow() {
      this.showFlag = true
    },
    hideUser() {
      this.showFlag = false
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
#app
  color: $color-theme
</style>
