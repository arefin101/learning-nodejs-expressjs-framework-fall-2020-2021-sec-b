const express = require('express');
const userModels = require('../models/userModels');
const userModel = require.main.require('./models/userModels');
const router = express.Router();


router.get('*',(req,res,next)=>{    // GET : (*)
	if(req.cookies['user'] == null){
		res.redirect("/login")
	}else{
		next()
	}
})

router.get('/', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	userModel.getInformation(user,function(results){
		if(results[0].userType == 'manager'){
			res.redirect('/home/manager');
		}
	});

	userModel.getInformation(user,function(results){
		if(results[0].userType == 'moderator'){
			res.redirect('/home/moderator');
		}
	});
	
})

router.get('/manager', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}
	userModel.getInformation(user, function(results){
		res.render('user/manager/home', {layout : './layouts/manager-main', userInformation : results});
	  });
})

router.get('/manager/profile', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}
	userModel.getInformation(user,function(results){
		res.render('user/manager/profile', {layout : './layouts/manager-main', userInformation : results});
		console.log(results);    
	  });	
});

router.post('/manager/profile', (req, res)=>{
	
	if(req.body.password == req.body.repassword){
		password = req.body.password
		//console.log(req.body.firstName+' '+req.body.lastName);
	}else{
		password = null;
	}

	if(password != null){
		user = {
			'userName'  : req.body.userName,
			'name'  	: req.body.name,
			'email' 	: req.body.email,
			'DOB'   	: req.body.DOB,
			'mobileNo' 	: req.body.mobileNo,
			'password'	: password	
		}
		userModel.editUser(user,function(status){
			if(status){
				res.redirect('/home/manager/profile');
				console.log('1');
			}else{
				res.redirect('/home/manager/profile');
				console.log('2');
			}
		})
	}else{
			res.redirect('/home/manager/profile');
			console.log('3');
		}
	
	// userModel.getInformation(function(results){
	// 	res.render('user/manager/profile', {userInformation : results});
	//   });	
});

router.get('/manager/seeModerators', (req, res)=>{

	userModel.getAllmoderators(function(results){
		moderators = results;

	});
	user ={
		userName : req.cookies['user']
	}
	//{layout : './layouts/main2'}
	userModel.getInformation(user, function(results){
		res.render('user/manager/seeUsers/seeModerators', {layout : './layouts/manager-main',userInformation : results, sellerInformation : moderators});
	  });

	//res.render('user/manager/seeUsers/seeSellers');
})

router.get('/manager/seeUsers', (req, res)=>{

	userModel.getAllusers(function(results){
		users = results;
		//console.log(farmers);
	})
	user ={
		userName : req.cookies['user']
	}

	userModel.getInformation(user,function(results){
		res.render('user/manager/seeUsers/seeUsers', {layout : './layouts/manager-main',userInformation : results, farmerInformation : users});
	  });
	//res.render('user/manager/seeUsers/seeFarmers');
})

router.get('/manager/addModerator', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	userModel.getInformation(user, function(results){
		res.render('user/manager/addUser/addModerator', {layout : './layouts/manager-main', userInformation : results});
	  });

})

router.post('/manager/addModerator', (req, res)=>{

	if(req.body.password == req.body.repassword){
		password = req.body.password
		//console.log(req.body.firstName+' '+req.body.lastName);
	}else{
		password = null;
	}

	if(password != null){
		newUser = {
			'name' 	   	: req.body.firstName+' '+req.body.lastName,
			'email'    	: req.body.email,
			'DOB'		: req.body.DOB,
			'mobileNo'	: req.body.mobileNo,
			'userName' 	: req.body.userName,
			'password' 	: req.body.password,
			'userType' 	: 'moderator',
			'validity'	: 'valid'
		}
		userModel.createUser(newUser,function(status){
			if(status){
				res.redirect('/home/manager/seeModerator');
			}else{
				res.redirect('/home/manager/addModerator');
			}
		})
	}else{
			res.redirect('/home/manager/addModerator');
		}

	// userModel.getInformation(function(results){
	// 	res.render('user/manager/addUser/addSeller', {userInformation : results});
	//   });

})

router.get('/manager/addUser', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	userModel.getInformation(user,function(results){
		res.render('user/manager/addUser/addUser', {layout : './layouts/manager-main', userInformation : results});
	});
})

