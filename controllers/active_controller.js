module.exports ={

    getTipo:(role) =>{
        if(role == 2){return "Médico"}
        else if(role == 3){return "Psicólogo"}
        else if(role == 4){return "Abogado"}
        else return ''
    },
    
    getRouteWithTipo:(role) =>{
        return '/usuarios/' + getTipo(role).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase() + 's';
    },
}