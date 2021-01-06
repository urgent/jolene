import { NodeModel, NodeModelGenerics, PortModelAlignment } from '@projectstorm/react-diagrams';
import { HTMLPortModel } from './HTMLPortModel';

export interface HTMLNodeModelGenerics {
	PORT: HTMLPortModel;
}

export class HTMLNodeModel extends NodeModel<NodeModelGenerics & HTMLNodeModelGenerics> {
	constructor() {
		super({
			type: 'html'
		});
		this.addPort(new HTMLPortModel(PortModelAlignment.TOP));
		this.addPort(new HTMLPortModel(PortModelAlignment.LEFT));
		this.addPort(new HTMLPortModel(PortModelAlignment.BOTTOM));
		this.addPort(new HTMLPortModel(PortModelAlignment.RIGHT));
	}
}