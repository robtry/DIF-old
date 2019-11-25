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
-Domicilio
=-=-=-=-=-=-=-=-=-=-=-=
denuncia_model.js
-Denuncia
=-=-=-=-=-=-=-=-=-=-=-=
```

## To Do

* [x] Change small ints | not implemented | https://github.com/sequelize/sequelize/issues/9397
* [ ] Add edit option
* [ ] Attatch files
* [ ] Search Bar
* [ ] Views for NNA and User
* [ ] Parents of NNA
* [ ] Delete res on field
* [ ] Redirect edit and create to show on nna
* [ ] Correct display ocupation in NNA
* [ ] cascade for field (res)
* [ ] cascade for templates
* [ ] cascade for nna
* [ ] reload for template

## To Fix

* [ ] Add Unique validation
* [ ] Warnigns in html

### In the near future

* [ ] Implement sequelize migration 
* [ ] Scopes (trims)
* [ ] Implement user roles (admin)
* [ ] Create login
* [ ] Toggle active class on left menu
* [ ] Pagination
* [ ] Add breadcumbs
