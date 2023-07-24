import { lazy } from 'react';

const Staffs = lazy(() => import('./staff/Staffs'));
const StaRegister = lazy(() => import('./staff/Register'));


const StaffsTransactionConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'staff/Staffs',
      element: <Staffs />,
    },
    {
      path: 'staff/Register',
      element: <StaRegister />,
    },
  ],
};

export default StaffsTransactionConfig;