import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [

  {
    title: 'MENÚ',
    group: true,
  },


  {
    title: 'Extra Components',
    icon: 'message-circle-outline',
    children: [
      {
        title: 'Calendar',
        link: '/pages/extra-components/calendar',
      },
      {
        title: 'Progress Bar',
        link: '/pages/extra-components/progress-bar',
      },
      {
        title: 'Spinner',
        link: '/pages/extra-components/spinner',
      },
      {
        title: 'Alert',
        link: '/pages/extra-components/alert',
      },
      {
        title: 'Calendar Kit',
        link: '/pages/extra-components/calendar-kit',
      },
      {
        title: 'Chat',
        link: '/pages/extra-components/chat',
      },
    ],
  },
  {
    title: 'Reportes',
    // icon: 'activity-outline',
    icon: 'pie-chart-outline',
    link: '/pages/charts/chartjs',
  },


  // {
  //   title: 'Editors',
  //   icon: 'text-outline',
  //   children: [
  //     {
  //       title: 'TinyMCE',
  //       link: '/pages/editors/tinymce',
  //     },
  //     {
  //       title: 'CKEditor',
  //       link: '/pages/editors/ckeditor',
  //     },
  //   ],
  // },

  {
    title: 'Depósitos',
    icon: 'file-text-outline',
    link: '/pages/modal-overlays/tooltip',
  },

  {
    title: 'Agendamiento',
    icon: 'calendar-outline',
    link: '/pages/tables/smart-table',
  },
  {
    title: 'Usuarios',
    icon: 'people-outline',
    link: '/pages/tables/tree-grid',
  },


  {
    title: 'Auditoria',
    icon: 'checkmark-square-outline',
    link: '/pages/miscellaneous/404',
  },


  {
    title: 'Mis Actividades',
    icon: 'briefcase-outline',
    link: '/pages/modal-overlays/toastr',
  },

];