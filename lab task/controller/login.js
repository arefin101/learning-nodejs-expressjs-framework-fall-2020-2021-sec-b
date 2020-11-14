const express = require('express');
const userModel = require.main.require('./models/userModels');
const router = express.Router();

router.get('/', (req,res)=>{
	res.render('log_in/index');
});

router.post('/', (req, res)=>{

	user = {
		'uname' : req.body.uname,
		'pass' : req.body.pass
	}

	userModel.validate(user, function(status){
		if(status){
			res.cookie('uname', req.body.uname)
			res.redirect('/home');
		}else{
			res.redirect('/login');
		}
	})


	//console.log(req.body);

});

module.exports = router;