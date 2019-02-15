import { s, sA, DOM, parseHTML, referenceStyle } from '../../utils/base'
import { htmlTemplates } from './ListTemplates'

// _private
// extend as table of contents mapper / simplified view
// process street > detail functionality
// child/parent traversal & boolean ops helper functions
// nodeview collapse/expand initial state
// gzipped history / x-days rollback
// explicit new-node btn too verbose?

/* HELPERS */
const setStyle = (reference, el) => {
    referenceStyle(reference, {
        fontSize: getComputedStyle(el).fontSize,
        fontWeight: getComputedStyle(el).fontWeight,
        fontFamily: getComputedStyle(el).fontFamily,
    })
}

const attachSiblingBtn = (editMode, hasLastBtn, toSingleNode) => {
    
    /*  set parent element FROM
            default (parent) OR
            custom (toSingleNode)
    */
    const node = cur => {
        return toSingleNode ? toSingleNode : cur
    }

    sA(DOM.nodeListParent).forEach(parent => {
        if (editMode) {
            node(parent).insertAdjacentHTML('beforeend', htmlTemplates().addSiblingBtn)           
        } else if (hasLastBtn(node(parent))) {
            node(parent).removeChild(node(parent).lastElementChild)
        }
    })
}
/* END HELPERS */

// Edit mode
const editMode = e => {
    if (e.target.matches(DOM.lockBtn)) {
        s(DOM.root).classList.toggle('edit-mode')

        const editMode = s(DOM.root).matches('.edit-mode')
        const hasLastBtn = (parent) => {
            return parent.lastElementChild.matches(DOM.btnAddNode)
                   ? true : false
        }

        const lockBtnState = () => {
            e.target.parentNode.classList.toggle('edit-mode')

            if (editMode) {
                e.target.parentNode.replaceChild(parseHTML(htmlTemplates().treeLockOpen), e.target)
            } else {
                e.target.parentNode.replaceChild(parseHTML(htmlTemplates().treeLockClose), e.target)
            }
        }
        
        lockBtnState()
        attachSiblingBtn(editMode, hasLastBtn, false)
    }
}

// Call method on new node/sub-node creation
const attachNodeViewBtn = (toSingleNode) => {
    if (toSingleNode) {
        toSingleNode.closest('li').classList.add('is-expanded')
        toSingleNode.closest(DOM.nodeContent)
            .insertAdjacentHTML('afterbegin', htmlTemplates().nodeToggleBtn)
    } else {
        sA(DOM.nodeRootList).forEach(list => {
            if (list.contains(list.querySelector('ul'))) {
                list.querySelector(DOM.nodeContent)
                    .insertAdjacentHTML('afterbegin', htmlTemplates().nodeToggleBtn)
            }
        })
    }
}

// Attach addChild buttons; initial state = hidden
const attachNewNode = (e, node, newNodePos) => {

    const targetNodeContent = (pos) => {
        let targetSibling

        if (newNodePos === 'after') {
            targetSibling = node.closest('li')
                                .nextElementSibling
                                .firstElementChild
        
        } else if (newNodePos === 'before') {
            targetSibling = node.parentNode
                                .previousElementSibling
                                .firstElementChild
            
        } else if (newNodePos === 'as-descendant') {
            targetSibling = node.closest(DOM.nodeContent)
                                .nextElementSibling
                                .firstElementChild.firstElementChild
        }

        // console.log(targetSibling.querySelector(DOM.nodeText))
        return targetSibling
    }

    
    if (node && newNodePos) {
        // for single new nodes
        const newInput = targetNodeContent(newNodePos).querySelector(DOM.nodeText)

        targetNodeContent(newNodePos).insertAdjacentHTML('beforeend',
            htmlTemplates().addChildBtn_style3)

        resizeInput(e, newInput)
    } else {
        // for initialization (all initial nodes)
        sA(DOM.nodeContent).forEach(node => {
            node.insertAdjacentHTML('beforeend', htmlTemplates().addChildBtn_style3)
        })
    }
}

// Set node's dynamic input width
const resizeInput = (e, target) => {
    const widthRefer = s(DOM.widthRefer),
          newTarget = target ? target : e.target,
          targetWidth = target ? target.offsetWidth : e.target.offsetWidth

    widthRefer.textContent = newTarget.value
    
    if (widthRefer.offsetWidth !== targetWidth) {
        newTarget.style.width = `${widthRefer.offsetWidth}px`
    }
    
    setStyle(widthRefer, newTarget)
}

// Set input width state
const resizeInputInit = () => {
    const widthRefer = s(DOM.widthRefer)
    
    sA(DOM.nodeText).forEach(input => {    
        widthRefer.textContent = input.value
        setStyle(widthRefer, input)
        input.style.width = `${widthRefer.offsetWidth}px`
    })
}

