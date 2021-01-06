import { LinkModel, PortModel, DefaultLinkModel, PortModelAlignment } from '@projectstorm/react-diagrams';

export class HTMLPortModel extends PortModel {
	constructor(alignment: PortModelAlignment) {
		super({
			type: 'HTML',
			name: alignment,
			alignment: alignment
		});
	}

	createLinkModel(): LinkModel {
		return new DefaultLinkModel();
	}
}