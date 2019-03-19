import { DOM, keyGen } from '../../utils/base'

export default class List {
    constructor(title, order, workspace, dataKey) {
        this.dataKey = dataKey
        this.title = title
        this.order = order
        this.workspace = workspace
        this.nodes = []
    }

    mapTree(nodeToArray, parent) {
        const nodeList = [...nodeToArray.children]

        nodeList
            .filter(node => node.tagName === 'LI')
            .map(node => {
                const obj = {
                    dataKey: node.querySelector(DOM.nodeContent).getAttribute('data-key') || keyGen(),
                    value: node.querySelector(DOM.nodeValue).value,
                    state: {
                        view: node.className,
                        isChecked: node.querySelector(DOM.nodeContent).getAttribute('data-is-checked') || false,
                    },
                    descendant: [],
                }

                if (node.querySelector('ul')) {
                    this.mapTree(node.querySelector('ul'), obj.descendant)
                    parent.push(obj)
                } else {
                    obj.descendant = null
                    parent.push(obj)
                }

                return parent // array
            })
    }
}