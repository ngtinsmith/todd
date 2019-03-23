import axios from 'axios'
import List from './list.model'
import * as listView from './list.view'
import { s, sA, DOM, keyGen, parseHTML } from '../../utils/base'
import { htmlList, nodeContent } from './list.templates'

const url = 'http://localhost:3000/'

const toggleNodeView = e => {
    if (e.target.matches(DOM.nodeToggleSVG)) {
        const nodeRoot = e.target.closest('li')
        
        // Collapse/Expand
        listView.toggleViewClass(nodeRoot)
        
        // Toggle SVG Content
        listView.toggleViewSVG(nodeRoot.className, e.target)
    }
}

const toggleCheck = e => {
    if (e.target.matches(DOM.nodeToggleCheck)
        && e.target.closest(DOM.root).matches('.edit-mode')) {

        const str = 'data-is-checked'
        const node = e.target.closest(DOM.nodeContent)
        const nodeIsChecked = node.getAttribute(str)
        
        if (nodeIsChecked === 'true') {
            node.setAttribute(str, false)
        } else if (nodeIsChecked === 'false') {
            console.log('checked item')
            node.setAttribute(str, true)
        }
    }
}

const setInputWidth = list => {
    const widthRefer = s(DOM.widthRefer)
    const target = list || document

    // change to each list
    target.querySelectorAll(DOM.nodeText).forEach(input => {    
        widthRefer.textContent = input.value
        listView.setStyle(widthRefer, input)
        
        input.style.width = `${widthRefer.offsetWidth}px`
    })
}



// sync all
const sync = (e, method, isNew, key) => {

    let target = e.target.matches(DOM.wsSync)
    let isNewList = false

    if (isNew) {
        // prevent sync on old lists
        isNewList = e.target.closest(DOM.listContent).className.match('new-list')
        target = e.target.matches(DOM.saveListBtn)
    }

    // sync one
    if (isNewList || target) {
        const lists = [...s(DOM.panel).children]
        
        lists
            .filter(list => {
                if (method === 'post') {
                    console.log(list.querySelector(DOM.listContent))
                    return list.classList.length === 1
                        && list.querySelector(DOM.listContent).dataset.key === key

                }
                return list.classList.length === 1
            })
            .forEach(async (list, index) => {
                console.log(list.querySelector(DOM.listTitle).value)

                const 
                    title = list.querySelector(DOM.listTitle).value,
                    order = list.querySelector(DOM.listContent).dataset.order || index,
                    workspace = s(DOM.wsDropdown).querySelector(DOM.selectedWrap).getAttribute('data-key'),
                    dataKey = list.dataset.key || keyGen(),
                    root = list.querySelector(DOM.root)

                // fetch JSON tree
                const tree = new List(title, order, workspace, dataKey)            

                // map current tree(s)
                tree.mapTree(root, tree.nodes)

                // push to db
                switch (method) {
                    case 'post':
                        await axios.post(`${url}api/list`, tree)
                        break

                    case 'patch':
                        console.log(`patching - title: ${title} | order: ${order} | k: ${dataKey}`)
                        await axios.patch(`${url}api/list/${dataKey}`, tree)
                        break
                
                    default:
                        break
                }
            })

        // handle response codes

        // handle offline storage in services

        /** 
         * Shallow Sync for edit mode?
         * Observer API
         * 
         * Offline opts:
         *      localForage
         *      indexedDB
         *      couchDB
         *      serviceWorkers
         */
        console.log('Synced..')
    }
}

class Mutation {
    constructor() {
        this.attributes = []
        this.childList = []
        this.isObserving = false
    }

    static updateRecord(attrName, record, newClass, newVal, oldVal) {
        switch (attrName) {
            case 'class':
                record.newClass = newClass
                break
            case 'value':
                record.newVal = newVal
                if (!record.oldVal) {
                    record.oldVal = oldVal
                }
                break
            default:
                break
        }
    }

    static setArgs(mtn) {

        let node,
            nodeVal,
            oldClassVal,
            newClassVal,
            oldNodeVal
            
        switch (mtn.attributeName) {
            case 'class':
                node = mtn.target.querySelector(DOM.nodeContent) || mtn.target
                oldClassVal = mtn.oldValue
                newClassVal = mtn.target.className
                oldNodeVal = null
                break
            case 'value':
                node = mtn.target.closest(DOM.nodeContent)
                    || mtn.target.closest(DOM.listContent)
                nodeVal = mtn.target.value
                oldNodeVal = mtn.oldValue
                break
            case 'data-is-checked':
                node = mtn.target.closest(DOM.nodeContent)
                nodeVal = mtn.target.getAttribute('data-is-checked')
                oldNodeVal = mtn.oldValue
                break
            default:
                break
        }

        const
            { attributeName } = mtn,
            nodeKey = node.getAttribute('data-key'),
            oldVal = oldNodeVal,
            newVal = nodeVal || null,
            oldClass = oldClassVal || null,
            newClass = newClassVal || null

        const args = [
            attributeName, 
            nodeKey, 
            oldVal, 
            newVal, 
            oldClass,
            newClass
        ]

        return args
    }
 
