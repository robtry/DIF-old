module.exports = {

	login: (req, res) => {
		res.render('login', {layout: 'login'});
	},

	dashboard: (req, res) => {
		res.render('dashboard');
	}
}