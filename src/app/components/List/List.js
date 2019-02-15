import { s, sA, DOM } from '../../utils/base'
import * as Events from './ListEvents'

export const StaticEvents = () => {
    
    // initialize ui state
    document.addEventListener('DOMContentLoaded', function(e) {
        Events.attachNodeViewBtn(null)
        Events.resizeInputInit()
        Events.attachNewNode(e, false, null)
    })
}

export const DynamicEvents = () => {

    // resize input field
    s(DOM.root).addEventListener('input', function(e) {
        Events.resizeInput(e, false)
    })

    // toggle edit mode view
    s(DOM.listHeader).addEventListener('click', Events.editMode)
    
    s(DOM.tree).addEventListener('click', function(e) {
        Events.nodeView(e)
        Events.createNode(e)
        Events.deleteNode(e)
    })
}
