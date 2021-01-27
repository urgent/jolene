import * as SRD from '@projectstorm/react-diagrams';
import { SimplePortFactory } from './components/SimplePortFactory'
import { QuestionNodeFactory } from './components/Question/QuestionNodeFactory'
import { QuestionPortModel } from './components/Question/QuestionPortModel'
import { QuestionNodeModel } from './components/Question/QuestionNodeModel'

import { PromptNodeFactory } from './components/Prompt/PromptNodeFactory'
import { PromptPortModel } from './components/Prompt/PromptPortModel'
import { PromptNodeModel } from './components/Prompt/PromptNodeModel'

/**
 * @author Dylan Vorster
 */
export class Application {
    protected activeModel: SRD.DiagramModel;
    protected diagramEngine: SRD.DiagramEngine;

    protected inPrompt:boolean;
    protected questionNode:SRD.NodeModel<SRD.NodeModelGenerics>;

    constructor() {
        this.inPrompt = false;
        this.questionNode = new QuestionNodeModel();
        this.diagramEngine = SRD.default();
        this.newModel();
        this.activeModel = new SRD.DiagramModel();
        this.diagramEngine
            .getPortFactories()
            .registerFactory(new SimplePortFactory('question', (config) => new QuestionPortModel(SRD.PortModelAlignment.RIGHT)));
        this.diagramEngine
            .getPortFactories()
            .registerFactory(new SimplePortFactory('prompt', (config) => new PromptPortModel(SRD.PortModelAlignment.LEFT)));            
        this.diagramEngine.getNodeFactories().registerFactory(new QuestionNodeFactory());
        this.diagramEngine.getNodeFactories().registerFactory(new PromptNodeFactory());
        this.diagramEngine.registerListener({
            addNodeListener: (event) => {
                if(!this.inPrompt) {
                    this.inPrompt = true;

                    const e = event as unknown as MouseEvent;
                    const node = new PromptNodeModel();
                    const offset = (Math.floor(Math.random() * 500) + 1) / 1000;
                    const bias = 150;
                    console.log(e)
                    node.setPosition((e.clientX-bias)*(1 + offset), (e.clientY-bias)*(1 + offset))
                    this.diagramEngine.getModel().addNode(node)
                    
                    

                    let link = node.port.createLinkModel();
                    
                    link?.setSourcePort(node.port);
                    link?.setTargetPort(this.questionNode.getPorts().right as SRD.PortModel<SRD.PortModelGenerics>);
                    console.log(link);
                    this.diagramEngine.getModel().addLink(link as SRD.LinkModel<SRD.LinkModelGenerics>);
                    this.diagramEngine.repaintCanvas();
                }
            },
          })
    }

    public newModel() {
        this.activeModel = new SRD.DiagramModel();
        this.diagramEngine.setModel(this.activeModel);
        this.questionNode.setPosition(250, 108);
        this.activeModel.addAll(this.questionNode);
        console.log(JSON.stringify(this.activeModel.serialize()))
    }

    public getActiveDiagram(): SRD.DiagramModel {
        return this.activeModel;
    }

    public getDiagramEngine(): SRD.DiagramEngine {
        return this.diagramEngine;
    }
}