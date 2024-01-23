const dayjs = require('dayjs')
//import dayjs from 'dayjs' // ES 2015
dayjs().format()

const express = require('express')
const querystring = require('node:querystring')
const app = express()
const port = 3000

//today
/* app.get('/api/dates/today', (req, res) => {
    const todayDate = dayjs().format("ddd MMM D, YYYY");
    res.status(200).json({"date": todayDate})
}) */
app.get('/api/dates/today', (req, res) => {
    const todayDate = dayjs().format("ddd MMM DD, YYYY");
    const todayDateSimple = dayjs().format("YYYY MM DD");
    let format = req.query.format
    if (format == 'simple') {
        res.status(200).json({"date": todayDateSimple})
    }else {
        res.status(200).json({"date": todayDate})
    }
  })

//tomorrow
/* app.get('/api/dates/tomorrow', (req, res) => {
    const tomorrowDate = dayjs().add(1, 'day').format("ddd MMM D, YYYY");
    res.status(200).json({"date": tomorrowDate})
  }) */
  app.get('/api/dates/tomorrow', (req, res) => {
    const tomorrowDate = dayjs().add(1, 'day').format("ddd MMM DD, YYYY");
    const tomorrowDateSimple = dayjs().add(1, 'day').format("YYYY MM DD");
    let format = req.query.format
    if (format == 'simple') {
        res.status(200).json({"date": tomorrowDateSimple})
    }else {
        res.status(200).json({"date": tomorrowDate})
    }
  })

//yesterday
/* app.get('/api/dates/yesterday', (req, res) => {
    const yesterdayDate = dayjs().subtract(1, 'day').format("ddd MMM D, YYYY");
    res.status(200).json({"date": yesterdayDate})
  }) */
  app.get('/api/dates/yesterday', (req, res) => {
    const yesterdayDate = dayjs().subtract(1, 'day').format("ddd MMM DD, YYYY");
    const yesterdayDateSimple = dayjs().subtract(1, 'day').format("YYYY MM DD");
    let format = req.query.format
    if (format == 'simple') {
        res.status(200).json({"date": yesterdayDateSimple})
    }else {
        res.status(200).json({"date": yesterdayDate})
    }
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
    const currentTimeAlt = dayjs().format("hh:mm:ss")
    let format = req.query.format
    if (format == 12) {
    res.status(200).json({"date": currentTimeAlt})
  }else {
    res.status(200).json({"date": currentTime})
  }
})

//timestamp
app.get('/api/timestamp', (req, res) => {
    const timeStamp = dayjs().valueOf()
    const timeStampUnix = dayjs().unix()
    let format = req.query.format
    if (format == 'seconds') {
        res.status(200).json({"date": timeStampUnix})
    }else {
        res.status(200).json({"date": timeStamp})
    }
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