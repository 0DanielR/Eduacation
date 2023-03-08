import EdificiosModel from "../models/Edificios.model";
import { Boom } from "@hapi/boom";

//FIC: GET Edificios
export const getEdificiosList = async () => { 
    let EdificiosList; 
    try { 
          EdificiosList = await EdificiosModel.find(); 
          return(EdificiosList); 
    } catch (error) { 
      //res.status(500).json({ message: 'Error: ' + GetEdificiosError }); 
      throw error + "Error en Edificios Services Lista"; 
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
      return(EdificioItem); 
    } catch (error) { 
      throw error + "Error en Edificios Services Item"; 
    } 
  };

//POST (ADD) Edificio.
export const postEdificio = async (paEdificioItem) => {
  try { 
    const newEdificioItem = new EdificiosModel(paEdificioItem); 
    return await newEdificioItem.save(); 
  } catch (error) { 
    throw error + " - Error Edificios.Service postEdificio"; 
  } 
}

//SERVICES PUT 
// PUT (MODIFY) Edificios
export const putEdificioItem = async (id, paEdificioItem) => { 
	try { 
    const newEdificioItem = new EdificiosModel(putEdificioItem);
		return await newEdificioItem.findOneAndUpdate({ IdEdificioOK: id }, paEdificioItem, { 
		new: true, 
		}); 
	} catch (error) { 
		throw Boom.badImplementation(error); 
	} 
};