router.post('/manager/addUser', (req, res)=>{

	if(req.body.password == req.body.repassword){
		password = req.body.password
		//console.log(req.body.firstName+' '+req.body.lastName);
	}else{
		password = null;
	}

	if(password != null){
		newUser = {
			'name' 	   	: req.body.firstName+' '+req.body.lastName,
			'email'    	: req.body.email,
			'DOB'		: req.body.DOB,
			'mobileNo'	: req.body.mobileNo,
			'userName' 	: req.body.userName,
			'password' 	: req.body.password,
			'userType' 	: 'user'
		}
		userModel.createUser(newUser,function(status){
			if(status){
				res.redirect('/home/manager/seeUsers');
			}else{
				res.redirect('/home/manager/addUser');
			}
		})
	}else{
			res.redirect('/home/manager/addUser');
		}

	//res.render('user/manager/addUser/addFarmer',  {userInformation : results});
})

router.get('/manager/customizeModerator', (req, res)=>{

	user ={
		userName : req.cookies['user']
	}

	userModel.getAllmoderators(function(results){
		moderators = results;
		// console.log(sellers);
	})

	userModel.getInformation(user, function(results){
		res.render('user/manager/customize/customizeModerator', {layout : './layouts/manager-main', userInformation : results, sellerInformation : moderators});
	  });
})

router.get('/manager/customizeModerator/edit/:userName', (req, res)=>{

	var moderator = req.params.userName;

	user ={
		userName : req.cookies['user']
	}

	userModel.getModerator(moderator, function(results){
		moderators = results;
	})

	userModel.getInformation(user,function(results){
		res.render('user/manager/customize/edit/editSeller', {layout : './layouts/manager-main', userInformation : results, sellerInformation : modeartors});
	  });
	  
})

router.post('/manager/customizeModerator/edit/:userName', (req, res)=>{

	user = {
		name   		: req.body.name,
		userName 	: req.params.userName,
		email		: req.body.email,
		DOB			: req.body.DOB,
		mobileNo	: req.body.mobileNo
	}

	console.log(req.body.name);

	userModel.editModerator(user, function(status){
		if(status){
			res.redirect('/home/manager/customizeModerator');
		}else{
			res.redirect('/manager/customizeModerator/edit/"'+user.userName+'"');
		}
	})
})

router.get('/manager/customizeModerator/delete/:userName', (req, res)=>{

	var moderator = req.params.userName;

	user ={
		userName : req.cookies['user']
	}

	userModel.getmoderator(modearator, function(results){
		Moderators = results;
	})

	userModel.getInformation(user,function(results){
		res.render('user/manager/customize/delete/deleteModeratorr', {layout : './layouts/manager-main', userInformation : results, sellerInformation : Modearators});
	  });
	  
})

router.post('/manager/customizeModerator/delete/:userName', (req, res)=>{

	user = {
		userName 	: req.params.userName,
	}

	console.log(user.userName);

	userModel.deleteModerator(user, function(status){
		if(status){
			res.redirect('/home/manager/customizeModerator');
		}else{
			res.redirect('/home/manager/customizeModerator/delete/'+user.userName+'');
		}
	})
})

router.get('/manager/customizeUser/delete/:userName', (req, res)=>{

	var farmer = req.params.userName;

	user ={
		userName : req.cookies['user']
	}

	userModel.getFarmer(farmer, function(results){
		farmer = results;
	})

	userModel.getInformation(user,function(results){
		res.render('user/manager/customize/delete/deleteFarmer', {layout : './layouts/manager-main', userInformation : results, farmerInformation : farmer});
	  });
	  
})

router.post('/manager/customizeFarmer/delete/:userName', (req, res)=>{

	user = {
		userName 	: req.params.userName,
	}

	//console.log(user.userName);

	userModel.deleteFarmer(user, function(status){
		if(status){
			res.redirect('/home/manager/customizeFarmer');
		}else{
			res.redirect('/home/manager/customizeFarmer/delete/'+user.userName+'');
		}
	})
})

router.get('/manager/customizeFarmer', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	userModel.getAllusers(function(results){
		farmers = results;
		// console.log(farmers);
	})

	userModel.getInformation(user, function(results){
		res.render('user/manager/customize/customizeUser', {layout : './layouts/manager-main', userInformation : results, farmerInformation : farmers});
	  });
})

