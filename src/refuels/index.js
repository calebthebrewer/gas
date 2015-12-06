require('!style!css!sass!./style.scss')

import React from 'react'
import { Styles, Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui'
import { Link } from 'react-router'
import Reflux from 'reflux'
import moment from 'moment';

import RefuelsStore from './store'

var RefuelEntry = React.createClass({
  render: function() {
    this.props;
    return (
      <TableRow>
        <TableRowColumn colSpan="3">{moment(this.props.data.date).format('MMMM Do, YYYY')}</TableRowColumn>
        <TableRowColumn colSpan="3">{this.props.data.miles} mi.</TableRowColumn>
        <TableRowColumn colSpan="3">{this.props.data.gallons} gal.</TableRowColumn>
        <TableRowColumn colSpan="3">{this.props.data.mpg} MPG</TableRowColumn>
      </TableRow>
    )
  }
})

var Refuels = React.createClass({
  mixins: [Reflux.connect(RefuelsStore, 'histories')],
  render: function() {
    return (
      <div className='refuels' style={ {backgroundColor: Styles.Colors.blue600} }>
        <Table fixedHeader={ true } className='refuels-table'>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn colSpan="3">Date</TableHeaderColumn>
              <TableHeaderColumn colSpan="3">Miles</TableHeaderColumn>
              <TableHeaderColumn colSpan="3">Gallons</TableHeaderColumn>
              <TableHeaderColumn colSpan="3">MPG</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {this.state.histories.map(function(history) {
              return <RefuelEntry data={ history }/>
            })}
          </TableBody>
        </Table>
      </div>
    )
  }
})

module.exports = {
  Refuels: Refuels
}
