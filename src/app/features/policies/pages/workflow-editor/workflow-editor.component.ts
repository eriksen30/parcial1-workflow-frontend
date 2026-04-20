import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  NgZone,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

declare const require: any;

@Component({
  selector: 'app-workflow-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './workflow-editor.component.html',
  styleUrl: './workflow-editor.component.scss',
})
export class WorkflowEditorComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef;

  private modeler: any = null;
  isLoading = true;
  isSaving = false;
  savedSuccess = false;
  policyName = 'Nueva Política';
  policyStatus = 'borrador';
  xmlContent = '';
  showXml = false;

  private initialDiagram = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn2:definitions
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL"
  xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
  xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
  xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
  id="Definitions_1"
  targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn2:process id="Process_1" isExecutable="true">
    <bpmn2:startEvent id="StartEvent_1" name="Inicio">
      <bpmn2:outgoing>Flow_1</bpmn2:outgoing>
    </bpmn2:startEvent>
    <bpmn2:userTask id="Task_1" name="Primera Actividad">
      <bpmn2:incoming>Flow_1</bpmn2:incoming>
      <bpmn2:outgoing>Flow_2</bpmn2:outgoing>
    </bpmn2:userTask>
    <bpmn2:endEvent id="EndEvent_1" name="Fin">
      <bpmn2:incoming>Flow_2</bpmn2:incoming>
    </bpmn2:endEvent>
    <bpmn2:sequenceFlow id="Flow_1" sourceRef="StartEvent_1" targetRef="Task_1"/>
    <bpmn2:sequenceFlow id="Flow_2" sourceRef="Task_1" targetRef="EndEvent_1"/>
  </bpmn2:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="StartEvent_1_di" bpmnElement="StartEvent_1">
        <dc:Bounds x="152" y="202" width="36" height="36"/>
        <bpmndi:BPMNLabel><dc:Bounds x="155" y="245" width="30" height="14"/></bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_1_di" bpmnElement="Task_1">
        <dc:Bounds x="250" y="180" width="120" height="80"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="EndEvent_1_di" bpmnElement="EndEvent_1">
        <dc:Bounds x="432" y="202" width="36" height="36"/>
        <bpmndi:BPMNLabel><dc:Bounds x="439" y="245" width="22" height="14"/></bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_1_di" bpmnElement="Flow_1">
        <di:waypoint x="188" y="220"/>
        <di:waypoint x="250" y="220"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_2_di" bpmnElement="Flow_2">
        <di:waypoint x="370" y="220"/>
        <di:waypoint x="432" y="220"/>
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn2:definitions>`;

  constructor(
    private router: Router,
    private ngZone: NgZone,
  ) {}

  async ngOnInit() {
    await this.initModeler();
  }

  private async initModeler() {
    try {
      const BpmnModeler = (await import('bpmn-js/lib/Modeler')).default;

      this.ngZone.runOutsideAngular(() => {
        this.modeler = new BpmnModeler({
          container: this.canvasRef.nativeElement,
          keyboard: { bindTo: document },
        });
      });

      await this.modeler.importXML(this.initialDiagram);
      const canvas = this.modeler.get('canvas');
      canvas.zoom('fit-viewport');
      this.isLoading = false;
    } catch (error) {
      console.error('Error iniciando el editor BPMN:', error);
      this.isLoading = false;
    }
  }

  async saveXml() {
    if (!this.modeler) return;
    try {
      this.isSaving = true;
      const { xml } = await this.modeler.saveXML({ format: true });
      this.xmlContent = xml;
      console.log('XML guardado:', xml);

      // TODO: enviar xml al backend Spring Boot
      // this.http.post('/api/policies', { name: this.policyName, xml }).subscribe()

      setTimeout(() => {
        this.isSaving = false;
        this.savedSuccess = true;
        setTimeout(() => (this.savedSuccess = false), 3000);
      }, 800);
    } catch (err) {
      console.error('Error guardando XML:', err);
      this.isSaving = false;
    }
  }

  async toggleXml() {
    if (!this.showXml) {
      const { xml } = await this.modeler.saveXML({ format: true });
      this.xmlContent = xml;
    }
    this.showXml = !this.showXml;
  }

  zoomIn() {
    this.modeler?.get('zoomScroll').stepZoom(1);
  }
  zoomOut() {
    this.modeler?.get('zoomScroll').stepZoom(-1);
  }
  fitView() {
    this.modeler?.get('canvas').zoom('fit-viewport');
  }

  goBack() {
    this.router.navigate(['/policies']);
  }

  ngOnDestroy() {
    this.modeler?.destroy();
  }
}
