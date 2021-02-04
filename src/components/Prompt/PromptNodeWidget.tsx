import * as React from 'react'
import {
  DiagramEngine,
  DefaultPortLabel,
  DefaultNodeModel,
  DefaultPortModel,
  PortWidget,
  PortModelAlignment
} from '@projectstorm/react-diagrams'
import styled from '@emotion/styled'

export interface DefaultNodeProps {
  node: DefaultNodeModel
  engine: DiagramEngine
  color?: string
  size?: number
}

export const Node = styled.div<{ background: string; selected: boolean }>`
  background-color: ${p => p.background};
  border-radius: 5px;
  font-family: sans-serif;
  color: #45496e;
  border: solid 2px black;
  overflow: visible;
  font-size: 11px;
  border: solid 2px ${p => (p.selected ? 'rgb(0,192,255)' : 'black')};

  background: #edeef9;
  width: 200px;
  height: 200px;
  text-align: center;

  textarea {
    margin: 10px;
  }

  button {
    background-color: #cd3c79;
    border-radius: 2px;
    border: none;
    color: #fff;
    margin: 10px;
    padding: 10px;
    font-weight: bold;
    font-size: 150%;
    width: 90%;
  }

  p {
    text-align: left;
    font-size: 1rem;
    padding: 2px 8px;
  }
`

export const Title = styled.div`
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  white-space: nowrap;
  justify-items: center;
`

export const TitleName = styled.div`
  flex-grow: 1;
  padding: 5px 5px;
`

export const Ports = styled.div`
  display: flex;
`

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
`

export const Port = styled.div`
  width: 16px;
  height: 16px;
  z-index: 10;
  background: #3ccfa0;
  border-radius: 10px;
  border: 3px solid #fff;
  cursor: pointer;
  &:hover {
    background: #0f0;
  }
  margin: 20px 5px;
`

/**
 * @author Dylan Vorster
 */
export class PromptNodeWidget extends React.Component<DefaultNodeProps> {
  private isTyping: boolean = false
  private isResizing: boolean = false

  generatePort = (port: DefaultPortModel) => {
    return (
      <DefaultPortLabel
        engine={this.props.engine}
        port={port}
        key={port.getID()}
      />
    )
  }

  render () {
    return (
      <Node
        data-default-node-name={this.props.node.getOptions().name}
        selected={this.props.node.isSelected()}
        background={this.props.node.getOptions().color!}
      >
        <div
          style={{
            display: 'flex',
            backgroundImage: 'linear-gradient(0deg, #FDFFFF, #FFF)'
          }}
        >
          <textarea
            onMouseDown={() => {
              this.isResizing = true
              this.props.node.setLocked(true)
            }}
            onMouseUp={() => {
              this.isResizing = false
              if (!this.isTyping) {
                this.props.node.setLocked(false)
              }
            }}
            onFocus={() => {
              this.isTyping = true
              this.props.node.setLocked(true)
            }}
            onBlur={() => {
              this.isTyping = false
              this.props.node.setLocked(false)
            }}
            placeholder='Type your question here'
          />
          <Ports>
            <PortWidget
              style={{}}
              port={this.props.node.getPort(PortModelAlignment.LEFT)!}
              engine={this.props.engine}
            >
              <Port />
            </PortWidget>
          </Ports>
          <p>Which answer would you like to add?</p>
        </div>
        <button
          onClick={event => {
            console.log('prompt button click')
            this.props.engine.fireEvent(event, 'addNodeListener')
          }}
        >
          +
        </button>
      </Node>
    )
  }
}
