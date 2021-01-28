import { LinkModel, PortModel, PortModelAlignment } from '@projectstorm/react-diagrams';
import { AdvancedLinkModel } from '../Arrow/AdvancedLinkModel'
export class QuestionPortModel extends PortModel {
	constructor(alignment: PortModelAlignment) {
		super({
			type: 'question',
			name: alignment,
			alignment: alignment
		});
	}

	createLinkModel(): LinkModel {
		return new AdvancedLinkModel();
	}
}