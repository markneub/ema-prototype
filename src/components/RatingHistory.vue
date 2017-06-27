<template>
  <vue-chart
    :columns="columns"
    :rows="rows"
    :options="options">
  </vue-chart>
</template>

<script>
import moment from 'moment'

export default {
  props: ['userdata'],
  data () {
    return {
      options: {
        hAxis: {
          title: 'Day',
          showTextEvery: 3
        },
        vAxis: {
          title: 'Rating',
          viewWindowMode: 'explicit',
          viewWindow: {
            max: 5.5,
            min: 0.5
          }
        },
        colors: ['#50E3C2', '#D0011B', '#F6A623'],
        width: '100%',
        height: 500,
        curveType: 'function'
      }
    }
  },
  computed: {
    columns () {
      return [{
        'type': 'string',
        'label': 'Year'
      }, {
        'type': 'number',
        'label': 'Mood'
      }, {
        'type': 'number',
        'label': 'Stress'
      }, {
        'type': 'number',
        'label': 'Energy'
      }]
    },
    rows () {
      let out = []
      this.userdata.forEach((arrayEl, index) => {
        let dayLabel = moment().subtract(7 - index, 'days').format('ddd Do')
        out.push([dayLabel + '', arrayEl['mood'][0], arrayEl['stress'][0], arrayEl['energy'][0]])
        // afternoon and evening labels aren't shown on axis
        out.push([dayLabel + ' afternoon', arrayEl['mood'][1], arrayEl['stress'][1], arrayEl['energy'][1]])
        out.push([dayLabel + ' evening', arrayEl['mood'][2], arrayEl['stress'][2], arrayEl['energy'][2]])
      })
      return out
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
