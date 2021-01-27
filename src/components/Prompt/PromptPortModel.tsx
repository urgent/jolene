import { LinkModel, DefaultPortModel, DefaultLinkModel, PortModelAlignment } from '@projectstorm/react-diagrams';

export class PromptPortModel extends DefaultPortModel {
	constructor(alignment: PortModelAlignment) {
		super({
			type: 'prompt',
			name: alignment,
			alignment: alignment
		});
	}

	createLinkModel(): LinkModel {
		return new DefaultLinkModel();
	}
}