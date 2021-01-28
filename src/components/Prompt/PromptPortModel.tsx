import { LinkModel, DefaultPortModel, PortModelAlignment } from '@projectstorm/react-diagrams';
import { AdvancedLinkModel } from '../Arrow/AdvancedLinkModel'
export class PromptPortModel extends DefaultPortModel {
	constructor(alignment: PortModelAlignment) {
		super({
			type: 'prompt',
			name: alignment,
			alignment: alignment
		});
	}

	createLinkModel(): LinkModel {
		return new AdvancedLinkModel();
	}
}