import { Component, TemplateRef } from '@angular/core';
import { NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbMenuService, NbToastrService } from '@nebular/theme';
import { ActividadesService } from '../../../services/actividades.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { actividad } from '../../../interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-tooltip',
  templateUrl: 'tooltip.component.html',
  styleUrls: ['tooltip.component.scss'],
})
export class TooltipComponent {

  formulario: FormGroup;

  ngOnInit(): void {

    this.formulario.get("AGE_FECHA").patchValue(this.getFechaActual())

    this.datadeposito()

  }


  constructor(private menuService: NbMenuService,
    private service: ActividadesService,
    private dialogService: NbDialogService,
    private formBuilder: FormBuilder,
    private toastrService: NbToastrService,
    private router: Router) {

    this.formulario = this.formBuilder.group({
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

  datadeposito() {
    this.service.getdeposito().subscribe(resp => {

      this.actividad = resp['deposito']['rows'];


    })
  }

  actividad_seleccionada;

  editarActividad(actividad, dialog: TemplateRef<any>, hora) {




    this.actividad_seleccionada = actividad


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

  status: NbComponentStatus = 'success'

  actividad_deposito;

  registrardeposito(actividad) {

    this.actividad_deposito = actividad


    this.service.regdeposito(this.actividad_deposito).subscribe(data => {
      this.router.navigate(['/pages/misactividades/deposito'])
      this.datadeposito()
      this.showToast(this.status, 'Depósito Registrado', '')

    })





  }



  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 4000,
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
