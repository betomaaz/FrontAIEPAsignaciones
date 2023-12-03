import { Component } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { ActividadesService } from '../../../services/actividades.service';


@Component({
  selector: 'ngx-form-inputs',
  styleUrls: ['./form-inputs.component.scss'],
  templateUrl: './form-inputs.component.html',
})
export class FormInputsComponent {

  formActividad = this.formBuilder.group({
    ACT_NOMBRE: ['', Validators.required],
    ACT_DESCRIPCION: [''],
    ACT_PRO_ID: [''],
    ACT_ESTADO: "Pendiente",
    ACT_COM_ID: [''],
    ACT_DIRECCION: [''],
    // ACT_INICIO: [''],
    // ACT_FIN: [''],
    ACT_CORREO_SOLICITANTE: [''],
    ACT_NOMBRE_SOLICITANTE: [''],
    ACT_TELEFONO_SOLICITANTE: [''],
    AGE_FECHA: [''],
    AGE_USR_ID: [4],
    AGE_ESTADO: "Asignada",
    ACT_AGE_ID: [''],
    AH_HOR_ID: [''],
    DEP_MONTO: [''],
    DEP_FECHA: [''],
    DEM_MOT_ID: [''],

  });

  comunas = []
  horas = []
  proyectos = []
  motivos = []


  // starRate = 2;
  // heartRate = 4;
  // radioGroupValue = 'This is value 2';


  constructor(private formBuilder: FormBuilder, private service:ActividadesService){
    service.getComunas().subscribe((data: any) => {
      // console.log(data['comuna']['rows'])
      this.comunas = data['comuna']['rows']
    })

    service.getHoras().subscribe((data: any) => {
      // console.log(data['comuna']['rows'])
      this.horas = data['hora']['rows']
    })

    service.getProyectos().subscribe((data: any) => {
      console.log(data)
      this.proyectos = data['proyectos']['rows']
    })

    service.getMotivos().subscribe((data: any) => {
      console.log(data)
      this.motivos = data['motivo']['rows']
    })
    

  }

  guardar(){
    this.service.postActividades(this.formActividad.value).subscribe((data: any) => {
      console.log(data)
    })
    console.log(this.formActividad.value)
  }
}