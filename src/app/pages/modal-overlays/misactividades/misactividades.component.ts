import { Component, TemplateRef } from '@angular/core';
import {
  NbComponentStatus,
  NbGlobalLogicalPosition,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  NbToastrConfig,
  NbMenuService,
  NbDialogService,
} from '@nebular/theme';
import { ActividadesService } from '../../../services/actividades.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { actividad } from '../../../interfaces';

@Component({
  selector: 'ngx-toastr',
  styleUrls: ['./misactividades.component.scss'],
  templateUrl: './misactividades.component.html',
})
export class ToastrComponent {


  form: FormGroup;

  USR_ID: number | null = null;

  ngOnInit(): void {


    this.USR_ID = +(localStorage.getItem('usr_id'));

    this.misAsignaciones({ USR_ID: this.USR_ID });



    console.log(this.USR_ID)

  }


  constructor(private menuService: NbMenuService,
    private service: ActividadesService,
    private dialogService: NbDialogService,
    private formBuilder: FormBuilder) {

    this.form = this.formBuilder.group({
      AGE_FECHA: [this.getFechaActual()]
    });
  }




  goToHome() {
    this.menuService.navigateHome();
  }


  getFechaActual(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  actividad: actividad[] = [];

  misAsignaciones(USR_ID) {

    this.service.misAsignaciones(USR_ID).subscribe(resp => {
      this.actividad = resp['asignacion']['rows'];
      console.log(this.actividad)

    })
  }

  actividad_seleccionada;

  editarActividad(actividad, dialog: TemplateRef<any>, hora) {


    console.log("id act: ", actividad)
    this.actividad_seleccionada = actividad
    console.log("id ac selec", this.actividad_seleccionada)

    // TODO LLAMAR SERVICIO POR DI DE LA ACTIVIDAD
    // Pasar el id actividad_seleccionada

    this.service.getModal({ ACT_ID: this.actividad_seleccionada }).subscribe(
      (data) => {

        const prueba = data;
        console.log('NOMBRE:', prueba['data_act']['rows']);

        this.dialogService.open(
          dialog,
          {
            context: prueba['data_act']['rows'],
            closeOnEsc: false,
            hasBackdrop: true,

          });
      }
    );

  }


  iniciar({ ACT_ID: ID_ACT }) {

    console.log("ID INICIAR:", ID_ACT)
    this.service.iniciarAct(ID_ACT)

  }

  Finalizar(ID_ACT) {



    console.log("ID FINALIZAR:", ID_ACT)
    this.service.finalizarAct(ID_ACT)
  }


}
