
const express 		 = require('express');
const expressLayouts = require('express-ejs-layouts')
const bodyPars 		 = require('body-parser');
const cookieParser 	 = require('cookie-parser');
const exSession 	 = require('express-session');
const exUpload 		 = require('express-fileupload');
const login 		 = require('./controller/login');
const home 			 = require('./controller/home');
const logout 		 = require('./controller/logout');
const app 			 = express();
const userModel 	 = require.main.require('./models/userModels');
const router 		 = express.Router();


app.set('view engine', 'ejs');

app.set('layout', './layouts/main');

app.use(exUpload());
app.use(expressLayouts);
app.use('/assets', express.static('assets'));

app.use(bodyPars.urlencoded({extended : false}));
app.use(exSession({secret : 'my secret value', saveUninitialized : true, resave : false}));
app.use(cookieParser());

app.use('/login', login);
app.use('/home', home);
app.use('/logout', logout);


app.get('/', (req, res)=>{
	res.render('/user/farmer/landing-Page/index');
})

app.get('/landing', (req,res)=>{

	
	userModel.productInfo(function(results){
		productInfo = results;
		//console.log(results);
	})
	res.render('landingPage', {product : productInfo});
})

app.get('/products/:productId', (req,res)=>{

	var id = req.params.productId;

	userModel.getProduct(id, function(results){
		product = results;
	})
	res.render('products', {product : product});
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server starts at ${PORT}`));