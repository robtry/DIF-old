if(process.env.NODE_ENV === "production"){
	console.log("Conectando desde pruduction console")
	module.exports = require('./keys_prod');
}else{
	console.log("Conectando desde dev")
	module.exports = require('./keys_dev');
}