router.get('/manager/customizeFarmer/edit/:userName', (req, res)=>{

	var farmer = req.params.userName;

	user ={
		userName : req.cookies['user']
	}

	userModel.getFarmer(farmer, function(results){
		farmer = results;
	})

	userModel.getInformation(user,function(results){
		res.render('user/manager/customize/edit/editFarmer', {layout : './layouts/manager-main', userInformation : results, farmerInformation : farmer});
	  });
	  
})

router.post('/manager/customizeFarmer/edit/:userName', (req, res)=>{

	user = {
		name   		: req.body.name,
		userName 	: req.params.userName,
		email		: req.body.email,
		DOB			: req.body.DOB,
		mobileNo	: req.body.mobileNo
	}

	console.log(req.body.name);

	userModel.editFarmer(user, function(status){
		if(status){
			res.redirect('/home/manager/customizeFarmer');
		}else{
			res.redirect('/manager/customizeFarmer/edit/"'+user.userName+'"');
		}
	})
})

router.get('/manager/addProduct', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	userModel.getAllcategories(function(result){
		categories = result;
})

	userModel.getInformation(user, function(results){
		res.render('user/manager/addProduct', {layout : './layouts/manager-main', userInformation : results, categoryInformation : categories});
	  });
})

router.post('/manager/addProduct', (req, res)=>{

	if(req.body.category != 'Select Category'){
		newProduct = {
			'productName'	: req.body.productName,
			'description'   : req.body.description,
			'category'		: req.body.category,
			'expDate'		: req.body.expDate,
			'quantity' 		: req.body.quantity,
			'price' 		: req.body.price,
			'image' 		: req.files.productImage.name
		}

		var file = req.files.productImage;

	file.mv('./assets/img/'+file.name, function(error){
		
		if(error == null){
			userModel.createProduct(newProduct,function(status){
				if(status){
					res.redirect('/home/manager/customizeProducts');
				}else{
					res.redirect('/home/manager/addProduct');
				}
			})
		}else{
			res.redirect('/home/manager/addProduct');
		}
	});

	}else{
			res.redirect('/home/manager/addProduct');
	}
})

router.get('/manager/customizeProducts', (req, res)=>{
	userModel.getAllproducts(function(results){
		products = results;
	})
	user ={
		userName : req.cookies['user']
	}
	
	userModel.getInformation(user, function(results){
		res.render('user/manager/customizeProducts/customizeProducts', {layout : './layouts/manager-main',userInformation : results, productInformation : products});
	});
})

router.get('/manager/editProduct/:productId', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	productId = req.params.productId;

	userModel.getAllcategories(function(result){
		categories = result;
    })

	userModel.getProduct(productId , function(results){
		product = results;
		console.log(results[0].id);
	})

	userModel.getInformation(user, function(results){
		res.render('user/manager/customizeProducts/editProduct', {layout : './layouts/manager-main', userInformation : results, categoryInformation : categories, productInformation : product});
	  });

	//res.render('user/manager/editProducts');
})

router.post('/manager/editProduct/:productId', (req, res)=>{

	if(req.body.category != 'Select Category'){
		product = {
			'id'			:req.params.productId,
			'productName'	: req.body.productName,
			'description'   : req.body.description,
			'category'		: req.body.category,
			'expDate'		: req.body.expDate,
			'quantity' 		: req.body.quantity,
			'price' 		: req.body.price,
		}


		userModel.editProduct(product,function(status){
			if(status){
				res.redirect('/home/manager/customizeProducts');
			}else{
				res.redirect('/home/manager/editProduct/:productId');
			}
		})
		}else{
			res.redirect('/home/manager/addProduct/:productId');
		}

})

router.get('/manager/deleteProduct/:productId', (req, res)=>{

	var id = req.params.productId;

	user ={
		userName : req.cookies['user']
	}

	userModel.getProduct(id, function(results){
		product = results;
	})

	userModel.getInformation(user,function(results){
		res.render('user/manager/customizeProducts/deleteProduct', {layout : './layouts/manager-main', userInformation : results, productInformation : product});
	  });
	  
})

