import svgArrowLeft from 'jam-icons/svg/arrow-left.svg'
import svgArrowRight from 'jam-icons/svg/arrow-right.svg'
import svgEllipsis from 'jam-icons/svg/more-horizontal-f.svg'
import svgCheck from 'jam-icons/svg/check.svg'

/* fork raw data extraction method */

export const htmlTemplates = (random, key) => {
    return {
        nodeToggleBtn: `
        <div class="node-view js-branch-collapse"> 
            
            <svg class="jam jam-minus-rectangle" xmlns="http://www.w3.org/2000/svg"  preserveAspectRatio="xMinYMin" viewBox="-2 -2 24 24">
                <path d="M4 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4zm0-2h12a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4zm1 9h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2z"></path>
            </svg>
        </div>
        `,

        pathIsCollapsed:  `
            <path d="M11 11h4a1 1 0 0 0 0-2h-4V5a1 1 0 0 0-2 0v4H5a1 1 0 1 0 0 2h4v4a1 1 0 0 0 2 0v-4zM4 0h12a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z">
            </path>
        `,
        pathIsExpanded: `
            <path d="M4 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4zm0-2h12a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4zm1 9h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2z"></path>
        `,

        addSiblingBtn: `
            <div class="new-node add-sibling-node js-add-node">
                <div class="dashed-line-h"></div>
                <svg class="mdi mdi-add-outline" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 24 24">
                    <path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z" />
                </svg>
            </div>
        `,

        addDescendantBtn: `
            <div class="new-node add-new-node js-add-node">

                <svg class="mdi mdi-delete" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 24 24">
                    <path d="M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z" />
                </svg>

                <svg class="mdi mdi-add-sibling" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 24 24">
                    <path fill="#000000" d="M17,14H19V17H22V19H19V22H17V19H14V17H17V14M11,16L2,9L11,2L20,9L11,16M11,18.54L12,17.75V18C12,18.71 12.12,19.39 12.35,20L11,21.07L2,14.07L3.62,12.81L11,18.54Z" /></svg>
                
                <svg class="mdi mdi-add-child" viewBox="0 0 24 24">
                    <path d="M15,20A1,1 0 0,0 14,19H13V17H17A2,2 0 0,0 19,15V5A2,2 0 0,0 17,3H7A2,2 0 0,0 5,5V15A2,2 0 0,0 7,17H11V19H10A1,1 0 0,0 9,20H2V22H9A1,1 0 0,0 10,23H14A1,1 0 0,0 15,22H22V20H15M7,15V5H17V15H7M15,11H13V13H11V11H9V9H11V7H13V9H15V11Z" /></svg>
            </div>
        `,

        treeLockOpen: `
            <svg class="mdi mdi-lock-open" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 24 24">
                <path d="M18,20V10H6V20H18M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V10A2,2 0 0,1 6,8H15V6A3,3 0 0,0 12,3A3,3 0 0,0 9,6H7A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,17A2,2 0 0,1 10,15A2,2 0 0,1 12,13A2,2 0 0,1 14,15A2,2 0 0,1 12,17Z" />
            </svg>
        `,

        treeLockClose: `
            <svg class="mdi mdi-lock-close" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 24 24">
                <path d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z" />
            </svg>
        `,

        // explicit new sibling button
        newNode: `
            <li>
                <div class="node-content js-node-content" data-key="${key}" data-is-checked="false">
                    <div class="node-label">
                        <span class="node-dash"></span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="jam jam-check" preserveAspectRatio="xMinYMin" viewBox="-5 -7 24 24"><path d="M5.486 9.73a.997.997 0 0 1-.707-.292L.537 5.195A1 1 0 1 1 1.95 3.78l3.535 3.535L11.85.952a1 1 0 0 1 1.415 1.414L6.193 9.438a.997.997 0 0 1-.707.292z"></path></svg> <input class="node-text" type="text" value="new sibling node: ${random}">
                    </div> 
                </div> 
            </li>
        `,

        // implicit new sibling button -- shown on node hover
        newSubNode: `
            <ul>
                <li>
                    <div class="node-content js-node-content" data-key="${key}" data-is-checked="false">
                        <div class="node-label">
                            <span class="node-dash"></span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="jam jam-check" preserveAspectRatio="xMinYMin" viewBox="-5 -7 24 24"><path d="M5.486 9.73a.997.997 0 0 1-.707-.292L.537 5.195A1 1 0 1 1 1.95 3.78l3.535 3.535L11.85.952a1 1 0 0 1 1.415 1.414L6.193 9.438a.997.997 0 0 1-.707.292z"></path></svg>
                            <input class="node-text" type="text" value="new sub-node: ${random}">
                        </div> 
                    </div>
                </li> 
            </ul>
        `,
    }
}

