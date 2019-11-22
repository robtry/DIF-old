module.exports ={

    getTipo:(role) =>{
        if(role == 1){return "Trabajo Social"}
        else if(role == 2){return "Médico"}
        else if(role == 3){return "Psicólogo"}
        else if(role == 4){return "Abogado"}
        else return ''
    },
    
    getUserRoute:(role) =>{
        return '/usuarios/' + getTipo(role).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase() + 's';
    },

    getAddPlantillaRoute:(role) => {
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