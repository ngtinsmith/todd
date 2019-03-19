import * as List from '../../components/list/list'
import * as Workspace from '../../components/workspace/workspace'

export const init = async () => {
    await Workspace.Controller.init()
    // await List.Controller.sync()
    await List.Controller.render()
}