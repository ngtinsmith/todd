import axios from 'axios'
import { s, DOM } from '../../utils/base'

const url = 'http://localhost:3000/'

export const init = async () => {
    const result = await axios.get(`${url}api/workspace`)
    const { data } = result

    // get elements
    const selected = s(DOM.selected),
        selectedContainer = s(DOM.selectedContainer),
        choicesContainer = s(DOM.choicesContainer)

    const createChoices = (key, isSelected, name) => {
        const el = document.createElement('li')

        el.setAttribute('data-key', key)
        el.setAttribute('data-is-selected', isSelected)

        // set data.workspace.name for each el
        el.textContent = name

        return el
    }

    // update workspace dropdown
    data.forEach(ws => {
        if (ws.wsSelected) {
            selected.textContent = ws.name
            selectedContainer.setAttribute('data-key', ws.dataKey)
        } else {
            choicesContainer.appendChild(createChoices(ws.dataKey, ws.wsSelected, ws.name))
        }
    })
}