<template>
  <div id="entry-dashboard" v-if="userdata">
    <div id="time-line"><div>{{ now.format('LT') }}</div></div>
    <div class="heading">
      <div class="mood">Mood</div>
      <div class="stress">Stress</div>
      <div class="energy">Energy</div>
    </div>
    <div class="row">
      <div class="period morning">
        <div class="pad">
          <div class="name">Morning</div>
          <div class="description">before noon</div>
        </div>
      </div>
      <rating v-for="measure in measures" :measure="measure" period="morning" :userdata="userdata" :key="`${measure}-morning`" v-on:rate="rate"></rating>
    </div>
    <div class="row">
      <div class="period afternoon">
        <div class="pad">
          <div class="name">Afternoon</div>
          <div class="description">noon to 5:00</div>
        </div>
      </div>
      <rating v-for="measure in measures" :measure="measure" period="afternoon" :userdata="userdata" :key="`${measure}-morning`" v-on:rate="rate"></rating>
    </div>
    <div class="row last">
      <div class="period evening">
        <div class="pad">
          <div class="name">Evening</div>
          <div class="description">5:00 to bedtime</div>
        </div>
      </div>
      <rating v-for="measure in measures" :measure="measure" period="evening" :userdata="userdata" :key="`${measure}-morning`" v-on:rate="rate"></rating>
    </div>
    <rating-history :userdata="userdata"></rating-history>
  </div>
</template>

<script>
/* global $ */
import Rating from '@/components/Rating'
import RatingHistory from '@/components/RatingHistory'
import moment from 'moment'
import axios from 'axios'
import Vue from 'vue'

export default {
  data () {
    return {
      now: moment(),
      measures: ['mood', 'stress', 'energy'],
      userdata: null
    }
  },
  components: {
    Rating,
    RatingHistory
  },
  mounted () {
    // get userdata from local api server
    axios.get('http://localhost:3000/userdata').then(resp => {
      this.userdata = resp.data
      window.setInterval(this.updateTimeLine, 1000)
      this.$nextTick(this.updateTimeLine)
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    updateTimeLine () {
      let maxOffset = $('.row.last').position().top + $('.row.last').innerHeight()
      let noonOffset = $('.row:eq(1)').position().top - 1
      let fiveOffset = $('.row:eq(2)').position().top - 1
      this.now = moment()
      let midnight = moment().startOf('day')
      let noon = moment().hour(12).minute(0).second(0).millisecond(0)
      let five = moment().hour(17).minute(0).second(0).millisecond(0)
      let minutesIn = this.now.diff(midnight, 'minutes')
      let ratio, pxOffset
      if (this.now.isSameOrBefore(noon)) {
        ratio = minutesIn / (12 * 60)
        pxOffset = ratio * noonOffset
      } else if (this.now.isAfter(noon) && this.now.isSameOrBefore(five)) {
        ratio = (minutesIn - (12 * 60)) / (5 * 60)
        pxOffset = (ratio * (fiveOffset - noonOffset)) + noonOffset
      } else if (this.now.isAfter(five)) {
        ratio = (minutesIn - (17 * 60)) / (7 * 60)
        pxOffset = (ratio * (maxOffset - fiveOffset)) + fiveOffset
      }
      $('#time-line').css('top', pxOffset)
    },
    rate (period, measure, rating) {
      let date = moment().format('L')
      let periodIndex = {
        'morning': 0,
        'afternoon': 1,
        'evening': 2
      }[period]

      let dayData
      if (!this.userdata[date]) {
        dayData = {
          'mood': [null, null, null],
          'stress': [null, null, null],
          'energy': [null, null, null]
        }
      } else {
        dayData = this.userdata[date]
      }

      // update datastore reactively
      let tempData = this.userdata
      dayData[measure][periodIndex] = rating
      tempData[date] = dayData
      this.userdata = Vue.util.extend({}, tempData)

      // update the backend
      axios.post('http://localhost:3000/record', {
        period,
        measure,
        rating,
        date: moment().unix()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/common.scss';

#entry-dashboard {
  min-width: 916px;
  max-width: 1280px;
  margin: 80px auto 0;
  position: relative;
}

.heading {
  display: flex;
  padding-left: 240px;
  div {
    font-weight: 500;
    font-size: 24px;
    text-align: center;
    width: calc(100% / 3);
    &.mood { color: $mood; }
    &.stress { color: $stress; }
    &.energy { color: $energy; }
  }
}

.row {
  display: flex;
  border-bottom: $grid_style;
  &.last { border: none; }

  .period {
    text-align: right;
    width: 240px;
    > .pad {
      padding: 24px;
    }
    &.morning {
      > .pad { padding-top: 48px; }
      background: url('../images/sunrise.png') 80% top/24px 16px no-repeat;
    }
    &.evening {
      > .pad { padding-bottom: 48px; }
      background: url('../images/sunset.png') 80% bottom/22px 19px no-repeat;
    }
    .name {
      font-size: 30px;
      font-weight: 500;
    }
    .description {
      color: #92A0B6;
      font-size: 20px;
    }
  }

  .rating {
    width: calc((100% - 240px) / 3);
  }
}

#time-line {
  width: calc(100% - 240px);
  position: absolute;
  margin-left: 240px;
  height: 0;
  right: 0;
  border-bottom: 2px solid rgba(0, 0, 0, 0.2);
  z-index: 2;
  text-align: right;
  > div {
    position: relative;
    display: inline-block;
    transform: translate(100%, -50%);
    padding-left: 10px;
    color: rgba(0, 0, 0, 0.4);
  }
}
</style>
