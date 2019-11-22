# DIF

Proyecto Base de Datos 2019.
*ITESM CEM*

## STACK

- SQL Server (Microsoft) | MSSQL
- Nodejs
- - Handlebars
- - Express
- - Sequelize

## Directory

### Models

Here is the location of the tables in DB, for this version Migrations are not used.

```txt
=-=-=-=-=-=-=-=-=-=-=-=
auxiliar_model.js
-Derecho
-Enfermedad
-Escolaridad
-TipoPU
=-=-=-=-=-=-=-=-=-=-=-=
usuario_model.js
-Usuario
-Usuario_Formato
=-=-=-=-=-=-=-=-=-=-=-=
plantilla_model.js
-Dato_Consistente
-Plantilla
-Formato
-Opcion
-Campo
-Respuesta
-Respuesta_Opcion
=-=-=-=-=-=-=-=-=-=-=-=
nna_model.js
-NNA
-NNA_Derecho
-NNA_Enfermedad
=-=-=-=-=-=-=-=-=-=-=-=
denuncia_model.js
-Denuncia
-Derecho_Vulnerado
=-=-=-=-=-=-=-=-=-=-=-=
```

## To Do

* [x] Change small ints | not implemented | https://github.com/sequelize/sequelize/issues/9397
* [ ] Add validations (unique also)
* [ ] Implement user roles (admin)
* [ ] Create login
* [ ] Toggle active class on left menu
* [ ] Pagination
* [ ] Add breadcumbs
* [ ] Add edit option
* [ ] Attatch files
* [x] Unique no_cedula on User and exp on NNA and pass null empty values
* [ ] Custom message for unique pk
* [ ] Search Bar
* [ ] Views for NNA and User


## To Fix

* [ ] Warnigns in html
* [ ] Ajax delete
* [ ] Correct display ocupation in NNA
* [ ] Redirect edit and create to show

### In the near future

* [ ] Implement sequelize migration 
* [ ] Scopes
