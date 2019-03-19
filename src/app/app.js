import * as Common from './common/common'
import * as List from './components/list/list'

// Init Function
export const init = () => {
    Common.toggleEventListeners()
    List.Controller.init()
    List.Controller.setEventListeners()
    console.log('App running...')
}