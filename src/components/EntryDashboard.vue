<template>
  <div id="entry-dashboard">
    <div class="row">
      <div class="period morning">
        <div class="name">Morning</div>
        <div class="description">before noon</div>
      </div>
    </div>
    <div class="row">
      <div class="period afternoon">
        <div class="name">Afternoon</div>
        <div class="description">noon to 5:00</div>
      </div>
    </div>
    <div class="row last">
      <div class="period evening">
        <div class="name">Evening</div>
        <div class="description">5:00 to bedtime</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.row {
  border-bottom: 1px solid rgba(146, 160, 182, 0.2);
  &.last { border: none; }
  padding: 24px 0;
  .period {
    &.morning {
      padding-top: 36px;
      background: url('../images/sunrise.png') top right/24px 16px no-repeat;
    }
    &.evening {
      padding-bottom: 36px;
      background: url('../images/sunset.png') bottom right/22px 19px no-repeat;
    }
    text-align: right;
    width: 200px;
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
}
</style>
