/* Bootstrap Module

    Set Global EventListeners
    Set Component States
    Async Fetch Data
*/

// Set Global EventListeners
import { StaticEvents, DynamicEvents } from './components/List/List'

// Init Function
export const _init = () => {
    StaticEvents()
    DynamicEvents()
}