export const htmlList = (key, title, order) => {
    return {
        listContainer: `
            <div class="list-content js-list-content" data-key="${key}" data-order="${order}" data-observe="false" >
                <div class="list-header js-list-header">

                    <div class="ls-header-primary">
                        <div class="edit-wrapper js-edit-wrap">
                            <div class="edit js-edit">
                                <div class="edit-toggle js-edit-toggle">
                                    <div class="edit-tgl-circle"></div>
                                </div>
                            </div>
                        </div>
                        <input class="list-title" type="text" value="${title}" placeholder="Node Title...">
                    </div>

                    <div class="ls-header-secondary">
                        <div class="toolbar-btn">
                            ${svgArrowLeft}
                            </div>
                        <div class="toolbar-btn">
                            ${svgArrowRight}
                        </div>
                        <div class="toolbar-btn no-hover">
                            <button class="save-list js-save-list">Save 
                                <svg class="mdi mdi-spin"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink"
                                    x="0px" y="0px"
                                    viewBox="0 0 50 50"
                                    xml:space="preserve">
                                    <path d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"></path>
                                </svg>
                            </button>
                        </div>
                        <div class="toolbar-btn">
                            ${svgEllipsis}
                        </div>
                    </div>
                    <div class="ls-options">
                        options
                    </div>
                    <div class="list-progress">
                        <div class="list-progress-bar"></div>
                    </div>
                </div>

                <div class="list-tree">
                    <div class="modal-confirmation js-modal-confirm">
                        <div class="modal-content">
                            <h3 class="modal-heading">Delete this node?</h3>
                            <div class="modal-description">
                                <p>
                                    This node contains
                                    <span class="modal-sub-nodes">
                                        <span class="modal-sub-count">5</span>
                                        sub-<span class="modal-sub-quantity">nodes</span></span>.
                                </p>
                                <p>Deleting this will delete all those nodes.</p>
                            </div>
                            <div class="modal-buttons">
                                <button class="modal-btn modal-cancel">Cancel</button>
                                <button class="modal-btn modal-delete">Delete</button>
                            </div>
                        </div>
                    </div>
                    <div class="modal-discard js-modal-discard">
                        <div class="modal-heading">
                            <h3 class="mdl-heading-text">Discard Changes</h3>
                        </div>
                        <div class="modal-content">
                            <div class="modal-description">
                                <p>Are you sure? All changes will not be saved.</p>
                            </div>
                            <div class="modal-buttons">
                                <button class="modal-btn mdl-cancel">Cancel</button>
                                <button class="modal-btn mdl-discard">Discard</button>
                            </div>
                        </div>
                    </div>
                    <div class="list-tree-content">
                        
                    </div>
                
                </div>        
            </div>     
        `,

        parent: `
            <ul class="list-tree-root js-tree-root">
                <div class="calc-label-width"><span class="hidden-span-ref"></span></div>
            </ul>
        `,
    }
}

export const nodeContent = (nodeKey, nodeVal, nodeIsChecked) => {
    return `
        <div class="node-content js-node-content"
                data-key="${nodeKey}"
                data-is-checked="${nodeIsChecked}" >

            <div class="node-label">
                <span class="node-dash"></span>
                    ${svgCheck}
                <input class="node-text" type="text" value="${nodeVal}" placeholder="Enter new item...">
            </div>
        
        </div>
    `
}