import React from 'react'
import fetch from 'isomorphic-unfetch'
import Head from 'next/head'
import Nav from '../components/nav'
import moment from 'moment'
import { makeBaseUrl } from '../utils/utils-general'
import * as _ from 'lodash'

function formatDuration(start, end) {
  const sure_end = end ? end : new Date()
  const ms = moment(sure_end, 'DD/MM/YYYY HH:mm:ss').diff(
    moment(start, 'DD/MM/YYYY HH:mm:ss')
  )
  const d = moment.duration(ms)
  let days = d.asDays()
  const year_check = days / 365
  let years = false
  if (year_check > 1) {
    years = Math.floor(year_check)
    days = days % 365
  }
  const month_check = days / 30
  let months = false
  if (month_check > 1) {
    months = Math.floor(month_check)
    days = days % 30
  }
  days = Math.floor(days)
  let string = ''
  if (years) {
    string += years > 1 ? years + ' years' : years + ' year'
  }
  if (months) {
    if (years) string += ', '
    string += months > 1 ? months + ' months' : months + ' month'
  }
  if (days > 0) {
    if (years || months) string += ' and '
    string += days > 1 ? days + ' days' : days + ' day'
  }
  return string
}

function sortUpcoming(dates) {
  for (let date of dates) {
    let current_date = moment()
    let current_year = current_date.format('YYYY')
    let f_date = date.monthday + ',' + current_year
    let m = moment(f_date)
    let ms = m.format('x')
    let now_ms = current_date.format('x')
    if (now_ms > ms) {
      let new_date = date.monthday + ',' + (parseInt(current_year) + 1)
      let new_m = moment(new_date)
      let new_ms = new_m.format('x')
      date.year = (parseInt(current_year) + 1).toString()
      date.ms = new_ms
    } else if (now_ms < ms) {
      date.year = current_year
      date.ms = ms
    } else {
      date.year = current_year
      date.ms = ms
    }
  }
  let sorted = _.sortBy(dates, 'ms')
  return sorted
}

export default class extends React.Component {
  static async getInitialProps({ req, query, asPath }) {
    let baseUrl = ''
    if (req) {
      baseUrl = makeBaseUrl(req)
    }
    const res = await fetch(`${baseUrl}/static/dates/duration.json`)
    const durations = await res.json()
    const res2 = await fetch(`${baseUrl}/static/dates/remember.json`)
    const dates = await res2.json()
    return { durations, dates }
  }

  getInfo() {
    let synth = window.speechSynthesis
    function speak(text) {
      var utterThis = new window.SpeechSynthesisUtterance(text)
      synth.speak(utterThis)
    }
    const { durations, dates } = this.props
    let string = 'Status Report. '
    for (let category of durations) {
      string += `${category.name}. `
      for (let entry of category.entries) {
        let temp_string = `${entry.name}. `
        const start = moment(entry.start_date)
        const end = entry.end_date ? moment(entry.end_date) : false
        // Only read things that are ongoing (only if there is no end)
        if (!end) {
          const duration = formatDuration(start, end)
          temp_string += `${duration}. `
          string += temp_string
        }
      }
    }
    let s_dates = sortUpcoming(dates)
    let filtered = []
    for (let entry of s_dates) {
      const start = moment().format('DD/MM/YYYY HH:mm:ss')
      const end = moment(entry.ms, 'x').format('DD/MM/YYYY HH:mm:ss')
      const ms = moment(end, 'DD/MM/YYYY HH:mm:ss').diff(
        moment(start, 'DD/MM/YYYY HH:mm:ss')
      )
      let days = ms / 1000 / 60 / 60 / 24
      if (days < 30) {
        filtered.push(`${entry.name} is in ${Math.round(days)} days. `)
      }
    }
    if (filtered.length > 0) {
      string += 'Upcoming. '
      for (let entry of filtered) {
        string += entry
      }
    }
    speak(string)
  }

  render() {
    const { url, durations, dates } = this.props
    const s_dates = sortUpcoming(dates)

    return (
      <div>
        <Head>
          <title>Grant Custer → Dates</title>
        </Head>

        <Nav url={url} />

        <div className="center mb3">
          <h1>Dates</h1>
        </div>

        <div className="measure-max mx-auto px2">
          <div className="bold">Jump to</div>
          <ul>
            {durations.map(dur => (
              <li key={dur.name + '_jump'}>
                <a href={'#' + dur.name}>{dur.name}</a>
              </li>
            ))}
            <li>
              <a href="#Upcoming">Upcoming</a>
            </li>
          </ul>
          <div className="mb3" />
        </div>
        <div className="mb3">
          <div className="measure-max mx-auto px2">
            🔊{' '}
            <button onClick={this.getInfo.bind(this)}>
              Read me the status report
            </button>
          </div>
        </div>
        <div id="date_info" className="measure-max mx-auto px2">
          {durations.map(dur => (
            <div id={dur.name} key={dur.name}>
              <div className="h2 bold">{dur.name}</div>
              <ul>
                {dur.entries.map(entry => {
                  const start = moment(entry.start_date)
                  const end = entry.end_date ? moment(entry.end_date) : false
                  const duration = formatDuration(start, end)
                  return (
                    <li className="mb2" key={entry.name}>
                      <div className="bold read-name">{entry.name}</div>
                      <div className="flex" style={{ color: '#888' }}>
                        <div>{start.format('MMMM Do, YYYY')}</div>
                        <div>&ndash;</div>
                        {end ? (
                          <div>{end.format('MMMM Do, YYYY')}</div>
                        ) : (
                          <div>Now</div>
                        )}
                      </div>
                      {duration ? (
                        <div className="read-duration">{duration}</div>
                      ) : null}
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
        <div className="measure-max mx-auto px2">
          <div id="Upcoming" className="h2 bold">
            Upcoming
          </div>
          <ul>
            {s_dates.map(date => {
              const start = moment().format('DD/MM/YYYY HH:mm:ss')
              const end = moment(date.ms, 'x').format('DD/MM/YYYY HH:mm:ss')
              const duration = formatDuration(start, end)
              return (
                <li className="mb2" key={date.name}>
                  <div className="bold">{date.name}</div>
                  <div style={{ color: '#888' }}>
                    {moment(date.ms, 'x').format('MMMM Do')}
                  </div>
                  <div>In {duration}</div>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="mb4" />
      </div>
    )
  }
}
