<template>
  <div :class="['rating', measure]">
    <div class="inner">
      <button @click="doRating" class="rate" :style="buttonStyle">Rate</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rating',
  props: ['measure', 'period'],
  data () {
    return {
      rating: null
    }
  },
  methods: {
    doRating () {
      console.debug(this)
    }
  },
  computed: {
    activeButton () {
      return this.rating === null
    },
    buttonStyle () {
      return {
        cursor: this.activeButton ? 'pointer' : 'not-allowed',
        opacity: this.activeButton ? 1 : 0.25
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/common.scss';

.rating {
  border-left: $grid_style;

  .inner {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  button.rate {
    border-width: 1px;
    border-style: solid;
    background: transparent;
    padding: 6px 8px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    text-transform: uppercase;
    font-weight: 400;
    outline: none;
  }

  &.mood button.rate {
    color: $mood;
    border-color: $mood;
  }

  &.stress button.rate {
    color: $stress;
    border-color: $stress;
  }
  &.energy button.rate {
    color: $energy;
    border-color: $energy;
  }
}
</style>
