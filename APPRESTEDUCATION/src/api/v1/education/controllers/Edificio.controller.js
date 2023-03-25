import * as EdificiosServices from '../services/Edificios.service';
import boom from '@hapi/boom';

// API GET Todos los Edificios.
export const getEdificiosList = async (req, res, next) => {
  try {
    const EdificiosList = await EdificiosServices.getEdificiosList();
    if (!EdificiosList) {
      throw boom.notFound('No se encontraron servicios registrados.');
    } else if (EdificiosList) {
      res.status(800).json(EdificiosList);
    }
  } catch (error) {
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
      throw boom.notFound('No se encontraron productos/servicios registrados.');
    } else if (EdificioItem) {
      res.status(500).json(EdificioItem);
    }
  } catch (error) {
    next(error);
  }
};

//FIC: API POST (ADD) Edificio
export const postEdificioItem = async (req, res, next) => {
  try {
    const paEdificioItem = req.body;
    const newEdificioItem = await EdificiosServices.postEdificio(
      paEdificioItem
    );
    if (!newEdificioItem) {
      throw boom.badRequest('No se pudo crear el Producto y/o Servicio.');
    } else if (newEdificioItem) {
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
    const updatedEdificioItem = await EdificiosServices.putEdificioItem(
      id,
      paEdificioItem
    );
    if (!updatedEdificioItem) {
      throw boom.badRequest('No se pudo actualizar el Instituto.');
    } else if (updatedEdificioItem) {
      res.status(200).json(updatedEdificioItem);
    }
  } catch (error) {
    next(error);
  }
};

//delete Edificio
export const deleteEdificioItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteEdificioItem = await EdificiosServices.deleteEdificioItem(id);
    if (!deleteEdificioItem) {
      throw boom.notFound(`No se encontró el periodo con id ${req.params.id}.`);
    } else if (deleteEdificioItem) {
      res.status(200).json(deleteEdificioItem);
    }
  } catch (error) {
    next(error);
  }
};

export const pushSalon = async (req, res, next) => {
  try {
    const { idEdificio, idEspacio } = req.params;
    const infoSalon = req.body;
    const pushSalon = await EdificiosServices.pushSalon(
      idEdificio,
      idEspacio,
      infoSalon
    );
    if (!pushSalon.succes) {
      throw boom.notFound(pushSalon.error);
    } else {
      res.status(200).json(pushSalon);
    }
  } catch (error) {
    next(error);
  }
};

//GET salon

export const getSalon =async(req,res,next)=>{
  try {
    const { idEdificio, idEspacio } = req.params;
    const getSalon =await EdificiosServices.getSalon(
      idEdificio,
      idEspacio
    );
    if(!getSalon.succes){
      throw boom.notFound(getSalon.error);
    }else{
      res.status(200).json(getSalon);
    }
  } catch (error) {
    next(error);
  }
};

export const deleteSalon =async(req,res,next)=>{
  try {
    const{idEdificio,idEspacio}=req.params;
    const deleteSalon = await EdificiosServices.deleteSalon(
      idEdificio,
      idEspacio
    );
    if(!deleteSalon.succes){
      throw boom.notFound(deleteSalon.error);
    }else{
      res.status(200).json(deleteSalon);
    }
  } catch (error) {
    next(error);
  }
};
