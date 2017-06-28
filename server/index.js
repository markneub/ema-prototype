var sqlite3 = require('sqlite3').verbose()
var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser')
var db = new sqlite3.Database('ema-proto.db')
var _ = require('lodash')
var moment = require('moment')
var mockdata = require('./mock-data')()

app.use(cors())
app.options('*', cors())
app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

db.serialize(function () {
  db.run('CREATE TABLE IF NOT EXISTS ratings (period TEXT, measure TEXT, rating NUMBER, date INTEGER)')

  // if the database is empty, prepopulate it with random user data
  db.get('SELECT COUNT(*) as count FROM ratings', (err, row) => {
    if (row.count === 0) {
      _.forEach(mockdata, row => {
        db.run(`INSERT INTO ratings (period, measure, rating, date) VALUES ('${row.period}', '${row.measure}', ${row.rating}, ${row.date})`)
      })
    }
  })
})

app.get('/userdata', function (req, res) {
  db.all('SELECT period, measure, rating, date FROM ratings ORDER BY date', (err, rows) => {
    // transform records from db rows to compact format for frontend

    // group records by date
    let dateGroups = _.groupBy(rows, row => {
      return moment.unix(row.date).format('L')
    })

    // group entries per date by measure, then make each measure an array of period readings
    _.forEach(dateGroups, (date, i) => {
      let measures = _.groupBy(date, 'measure')
      _.forEach(measures, (measure, j) => {
        let thisMeasure = [null, null, null]
        _.forEach(measure, dataPoint => {
          if (dataPoint.period === 'morning') thisMeasure[0] = dataPoint.rating
          if (dataPoint.period === 'afternoon') thisMeasure[1] = dataPoint.rating
          if (dataPoint.period === 'evening') thisMeasure[2] = dataPoint.rating
        })
        measures[j] = thisMeasure
      })
      dateGroups[i] = measures
    })

    // return output to frontend
    res.json(dateGroups)
  })
})

app.post('/record', (req, res) => {
  let period = req.body.period
  let measure = req.body.measure
  let rating = req.body.rating
  let date = req.body.date

  db.run(`INSERT INTO ratings (period, measure, rating, date) VALUES ('${period}', '${measure}', ${rating}, ${date})`, function (err, row) {
    if (err) {
      console.err(err)
      res.status(500)
    } else {
      res.status(204)
    }
    res.end()
  })

  res.end()
})

app.listen(3000)

console.log('Listening for requests at http://localhost:3000/')