router.post('/manager/deleteProduct/:productId', (req, res)=>{

	product = {
		'id'			: req.params.productId,
	}

	//console.log(product);

	userModel.deleteProduct(product, function(status){
		if(status){
			res.redirect('/home/manager/customizeProducts');
		}else{
			res.redirect('/home/manager/deleteProduct/'+product.id+'');
		}
	})

})

router.get('/manager/viewProduct/:productId', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	productId = req.params.productId;

	userModel.getAllcategories(function(result){
		categories = result;
    })

	userModel.getProduct(productId , function(results){
		product = results;
		console.log(results[0].id);
	})

	userModel.getInformation(user, function(results){
		res.render('user/manager/customizeProducts/viewProduct', {layout : './layouts/manager-main', userInformation : results, categoryInformation : categories, productInformation : product});
	  });

	//res.render('user/manager/editProducts');
})

router.get('/manager/addCategory', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}
	
	userModel.getInformation(user,function(results){
		res.render('user/manager/addCategory', {layout : './layouts/manager-main', userInformation : results});
	});
})

router.post('/manager/addCategory', (req, res)=>{
	newCategory = {
		'name' 	   	: req.body.name
	}
	userModel.createCategory(newCategory,function(status){
		if(status){
			res.redirect('/home/manager/seeCategories');
		}else{
			res.redirect('/home/manager/addCategory');
		}
	})
})

router.get('/manager/seeCategories', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}
	userModel.getAllcategories(function(result){
		category = result;
		//console.log(result);
	})

	userModel.getInformation(user, function(results){
		res.render('user/manager/seeCategories', {layout : './layouts/manager-main', userInformation : results, categoryInformation: category });
	  });

})

router.get('/manager/editCategory/:catId', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	catId = req.params.catId;

	userModel.getCategory(catId,function(result){
		category = result;
		//console.log(category);
	})

	userModel.getInformation(user, function(results){
		res.render('user/manager/customizeCategory/editCategory', {layout : './layouts/manager-main', userInformation : results, catInformation : category});
	  });

})

router.post('/manager/editCategory/:catId', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	category = {
		'id'		: req.params.catId,
		'catName' 	: req.body.name,
	}

	//console.log(catName);

	userModel.editCategory(category,function(status){
		if(status){
			res.redirect('/home/manager/seeCategories');
		}else{
			res.redirect('/home/manager/editCategory/:catId');
		}
	})

	// userModel.getInformation(user, function(results){
	// 	res.render('user/manager/customizeCategory/editCategory', {layout : './layouts/manager-main', userInformation : results, catInformation : category});
	//   });

})

router.get('/manager/deleteCategory/:catId', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	catId = req.params.catId;

	userModel.getCategory(catId,function(result){
		category = result;
		//console.log(category);
	})

	userModel.getInformation(user, function(results){
		res.render('user/manager/customizeCategory/deleteCategory', {layout : './layouts/manager-main', userInformation : results, catInformation : category});
	  });

})

router.post('/manager/deleteCategory/:catId', (req, res)=>{

	user ={
		userName : req.cookies['user']
	}

	category = {
		'id'		: req.params.catId,
	}

	//console.log(catName);

	userModel.deleteCategory(category,function(status){
		if(status){
			res.redirect('/home/manager/seeCategories');
		}else{
			res.redirect('/home/manager/deleteCategory/:catId');
		}
	})

})

router.get('/manager/systemLeave', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	userModel.getInformation(user, function(results){
		res.render('user/manager/systemLeave', {layout : './layouts/manager-main', userInformation : results});
	  });

})

router.post('/manager/systemLeave', (req, res)=>{
	userNotification ={
		description			: req.body.notify,
		notificationType 	: req.body.notificationType,
		name 				: req.cookies['user'],
		userType			: req.body.userType,
		approval			: 'pending'
	}

	userModel.sendRequest(userNotification, function(status){
		if(status){
			userModel.getInformation(user, function(results){
				res.render('user/manager/Massege', {layout : './layouts/manager-main', userInformation : results});
			  });
		}else{
			res.redirect('/home/manager/systemLeave');
		}
	})
})

