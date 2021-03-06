<template>
  <div :class="['rating', measure]">
    <div class="inner">
      <button v-if="!rating" @click="showModal" :class="['showmodal button', measure]" :style="showModalButtonStyle" :disabled="buttonActive ? false : true">Rate</button>
      <div v-else class="small-circles">
        <div v-for="n in 5" :class="['small-circle', smallCircleClass(n)]"></div>
      </div>
    </div>
    <sweet-modal :hide-close-button="true" ref="modal">
      <div class="heading">Bill, please rate your <span :class="`${measure}-color`">{{ measure }}</span>  this {{ period }}.
      </div>
      <div class="circles" @mouseleave="circlesMouseLeave">
        <div v-for="n in 5" :class="`circle-${n}`" @mouseover="circleMouseOver(n)" @click="circleClick(n)" class="circle"></div>
      </div>
      <div class="legend">
        <div>{{ legendLow[measure] }}</div>
        <div>neutral</div>
        <div>{{ legendHigh[measure] }}</div>
      </div>
    </sweet-modal>
  </div>
</template>

<script>
/* global $ */
import moment from 'moment'
import _ from 'lodash'
import { SweetModal } from 'sweet-modal-vue'

export default {
  name: 'rating',
  props: ['measure', 'period', 'userdata'],
  components: {
    SweetModal
  },
  data () {
    return {
      now: moment(),
      noon: moment().hour(12).minute(0).second(0).millisecond(0),
      five: moment().hour(17).minute(0).second(0).millisecond(0),
      rating: null,
      legendLow: {
        mood: 'sad',
        stress: 'stressed out',
        energy: 'tired'
      },
      legendHigh: {
        mood: 'happy',
        stress: 'stress free',
        energy: 'wired'
      }
    }
  },
  mounted () {
    // check for an existing rating from the backend
    let periodIndex = {
      'morning': 0,
      'afternoon': 1,
      'evening': 2
    }[this.period]
    let rating = _.get(this.userdata, [this.date, this.measure, periodIndex])
    if (rating) {
      this.rating = rating
    }

    window.setInterval(() => {
      this.now = moment()
    }, 1000)

    // if the user hasn't rated their measures for the current period yet, prompt them
    if (!this.rating) {
      if (this.period === 'morning' && this.now.isBefore(this.noon) || this.period === 'afternoon' && this.now.isBefore(this.five) && this.now.isAfter(this.noon) || this.period === 'evening' && this.now.isAfter(this.five)) {
        this.$refs.modal.open()
      }
    }
  },
  methods: {
    circlesMouseLeave () {
      $(this.$el).find('.circle.hover').removeClass('hover')
    },
    circleMouseOver (n) {
      $(this.$el).find('.circle.hover').removeClass('hover')
      for (let i = 1; i <= n; i++) {
        $(this.$el).find(`.circle-${i}`).addClass('hover')
      }
    },
    circleClick (n) {
      $(this.$el).find('.circle').removeClass('hover').removeClass('click')
      for (let i = 1; i <= n; i++) {
        $(this.$el).find(`.circle-${i}`).addClass('click')
      }
      window.setTimeout(this.submitRating, 150)
    },
    showModal () {
      this.$refs.modal.open()
    },
    submitRating () {
      this.rating = $(this.$el).find('.circle.click').length
      this.$emit('rate', this.period, this.measure, this.rating)
      this.$refs.modal.close()
    },
    smallCircleClass (n) {
      return n <= this.rating ? 'filled' : ''
    }
  },
  computed: {
    date () {
      return this.now.format('L')
    },
    buttonActive () {
      if (this.period === 'morning') return true
      if (this.period === 'afternoon') {
        return this.now.isAfter(this.noon)
      }
      if (this.period === 'evening') {
        return this.now.isAfter(this.five)
      }
    },
    showModalButtonStyle () {
      return {
        cursor: this.buttonActive ? 'pointer' : 'not-allowed',
        opacity: this.buttonActive ? 1 : 0.25
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

  button.showmodal {
    font-size: 18px;
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
    justify-content: center;
    width: 400px;
    margin: 40px auto 20px;
    border-radius: 32px;
    .circle {
      width: 64px;
      height: 64px;
      border-radius: 32px;
      background-color: #D8D8D8;
      margin: 0 8px;
      cursor: pointer;
      &.hover {
        .mood & { background-color: lighten($mood, 30%); }
        .stress & { background-color: lighten($stress, 30%); }
        .energy & { background-color: lighten($energy, 30%); }
      }
      &.click {
        .mood & { background-color: $mood; }
        .stress & { background-color: $stress; }
        .energy & { background-color: $energy; }
      }
    }
  }

  .legend {
    width: 426px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    div {
      font-weight: 400;
      text-align: center;
      width: 100px;
      line-height: 1.2;
    }
  }
}

.small-circles {
  display: flex;
  justify-content: center;
  width: 100%;
  border-radius: 16px;
  .small-circle {
    width: 32px;
    height: 32px;
    border-radius: 16px;
    background-color: #D8D8D8;
    margin: 0 4px;
    &.filled {
      .mood & { background-color: $mood; }
      .stress & { background-color: $stress; }
      .energy & { background-color: $energy; }
    }
  }
}

</style>
