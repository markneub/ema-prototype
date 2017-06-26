<template>
  <div id="entry-dashboard">
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
      <rating v-for="measure in measures" :measure="measure" period="morning" :key="`${measure}-morning`"></rating>
    </div>
    <div class="row">
      <div class="period afternoon">
        <div class="pad">
          <div class="name">Afternoon</div>
          <div class="description">noon to 5:00</div>
        </div>
      </div>
      <rating v-for="measure in measures" :measure="measure" period="afternoon" :key="`${measure}-morning`"></rating>
    </div>
    <div class="row last">
      <div class="period evening">
        <div class="pad">
          <div class="name">Evening</div>
          <div class="description">5:00 to bedtime</div>
        </div>
      </div>
      <rating v-for="measure in measures" :measure="measure" period="evening" :key="`${measure}-morning`"></rating>
    </div>
  </div>
</template>

<script>
import Rating from '@/components/Rating'

export default {
  data () {
    return {
      measures: ['mood', 'stress', 'energy']
    }
  },
  components: {
    Rating
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/common.scss';

#entry-dashboard {
  min-width: 916px;
  max-width: 1280px;
  margin: 0 auto;
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
      color: #4A4A4A;
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
</style>