router.post('/manager/validitySeller', (req, res)=>{

	const id = req.body.userId;
	console.log(id);

	userModel.getUserbyid(id, function(results){

		console.log(results);

		if(results[0].validity == 'valid'){
			userModel.sellerInvalid(id, function(status){
				if (status) {
					res.json({
						validity:"Invalid"
					})
				}else{
					res.json({
						validity:"failed"
					})
				}
			 });
		}else{
			userModel.sellerValid(id, function(status){
				if (status) {
					res.json({
						validity:"Valid"
					})
				}else{
					res.json({
						validity:"failed"
					})
				}
			 });
		}

	  });

})

router.post('/manager/validityFarmer', (req, res)=>{

	const id = req.body.userId;
	console.log(id);

	userModel.getUserbyid(id, function(results){

		console.log(results);

		if(results[0].validity == 'valid'){
			userModel.farmerInvalid(id, function(status){
				if (status) {
					res.json({
						validity:"Invalid"
					})
				}else{
					res.json({
						validity:"failed"
					})
				}
			 });
		}else{
			userModel.farmerValid(id, function(status){
				if (status) {
					res.json({
						validity:"Valid"
					})
				}else{
					res.json({
						validity:"failed"
					})
				}
			 });
		}

	  });

})

router.get('/manager/checkNotifications', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	userModel.checkNotificationsManager(function(results){
		console.log(results);
		notifications = results;
		console.log(results);
	})

	userModel.getInformation(user, function(results){
		res.render('user/manager/checkNotifications', {layout : './layouts/manager-main', userInformation : results, notifications : notifications});
	  });

})

router.post('/manager/validitySeller', (req, res)=>{

	const id = req.body.userId;
	console.log(id);

	userModel.getUserbyid(id, function(results){

		console.log(results);

		if(results[0].validity == 'valid'){
			userModel.sellerInvalid(id, function(status){
				if (status) {
					res.json({
						validity:"Invalid"
					})
				}else{
					res.json({
						validity:"failed"
					})
				}
			 });
		}else{
			userModel.sellerValid(id, function(status){
				if (status) {
					res.json({
						validity:"Valid"
					})
				}else{
					res.json({
						validity:"failed"
					})
				}
			 });
		}

	  });

})

//------------------------------------------------------------------



router.get('/moderator', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}
	userModel.getInformation(user, function(results){
		res.render('user/moderator/home', {layout : './layouts/moderator-main', userInformation : results});
	  });
})

router.get('/moderators/profile', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}
	userModel.getInformation(user,function(results){
		res.render('user/moderator/profile', {layout : './layouts/moderator-main', userInformation : results});
		console.log(results);    
	  });	
});

router.post('/moderator/profile', (req, res)=>{
	
	if(req.body.password == req.body.repassword){
		password = req.body.password
		//console.log(req.body.firstName+' '+req.body.lastName);
	}else{
		password = null;
	}

	if(password != null){
		user = {
			'userName'  : req.body.userName,
			'name'  	: req.body.name,
			'email' 	: req.body.email,
			'DOB'   	: req.body.DOB,
			'mobileNo' 	: req.body.mobileNo,
			'password'	: password	
		}
		userModel.editUser(user,function(status){
			if(status){
				res.redirect('/home/moderator/profile');
				console.log('1');
			}else{
				res.redirect('/home/moderator/profile');
				console.log('2');
			}
		})
	}else{
			res.redirect('/home/moderator/profile');
			console.log('3');
		}

});


router.get('/moderator/seeUsers', (req, res)=>{

	userModel.getAllusers(function(results){
		users = results;
		//console.log(farmers);
	})
	user ={
		userName : req.cookies['user']
	}

	userModel.getInformation(user,function(results){
		res.render('user/moderator/seeUsers/seeUsers', {layout : './layouts/moderator-main',userInformation : results, farmerInformation : users});
	  });

})

router.get('/moderator/addModerator', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	userModel.getInformation(user, function(results){
		res.render('user/moderator/addUser/addModerator', {layout : './layouts/moderator-main', userInformation : results});
	  });

})


router.get('/moderator/addUser', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	userModel.getInformation(user,function(results){
		res.render('user/moderator/addUser/addUser', {layout : './layouts/moderator-main', userInformation : results});
	});
})

