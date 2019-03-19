import axios from 'axios'
import List from './list.model'
import * as listView from './list.view'
import { s, sA, DOM, keyGen } from '../../utils/base'
import { htmlList } from './list.templates'

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

const setInputWidth = () => {
    const widthRefer = s(DOM.widthRefer)

    // change to each list
    sA(DOM.nodeText).forEach(input => {    
        widthRefer.textContent = input.value
        listView.setStyle(widthRefer, input)
        
        input.style.width = `${widthRefer.offsetWidth}px`
    })
}



// sync all
const sync = (e, method) => {

    // sync one
    if (e.target.matches(DOM.wsSync)) {
        const lists = [...s(DOM.panel).children]
        
        lists
            .filter(list => list.classList.length === 1)
            .forEach(async (list, index) => {
                console.log(list.querySelector(DOM.listTitle).value)

                const 
                    title = list.querySelector(DOM.listTitle).value,
                    order = index,
                    workspace = s(DOM.wsDropdown).querySelector(DOM.selectedWrap).getAttribute('data-key'),
                    dataKey = list.getAttribute('data-key') || keyGen(),
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
                node = mtn.target.querySelector(DOM.nodeContent)
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

const Record = new Mutation()
let observer

export const watch = e => {
    
    // filter toggle events
    if (e.target.matches(DOM.editToggleLabel)
    || e.target.matches(DOM.editToggleBtn)) {
        
        const list = e.target.closest(DOM.listContent)
        const listFooter = list.querySelector(DOM.listFooter)
        // const listStat = list.querySelector(DOM.listStatus)
        const listStatusLabel = list.querySelector(DOM.listStatusLabel)
        const ran = Math.floor(Math.random() * 100)

        const config = {
            attributeFilter: ['value', 'class', 'data-is-checked'],
            attributeOldValue: true,
            childList: true,
            subtree: true,
        }

        const updateTree = async (hasMtn, key, tree) => {
            console.log(list)
            console.log(e.target)
            if (hasMtn) {
                await axios.patch(`${url}api/list/${key}`, tree)
                console.log('updates pushed.')
                console.log(Record)
                
                listStatusLabel.textContent = 'All changes saved...'
                listFooter.classList.toggle('saving')
                
                setTimeout(() => {
                    if (list.querySelector(DOM.listStatus).className.match('has-changes')) {
                        list.querySelector(DOM.listStatus).classList.toggle('has-changes')
                        listStatusLabel.textContent = 'Unsaved changes...'
                    }
                }, 1500)

            } else {
                console.log('no changes made, continue...')
            }
        }

        const saveTree = e => {

            try {
                const
                    isSaveBtn = e.target.matches(DOM.listFooterSave),
                    isDiscardBtn = e.target.matches(DOM.listFooterDiscard),
                    isToggleBtn = e.target.matches(DOM.editToggleLabel)
                    || e.target.matches(DOM.editToggleBtn)
                
                if (isSaveBtn) {
                    listFooter.classList.toggle('saving')

                    let hasMutation = false
                    const mutations = Object.values(Record)
                    
                    mutations
                        .filter(prop => prop !== true)
                        .forEach(mutation => {
                            if (mutation.length === 0) return
                            hasMutation = true
                        })

                    const listKey = list.getAttribute('data-key')
                    const index = [...list.closest(DOM.panel).children].indexOf(list.parentNode)
        
                    /* EXPORT AS MAPPING FUNCTION */
                    const 
                        title = list.querySelector(DOM.listTitle).value,
                        order = index,
                        workspace = s(DOM.wsDropdown).querySelector(DOM.selectedWrap)
                            .getAttribute('data-key'),
                        dataKey = listKey,
                        root = list.querySelector(DOM.root)
        
                    const tree = new List(title, order, workspace, dataKey)
                    tree.mapTree(root, tree.nodes)               
                    
                    updateTree(hasMutation, listKey, tree)
                    
                } else if (isDiscardBtn) {
                    
                    // if discard -> attachEventListener to modal -> removeEventListner after
                    // open modal confirmation
                    console.log('Discarded changes.')

                } else if (isToggleBtn) {
                    // check if there are changes
                    // changes ? discard modal open : continue
                    list.removeEventListener('click', saveTree)
                } 
                
            } catch (error) {
                console.log(error)
            }
        }

        const mtnCallback = mutations => {

            let invalid = false

            // improve filtering
            const filters = [
                'js-tree-root',
                'js-list-footer',
                'js-list-content',
                'js-edit',
                'js-list-status',
                'js-branch-collapse',
                'js-add-node',
            ]

            mutations.forEach(mutation => {
                filters.forEach(filter => {
                    const hasFilter = mutation.target.classList.contains(filter)
                    // isSpan = mutation.target.tagName.match(/span/i)
                    // isSvg = mutation.target.tagName.match(/svg/i)  || isSpan || isSvg
                
                    if (hasFilter) {
                        invalid = true
                    }
                })
            })

            if (invalid) return

            console.log(`mutations length: ${mutations.length} | roll: ${ran}`)
            console.log(mutations)
            // console.log(Record)            
        
            mutations
                .filter(mutation => {
                    let valid = true

                    filters.forEach(filter => {
                        const hasFilter = mutation.target.classList.contains(filter),
                            isSpan = mutation.target.tagName.match(/span/i),
                            isSvg = mutation.target.tagName.match(/svg/i)
                        
                        if (hasFilter || isSpan || isSvg) {
                            valid = false
                        }
                    })

                    return valid
                })
                .forEach(mutation => {
                
                    switch (mutation.type) {
                        case 'attributes': {
                            
                            if (!list.querySelector(DOM.listStatus).className.match('has-changes')) {
                                list.querySelector(DOM.listStatus).classList.toggle('has-changes')
                            }
            
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
                                if (mutation.addedNodes[1].classList.contains(btn.add)) return

                                addedNode = mutation.addedNodes[1]
                                
                                if (!list.querySelector(DOM.listStatus).className.match('has-changes')) {
                                    list.querySelector(DOM.listStatus).classList.toggle('has-changes')
                                }
                            } else if (mutation.removedNodes.length > 0) {
                                deletedNode = mutation.removedNodes[0]
                                
                                if (!list.querySelector(DOM.listStatus).className.match('has-changes')) {
                                    list.querySelector(DOM.listStatus).classList.toggle('has-changes')
                                }
                            }
                
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

            list.dataset.observe = 'false'

            observer.disconnect()
            console.log('Observer Disconnected...')
            
            listFooter.classList.toggle('show-btn')
            
        } else if (list.dataset.observe === 'false') {

            if (!Record.isObserving) {
                observer = new MutationObserver(mtnCallback)
            }
            
            list.addEventListener('click', saveTree)

            Record.isObserving = true
            list.dataset.observe = 'true'

            listFooter.classList.toggle('show-btn')
            observer.observe(list, config)

            console.log('Observer Connected...')
        }
    }
}

/** 
 * SYNC on all events
 *      override current sync event
 * DELETE
 * 
 * PWA
 * WEB WORKERS 
 * API CONNECTION
 * INPUT VALIDATION
 */

const setup = list => {
    listView.attachNodeViewBtn(null, list)
    listView.createButton(null, false, null, list)
    setInputWidth()
}

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
        setup(list)

        // mutation observer
        list.addEventListener('click', watch, false)

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
        setup(null)
    })
}


export const setEventListeners = () => {
    s(DOM.panel).addEventListener('input', e => {
        listView.resizeInputWidth(e, false)
    })

    s(DOM.wsHeader).addEventListener('click', e => {
        sync(e, 'patch')
    })

    // bubbling dept = 16~
    s(DOM.panel).addEventListener('click', e => {
        listView.editMode(e)
        toggleNodeView(e)
        toggleCheck(e)
        listView.createNode(e, keyGen())
        listView.deleteNode(e)
    })
}