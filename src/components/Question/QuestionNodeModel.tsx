import { NodeModel, NodeModelGenerics, PortModelAlignment } from '@projectstorm/react-diagrams-core';
import { QuestionPortModel } from './QuestionPortModel';

export interface QuestionNodeModelGenerics {
	PORT: QuestionPortModel,
}

export class QuestionNodeModel extends NodeModel<NodeModelGenerics & QuestionNodeModelGenerics> {
	
	constructor() {
		super({
			type: 'question',
		});
		
		this.addPort(new QuestionPortModel(PortModelAlignment.RIGHT));
	}
}