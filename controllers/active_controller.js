module.exports ={

    /* Errors */
    getErrorMessages : (err) => {
        if(err.errors){
            let errors_send  = [];
            for(let i = 0; i < err.errors.length; i++){
                errors_send.push({text:err.errors[i].message});
            }
            return errors_send;
        }
        console.log("-- Algo grave esta pasanding!!!! --\n" + err)
    },

    /* User */
    getTipo:(role) =>{
        if(role == 1){return "Trabajo Social"}
        if(role == 2){return "Médico"}
        if(role == 3){return "Psicólogo"}
        if(role == 4){return "Abogado"}
        return ''
    },
    
    getUserRoute:(role, getTipo) =>{
        return '/usuarios/' + getTipo(role).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase() + 's';
    },

    /* Plantilla */
    getAddPlantillaRoute:(role) => {
        aux = ''
        if(role == 1){aux = "tsocial"}
        else if(role == 2){aux = "medico"}
        else if(role == 3){aux = "psicologo"}
        else if(role == 4){aux = "abogado"}
        else {aux = ''}
        //console.log(role + "|" + aux)
        return "/" + aux + "/plantilla/agregar"
    },

    /* Plantilla */
    getAddFormatRoute:(role) => {
        aux = ''
        if(role == 1){aux = "tsocial"}
        else if(role == 2){aux = "medico"}
        else if(role == 3){aux = "psicologo"}
        else if(role == 4){aux = "abogado"}
        else {aux = ''}
        //console.log(role + "|" + aux)
        return "/" + aux + "/plantilla/agregar"
    }

    
}