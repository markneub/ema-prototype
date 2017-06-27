<template>
  <div :class="['rating', measure]">
    <div class="inner">
      <button @click="doRating" class="rate" :style="buttonStyle">Rate</button>
    </div>
    <sweet-modal :hide-close-button="true" ref="modal">
      <div class="heading">Mark, please rate your <span :class="`${measure}-color`">{{ measure }}</span> this {{ period }}.
      </div>
      <div class="circles">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
      </div>
    </sweet-modal>
  </div>
</template>

<script>
import { SweetModal } from 'sweet-modal-vue'

export default {
  name: 'rating',
  props: ['measure', 'period'],
  components: {
    SweetModal
  },
  data () {
    return {
      rating: null
    }
  },
  methods: {
    doRating () {
      this.$refs.modal.open()
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

<style lang="scss">
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
    border-width: 2px;
    border-style: solid;
    background: transparent;
    padding: 6px 8px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 18px;
    text-transform: uppercase;
    font-weight: 500;
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

.sweet-modal {
  max-width: 800px !important;

  .heading {
    font-weight: 500;
    font-size: 30px;
  }

  .circles {
    display: flex;
    justify-content: space-around;
    width: 80%;
    margin: 20px auto 0;
    .circle {
      width: 64px;
      height: 64px;
      border-radius: 32px;
      background-color: #D8D8D8;
    }
  }
}


</style>
