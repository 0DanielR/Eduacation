import mongoose from "mongoose";

const EdificioSchema = new mongoose.Schema({
    //Edificio
    IdEdificioPK: { type : Number, required : true },
    IdEdificioOK: { type : String },
    IdEdificioBK: { type : String },
    IdInstitutoOK: { type : Number },
    DesEdificio: { type : String },
    Alias: { type : String}
    //--fin Edificio

    //Cat Edificios_espacios
    /*cat_edificios_espacios: [{
        IdEspacioOK: { type : Number },
        IdEspacioBK: { type : String },
        DesEspacio: { type : String },
        Alias: { type : String },
        detail_row: {
            Activo: { type : String },
            Borrado: { type : String },
            detail_row_regw: [{
                FechaReg: { type: Date, default: Date.now },
                UsuarioReg: { type : String },
            }],
        },
    }],*/
});

//Export
export default mongoose.model(
    'cat_edificios',
    EdificioSchema,
    'cat_edificios'
)