var moment = require('moment')
var _ = require('lodash')

function generateDay (date) {
  let day = []
  _.forEach(['morning', 'afternoon', 'evening'], period => {
    _.forEach(['mood', 'stress', 'energy'], measure => {
      day.push({
        period,
        measure,
        rating: getRandomInt(1, 5),
        date
      })
    })
  })
  return day
}

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

module.exports = function () {
  let accountAge = 7 // past days of user data to dummy up
  let userData = []
  for (let i = 1; i <= accountAge; i++) {
    let date = moment().subtract(i, 'days').unix()
    userData = userData.concat(generateDay(date))
  }
  return userData
}
