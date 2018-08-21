<template>
  <transition name="slide">
    <music-list :songs="songs" :title="title" :bgImg="bgImage"></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import {getMusicList} from 'api/rank'
import {createSong} from 'common/js/song'
import {ERR_OK} from 'api/config'
import {mapGetters} from 'vuex'

export default {
  name: 'RankDetail',
  components: {
    MusicList
  },
  data() {
    return {
      songs: []
    }
  },
  computed: {
    title() {
      return this.toplist.topTitle
    },
    bgImage() {
      if (this.songs.length) {
        return this.songs[0].image
      }
      return this.toplist.picUrl
    },
    ...mapGetters([
      'toplist'
    ])
  },
  created() {
    this._getMusicList()
  },
  methods: {
    _getMusicList() {
      if (!this.toplist.id) {
        this.$router.push('/rank')
        return
      }
      getMusicList(this.toplist.id).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.songlist)
          console.log(this.songs)
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach((item) => {
        const musicData = item.data
        ret.push(createSong(musicData))
      })
      return ret
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