    // test as rest params
    setAttributeMutation(attributeName, nodeKey, 
        oldVal, newVal, oldClass, newClass) {
            
        const keys = []
        
        if (this.attributes.length > 0) {
            this.attributes.forEach(record => {
                keys.push(record.nodeKey)
            })
        }

        if (keys.includes(nodeKey)) {
            this.attributes.forEach(record => {
                if (record.nodeKey === nodeKey) {
                    Mutation.updateRecord(attributeName, record, newClass, newVal, oldVal)
                }
            })
        } else {
            const obj = {
                attributeName, 
                nodeKey, 
                oldVal, 
                newVal, 
                oldClass,
                newClass
            }

            this.attributes.push(obj)
        }                
    }

    setChildlistMutation(newNode, removedNode) {
        let actionKey,
            targetNode,
            nodeKey

        if (newNode) {
            actionKey = 'addedNode'
            targetNode = newNode
            
            targetNode.querySelector(DOM.nodeContent).setAttribute('data-key', keyGen())
            
            nodeKey = targetNode.querySelector(DOM.nodeContent).getAttribute('data-key')
        } else {
            actionKey = 'deletedNode'
            targetNode = removedNode
            if (!targetNode.querySelector(DOM.nodeContent)) {
                console.log(removedNode)
            }
            nodeKey = targetNode.querySelector(DOM.nodeContent).getAttribute('data-key')
        }
        
        const nodeVal = targetNode.querySelector(DOM.nodeText).value

        const obj = {
            [actionKey]: targetNode,
            nodeKey,
            nodeVal
        }

        this.childList.push(obj)
    }
}
/* END MUTATION CLASS */





let Record = new Mutation()
let observer
let list

