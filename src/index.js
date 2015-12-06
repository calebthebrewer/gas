import React from 'react'
import { render } from 'react-dom'
import {Router, Route} from 'react-router'

import { App } from './App'
import { Refuels } from './refuels'
import { Refuel } from './refuel'
import { History } from './history'

let injectTapEventPlugin = require("react-tap-event-plugin")
injectTapEventPlugin()

render((
  <Router>
    <Route path="/" component={ App }>
      <Route path="/new" component={ Refuel }/>
      <Route path="/edit/:id" component={ Refuel }/>
    </Route>
  </Router>
)
, document.getElementById('root'))
