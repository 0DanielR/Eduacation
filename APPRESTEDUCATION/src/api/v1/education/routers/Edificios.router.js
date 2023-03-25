import { Router } from "express";
import * as Edificiocontroller from '../controllers/Edificio.controller';

const router = Router();
router.route('/')
    .get(Edificiocontroller.getEdificiosList)
    .post(Edificiocontroller.postEdificioItem)

router.route('/:id')
    .get(Edificiocontroller.getEdificioItem)
    .put(Edificiocontroller.putEdificioItem)
    .delete(Edificiocontroller.deleteEdificioItem)

router.route('/salon/:idEdificio/:idEspacio')
    .get(Edificiocontroller.getSalon)
    .put(Edificiocontroller.pushSalon)
    .delete(Edificiocontroller.deleteSalon)

export default router;