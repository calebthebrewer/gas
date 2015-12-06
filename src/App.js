import React, { Component } from 'react'
import { Styles } from 'material-ui'

import { History } from './history'
import { Refuels } from './refuels'

let injectTapEventPlugin = require("react-tap-event-plugin")
injectTapEventPlugin()

var App = React.createClass({
  render: function() {
    return (
      <div>
        <Refuels/>
        <History/>
        {this.props.children}
      </div>
    );
  }
})

module.exports = {
  App: App
}
