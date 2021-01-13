import * as SRD from '@projectstorm/react-diagrams';
import { SimplePortFactory } from './components/SimplePortFactory'
import { HTMLNodeFactory } from './components/HTMLNodeFactory'
import { HTMLPortModel } from './components/HTMLPortModel'
import { HTMLNodeModel } from './components/HTMLNodeModel'

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
            .registerFactory(new SimplePortFactory('diamond', (config) => new HTMLPortModel(SRD.PortModelAlignment.LEFT)));
        this.diagramEngine.getNodeFactories().registerFactory(new HTMLNodeFactory());
        this.diagramEngine.registerListener({
            addNodeListener: event => {
                this.diagramEngine.getModel().addNode(new HTMLNodeModel())
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

        var node3 = new HTMLNodeModel();
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