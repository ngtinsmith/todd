import { s, DOM, parseHTML, referenceStyle } from '../../utils/base'
import { htmlTemplates, nodeContent } from './list.templates'

const str = {
    expand: 'is-expanded',
    collapse: 'is-collapsed',
}

export const toggleViewClass = branch => {

    const branchClass = branch.className

    if (branchClass === str.expand) {
        branch.classList.replace(str.expand, str.collapse)
    } else if (branchClass === str.collapse) {
        branch.classList.replace(str.collapse, str.expand)
    }
}

export const toggleViewSVG = (toggleClass, node) => {
    let svgClass,
        svgPath

    const svgType = [
        {
            toggle: str.collapse,
            class: 'plus-rectangle-f',
            path: htmlTemplates().pathIsCollapsed
        },
        {
            toggle: str.expand,
            class: 'minus-rectangle',
            path: htmlTemplates().pathIsExpanded
        }
    ]
    
    svgType.forEach(type => {
        if (type.toggle === toggleClass) {
            svgClass = type.class
            svgPath = type.path
        }
    })

    const svgMarkup = `
        <svg xmlns="http://www.w3.org/2000/svg" class="jam jam-${svgClass}" preserveAspectRatio="xMinYMin" viewBox="-2 -2 24 24">
            ${svgPath}
        </svg>
    `
    node.parentNode.replaceChild(parseHTML(svgMarkup), node)
}

export const setStyle = (reference, el) => {
    referenceStyle(reference, {
        fontSize: getComputedStyle(el).fontSize,
        fontWeight: getComputedStyle(el).fontWeight,
        fontFamily: getComputedStyle(el).fontFamily,
    })
}


export const resizeInputWidth = (e, targetElem) => {
    const widthRefer = s(DOM.widthRefer),
        newTarget = targetElem || e.target,
        targetWidth = targetElem ? targetElem.offsetWidth : e.target.offsetWidth

    widthRefer.textContent = newTarget.value
    
    if (widthRefer.offsetWidth !== targetWidth) {
        newTarget.style.width = `${widthRefer.offsetWidth}px`
    }
    
    e.target.setAttribute('value', e.target.value)
    setStyle(widthRefer, newTarget)
}



export const attachSiblingBtn = (isEditMode, hasLastBtn, toSingleNode, list) => {
    
    /**
     * set parent element FROM
     *      default (parent) OR
     *      custom (toSingleNode)
     */
    const node = cur => toSingleNode || cur

    list.querySelectorAll(DOM.nodeListParent).forEach(parent => {
        if (isEditMode) {
            node(parent).insertAdjacentHTML('beforeend', htmlTemplates().addSiblingBtn)           
        } else if (hasLastBtn(node(parent))) {
            node(parent).removeChild(node(parent).lastElementChild)
        }
    })
}



export const editMode = e => {
    if (e.target.matches(DOM.editToggleBtn)
        || e.target.matches(DOM.editToggleLabel)) {

        const list = e.target.closest(DOM.listContent)

        list.querySelector(DOM.root).classList.toggle('edit-mode')
        e.target.parentNode.classList.toggle('edit-mode')

        const isEditMode = list.querySelector(DOM.root).matches('.edit-mode')
        const hasLastBtn = parent => parent.lastElementChild.matches(DOM.btnAddNode) || false
        
        attachSiblingBtn(isEditMode, hasLastBtn, false, list)
    }
}




// initial state = hidden
export const createButton = (e, node, newNodePos, list) => {
    
    const targetNodeContent = pos => {
        let targetSibling

        if (pos === 'after') {
            targetSibling = node.closest('li')
                .nextElementSibling
                .firstElementChild
        
        } else if (pos === 'before') {
            targetSibling = node.parentNode
                .previousElementSibling
                .firstElementChild
            
        } else if (pos === 'as-descendant') {
            targetSibling = node.closest(DOM.nodeContent)
                .nextElementSibling
                .firstElementChild.firstElementChild
        }

        return targetSibling
    }
    
    if (node && newNodePos) {
        // for single new nodes
        const newInput = targetNodeContent(newNodePos).querySelector(DOM.nodeText)

        targetNodeContent(newNodePos).insertAdjacentHTML('beforeend',
            htmlTemplates().addDescendantBtn)

        resizeInputWidth(e, newInput)
    } else {
        const listTarget = list || document
        
        // for initialization (all initial nodes)
        listTarget.querySelectorAll(DOM.nodeContent).forEach(content => {
            content.insertAdjacentHTML('beforeend', htmlTemplates().addDescendantBtn)
        })
    }
}



// call method on new node/sub-node creation
export const attachNodeViewBtn = (toSingleNode, listTarget) => {
    if (toSingleNode) {
        toSingleNode.closest('li').classList.add('is-expanded')
        toSingleNode.closest(DOM.nodeContent)
            .insertAdjacentHTML('afterbegin', htmlTemplates().nodeToggleBtn)
    } else {
        const list = listTarget || document
        
        list.querySelectorAll(DOM.nodeRootList).forEach(node => {
            if (node.contains(node.querySelector('ul'))) {
                node.querySelector(DOM.nodeContent)
                    .insertAdjacentHTML('afterbegin', htmlTemplates().nodeToggleBtn)
            }
        })
    }
}


