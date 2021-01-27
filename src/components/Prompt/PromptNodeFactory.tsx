import { PromptNodeWidget } from './PromptNodeWidget';
import { DefaultNodeModel } from '@projectstorm/react-diagrams';
import * as React from 'react';
import { AbstractReactFactory, GenerateWidgetEvent, GenerateModelEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class PromptNodeFactory extends AbstractReactFactory<DefaultNodeModel, DiagramEngine> {
	constructor() {
		super('prompt');
	}

	generateReactWidget(event: GenerateWidgetEvent<DefaultNodeModel>): JSX.Element {
		return <PromptNodeWidget engine={this.engine} node={event.model} color="#FFFFFF"/>;
	}

	generateModel(event:GenerateModelEvent) {
		return new DefaultNodeModel();
	}
}