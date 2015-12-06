require('!style!css!sass!./history.scss')

import React from 'react'
import Reflux from 'reflux'
import { Link } from 'react-router'
import { FloatingActionButton, FontIcon, Styles } from 'material-ui'

import RefuelsStore from '../refuels/store'
import RefuelsActions from '../refuels/actions'

let Point = React.createClass({
  onHover: function() {
    RefuelsActions.focus(this.props.data.id)
  },
  render: function() {
    let style = this.props.data.style
    style.backgroundColor = Styles.Colors.yellow400
    return (
      <button className="point" style={ style } onMouseEnter={ this.onHover }/>
    )
  }
})

let History = React.createClass({
  mixins: [Reflux.connect(RefuelsStore, 'histories')],
  buildChart: function () {
    let data = this.state.histories

    // computer time factor
    let timeFactor = 100 / (data.length - 1)

    // computer mpg factor
    let min = 0, max = 0
    for (let i = 0, l = data.length; i < l; i++) {
      let mpg = data[i].mpg
      if (mpg < min) {
        min = mpg
      }
      if (mpg > max) {
        max = mpg
      }
    }
    let mpgFactor = 100 / (max - min)

    //build chart
    let points = []
    let path = ['M0 100']
    for (let i = 0, l = data.length; i < l; i++) {
      let x = i * timeFactor;
      let y = 100 - (data[i].mpg * mpgFactor);

      points.push({
        id: data[i].date,
        style: {
          top: y + '%',
          left: x + '%'
        }
      });
      path.push(`L${x} ${y}`)
    }
    path.push('L100 100')

    return {
      points: points,
      path: path.join(' ')
    }
  },
  render: function() {
    let {points, path} = this.buildChart();
    return (
      <div className='history'>
        <div className='points'>
        {points.map(function(point) {
          return <Point data={ point } className='point'/>
        })}
        </div>
        <svg
          viewBox='0 0 100 100'
          style={ {position: 'absolute', top: '70vh', width: '100%', height: '30vh', zIndex: -1} }
          preserveAspectRatio='none'>
          <path style={ {fill: Styles.Colors.green500} } d={ path }/>
        </svg>
        <span></span>
        <Link to="/refuels/new">
          <FloatingActionButton lineButton={ true } primary={ true } style={ {position: 'fixed', bottom: '20px', right: '20px'} }/>
        </Link>
      </div>
    )
  }
})

module.exports = {
  History: History
}