export const createNode = (e, key) => {
    
    if (e.target.matches(`${DOM.nodeContent} .mdi`) || e.target.matches(DOM.btnAddSiblingExp)) {
        const randomNum = Math.floor(Math.random() * 100)
        const targetBtn = domString => e.target.matches(domString)

        const btnSiblingExp = targetBtn(DOM.btnAddSiblingExp),
            btnSiblingImp = targetBtn(DOM.btnAddSiblingImp),
            btnDescendant = targetBtn(DOM.btnAddChild)

        const attachNodeTo = (closest, hasDescendant, pos, newNode) => {
            // will attach to LI
            if (!hasDescendant) {
                e.target.closest(closest)
                    .insertAdjacentHTML(pos, newNode)
                console.log(e.target)
                
            // will attach to UL
            } else {
                e.target.closest(closest).lastElementChild
                    .insertAdjacentHTML(pos, newNode)
                console.log(e.target)
            }
        }

        // attach explicit sibling
        if (btnSiblingExp) {
            attachNodeTo('ul', true, 'beforebegin', htmlTemplates(randomNum, key).newNode)
            createButton(e, e.target, 'before')
        
        // attach implicit sibling
        } else if (btnSiblingImp) {
            attachNodeTo('li', false, 'afterend', htmlTemplates(randomNum, key).newNode)
            createButton(e, e.target, 'after')

        // attach descendants
        } else if (btnDescendant) {
            
            const closestLi = e.target.closest('li'),
            
                rootHasToggle = e.target.closest(DOM.nodeContent)         
                    .firstElementChild
                    .matches(DOM.nodeToggle),
                hasDescendant = closestLi.lastElementChild.matches('ul'),
            
                position = hasDescendant
                    ? 'afterbegin'
                    : 'beforeend',
            
                templateNode = hasDescendant
                    ? htmlTemplates(randomNum, key).newNode
                    : htmlTemplates(randomNum, key).newSubNode
                  

            const attachBtnSiblingExp = () => {
                const hasBtn = e.target.closest('li')
                    .lastElementChild.lastElementChild
                    .matches(DOM.btnAddNode)
                if (hasBtn) return
                attachNodeTo('li', true, 'beforeend', htmlTemplates().addSiblingBtn)
            }
            
            attachNodeTo('li', hasDescendant, position, templateNode)
            createButton(e, e.target, 'as-descendant')
            attachBtnSiblingExp()

            if (rootHasToggle) return
            attachNodeViewBtn(e.target, null)
        }
    }
}

export const deleteNode = e => {
    if (e.target.matches(DOM.btnDeleteNode)) {

        // cache target node
        const node = e.target.closest(DOM.nodeRootList)
        const content = e.target.closest(DOM.nodeContent)
        const list = e.target.closest(DOM.listContent)
        
        const toggleHoveredState = () => {
            content.classList.toggle('is-muted')
            content.lastElementChild.classList.toggle('is-muted')
        }

        // modal state
        const setState = () => {
            list.querySelector(DOM.modal).classList.toggle('is-open')
            list.querySelector(DOM.root).classList.toggle('is-muted')
        }

        const removeEventListener = event => {
            list.querySelector(DOM.modal).removeEventListener('click', event)
        }

        const deleteNodeItem = () => {
            const nodeParent = e.target.closest('ul')

            /*  remaining childNodes are
                (1) the node itself and
                (2) the explicit add button
            */
            if (nodeParent.childElementCount <= 2) {
                const targetNodeContent = e.target.closest('ul')
                    .previousElementSibling

                nodeParent.parentNode.removeAttribute('class')
                targetNodeContent.removeChild(targetNodeContent.firstElementChild)
                nodeParent.parentNode.removeChild(nodeParent)
                return
            }

            node.parentNode.removeChild(node)

            // insert new node / prevent only node deletion
        }


        const toggleModal = e => {
            const modalCancel = e.target.matches(DOM.modalCancel),
                modalDelete = e.target.matches(DOM.modalDelete)
            
            if (modalDelete) {
                deleteNodeItem()
                setState()
                removeEventListener(toggleModal)
                toggleHoveredState()
            } else if (modalCancel) {
                setState()
                removeEventListener(toggleModal)
                toggleHoveredState()
            }
        }


        // if node has descendant
        if (node.querySelector('ul')) {
            setState()
            toggleHoveredState()
            list.querySelector(DOM.modal).addEventListener('click', toggleModal)
        } else {
            deleteNodeItem()
        }
    }
}

export const createList = (template, nodeParent) => {
    
    // create element first
    const list = document.createElement('div')
    list.setAttribute('class', 'list')
    
    // append list template
    list.appendChild(parseHTML(template))

    // append root node
    list.querySelector(DOM.rootContainer).appendChild(parseHTML(nodeParent))

    return list
}

export const createDomTree = (data, parent) => {

    // map tree
    data.forEach(node => {

        /**
         * @param nodeKey 
         * @param nodeVal
         * @param nodeIsChecked
         */

        // ref template
        const content = nodeContent(
            node.dataKey,
            node.value,
            node.state.isChecked
        )

        const ul = document.createElement('ul')
        const child = document.createElement('li')
        // child.setAttribute('draggable', 'true') // firefox bug

        // set view
        if (node.state.view) {
            child.setAttribute('class', node.state.view)
        }
        
        // set content
        child.appendChild(parseHTML(content))
        
        // set descendant
        if (node.descendant) {
            child.appendChild(ul)
            const root = child.querySelector('ul')

            createDomTree(node.descendant, root)
        }
        
        parent.appendChild(child)
        
        return parent
    })
}