export const watch = e => {
    
    if (e.target.matches(DOM.editToggleLabel)
    || e.target.matches(DOM.editToggleBtn)) {

        list = e.target.closest(DOM.listContent)

        const toggle = list.querySelector(DOM.editToggleBtn)

        const wsStatus = document.querySelector(DOM.wsStatus)
        const wsStatusLabel = document.querySelector(DOM.wsStatusLabel)
        
        const modalDiscard = list.querySelector(DOM.modalDiscard)
        const saveListBtn = list.querySelector(DOM.saveListBtn)
        const saveBtnText = saveListBtn.childNodes[0]

        

        const verifyMutations = record => {
            let mtn = false
            const mutationRecords = Object.values(record)

            mutationRecords
                .filter(prop => prop !== true)
                .forEach(mutation => {

                    if (mutation.length === 0) return
                    mtn = true
                })
            return mtn
        }

        const detachListener = callback => {
            list.removeEventListener('click', callback)
        }

        const toggleDiscardModal = hasClass => {
            const str = 'is-open'
            const mdlDiscardClass = modalDiscard.className.match(str)

            if (mdlDiscardClass && hasClass) {
                modalDiscard.classList.toggle(str)
            } else if (!mdlDiscardClass && !hasClass) {
                modalDiscard.classList.toggle(str)
            }
        }
        
        // refactor as helper for all classlist toggles
        const toggleMtnStatus = hasClass => {
            const str = 'has-changes'
            const statusClass = list.className.match(str)

            if (statusClass && hasClass) {
                list.classList.toggle(str)
                wsStatus.classList.toggle('is-visible')

            } else if (!statusClass && !hasClass) {
                list.classList.toggle(str)
                wsStatus.classList.toggle('is-visible')
            }
        }
        
        const saveTree = async (key, tree, isNew) => {
            
            if (list.className.match('has-changes')) {
                saveBtnText.textContent = 'Saving'

                if (isNew) {
                    await sync(e, 'post', true, key)
                    list.classList.remove('new-list')
                } else {
                    await axios.patch(`${url}api/list/${key}`, tree)
                }
                
                console.log('updates pushed.')
                // re-attached for discard dispatch event
                list.parentNode.addEventListener('click', listView.editMode)
                
                setTimeout(() => {
                    wsStatusLabel.textContent = 'All changes saved...'
                    saveBtnText.textContent = 'Saved'
                    saveListBtn.classList.toggle('saving')
                }, 1000)
                setTimeout(() => {
                    toggleMtnStatus(true)
                    wsStatusLabel.textContent = 'Unsaved changes...'
                    saveBtnText.textContent = 'Save'
                }, 2000)

            } else {
                console.log('no changes made, continue...')
            }
        }

        const handleDiscard = e => {

            // remove discarded elements from DOM tree

            const btnDiscard = e.target.matches(DOM.mdlDiscardProceed),
                btnCancel = e.target.matches(DOM.mdlDiscardCancel)

            if (btnDiscard) {
                const evt = new Event('click', { bubbles: true, cancelable: false })
                
                list.parentNode.addEventListener('click', listView.editMode)
                detachListener(handleDiscard)
                
                toggleMtnStatus(true)
                toggleDiscardModal(true)

                toggle.dispatchEvent(evt)
                console.log('discarded')

            } else if (btnCancel) {

                toggleDiscardModal(true)
                console.log('cancelled discard')
            }
        }

        const handleRecords = e => {

            try {
                const
                    isSaveBtn = e.target.matches(DOM.saveListBtn),
                    isToggleBtn = e.target.matches(DOM.editToggleBtn)

                if (isSaveBtn) {
                    saveListBtn.classList.toggle('saving')

                    /* EXPORT AS MAPPING FUNCTION */
                    const listKey = list.getAttribute('data-key')
                    const index = [...list.closest(DOM.panel).children].indexOf(list.parentNode)
        
                    const 
                        title = list.querySelector(DOM.listTitle).value,
                        order = index,
                        workspace = s(DOM.wsDropdown).querySelector(DOM.selectedWrap)
                            .getAttribute('data-key'),
                        dataKey = listKey,
                        root = list.querySelector(DOM.root),
                        isNew = list.className.match('new-list')
        
                    const tree = new List(title, order, workspace, dataKey)
                    tree.mapTree(root, tree.nodes)               
                    
                    saveTree(listKey, tree, isNew)
                    
                } else if (isToggleBtn) {

                    if (list.className.match('has-changes')) {
                        toggleDiscardModal(false)
                    } else {
                        detachListener(handleDiscard)
                        detachListener(handleRecords)
                    }
                }
                
            } catch (error) {
                console.log(error)
            }
        }
        
        const config = {
            attributeFilter: ['value', 'class', 'data-is-checked'],
            attributeOldValue: true,
            childList: true,
            subtree: true,
        }

        const mtnCallback = mutations => {

            // staging and saved mutation states
            
            const filters = [
                'mdi',
                'hidden-span-ref',
                'js-tree-root',
                'js-list-footer',
                'js-list-content',
                'js-edit',
                'js-list-status',
                'js-branch-collapse',
                'js-add-node',
                'ls-stat-label',
                'js-modal-confirm',
                'js-modal-discard',
                'js-save-list',
            ]
            
            mutations
                .filter(mutation => {
                    let isValid = true

                    filters.forEach(filter => {
                        const hasFilter = mutation.target.classList.contains(filter)

                        if (hasFilter) {
                            isValid = false
                        }
                    })

                    return isValid
                })
                .forEach(mutation => {
                    switch (mutation.type) {
                        case 'attributes': {

                            toggleMtnStatus(false)
                            list.parentNode.removeEventListener('click', listView.editMode)

                            const props = Record.constructor.setArgs(mutation)
                            Record.setAttributeMutation(...props)
                            break
                        }
            
                        case 'childList': {
                            const btn = {
                                view: 'js-branch-collapse',
                                add: 'js-add-node'
                            }
            
                            let addedNode,
                                deletedNode
            
                            if (mutation.addedNodes.length > 0) {
                                if (mutation.addedNodes.length === 1) return
                                if (mutation.addedNodes[1].classList.contains(btn.add)
                                    || mutation.addedNodes[1].classList.contains(btn.view)) return

                                addedNode = mutation.addedNodes[1]

                            } else if (mutation.removedNodes.length > 0) {
                                if (mutation.removedNodes[0].classList.contains(btn.add)
                                    || mutation.removedNodes[0].classList.contains(btn.view)) return

                                deletedNode = mutation.removedNodes[0]
                            }

                            toggleMtnStatus(false)
                            list.parentNode.removeEventListener('click', listView.editMode)
                            
                            Record.setChildlistMutation(addedNode, deletedNode)
                            break
                        }
                    
                        default: {
                            console.log('invalid mutation')
                            break
                        }
                    }
                })
        }
        /* END MUTATION CALLBACK */


        if (list.dataset.observe === 'true') {

            if (!list.className.match('has-changes')) {
                list.dataset.observe = 'false'

                // null list variable on disconnect to refresh variable?
                // do let list instead of const
                
                observer.disconnect()
                Record = null
                observer = null
                list = null
                console.log('Observer Disconnected\n--------------------')
            }

        } else if (list.dataset.observe === 'false') {

            // find new way to seggregate mutations per list
            // then save them in one master mutation records

            if (!Record || !Record.isObserving) {
                Record = new Mutation()
                observer = new MutationObserver(mtnCallback)
            }
            
            list.addEventListener('click', handleDiscard)
            list.addEventListener('click', handleRecords)

            Record.isObserving = true
            list.dataset.observe = 'true'
            
            observer.observe(list, config)

            console.log('Observer Connected...\n--------------------')
        }
    }
}

