import * as React from 'react';
import { DiagramEngine, DefaultPortLabel, DefaultNodeModel, DefaultPortModel, PortWidget, PortModelAlignment } from '@projectstorm/react-diagrams';
import styled from '@emotion/styled';

export interface DefaultNodeProps {
	node: DefaultNodeModel;
	engine: DiagramEngine;
	color?: string,
	size?: number
}


export const Node = styled.div<{ background: string; selected: boolean }>`
		background-color: ${(p) => p.background};
		border-radius: 5px;
		font-family: sans-serif;
		color: white;
		border: solid 2px black;
		overflow: visible;
		font-size: 11px;
		border: solid 2px ${(p) => (p.selected ? 'rgb(0,192,255)' : 'black')};

		background:#000;
		width:200px;
		height:100px;
		text-align:center;
	`;

	export const Title = styled.div`
		background: rgba(0, 0, 0, 0.3);
		display: flex;
		white-space: nowrap;
		justify-items: center;
	`;

	export const TitleName = styled.div`
		flex-grow: 1;
		padding: 5px 5px;
	`;

	export const Ports = styled.div`
		display: flex;
		background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2));
	`;

	export const PortsContainer = styled.div`
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		&:first-of-type {
			margin-right: 10px;
		}
		&:only-child {
			margin-right: 0px;
		}
	`;

	export const Port = styled.div`
		width: 16px;
		height: 16px;
		z-index: 10;
		background: rgba(0, 0, 0, 0.5);
		border-radius: 8px;
		cursor: pointer;
		&:hover {
			background: rgba(0, 0, 0, 1);
		}
	`;


/**
 * @author Dylan Vorster
 */
export class QuestionNodeWidget extends React.Component<DefaultNodeProps> {
	generatePort = (port:DefaultPortModel) => {
		return <DefaultPortLabel engine={this.props.engine} port={port} key={port.getID()} />;
	};

	render() {
		return (
			<Node
				data-default-node-name={this.props.node.getOptions().name}
				selected={this.props.node.isSelected()}
				background={this.props.node.getOptions().color!}>
				<Title>
					<TitleName>Custom{this.props.node.getOptions().name}</TitleName>
				</Title>
				<textarea />
				<button onClick={(event) => this.props.engine.fireEvent(event, 'addNodeListener')}>+</button>
				<Ports>
					<PortWidget
						style={{
							left: 100 / 2 - 8,
							top: -8,
							position: 'absolute'
						}}
						port={this.props.node.getPort(PortModelAlignment.TOP)!}
						engine={this.props.engine}>
						<Port />
					</PortWidget>
					<PortWidget
						style={{
							left: 100 / 2 - 8,
							top: -8,
							position: 'absolute'
						}}
						port={this.props.node.getPort(PortModelAlignment.RIGHT)!}
						engine={this.props.engine}>
						<Port />
					</PortWidget>
					<PortWidget
						style={{
							left: 100 / 2 - 8,
							top: -8,
							position: 'absolute'
						}}
						port={this.props.node.getPort(PortModelAlignment.BOTTOM)!}
						engine={this.props.engine}>
						<Port />
					</PortWidget>
					<PortWidget
						style={{
							left: 100 / 2 - 8,
							top: -8,
							position: 'absolute'
						}}
						port={this.props.node.getPort(PortModelAlignment.LEFT)!}
						engine={this.props.engine}>
						<Port />
					</PortWidget>
				</Ports>
			</Node>
		);
	}



	
}