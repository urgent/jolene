import {
  NodeModel,
  NodeModelGenerics,
  PortModelAlignment,
  PortModelGenerics,
  PortModel
} from '@projectstorm/react-diagrams-core'
import { PromptPortModel } from './PromptPortModel'

export interface PromptNodeModelGenerics {
  PORT: PromptPortModel
}

export class PromptNodeModel extends NodeModel<
  NodeModelGenerics & PromptNodeModelGenerics
> {
  public rightPort: PortModel<PortModelGenerics>
  public leftPort: PortModel<PortModelGenerics>

  constructor () {
    super({
      type: 'prompt'
    })
    this.rightPort = this.addPort(new PromptPortModel(PortModelAlignment.RIGHT))
    this.leftPort = this.addPort(new PromptPortModel(PortModelAlignment.LEFT))
  }
}
