<template>
  <transition name="slide">
    <music-list :songs="songs" :title="title" :bgImg="bgImage"></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import {getSongList} from 'api/recommend'
import {ERR_OK} from 'api/config'
import {mapGetters} from 'vuex'
import {createSong} from 'common/js/song'

export default {
  name: 'Disc',
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
      return this.disc.dissname
    },
    bgImage() {
      return this.disc.imgurl
    },
    ...mapGetters([
      'disc'
    ])
  },
  created() {
    this._getSongList()
  },
  methods: {
    _getSongList() {
      if (!this.disc.dissid) {
        this.$router.push('/recommend')
        return
      }
      getSongList(this.disc.dissid).then((res) => {
        if (res.code === ERR_OK) {
          console.log(res)
          this.songs = this._normalizeSongs(res.cdlist[0].songlist)
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach((musicData) => {
        if (musicData.songid && musicData.albumid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