router.post('/moderator/addUser', (req, res)=>{

	if(req.body.password == req.body.repassword){
		password = req.body.password
		//console.log(req.body.firstName+' '+req.body.lastName);
	}else{
		password = null;
	}

	if(password != null){
		newUser = {
			'name' 	   	: req.body.firstName+' '+req.body.lastName,
			'email'    	: req.body.email,
			'DOB'		: req.body.DOB,
			'mobileNo'	: req.body.mobileNo,
			'userName' 	: req.body.userName,
			'password' 	: req.body.password,
			'userType' 	: 'user'
		}
		userModel.createUser(newUser,function(status){
			if(status){
				res.redirect('/home/moderator/seeUsers');
			}else{
				res.redirect('/home/moderator/addUser');
			}
		})
	}else{
			res.redirect('/home/moderator/addUser');
		}

})








router.post('/moderator/customizeUser/delete/:userName', (req, res)=>{

	user = {
		userName 	: req.params.userName,
	}

	//console.log(user.userName);

	userModel.deleteUser(user, function(status){
		if(status){
			res.redirect('/home/moderator/customizeUser');
		}else{
			res.redirect('/home/moderator/customizeUser/delete/'+user.userName+'');
		}
	})
})

router.get('/moderator/customizeUser', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	userModel.getAllusers(function(results){
		users = results;
		// console.log(farmers);
	})

	userModel.getInformation(user, function(results){
		res.render('user/moderator/customize/customizeUser', {layout : './layouts/moderator-main', userInformation : results, farmerInformation : users});
	  });
})

router.get('/moderator/customizeFarmer/edit/:userName', (req, res)=>{

	var user = req.params.userName;

	user ={
		userName : req.cookies['user']
	}

	userModel.getUser(user, function(results){
		farmer = results;
	})

	userModel.getInformation(user,function(results){
		res.render('user/moderator/customize/edit/editUser', {layout : './layouts/moderator-main', userInformation : results, farmerInformation : user});
	  });
	  
})

router.post('/moderator/customizeUser/edit/:userName', (req, res)=>{

	user = {
		name   		: req.body.name,
		userName 	: req.params.userName,
		email		: req.body.email,
		DOB			: req.body.DOB,
		mobileNo	: req.body.mobileNo
	}

	console.log(req.body.name);

	userModel.editFarmer(user, function(status){
		if(status){
			res.redirect('/home/moderator/customizeUser');
		}else{
			res.redirect('/moderator/customizeUser/edit/"'+user.userName+'"');
		}
	})
})

router.get('/moderator/addProduct', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	userModel.getAllcategories(function(result){
		categories = result;
})

	userModel.getInformation(user, function(results){
		res.render('user/moderator/addProduct', {layout : './layouts/moderator-main', userInformation : results, categoryInformation : categories});
	  });
})

router.post('/moderator/addProduct', (req, res)=>{

	if(req.body.category != 'Select Category'){
		newProduct = {
			'productName'	: req.body.productName,
			'description'   : req.body.description,
			'category'		: req.body.category,
			'expDate'		: req.body.expDate,
			'quantity' 		: req.body.quantity,
			'price' 		: req.body.price,
			'image' 		: req.files.productImage.name
		}

		var file = req.files.productImage;

	file.mv('./assets/img/'+file.name, function(error){
		
		if(error == null){
			userModel.createProduct(newProduct,function(status){
				if(status){
					res.redirect('/home/moderator');
				}else{
					res.redirect('/home/moderator/addProduct');
				}
			})
		}else{
			res.redirect('/home/moderator/addProduct');
		}
	});

	}else{
			res.redirect('/home/moderator/addProduct');
	}
})

router.get('/moderator/customizeProducts', (req, res)=>{
	userModel.getAllproducts(function(results){
		products = results;
	})
	user ={
		userName : req.cookies['user']
	}
	
	userModel.getInformation(user, function(results){
		res.render('user/moderator/customizeProducts/customizeProducts', {layout : './layouts/moderator-main',userInformation : results, productInformation : products});
	});
})

router.get('/moderator/editProduct/:productId', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	productId = req.params.productId;

	userModel.getAllcategories(function(result){
		categories = result;
    })

	userModel.getProduct(productId , function(results){
		product = results;
		console.log(results[0].id);
	})

	userModel.getInformation(user, function(results){
		res.render('user/moderator/customizeProducts/editProduct', {layout : './layouts/moderator-main', userInformation : results, categoryInformation : categories, productInformation : product});
	  });

})

