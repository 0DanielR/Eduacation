import { Router } from "express";
import * as Edificiocontroller from '../controllers/Edificio.controller';

const router = Router(); 

router.get('/', Edificiocontroller.getEdificiosList); 

router.get('/:id', Edificiocontroller.getEdificioItem); 
export default router;

router.post('/', Edificiocontroller.postEdificioItem);

router.put('/:id', Edificiocontroller.putEdificioItem);