// Toggle node state
const nodeView = e => {
    const expand = 'is-expanded',
          collapse = 'is-collapsed'

    const toggleClass = branch => {
        const branchClass = branch.className
    
        if (branchClass === expand) {
            branch.classList.replace(expand, collapse)
        } else if (branchClass === collapse) {
            branch.classList.replace(collapse, expand)
        }    
    }

    const svgType = [
        {
            toggle: collapse,
            class: 'plus-rectangle-f',
            path:  htmlTemplates().pathIsCollapsed
        },
        {
            toggle: expand,
            class: 'minus-rectangle',
            path: htmlTemplates().pathIsExpanded
        }
    ]
    
    const setSVGState = (toggleClass, node) => {
        let svgMarkup, svgClass, svgPath
        
        for (let type of svgType) {
            if (type.toggle === toggleClass) {
                svgClass = type.class
                svgPath = type.path
            } 
        }
    
        svgMarkup = `
            <svg xmlns="http://www.w3.org/2000/svg" class="jam jam-${svgClass}" preserveAspectRatio="xMinYMin" viewBox="-2 -2 24 24">
                ${svgPath}
            </svg>
        `
        node.parentNode.replaceChild(parseHTML(svgMarkup), node)
    }

    if (e.target.matches(DOM.nodeToggleSVG)) {
        const nodeRoot = e.target.closest('li')
        
        // Collapse/Expand
        toggleClass(nodeRoot)
        
        // Toggle SVG Content
        setSVGState(nodeRoot.className, e.target)
    }
}

// Create New Node
const createNode = e => {
    if (e.target.matches(`${DOM.nodeContent} .mdi`) ||
        e.target.matches(DOM.btnAddSiblingExp)) {
        
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
            // will attach to UL
            } else {
                e.target.closest(closest).lastElementChild
                        .insertAdjacentHTML(pos, newNode)
            }
        }

         // attach explicit sibling
        if (btnSiblingExp) {
            attachNodeTo('ul', true, 'beforebegin', htmlTemplates(randomNum).newNode)
            attachNewNode(e, e.target, 'before')
        
        // attach implicit sibling
        } else if (btnSiblingImp) {
            attachNodeTo('li', false, 'afterend', htmlTemplates(randomNum).newNode)
            attachNewNode(e, e.target, 'after')

        // attach descendants
        } else if (btnDescendant) {
            const closestLi         = e.target.closest('li'),
                  lastChildHasBtn   = closestLi.lastElementChild.lastElementChild
                                            .matches(DOM.btnAddNode),
                  rootHasToggle     = e.target.closest(DOM.nodeContent)         
                                            .firstElementChild
                                            .matches(DOM.nodeToggle),
                  hasDescendant     = closestLi.lastElementChild.matches('ul'),
                  position          = hasDescendant
                                            ? 'afterbegin'
                                            : 'beforeend',
                  templateNode      = hasDescendant
                                            ? htmlTemplates(randomNum).newNode
                                            : htmlTemplates(randomNum).newSubNode
                  

            const attachBtnSiblingExp = lastChildHasBtn => {
                const hasBtn = e.target.closest('li')
                                    .lastElementChild.lastElementChild
                                    .matches(DOM.btnAddNode)
                if (hasBtn) return
                attachNodeTo('li', true, 'beforeend', htmlTemplates(randomNum).addSiblingBtn)
            }
            
            attachNodeTo('li', hasDescendant, position, templateNode)
            attachNewNode(e, e.target, 'as-descendant')
            attachBtnSiblingExp(lastChildHasBtn)

            if (rootHasToggle) return
            attachNodeViewBtn(e.target)
        }
    }
}

const deleteNode = e => {
    if (e.target.matches(DOM.btnDeleteNode)) {

        // cache target node
        const node = e.target.closest(DOM.nodeRootList)
        const nodeContent = e.target.closest(DOM.nodeContent)
        
        const disableHoveredState = () => {
            nodeContent.classList.toggle('is-muted')
            nodeContent.lastElementChild.classList.toggle('is-muted')
        }

        const setState = (removeListener) => {
            s(DOM.modal).classList.toggle('is-open')
            s(DOM.root).classList.toggle('is-muted')
            if (removeListener) {
                s(DOM.modal).removeEventListener('click', getFucked)
            }
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

                targetNodeContent.removeChild(targetNodeContent.firstElementChild)
                nodeParent.parentNode.removeChild(nodeParent)
                return
            }

            node.parentNode.removeChild(node)

            // insert new node / prevent only node deletion
        }

        const getFucked = (e) => {
            const modalCancel = e.target.matches(DOM.modalCancel),
                  modalDelete = e.target.matches(DOM.modalDelete)
            
            if (modalDelete) {
                deleteNodeItem()
                setState(true)
                return
            } else if (modalCancel) {
                setState(true)
            } else if (!modalDelete || !modalCancel) {
                return
            }
 
            disableHoveredState()
        }

        // if node has descendant
        if (node.querySelector('ul')) {
            
            setState(false)
            disableHoveredState()
            s(DOM.modal).addEventListener('click', getFucked)

        } else {
            deleteNodeItem()
        }
    }
}

export { editMode,
         attachNodeViewBtn,
         attachNewNode,
         resizeInput,
         resizeInputInit,
         nodeView,
         createNode,
         deleteNode, }