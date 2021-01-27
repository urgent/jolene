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

    constructor() {
        this.diagramEngine = SRD.default();
        this.newModel();
        this.activeModel = new SRD.DiagramModel();
        this.diagramEngine
            .getPortFactories()
            .registerFactory(new SimplePortFactory('question', (config) => new QuestionPortModel(SRD.PortModelAlignment.RIGHT)));
        this.diagramEngine
            .getPortFactories()
            .registerFactory(new SimplePortFactory('prompt', (config) => new PromptPortModel(SRD.PortModelAlignment.RIGHT)));            
        this.diagramEngine.getNodeFactories().registerFactory(new QuestionNodeFactory());
        this.diagramEngine.getNodeFactories().registerFactory(new PromptNodeFactory());
        this.diagramEngine.registerListener({
            addNodeListener: (event) => {
                const e = event as unknown as MouseEvent;
                const node = new PromptNodeModel();
                const offset = (Math.floor(Math.random() * 500) + 1) / 1000;
                const bias = 150;
                console.log(e)
                node.setPosition((e.clientX-bias)*(1 + offset), (e.clientY-bias)*(1 + offset))
                this.diagramEngine.getModel().addNode(node)
                this.diagramEngine.repaintCanvas();
            },
          })
    }

    public newModel() {
        this.activeModel = new SRD.DiagramModel();
        this.diagramEngine.setModel(this.activeModel);

        

        //3-A) create a default node
        var node1 = new SRD.DefaultNodeModel('Node 1', 'rgb(0,192,255)');
        let port = node1.addOutPort('Out');
        node1.setPosition(100, 100);

        //3-B) create another default node
        var node2 = new SRD.DefaultNodeModel('Node 2', 'rgb(192,255,0)');
        let port2 = node2.addInPort('In');
        node2.setPosition(400, 100);

        var node3 = new QuestionNodeModel();
        node3.setPosition(250, 108);
        

        // link the ports
        let link1 = port.link(port2);
        
        
        

        this.activeModel.addAll(node1, node2, link1, node3);
        console.log(JSON.stringify(this.activeModel.serialize()))
    }

    public getActiveDiagram(): SRD.DiagramModel {
        return this.activeModel;
    }

    public getDiagramEngine(): SRD.DiagramEngine {
        return this.diagramEngine;
    }
}