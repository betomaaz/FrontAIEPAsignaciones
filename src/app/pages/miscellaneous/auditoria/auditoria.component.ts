import { NbDialogService, NbMenuService } from '@nebular/theme';
import { Component } from '@angular/core';
import { ActividadesService } from '../../../services/actividades.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { actividad } from '../../../interfaces';


@Component({
  selector: 'ngx-not-found',
  styleUrls: ['./auditoria.component.scss'],
  templateUrl: './auditoria.component.html',
})
export class NotFoundComponent {

  form: FormGroup;


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      AGE_FECHA: [''] // Asegúrate de agregar el control para AGE_FECHA
    });

    this.form.get("AGE_FECHA").valueChanges.subscribe(data => {
      this.dataAuditor({ AGE_FECHA: data });
    });

    const prueba = this.form.get("AGE_FECHA");
    console.log(prueba);

    // Si necesitas realizar más acciones que dependan del formulario aquí, colócalas después de la inicialización
  }


  constructor(private menuService: NbMenuService,
    private service: ActividadesService,
    private dialogService: NbDialogService,
    private formBuilder: FormBuilder) {


  }




  goToHome() {
    this.menuService.navigateHome();
  }


  actividad: actividad[] = [];

  dataAuditor(AGE_FECHA) {
    this.service.getAuditor(AGE_FECHA).subscribe(resp => {

      this.actividad = resp['auditor']['rows'];
      console.log(this.actividad)

    })
  }
}
