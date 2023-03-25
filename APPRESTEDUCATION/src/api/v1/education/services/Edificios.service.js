import EdificiosModel from '../models/Edificios.model';
import { Boom } from '@hapi/boom';

//FIC: GET Edificios
export const getEdificiosList = async () => {
  let EdificiosList;
  try {
    EdificiosList = await EdificiosModel.find();
    return EdificiosList;
  } catch (error) {
    //res.status(500).json({ message: 'Error: ' + GetEdificiosError });
    throw error + 'Error en Edificios Services Lista';
  }
};

//GET Edificio  by ID
export const getEdificioItem = async (id, keyType) => {
  let EdificioItem;

  try {
    if (keyType === 'OK') {
      EdificioItem = await EdificiosModel.findOne({
        IdEdificioOK: id,
      });
    } else if (keyType === 'BK') {
      EdificioItem = await EdificiosModel.findOne({
        IdEdificioBK: id,
      });
    }
    return EdificioItem;
  } catch (error) {
    throw error + 'Error en Edificios Services Item';
  }
};

//POST (ADD) Edificio.
export const postEdificio = async (paEdificioItem) => {
  try {
    const newEdificioItem = new EdificiosModel(paEdificioItem);
    return await newEdificioItem.save();
  } catch (error) {
    throw error + ' - Error Edificios.Service postEdificio';
  }
};

//SERVICES PUT
// PUT (MODIFY) Edificios
export const putEdificioItem = async (id, paEdificioItem) => {
  try {
    const newEdificioItem = new EdificiosModel(putEdificioItem);
    return await newEdificioItem.findOneAndUpdate(
      { IdEdificioOK: id },
      paEdificioItem,
      {
        new: true,
      }
    );
  } catch (error) {
    throw Boom.badImplementation(error);
  }
};

//DELETE EDIFICIOS
export const deleteEdificioItem = async (id) => {
  try {
    return await EdificiosModel.findOneAndDelete({ IdEdificioOK: id });
  } catch (error) {
    throw boom.badImplementation(error);
  }
};

//APIS SUBDOCUMENTOS
//POST Y PUT salon
export const pushSalon = async (idEdificio, idEspacio, infoSalon) => {
  const edificio = await EdificiosModel.findOne({
    IdEdificioOK: idEdificio,
  });
  const { cat_edificios_espacios } = edificio;
  const index = cat_edificios_espacios.findIndex(
    (espacio) => espacio.IdEspacioOK == idEspacio
  );
  if (index >= 0) {
    cat_edificios_espacios[index] = infoSalon;
  } else {
    cat_edificios_espacios.push(infoSalon);
  }
  try {
    const salonupdate = await EdificiosModel.findOneAndUpdate(
      { IdEdificioOK: idEdificio },
      { $set: { cat_edificios_espacios } },
      { new: true }
    );
    return { succes: true, salonupdate };
  } catch (error) {
    return { succes: false, error };
  }
};

//GET Salon Lista
export const getSalon = async(idEdificio,idEspacio)=>{
  
  try {
    const edificio = await EdificiosModel.findOne({
      IdEdificioOK: idEdificio,
    });
    const { cat_edificios_espacios } = edificio;
    
    const index = cat_edificios_espacios.findIndex(
      (espacio) => espacio.IdEspacioOK == idEspacio
    );
    
    const salon= index>=0?cat_edificios_espacios[index]:undefined;
    return {succes: index>=0,salon};
  } catch (error) {
    return{succes:false, error};
  }
  
  };

  //DELETE salon
  export const deleteSalon = async(idEdificio,idEspacio)=>{
    const edificio = await EdificiosModel.findOne({
      IdEdificioOK: idEdificio,
    });
    const { cat_edificios_espacios } = edificio;
    const index = cat_edificios_espacios.findIndex(
      (espacio) => espacio.IdEspacioOK == idEspacio
    );
    if (index >= 0) {
      cat_edificios_espacios.splice(index,1);
    }
    try {
      const salonupdate = await EdificiosModel.findOneAndUpdate(
        { IdEdificioOK: idEdificio },
        { $set: { cat_edificios_espacios } },
        { new: true }
      );
      return { succes: true, salonupdate };
    } catch (error) {
      return { succes: false, error };
    }
    
};

