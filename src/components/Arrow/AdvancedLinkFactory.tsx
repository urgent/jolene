import { AdvancedLinkWidget } from './AdvancedLinkWidget'
import { AdvancedLinkModel } from './AdvancedLinkModel'
import { DefaultLinkFactory, DefaultLinkModel } from '@projectstorm/react-diagrams';


export class AdvancedLinkFactory extends DefaultLinkFactory {
	constructor() {
		super('advanced');
	}

	generateModel(): AdvancedLinkModel {
		return new AdvancedLinkModel();
	}

	generateReactWidget({model}:{model:DefaultLinkModel}): JSX.Element {
		return <AdvancedLinkWidget link={model} diagramEngine={this.engine} />;
	}
}