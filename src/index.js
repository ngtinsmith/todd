import './public/styles'
import * as app from './app/app'
import * as serverAPI from '../server/api/services'
import * as clientAPI from './app/config/api/services'

// init UI
app.init()

// init Services
serverAPI.init()
clientAPI.init()