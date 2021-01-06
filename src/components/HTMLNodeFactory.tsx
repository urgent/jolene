import { HTMLNodeWidget } from './HTMLNodeWidget';
import { DefaultNodeModel } from '@projectstorm/react-diagrams';
import * as React from 'react';
import { AbstractReactFactory, GenerateWidgetEvent, GenerateModelEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class HTMLNodeFactory extends AbstractReactFactory<DefaultNodeModel, DiagramEngine> {
	constructor() {
		super('html');
	}

	generateReactWidget(event: GenerateWidgetEvent<DefaultNodeModel>): JSX.Element {
		return <HTMLNodeWidget engine={this.engine} node={event.model} color="#FFFFFF"/>;
	}

	generateModel(event:GenerateModelEvent) {
		return new DefaultNodeModel();
	}
}