<template>
  <div :class="['rating', measure]">
    <div class="inner">
      <button v-if="!rating" @click="showModal" :class="['showmodal button', measure]" :style="showModalButtonStyle">Rate</button>
      <template v-else>
        {{ rating }}
      </template>
    </div>
    <sweet-modal :hide-close-button="true" ref="modal">
      <div class="heading">Mark, please rate your <span :class="`${measure}-color`">{{ measure }}</span> this {{ period }}.
      </div>
      <div class="circles" @mouseleave="circlesMouseLeave">
        <div v-for="n in 5" :class="`circle-${n}`" @mouseover="circleMouseOver(n)" @click="circleClick(n)" class="circle"></div>
      </div>
      <button @click="submitRating" :class="['submit button', measure]">SUBMIT</button>
    </sweet-modal>
  </div>
</template>

<script>
/* global $ */
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
    },
    showModal () {
      this.$refs.modal.open()
    },
    submitRating () {
      this.rating = $(this.$el).find('.circle.click').length
      this.$refs.modal.close()
    }
  },
  computed: {
    activeButton () {
      return this.rating === null
    },
    showModalButtonStyle () {
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
    margin: 40px auto;
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

  button.submit {
    margin-top: 32px;
    font-size: 24px;
  }
}


</style>
