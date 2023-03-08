import { Router } from 'express'; 
import config from '../../../../config/config'; 
import PeriodosRoutes from './Periodos.router';
// Import Routes 

import EdficiosRouter from './Edificios.router'; 
//import ordersRoutes from './orders.routes'; 
const routerAPI = (app) => { 
  const router = Router(); 
  const api = config.API_URL; 
  app.use(api, router); 
  // Routes 
  router.use('/Edificio-API', EdficiosRouter); 
  router.use('/periodos', PeriodosRoutes);  

  return router; 
}; 
module.exports = routerAPI;