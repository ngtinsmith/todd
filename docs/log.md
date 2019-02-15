[__TODO_FEATURES__]

**git EXCLUDE ENV/CONFIG DIRECTORY**
<!-- Overflow-y cards -->
Collapsable sidebar
<!-- Collapsable sub-todo items -->
List card ~ width density (auto/manual depending on content)
List item ~ height density (normal/compact/wide)
List progress (progress element)
Draggable list and list-items
Date and time (details menu)
Theme selection
User auth
Encryption
Undo / Rollback up to x-days

---

[__WIP_GENERAL__]

<!-- design based on template -->
<!-- comment webpack structure -->
HMR - stubborn pita
Schema: project & data
export font
<!-- use node_modules path for svg = fucking tilde '~' -->
release static boilerplate
babel safe X polyfill

---

[__MILESTONES__]

<!-- Git init -->
<!-- Initial dependencies / package.json -->
<!-- Webpack config -->
<!-- Transpiler & Prefixer -->
<!-- Wireframe / Sketch -->
<!-- Project architecture -->
UI
Revisit OOP and Design Patterns
Application Core
Data layer
UX
Tests
Hardening
Open source todo repository - simplify / see github

---

[__WIP_UI__]

<!-- HTML template -->
<!-- SASS -->
<!-- Modern CSS -->
<!-- Grid+Flex -->
<!-- ws settings panel - slide from right -->
<!-- list cards -->
hidden submenus
    <!-- header user menu -->
    <!-- ws-header dropdown -->
    <!-- workspace settings -->
    auto viewport placement
    tree-list
        header - color label
        <!-- main menu >> sidebar now -->
        item menu
        node-text overflow ellipsis 
        add-new - auto scroll to first word / left most on focus exit
        draggable-y
list width UI: add allowance for hover addButtons ***
add new card area on last grid panel
<!-- new todo item full-width + btn -->
<!-- layout debug function ~ debug(color) -->
<!-- separate debug triggers -->
<!-- sidebar -->
    collapse to icon panel
    link --> display content to panel
        new panel layout (?)
    custom workspace controls on ws-header ~ per sidebar menu
        new ws-header layout (?)
modular grid
    allow easy component integration
    set default area and sizing
subtle (active & hover) circle bg shade on SVG icons
draggable-x workspace
draggable-list/card
responsive grid
active sidebar indicator
mix-blend-mode

---

[__WIP_UX__]

TreeDOM
    <!-- collapse/expand -->
    <!-- node text auto-width -->
    <!-- dynamic branchView generator function -->
    <!-- show add-btn's on toggle -->
    insert after main-branch-node
    auto list wrapper width
    async attach
    js-html hooks
    add main branch
    add sibling branch
    add child branch
    delete branch
    enter key = auto add new branch ui
    toggle check node 
    undo
    distraction free
    sync animation (async mode)
Benchmark Tools
ES6+
Component based
index.js / Hooks (?)

---

[__APP_SCHEMA__]

feature
    components
        view
        model
        .js
        
core / controller



---

[__BUGS__]

can't apply right-margin/padding on last overflow card
<!-- checkbox-svg resizing when overflow-y/scrollbar is visible -->
chrome x-scrollbar takes-up bottom padding space

---