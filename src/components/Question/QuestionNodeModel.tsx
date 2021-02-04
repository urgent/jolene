import {
  NodeModel,
  NodeModelGenerics,
  PortModelAlignment,
  PortModelGenerics,
  PortModel
} from '@projectstorm/react-diagrams-core'
import { QuestionPortModel } from './QuestionPortModel'

export interface QuestionNodeModelGenerics {
  PORT: QuestionPortModel
}

export class QuestionNodeModel extends NodeModel<
  NodeModelGenerics & QuestionNodeModelGenerics
> {
  public rightPort: PortModel<PortModelGenerics>
  public leftPort: PortModel<PortModelGenerics>

  constructor () {
    super({
      type: 'question'
    })

    this.rightPort = this.addPort(
      new QuestionPortModel(PortModelAlignment.RIGHT)
    )
    this.leftPort = this.addPort(new QuestionPortModel(PortModelAlignment.LEFT))
  }
}
