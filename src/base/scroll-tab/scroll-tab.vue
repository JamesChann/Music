<template>
  <div class="scrollTab" ref="scrollTab">
    <div class="tab-group" ref="tabGroup">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'scrollTab',
  data() {
    return {
      currentPageIndex: 0
    }
  },
  methods: {
    _setSliderWidth(isResize) {
      this.children = this.$refs.sliderGroup.children

      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        addClass(child, 'slider-item')
        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }

      if (this.loop && !isResize) {
        width += 2 * sliderWidth
      }

      this.$refs.sliderGroup.style.width = width + 'px'
    },
    _initDots() {
      this.dots = new Array(this.children.length)
    },
    _play() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.slider.next()
      }, this.interval)
    },
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          loop: this.loop,
          threshold: 0.3
        },
        click: true
      })

      this.slider.on('scrollEnd', () => {
        let pageIndex = this.slider.getCurrentPage().pageX
        this.currentPageIndex = pageIndex

        if (this.autoPlay) {
          this._play()
        }
      })
    }
  },
  mounted() {
    setTimeout(() => {
      this._setSliderWidth()
      this._initDots()
      this._initSlider()
    }, 20)

    if (this.autoPlay) {
      this._play()
    }

    window.addEventListener('resize', () => {
      this._setSliderWidth(true)
      this.slider.refresh()
    })
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  }
}
</script>