// bind queryselector/(all)
export const s = document.querySelector.bind(document)
export const sA = document.querySelectorAll.bind(document)

// DOMStrings
export const DOM = {
    listHeader:     '.js-list-header',
    tree:           '.list-tree',
    rootContainer:  '.list-tree-content',
    root:           '.list-tree-root',
    nodeRootList:   '.list-tree-root li',
    nodeListParent: '.list-tree-content ul',
    widthRefer:     '.calc-label-width span',
    
    nodeContent:    '.js-node-content',
    nodeText:       '.js-node-content .node-text',
    nodeToggle:     '.js-branch-collapse',
    nodeToggleSVG:  '.js-branch-collapse svg',
    
    editToggleBtn:  '.js-toggle-edit',
    lockBtn:        '.js-list-header svg[class*="jam-padlock"]',

    btnAddNode:        '.js-add-node',
    btnAddSiblingExp:  '.js-add-node svg[class*="jam-plus-circle"]',
    btnAddSiblingImp:  '.js-add-node svg[class*="mdi-add-sibling"]',
    btnAddChild:       '.js-add-node svg[class*="mdi-add-child"]',
    btnDeleteNode:     '.js-add-node svg[class*="mdi-delete"]',

    modal:             '.js-modal-confirm',
    modalButton:       '.js-modal-confirm .modal-btn',
    modalCancel:       '.js-modal-confirm .modal-cancel',
    modalDelete:       '.js-modal-confirm .modal-delete'
}

// parse template literal as HTMLNode
export const parseHTML = str =>
    document.createRange().createContextualFragment(str)

export const referenceStyle = (el, styles) => {
    Object.assign(el.style, styles)
}