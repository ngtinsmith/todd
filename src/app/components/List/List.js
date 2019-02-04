import { s, sA } from '../../utils/base'
import { setInputWidth, isCollapsed } from './ListEvents'

export const DOM = {
    nodeRoot:    '.list-tree-root',
    nodeParent:  '.list-tree-root li',
    nodeContent: '.node-content',
    branchView:  '.js-branch-collapse',
    viewSVG:     '.js-branch-collapse svg',
    widthRefer:   '.calc-label-width span',
}

export const StaticEvents = () => {
    // check if needed on global event
    s(DOM.nodeRoot).addEventListener('input', setInputWidth)
}

export const DynamicEvents = () => {
    sA(DOM.nodeContent).forEach(content => {
        content.addEventListener('click', isCollapsed)
    })
}
