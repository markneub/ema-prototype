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
      Object.keys(this.userdata).forEach(date => {
        let dayData = this.userdata[date]
        let label = moment(date, 'L').format('ddd Do')
        out.push([label, dayData['mood'][0], dayData['stress'][0], dayData['energy'][0]])
        out.push([label + ' afternoon', dayData['mood'][1], dayData['stress'][1], dayData['energy'][1]])
        out.push([label + ' evening', dayData['mood'][2], dayData['stress'][2], dayData['energy'][2]])
      })
      return out
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
