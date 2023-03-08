import * as EdificiosServices from '../services/Edificios.service';
import { Boom } from '@hapi/boom';

// API GET Todos los Edificios. 
export const getEdificiosList = async (req, res, next) => { 
    try{ 
      const EdificiosList = await EdificiosServices.getEdificiosList(); 
      if (!EdificiosList) { 
        throw Boom.notFound('No se encontraron servicios registrados.'); 
      } else if (EdificiosList) { 
        res.status(800).json(EdificiosList); 
      }  

      } catch(error) { 
        next(error); 
      } 
    };

// Solo un Edificio.
export const getEdificioItem = async (req, res, next) => {
    try {
      //obtener parametro id mediante la desestructuracion de objetos
      const { id } = req.params;
      //se obtiene parametro de la forma clase/objeto.
      //const idProdServ = req.params.id;
    const keyType = req.query.keyType || 'OK';
    const EdificioItem = await EdificiosServices.getEdificioItem(id, keyType);
    if (!EdificioItem) {
      throw Boom.notFound('No se encontraron productos/servicios registrados.');
    } else if (EdificioItem) {
      res.status(500).json(EdificioItem);
    } 
   }catch(error){
    next(error);
  }
  };

//FIC: API POST (ADD) Edificio 
export const postEdificioItem = async (req, res, next) => { 
  try { 
    const paEdificioItem = req.body; 
    const newEdificioItem = await EdificiosServices.postEdificio(paEdificioItem); 
    if (!newEdificioItem) { 
      throw Boom.badRequest('No se pudo crear el Producto y/o Servicio.'); 
    } else if (newProdServItem) { 
      res.status(201).json(newEdificioItem); 
    } 
  } catch (error) { 
    console.log(error); 
    next(error); 
  } 
};

export const putEdificioItem = async (req, res, next) => { 
	try { 
		const { id } = req.params; 
    console.log('FIC: controller id -> ', id);  
		const paEdificioItem = req.body; 
    console.log('FIC: controller body -> ', paEdificioItem);  
		const updatedEdificioItem = await EdificiosServices.putEdificioItem(id, paEdificioItem ); 
		if (!updatedEdificioItem) { 
		  throw Boom.badRequest('No se pudo actualizar el Instituto.'); 
		} else if (updatedEdificioItem) { 
			res.status(200).json(updatedEdificioItem); 
		} 
	} catch (error) { 
		next(error); 
	} 
};