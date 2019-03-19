/* eslint-disable key-spacing */
import crypto from 'crypto'

// DOMStrings
export const DOM = {
    header:             '.js-header',
    headerUser:         '.js-header-user',
    headerUserAvatar:   '.js-header .mdi-user',
    headerUserOpt:      '.js-header .user-options',

    sidebar:            '.js-sidebar',
    sidebarToggle:      '.js-sidebar .mdi-menu',
    sidebarTWrapper:    '.js-sidebar .menu-collapse',

    wsHeader:           '.ws-header',
    wsDropdown:         '.js-ws-dropdown',
    wsDropdownToggle:   '.js-ws-dropdown .ws-selected',

    wsSettings:         '.js-ws-settings',
    wsSettingsToggle:   '.js-ws-settings .mdi-ws-settings',
    wsSettingsTClose:   '.js-ws-settings .jam-close',

    listHeader:         '.js-list-header',
    tree:               '.list-tree',
    rootContainer:      '.list-tree-content',
    root:               '.js-tree-root',
    nodeRootList:       '.list-tree-root li',
    nodeListParent:     '.list-tree-content ul',
    widthRefer:         '.calc-label-width span',

    nodeContent:        '.js-node-content',
    nodeText:           '.js-node-content .node-text',
    nodeToggle:         '.js-branch-collapse',
    nodeToggleSVG:      '.js-branch-collapse svg',
    nodeToggleCheck:    '.js-node-content svg[class*="jam-check"]',

    editToggle:         '.js-edit',
    editToggleLabel:    '.js-edit .edit-label',
    editToggleBtn:      '.js-edit .edit-toggle',

    listFooter:         '.js-list-footer',
    listFooterContent:  '.js-ftr-content',
    listFooterSave:     '.js-ftr-content .ftr-btn-save',
    listFooterDiscard:  '.js-ftr-content .ftr-btn-discard',
    listStatus:         '.js-list-status',
    listStatusLabel:    '.js-list-status .ls-stat-label',

    btnAddNode:         '.js-add-node',
    btnAddSiblingExp:   '.js-add-node .mdi-add-outline',
    btnAddSiblingImp:   '.js-add-node .mdi-add-sibling',
    btnAddChild:        '.js-add-node .mdi-add-child',
    btnDeleteNode:      '.js-add-node .mdi-delete',

    modal:              '.js-modal-confirm',
    modalButton:        '.js-modal-confirm .modal-btn',
    modalCancel:        '.js-modal-confirm .modal-cancel',
    modalDelete:        '.js-modal-confirm .modal-delete',

    listContent:        '.js-list-content',
    listTitle:          '.list-title',
    selectedWrap:       '.js-ws-dropdown .ws-selected',
    nodeValue:          '.node-text',

    selected:           '.js-ws-dropdown .select-text',
    selectedContainer:  '.js-ws-dropdown .ws-selected',
    choicesContainer:   '.js-ws-dropdown .ws-choices',

    panel:              '.js-panel',
    wsSync:             '.js-ws-sync .ws-sync-all',
    editWrap:           '.js-edit-wrap',
    editWrapContent:    '.js-edit'
}

export const s = document.querySelector.bind(document)
export const sA = document.querySelectorAll.bind(document)
export const parseHTML = str => document.createRange().createContextualFragment(str)
export const referenceStyle = (el, styles) => {
    Object.assign(el.style, styles)
}
export const keyGen = () => crypto.randomBytes(6).toString('hex')