import { NodeModel, NodeModelGenerics, PortModelAlignment } from '@projectstorm/react-diagrams-core';
import { PromptPortModel } from './PromptPortModel';

export interface PromptNodeModelGenerics {
	PORT: PromptPortModel,
}

export class PromptNodeModel extends NodeModel<NodeModelGenerics & PromptNodeModelGenerics> {
	
	constructor() {
		super({
			type: 'prompt',
		});
		this.addPort(new PromptPortModel(PortModelAlignment.LEFT));
	}
}