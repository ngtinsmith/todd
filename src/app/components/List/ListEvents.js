import { s, sA, parseHTML } from '../../utils/base'
import { DOM } from './List'

// Set node's dynamic input width
export const setInputWidth = (e) => {
    s(DOM.widthRefer).textContent = e.target.value
    
    if (s(DOM.widthRefer).offsetWidth > e.target.offsetWidth || 
        s(DOM.widthRefer).offsetWidth < e.target.offsetWidth) {
        e.target.style.width = `${s(DOM.widthRefer).offsetWidth}px`
    }
}

/* 
    toggles are reversed, i.e, if type is-expanded then
    => set path/class to collapsed SVG onClick
*/
const svgType = [
    {
        toggle: 'is-expanded',
        class: 'plus-rectangle-f',
        path:  `<path d="M11 11h4a1 1 0 0 0 0-2h-4V5a1 1 0 0 0-2 0v4H5a1 1 0 1 0 0 2h4v4a1 1 0 0 0 2 0v-4zM4 0h12a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z">
        </path>`
    },
    {
        toggle: 'is-collapsed',
        class: 'minus-rectangle',
        path: `<path d="M4 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4zm0-2h12a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4zm1 9h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2z">`
    }
]

const setSVGView = (toggleClass, node) => {
    let svgMarkupWrapper, svgClass, svgPath
    
    for (let type of svgType) {
        if (type.toggle === toggleClass) {
            svgClass = type.class
            svgPath = type.path
        } 
    }

    svgMarkupWrapper = `
        <svg xmlns="http://www.w3.org/2000/svg" class="jam jam-${svgClass}" preserveAspectRatio="xMinYMin" viewBox="-2 -2 24 24">
            ${svgPath}
        </svg>
    `

    node.parentNode.replaceChild(parseHTML(svgMarkupWrapper), node)
}

const toggleView = branch => {
    const branchClass = branch.className

    if (branchClass === 'is-expanded') {
        branch.classList.replace('is-expanded', 'is-collapsed')
    } else if (branchClass === 'is-collapsed') {
        branch.classList.replace('is-collapsed', 'is-expanded')
    }    
}

export const isCollapsed = e => {
    
    if (e.target.matches(DOM.viewSVG)) {
        const branchRoot = e.target.parentNode.closest('li')
        const closestRootClass = e.target.parentNode.closest('li').className
        
        // Collapse/Expand
        toggleView(branchRoot)
        
        // Toggle SVG Content
        setSVGView(closestRootClass, e.target)
    }
}
