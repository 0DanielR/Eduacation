import Periodos from '../models/Periodos.model';
import boom from '@hapi/boom';
import PeriodosModel from '../models/Periodos.model';
 
export const getPeriodosList = async () => { 
    let periodosList; 
    try { 
          periodosList = await Periodos.find(); 
          return(periodosList); 
    } catch (error) { 
      //res.status(500).json({ message: 'Error: ' + ficError }); 
      throw boom.internal(error); 
    } 
  };
  export const getPeriodosItem = async (id, keyType) => { 
    let periodosItem; 
    try { 
      if(keyType === 'OK'){
        periodosItem = await Periodos.findOne({
            IdPeriodoOK : id
        });
      } else if (keyType === 'BK'){
        periodosItem = await Periodos.findOne({
          IdPeriodoBK : id
        });
      }
    } catch (error) { 
      //res.status(500).json({ message: 'Error: ' + ficError }); 
      throw boom.internal(error); 
    } 
  };

  export const postPeriodosItem = async (paPeriodosItem) => { 
    try { 
      const newPeriodosItem = new Periodos(paPeriodosItem); 
      return await newPeriodosItem.save(); 
    } catch (error) { 
      throw error; 
    } 
  };
  
  //PUT (UPDATE) Grupos Item. 
  export const putPeriodosItem = async (id, puPeriodosItem) => {
    try {
      //console.log("PUT API PERIODOS", id);
      return await Periodos.findOneAndUpdate({ IdPeriodoOK: id }, puPeriodosItem, {
        new: true,
      });
    } catch (error) {
      throw boom.badImplementation(error);
    }
  };
  
  //DELETE Grupos Item. 
  export const deletePeriodosItem = async (id) => {
    try {
      return await Periodos.findOneAndDelete({ IdPeriodoOK: id });
    } catch (error) {
      throw boom.badImplementation(error);
    }
  };

  //APIS SUBDOCUMENTOS
  //POST Y PUT estatus

export const pushStatus = async (idPeriodo, idStatus, infoStatus)=>{
  const Periodos = await PeriodosModel.findOne({
    IdPeriodoPK: idPeriodo,
  });
  const {cat_periodos_estatus}=Periodos;
  const index = cat_periodos_estatus.findIndex(
    (estatus) => estatus.IdEstatusOK == idStatus
  );
  if (index>=0) {
    cat_periodos_estatus[index]= infoStatus;
  } else {
    cat_periodos_estatus.push(infoStatus);
  }
  try {
    const estatusupdate = await PeriodosModel.findOneAndUpdate(
      {IdPeriodoPK:idPeriodo},
      {$set:{cat_periodos_estatus}},
      {new:true}
    );
    return{ success: true, estatusupdate};
  } catch (error) {
    return{succes: false, error};
  }
};

//GET Estatus Lista

  export const getEstatus = async(idPeriodo,idStatus)=>{
    try {
      const Periodos =await PeriodosModel.findOne({
        IdPeriodoPK: idPeriodo,
      });
      const {cat_periodos_estatus}=Periodos;
      const index = cat_periodos_estatus.findIndex(
        (estatus) => estatus.IdEstatusOK == idStatus
      );
      const estatus= index >=0?cat_periodos_estatus[index]:undefined;
      return {succes: index>=0, estatus};
    } catch (error) {
      return{succes:false,error};
    }
  };

 
 //Delete Estatus
export const deleteEstatus = async(idPeriodo,idStatus)=>{
  const Periodos = await PeriodosModel.findOne({
    IdPeriodoPK: idPeriodo,
  });
  const {cat_periodos_estatus}=Periodos;
  const index = cat_periodos_estatus.findIndex(
    (estatus) => estatus.IdEstatusOK == idStatus
  );
  if (index>=0) {
    cat_periodos_estatus.splice(index,1);
  }
  try {
    const estatusupdate = await PeriodosModel.findOneAndUpdate(
      {IdPeriodoPK:idPeriodo},
      {$set:{cat_periodos_estatus}},
      {new:true}
    );
    return {succes: true, estatusupdate};
  } catch (error) {
    return{succes: false,error};
  }
};
