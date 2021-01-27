import { QuestionNodeWidget } from './QuestionNodeWidget';
import { DefaultNodeModel } from '@projectstorm/react-diagrams';
import * as React from 'react';
import { AbstractReactFactory, GenerateWidgetEvent, GenerateModelEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class QuestionNodeFactory extends AbstractReactFactory<DefaultNodeModel, DiagramEngine> {
	constructor() {
		super('question');
	}

	generateReactWidget(event: GenerateWidgetEvent<DefaultNodeModel>): JSX.Element {
		return <QuestionNodeWidget engine={this.engine} node={event.model} color="#FFFFFF"/>;
	}

	generateModel(event:GenerateModelEvent) {
		return new DefaultNodeModel();
	}
}