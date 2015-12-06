import React from 'react'
import { Card, CardTitle, CardText, CardActions, RaisedButton, TextField, DatePicker } from 'material-ui'
import _ from 'lodash'
import { Link } from 'react-router'

import RefuelActions from '../refuels/actions'

var Refuel = React.createClass({
  getInitialState: function() {
    return {
      date: null,
      miles: null,
      gallons: null
    }
  },
  handleDateChange: function(event, date) {
    this.setState({date: date.getTime()})
  },
  handleChange: function(event) {
    this.state[event.target.id] = event.target.value
    this.setState(this.state)
  },
  save: function() {
    RefuelActions.set(this.state);
  },
  render: function() {
    return (
      <Card style={{maxWidth: 400, margin: '10vh auto'}}>
        <CardTitle title='Refuel'/>
        <CardText>
          <DatePicker
            onChange={ this.handleDateChange }
            autoOk={ true }
            hintText='When did you refuel?'/>
          <TextField
            id='miles'
            hintText='How many miles were driven?'
            onChange={ this.handleChange }
            type='number'
            step='.1'/>
          <TextField
            id='gallons'
            hintText='How many gallons were used?'
            onChange={ this.handleChange }
            type='number'
            step='.1'/>
        </CardText>
        <CardActions style={ {textAlign: 'right'} }>
          <Link to="/">
            <RaisedButton label='Cancel' default={ true }/>
          </Link>
          <Link to="/refuels">
            <RaisedButton onTouchTap={ this.save } label='Save' primary={ true }/>
          </Link>
        </CardActions>
      </Card>
    )
  }
})

module.exports = {
  Refuel: Refuel
}
