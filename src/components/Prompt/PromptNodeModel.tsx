import { NodeModel, NodeModelGenerics, PortModelAlignment, PortModelGenerics, PortModel } from '@projectstorm/react-diagrams-core';
import { PromptPortModel } from './PromptPortModel';

export interface PromptNodeModelGenerics {
	PORT: PromptPortModel,
}

export class PromptNodeModel extends NodeModel<NodeModelGenerics & PromptNodeModelGenerics> {
	public port: PortModel<PortModelGenerics>

	constructor() {
		super({
			type: 'prompt',
		});
		this.port = this.addPort(new PromptPortModel(PortModelAlignment.LEFT));
	}
}