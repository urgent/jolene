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

		background:#edeef9;
		width:200px;
		text-align:center;

		textarea {
			margin:10px;
			resize: vertical;
		}
		
		button {
			background-color: #cd3c79;
			border-radius: 2px;
			border:none;
			color:#FFF;
			font-weight: bold;
			font-size: 150%;
			bottom: -10px;
			margin-top: 10px;
			position: relative;
		}
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
		background: #3ccfa0;
		border-radius: 8px;
		cursor: pointer;
		&:hover {
			background: #0F0;
		}
		margin: 20px 5px;
	`;


/**
 * @author Dylan Vorster
 */
export class QuestionNodeWidget extends React.Component<DefaultNodeProps> {
	private isTyping: boolean = false;
	private isResizing: boolean = false;

	generatePort = (port:DefaultPortModel) => {
		return <DefaultPortLabel engine={this.props.engine} port={port} key={port.getID()} />;
	};

	render() {
		return (
			<Node
				data-default-node-name={this.props.node.getOptions().name}
				selected={this.props.node.isSelected()}
				background={this.props.node.getOptions().color!}>
				<div style={{
					fontSize:"1rem", 
					color: "#454b6b", 
					padding: "12px",
					textAlign: "left",
					fontWeight: "bold",
					letterSpacing: "-0.7px"}}>Welcome</div>
				<div style={{
					display:"flex",  
					backgroundImage: "linear-gradient(0deg, #FDFFFF, #FFF)",     
				}}>
					<textarea 
						onMouseDown={() => {
							this.isResizing = true;
							this.props.node.setLocked(true)
						}} 
						onMouseUp={() => {
							this.isResizing = false;
							if(!this.isTyping) {
								this.props.node.setLocked(false)
							}
						}}
						onFocus={() => {
							this.isTyping = true;
							this.props.node.setLocked(true)
						}}
						onBlur={() => {
							this.isTyping = false;
							this.props.node.setLocked(false)
						}}
						placeholder='Type your question here' 
					/>
					<Ports>
						<PortWidget
							style={{
								display: "flex",
								justifyContent: "center",
								flexDirection: "column"
							}}
							port={this.props.node.getPort(PortModelAlignment.RIGHT)!}
							engine={this.props.engine}>
							<Port />
						</PortWidget>
					</Ports>
				</div>
				<div style={{width:"100%;", background:"#FFF"}} >
					<img onDragStart={(e) => { e.preventDefault(); }} src="/demo.gif" alt="Funny ms paint toon drawing of dog eating cupcake" />
				</div>
				<button onClick={(event) => this.props.engine.fireEvent(event, 'addNodeListener')}>+</button>
				
			</Node>
		);
	}



	
}