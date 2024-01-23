const dayjs = require('dayjs')
//import dayjs from 'dayjs' // ES 2015
dayjs().format()

const express = require('express')
const querystring = require('node:querystring')
const app = express()
const port = 3000
//today
app.get('/api/dates/today', (req, res) => {
    const todayDate = dayjs().format("ddd MMM D, YYYY");
    res.status(200).json({"date": todayDate})
})
//tomorrow
app.get('/api/dates/tomorrow', (req, res) => {
    const tomorrowDate = dayjs().add(1, 'day').format("ddd MMM D, YYYY");
    res.status(200).json({"date": tomorrowDate})
  })
//yesterday
app.get('/api/dates/yesterday', (req, res) => {
    const yesterdayDate = dayjs().subtract(1, 'day').format("ddd MMM D, YYYY");
    res.status(200).json({"date": yesterdayDate})
  })
//day of week
app.get('/api/day-of-week/:year/:month/:day', (req, res) => {
    const userDate = `${req.params.year}.${req.params.month}.${req.params.day}`;
    const dayOfWeek = dayjs(userDate).format("ddd MMM D, YYYY");
    res.status(200).json({"date": dayOfWeek})
  })
//current
app.get('/api/current-time', (req, res) => {
    const currentTime = dayjs().format("HH:mm:ss")
    res.status(200).json({"date": currentTime})
  })
  app.get('/api/current-time?format=12', (req, res) => {
    const currentTime = dayjs().format("hh:mm:ss")
    res.status(200).json({"date": currentTime})
  })
//timestamp
app.get('/api/timestamp', (req, res) => {
    const timeStamp = dayjs().valueOf()
    res.status(200).json({"date": timeStamp})
  })
  app.get('/api/timestamp?format=seconds', (req, res) => {
    const timestamp = dayjs().unix()
    res.status(200).json({"date": timestamp})
  })

  /* -grabs ?format=seconds, but not sure how to use it-
  app.get('/api/timestamp', (req, res) => {
    let format = req.query.format
    let newTimeStamp = dayjs().unix(format)
    res.status(200).json({"date": format})
  }) */
  //not found
  app.get('*', function (req, res) {
    res.status(404).json({ error: 'route not found' })
  })


app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})