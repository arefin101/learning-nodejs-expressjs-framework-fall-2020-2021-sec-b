const express = require('express');
const userModel = require.main.require('./models/userModels');
const router = express.Router();

router.get('/', (req, res)=>{
	if(req.cookies['uname'] != null){
			var data = {
							'name' : req.cookies['uname'],
							'id' : '123'
						};
		res.render('home/index', data);
	}else{
		res.redirect('login');
	}
});

router.get('/userlist', (req, res)=>{

	  userModel.getUsers(function(results){

		res.render('home/userlist', {userlist : results});
	  });
	  
});

module.exports = router;