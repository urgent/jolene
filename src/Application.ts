import * as SRD from '@projectstorm/react-diagrams';
import { SimplePortFactory } from './components/SimplePortFactory'
import { QuestionNodeFactory } from './components/Question/QuestionNodeFactory'
import { QuestionPortModel } from './components/Question/QuestionPortModel'
import { QuestionNodeModel } from './components/Question/QuestionNodeModel'
import { PromptNodeFactory } from './components/Prompt/PromptNodeFactory'
import { PromptPortModel } from './components/Prompt/PromptPortModel'
import { PromptNodeModel } from './components/Prompt/PromptNodeModel'
import { AdvancedLinkFactory } from './components/Arrow/AdvancedLinkFactory'

/**
 * @author Dylan Vorster
 */
export class Application {
    protected activeModel: SRD.DiagramModel;
    protected diagramEngine: SRD.DiagramEngine;

    
    protected focusNode:SRD.NodeModel<SRD.NodeModelGenerics>;
    protected inQuestion:boolean;

    constructor() {
        
        this.focusNode = new QuestionNodeModel();
        this.inQuestion = true

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
        this.diagramEngine.getLinkFactories().registerFactory(new AdvancedLinkFactory());
        this.diagramEngine.registerListener({
            addNodeListener: (event) => {
                
                    const e = event as unknown as MouseEvent;
                    
                    const offset = (Math.floor(Math.random() * 500) + 1) / 1000;
                    const xbias = -100;
                    const ybias = -250;
                    
                    let node;
                    let link;
                    if(this.inQuestion) {
                        node = new PromptNodeModel();
                        this.inQuestion = false;
                        link = node.leftPort.createLinkModel();
                        link?.setSourcePort(this.focusNode.getPorts().right as SRD.PortModel<SRD.PortModelGenerics>);

                        link?.setTargetPort(node.leftPort);
                        // avoids 0,0 link
                        node.leftPort.reportPosition()
                        this.focusNode.getPorts().right.reportPosition()
                    } else {
                        node = new QuestionNodeModel();
                        this.inQuestion = true;

                        link = node.leftPort.createLinkModel();
                        link?.setSourcePort(this.focusNode.getPorts().right as SRD.PortModel<SRD.PortModelGenerics>);

                        link?.setTargetPort(node.leftPort);
                        // avoids 0,0 link
                        node.leftPort.reportPosition()
                        this.focusNode.getPorts().right.reportPosition()
                    }    

                    node.setPosition((e.clientX + xbias) * (1 + offset), (e.clientY + ybias) * (1 + offset))
                    this.diagramEngine.getModel().addNode(node)
                    

                    const diagramEngine = this.diagramEngine;
                    
                    
                    
                    diagramEngine.getModel().addLink(link as SRD.LinkModel<SRD.LinkModelGenerics>);

                    diagramEngine.repaintCanvas();

                    this.focusNode = node
            },
          })
    }

    public newModel() {
        this.activeModel = new SRD.DiagramModel();
        this.diagramEngine.setModel(this.activeModel);
        this.focusNode.setPosition(250, 108);
        this.activeModel.addAll(this.focusNode);
        console.log(JSON.stringify(this.activeModel.serialize()))
    }

    public getActiveDiagram(): SRD.DiagramModel {
        return this.activeModel;
    }

    public getDiagramEngine(): SRD.DiagramEngine {
        return this.diagramEngine;
    }
}