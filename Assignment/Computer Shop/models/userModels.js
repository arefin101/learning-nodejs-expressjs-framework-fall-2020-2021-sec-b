const db = require('./db');


module.exports ={

    
    createUser : function(newUser, callback){
        var sql = "insert into users values (' ', '"+newUser.name+"', '"+newUser.email+"', '"+newUser.DOB+"', '"+newUser.mobileNo+"', '"+newUser.userName+"', '"+newUser.password+"', '"+newUser.userType+"', '"+newUser.validity+"')";
        console.log(sql);
        db.execute(sql, function(status){
            callback(status);
        })
    },

    validate : function(user, callback){

        var sql = 'select * from users where email = "'+user.userName+'" or username = "'+user.userName+'" and password = "'+user.password+'" and validity = "valid" ';
        db.getResults(sql, function(results){
            if(results.length > 0){
                callback(true);
            }else{
                callback(false);
            }
        })
    },

    checkNotificationsManager : function(callback){
        var sql = "select * from notification where not userType = 'manager'";
        console.log(sql);
        db.getResults(sql, function(status){
            callback(status);
        })
    },

    sellerInvalid : function(sellerId, callback){
        var sql = "update users set validity = 'invalid' where id = '"+sellerId+"' ";
        console.log(sql);
        db.execute(sql, function(status){
            callback(status);
        })
    },

    sellerValid : function(sellerId, callback){
        var sql = "update users set validity = 'valid' where id = '"+sellerId+"' ";
        console.log(sql);
        db.execute(sql, function(status){
            callback(status);
        })
    },

    farmerInvalid : function(farmerId, callback){
        var sql = "update users set validity = 'invalid' where id = '"+farmerId+"' ";
        console.log(sql);
        db.execute(sql, function(status){
            callback(status);
        })
    },

    farmerValid : function(farmerId, callback){
        var sql = "update users set validity = 'valid' where id = '"+farmerId+"' ";
        console.log(sql);
        db.execute(sql, function(status){
            callback(status);
        })
    },

    leaveHistory : function(user, callback){
        var sql = 'select * from notification where name ="'+user.userName+'" ';
        db.getResults(sql, function(results){
            callback(results);
        })
    },

    getInformation : function(user, callback){
        var sql = 'select * from users where email = "'+user.userName+'" or userName ="'+user.userName+'" and validity = "valid"';
        db.getResults(sql, function(results){
            callback(results);
        })
    },

    getUserbyid : function(id, callback){
        var sql = 'select * from users where id= "'+id+'"';
        db.getResults(sql, function(results){
            callback(results);
        })
    },


    getAllmoderators : function(callback){
        var sql = 'select * from users where userType = "moderator"';
        db.getResults(sql, function(results){
            callback(results);
        })
    },

    getAllusers : function(callback){
        var sql = 'select * from users where userType = "user"';
        db.getResults(sql, function(results){
            callback(results);
        })
    },

    createProduct : function(newProduct, callback){
        var sql = "insert into products values (' ', '"+newProduct.productName+"', '"+newProduct.category+"', '"+newProduct.price+"', '"+newProduct.quantity+"', '"+newProduct.expDate+"', '"+newProduct.description+"', '"+newProduct.image+"')";
        db.execute(sql, function(status){
            callback(status);
        })
    },

    getAllproducts : function(callback){
        var sql = 'select * from products';
        db.getResults(sql, function(results){
            callback(results);
        })
    },

    getProduct : function(productId, callback){
        var sql = 'select * from products where id = "'+productId+'" ';
        db.getResults(sql, function(results){
            callback(results);
        })
    },

    createCategory : function(newCategory, callback){
        var sql = "insert into categories values (' ', '"+newCategory.name+"')";
        db.execute(sql, function(status){
            callback(status);
        })
    },

    editCategory : function(category, callback){
        var sql = "update categories set catName = '"+category.catName+"' where id = '"+category.id+"'"
        db.execute(sql, function(status){
            callback(status);
        })
    },

    deleteCategory : function(category, callback){
        var sql = "delete from categories where id = '"+category.id+"'"
        db.execute(sql, function(status){
            callback(status);
        })
    },

    getAllcategories : function(callback){
        var sql = 'select * from categories';
        db.getResults(sql, function(results){
            callback(results);
        })
    },

    getProduct : function(pId, callback){
        var sql = 'select * from products where Id="'+pId+'"';
        db.getResults(sql, function(results){
            callback(results);
        })
    },

    getCategory : function(catId, callback){
        var sql = 'select * from categories where id="'+catId+'"';
        db.getResults(sql, function(results){
            callback(results);
        })
    },

    getManager : function(userName, callback){
        var sql = 'select * from users where username = "'+userName+'" and userType = "manager"';
        db.getResults(sql, function(results){
            callback(results);
        })
    },
    getModerator : function(userName, callback){
        var sql = 'select * from users where username = "'+userName+'" and userType = "moderator"';
        db.getResults(sql, function(results){
            callback(results);
        })
    },

    getUser : function(userName, callback){
        var sql = 'select * from users where username = "'+userName+'" and userType = "user"';
        db.getResults(sql, function(results){
            callback(results);
        })
    },

    editUser : function(user, callback){
        var sql = "update users set name = '"+user.name+"', email = '"+user.email+"', DOB = '"+user.DOB+"', mobileNo = '"+user.mobileNo+"', password = '' where userName = '"+user.userName+"'"
        db.execute(sql, function(status){
            callback(status);
        })
    },

    editManager : function(user, callback){
        var sql = "update users set name = '"+user.name+"', email = '"+user.email+"', DOB = '"+user.DOB+"', mobileNo = '"+user.mobileNo+"' where userName = '"+user.userName+"' and userType ='manager' "
        db.execute(sql, function(status){
            callback(status);
        })
    },

    editModerator : function(user, callback){
        var sql = "update users set name = '"+user.name+"', email = '"+user.email+"', DOB = '"+user.DOB+"', mobileNo = '"+user.mobileNo+"' where userName = '"+user.userName+"' and userType ='moderator' "
        db.execute(sql, function(status){
            callback(status);
        })
    },

    editUser : function(user, callback){
        var sql = "update users set name = '"+user.name+"', email = '"+user.email+"', DOB = '"+user.DOB+"', mobileNo = '"+user.mobileNo+"' where userName = '"+user.userName+"' and userType ='user' "
        db.execute(sql, function(status){
            callback(status);
        })
    },

    editProduct : function(product, callback){
        var sql = "update products set productName = '"+product.productName+"', description = '"+product.description+"', category = '"+product.category+"', price = '"+product.price+"', quantity = '"+product.quantity+"', expDate = '"+product.expDate+"' where Id = '"+product.id+"' ";
        db.execute(sql, function(status){
            console.log(status);
            callback(status);
        })
    },

    deleteProduct : function(product, callback){
        var sql = "delete from products where id ='"+product.id+"'"
        db.execute(sql, function(status){
            callback(status);
        })
    },

    deleteManager : function(user, callback){
        var sql = "delete from users where userName = '"+user.userName+"' and userType = 'manager' ";
        db.execute(sql, function(status){
            callback(status);
        })
    },

    deleteModerator : function(user, callback){
        var sql = "delete from users where userName = '"+user.userName+"' and userType = 'Moderator'";
        db.execute(sql, function(status){
            callback(status);
        })
    },

    deleteUser : function(user, callback){
        var sql = "delete from users where userName = '"+user.userName+"' and userType = 'user'";
        db.execute(sql, function(status){
            callback(status);
        })
    },

    // validity : function(user, callback){
    //      var sql = "update users set validity = 'invalid' where userName = '"+user.userName+"' "
    //     db.execute(sql, function(status){
    //         callback(status);
    //     })
    // },

    ////////////////////////

    getUsers : function(callback){
        var sql = 'select * from user';
        db.getResults(sql, function(results){
            callback(results);
        })
    },

    getUser : function(user, callback){
        var sql = 'select * from user where uname = "'+user+'"';
        db.getResults(sql, function(results){
            callback(results);
        })
    },

    deleteUser : function(user, callback){
        var sql = "delete from user where uname ='"+user+"'"
        db.execute(sql, function(status){
            callback(status);
        })
    },

    sendRequest : function(userNotification,callback){
        var sql = "insert into notification values (' ', '"+userNotification.description+"', '"+userNotification.notificationType+"', '"+userNotification.name+"', '"+userNotification.userType+"', '"+userNotification.approval+"' )";
        console.log(sql);
        db.execute(sql, function(status){
            callback(status);
            console.log(status);
        })
    },

    getNotifications : function(callback){
        var sql = 'select * from notification';
        db.getResults(sql, function(results){
            callback(results);
        })
    },

    productInfo : function(callback){
        var sql = 'select * from products'
        db.getResults(sql, function(results){
            callback(results);
        })
    }

}