router.post('/moderator/editProduct/:productId', (req, res)=>{

	if(req.body.category != 'Select Category'){
		product = {
			'id'			:req.params.productId,
			'productName'	: req.body.productName,
			'description'   : req.body.description,
			'category'		: req.body.category,
			'expDate'		: req.body.expDate,
			'quantity' 		: req.body.quantity,
			'price' 		: req.body.price,
		}


		userModel.editProduct(product,function(status){
			if(status){
				res.redirect('/home/moderator/customizeProducts');
			}else{
				res.redirect('/home/moderator/editProduct/:productId');
			}
		})
		}else{
			res.redirect('/home/moderator/addProduct/:productId');
		}

})

router.get('/moderator/deleteProduct/:productId', (req, res)=>{

	var id = req.params.productId;

	user ={
		userName : req.cookies['user']
	}

	userModel.getProduct(id, function(results){
		product = results;
	})

	userModel.getInformation(user,function(results){
		res.render('user/moderator/customizeProducts/deleteProduct', {layout : './layouts/moderator-main', userInformation : results, productInformation : product});
	  });
	  
})

router.post('/moderator/deleteProduct/:productId', (req, res)=>{

	product = {
		'id'			: req.params.productId,
	}

	//console.log(product);

	userModel.deleteProduct(product, function(status){
		if(status){
			res.redirect('/home/moderator/customizeProducts');
		}else{
			res.redirect('/home/moderator/deleteProduct/'+product.id+'');
		}
	})

})

router.get('/moderator/viewProduct/:productId', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	productId = req.params.productId;

	userModel.getAllcategories(function(result){
		categories = result;
    })

	userModel.getProduct(productId , function(results){
		product = results;
		console.log(results[0].id);
	})

	userModel.getInformation(user, function(results){
		res.render('user/moderator/customizeProducts/viewProduct', {layout : './layouts/moderator-main', userInformation : results, categoryInformation : categories, productInformation : product});
	  });

})

router.get('/moderator/addCategory', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}
	
	userModel.getInformation(user,function(results){
		res.render('user/moderator/addCategory', {layout : './layouts/moderator-main', userInformation : results});
	});
})

router.post('/moderator/addCategory', (req, res)=>{
	newCategory = {
		'name' 	   	: req.body.name
	}
	userModel.createCategory(newCategory,function(status){
		if(status){
			res.redirect('/home/moderator');
		}else{
			res.redirect('/home/moderator/addCategory');
		}
	})
})

router.get('/moderator/seeCategories', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}
	userModel.getAllcategories(function(result){
		category = result;
		//console.log(result);
	})

	userModel.getInformation(user, function(results){
		res.render('user/moderator/seeCategories', {layout : './layouts/moderator-main', userInformation : results, categoryInformation: category });
	  });

})

router.get('/moderator/editCategory/:catId', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	catId = req.params.catId;

	userModel.getCategory(catId,function(result){
		category = result;
		//console.log(category);
	})

	userModel.getInformation(user, function(results){
		res.render('user/moderator/customizeCategory/editCategory', {layout : './layouts/v-main', userInformation : results, catInformation : category});
	  });

})

router.post('/moderator/editCategory/:catId', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	category = {
		'id'		: req.params.catId,
		'catName' 	: req.body.name,
	}

	//console.log(catName);

	userModel.editCategory(category,function(status){
		if(status){
			res.redirect('/home/moderator/seeCategories');
		}else{
			res.redirect('/home/moderator/editCategory/:catId');
		}
	})

	

})

router.get('/moderator/deleteCategory/:catId', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	catId = req.params.catId;

	userModel.getCategory(catId,function(result){
		category = result;
		//console.log(category);
	})

	userModel.getInformation(user, function(results){
		res.render('user/moderator/customizeCategory/deleteCategory', {layout : './layouts/moderator-main', userInformation : results, catInformation : category});
	  });

})

router.post('/moderator/deleteCategory/:catId', (req, res)=>{

	user ={
		userName : req.cookies['user']
	}

	category = {
		'id'		: req.params.catId,
	}

	//console.log(catName);

	userModel.deleteCategory(category,function(status){
		if(status){
			res.redirect('/home/moderator/seeCategories');
		}else{
			res.redirect('/home/moderator/deleteCategory/:catId');
		}
	})

})









module.exports = router;