// enter / shift enter 

// const cbDragStart = e => {
//     const dragged = e.target
//     dragged.style.opacity = 0.7
// }

// const cbDragEnd = e => {
//     const dragged = e.target
//     dragged.style.opacity = 0.1
// }

// const cbDragOver = e => {
//     e.preventDefault()
// }

// const cbDragEnter = e => {
//     if (e.target.tagName === 'li') {
//         e.target.style.background = 'black'
//     }
// }

// const cbDragLeave = e => {
//     if (e.target.tagName === 'li') {
//         e.target.style.background = ''
//     }
// }

// const cbDragDrop = e => {
//     e.preventDefault()

//     if (e.target.tagName === 'li') {
//         e.target.style.background = ''
//     }
// }

const setup = (list, setWidth) => {
    listView.attachNodeViewBtn(null, list)
    listView.createButton(null, false, null, list)
    if (setWidth) {
        setInputWidth(list)
    }
    
}

const create = e => {
    if (e.target.matches(DOM.createListBtn)) {

        // destructure templates
        // export as list create func

        const createBtn = s(DOM.panel).lastElementChild
        const order = s(DOM.panel).children.length - 1

        const template = htmlList(keyGen(), '', order).listContainer,
            { parent } = htmlList(),
            child = document.createElement('li'),
            nodeProps = nodeContent(keyGen(), '', false)
        
        const list = listView.createList(template, parent)
        const root = list.querySelector(DOM.root)
            
        list.querySelector(DOM.listContent).classList.add('new-list')
        child.appendChild(parseHTML(nodeProps))
        root.appendChild(child)

        s(DOM.panel).insertBefore(list, createBtn)
        
        // initial view setup
        setup(list, false)

        // mutation observer
        list.addEventListener('click', watch)
        list.addEventListener('click', listView.editMode)

        console.log('clicked create new btn')
    }
}


// render all / should be load?
export const render = async () => {
    
    // fetch data
    const result = await axios.get(`${url}api/list`)
    const { data } = result

    data.forEach(async obj => {

        // set container data
        const template = await htmlList(obj.dataKey, obj.title, obj.order).listContainer,
            { parent } = htmlList()

        // reference
        const lastEl = s(DOM.panel).lastElementChild

        // create list container
        const list = listView.createList(template, parent)
        const root = list.querySelector(DOM.root)

        // generate domTree from json
        await listView.createDomTree(obj.nodes, root)

        // insert to panel
        lastEl.parentNode.insertBefore(list, lastEl)
        
        // initial view setup
        setup(list, true)

        // mutation observer
        list.addEventListener('click', watch)
        list.addEventListener('click', listView.editMode)

        // drag events
        // list.addEventListener('dragstart', cbDragStart, false)
        // list.addEventListener('dragend', cbDragEnd, false)
        // list.addEventListener('dragover', cbDragOver, false)
        // list.addEventListener('dragenter', cbDragEnter, false)
        // list.addEventListener('dragleave', cbDragLeave, false)
        // list.addEventListener('dragdrop', cbDragDrop, false)

    })

    // automate list rendering (API for count)
    // render animation

    console.log('-> Data Fetched')
}


export const init = () => {
    document.addEventListener('DOMContentLoaded', () => {
        setup(null, true)
    })
}

export const setEventListeners = () => {
    s(DOM.panel).addEventListener('input', e => {
        listView.resizeInputWidth(e, false)
    })

    s(DOM.wsHeader).addEventListener('click', e => {
        sync(e, 'patch', false, null)
    })

    // bubbling dept = 16~
    s(DOM.panel).addEventListener('click', e => {
        toggleNodeView(e)
        toggleCheck(e)
        listView.createNode(e, keyGen())
        listView.deleteNode(e)
        create(e)
    })
}