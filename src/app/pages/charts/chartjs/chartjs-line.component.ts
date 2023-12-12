import { Component, OnDestroy } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';

@Component({
  selector: 'ngx-chartjs-line',
  template: `
    <chart type="line" [data]="data" [options]="options"></chart>
  `,
})
export class ChartjsLineComponent implements OnDestroy {
  data: any;
  options: any;
  themeSubscription: any;

  constructor(private theme: NbThemeService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      this.data = {
        labels: ['May-23', 'Jun-23', 'Jul-23', 'Ago-23', 'Sept-23', 'Oct-23', 'Nov-23'],
        datasets: [{
          data: [90, 85, 88, 95, 79, 83, 76],
          label: 'Actividades',
          backgroundColor: NbColorHelper.hexToRgbA(colors.primary, 0.3),
          borderColor: colors.primary,
        }, {
          data: [60, 70, 77, 70, 70, 80, 70],
          label: 'Técnicos',
          backgroundColor: NbColorHelper.hexToRgbA(colors.danger, 0.3),
          borderColor: colors.danger,
        },
        ],
      };

      this.options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
        },
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
