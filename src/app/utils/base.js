// bind queryselector/(all)
export const s = document.querySelector.bind(document)
export const sA = document.querySelectorAll.bind(document)

// parse template literal as HTMLNode
export const parseHTML = str =>
    document.createRange().createContextualFragment(str)
