import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { ActividadesService } from '../../../services/actividades.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';


@Component({
  selector: 'ngx-form-inputs',
  styleUrls: ['./agenda.component.scss'],
  templateUrl: './agenda.component.html',
})
export class FormInputsComponent implements OnInit {

  formActividad = this.formBuilder.group({
    ACT_NOMBRE: ['', Validators.required],
    ACT_DESCRIPCION: [''],
    ACT_PRO_ID: [''],
    ACT_ESTADO: "Pendiente",
    ACT_COM_ID: [''],
    ACT_DIRECCION: [''],
    ACT_CORREO_SOLICITANTE: [''],
    ACT_NOMBRE_SOLICITANTE: [''],
    ACT_TELEFONO_SOLICITANTE: [''],
    AGE_FECHA: [''],
    AGE_USR_ID: [],
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
  usuario_id = -1
  agendaFecha = ""

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: ActividadesService,
    private toastrService: NbToastrService) {
    service.getComunas().subscribe((data: any) => {
      this.comunas = data['comuna']['rows']


    })

    service.getHoras().subscribe((data: any) => {
      this.horas = data['hora']['rows']
    })

    service.getProyectos().subscribe((data: any) => {
      this.proyectos = data['proyectos']['rows']
    })

    service.getMotivos().subscribe((data: any) => {
      this.motivos = data['motivo']['rows']
    })


  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        console.log(params);
        this.usuario_id = params.id;
        this.agendaFecha = params.fecha;
        this.formActividad.get('AGE_FECHA').patchValue(this.agendaFecha)
      }
      );
  }

  status: NbComponentStatus = 'success'
  guardar() {
    this.formActividad.get('AGE_USR_ID').patchValue(this.usuario_id)
    this.formActividad.get('AGE_FECHA').patchValue(this.agendaFecha)
    this.service.postActividades(this.formActividad.value).subscribe((data: any) => {
      this.showToast(this.status, 'Asignación Guardada con Éxito', 'Ok')
      this.router.navigate(['/pages/agenda'])

    })
  }

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 2000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false,
    };
    const titleContent = title ? `. ${title}` : '';


    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }

}