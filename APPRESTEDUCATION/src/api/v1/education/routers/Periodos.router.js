import { Router } from 'express'; 
import * as periodosController from '../controllers/Periodos.controller'; 
const router = Router(); 

router.route('/')
    .get(periodosController.getPeriodosList)
    .post(periodosController.postPeriodosItem)

router.route('/:id')
    .get(periodosController.getPeriodosItem)
    .put(periodosController.putPeriodosItem)
    .delete(periodosController.deletePeriodosItem)

router.route('/estatus/:idPeriodo/:idStatus')
    .put(periodosController.pushStatus)
    .get(periodosController.getEstatus)
    .delete(periodosController.deleteEstatus)

export default router;