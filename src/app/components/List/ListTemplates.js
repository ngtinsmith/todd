export const htmlTemplates = (random) => {
    return {
        nodeToggleBtn: `
        <div class="node-view js-branch-collapse"> 
            <svg xmlns="http://www.w3.org/2000/svg" class="jam jam-minus-rectangle" preserveAspectRatio="xMinYMin" viewBox="-2 -2 24 24">
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
                <svg xmlns="http://www.w3.org/2000/svg" class="jam jam-plus-circle-f" preserveAspectRatio="xMinYMin" viewBox="-2 -2 24 24">
                    <path d="M11 11h4a1 1 0 0 0 0-2h-4V5a1 1 0 0 0-2 0v4H5a1 1 0 1 0 0 2h4v4a1 1 0 0 0 2 0v-4zm-1 9C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10z"></path>
                </svg>
            </div>
        `,

        addChildBtn_style3: `
            <div class="new-node add-new-node js-add-node">
                <svg class="mdi mdi-delete" viewBox="0 0 24 24">
                <path fill="#000000" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>
                <svg class="mdi mdi-add-sibling" viewBox="0 0 24 24">
                <path fill="#000000" d="M16,11V9H13V6H11V9H8V11H11V14H13V11H16M17,3A2,2 0 0,1 19,5V15A2,2 0 0,1 17,17H13V19H14A1,1 0 0,1 15,20H22V22H15A1,1 0 0,1 14,23H10A1,1 0 0,1 9,22H2V20H9A1,1 0 0,1 10,19H11V17H7C5.89,17 5,16.1 5,15V5A2,2 0 0,1 7,3H17Z" /></svg>
                <svg class="mdi mdi-add-child" viewBox="0 0 24 24">
                <path fill="#000000" d="M16,11V9H13V6H11V9H8V11H11V14H13V11H16M17,3A2,2 0 0,1 19,5V15A2,2 0 0,1 17,17H13V19H14A1,1 0 0,1 15,20H22V22H15A1,1 0 0,1 14,23H10A1,1 0 0,1 9,22H2V20H9A1,1 0 0,1 10,19H11V17H7C5.89,17 5,16.1 5,15V5A2,2 0 0,1 7,3H17Z" /></svg>
            </div>
        `,

        treeLockOpen: `
            <svg xmlns="http://www.w3.org/2000/svg" class="jam jam-padlock-open-f" preserveAspectRatio="xMinYMin" viewBox="-5 -2 24 24">
                <path d="M12 5h-2a3 3 0 1 0-6 0v5h8a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2V5a5 5 0 1 1 10 0zM7 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
            </svg>
        `,

        treeLockClose: `
            <svg xmlns="http://www.w3.org/2000/svg" class="jam jam-padlock-f" preserveAspectRatio="xMinYMin" viewBox="-5 -2 24 24">
                <path d="M12 10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2V5a5 5 0 1 1 10 0v5zm-5 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-7V5a3 3 0 1 0-6 0v5h6z"></path>
            </svg>
        `,

        // explicit new sibling button
        newNode: `
            <li>
                <div class="node-content js-node-content">
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
                    <div class="node-content js-node-content">
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
