const db = require('./db');

module.exports ={

    validate : function(user, callback){
        var sql = 'select * from user where uname = "'+user.uname+'" and pass = "'+user.pass+'"';
        db.getResults(sql, function(results){
            if(results.length > 0){
                callback(true);
            }else{
                callback(false);
            }
        })
    },

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

    createUser : function(newUser, callback){
        var sql = "insert into user values ('"+newUser.uname+"', '"+newUser.email+"', '"+newUser.pass+"', '"+newUser.dept+"')";
        db.execute(sql, function(status){
            callback(status);
        })
    },

    editUser : function(user, callback){
        var sql = "update user set email ='"+user.email+"', pass ='"+user.pass+"', dept ='"+user.dept+"' where uname ='"+user.uname+"'"
        db.execute(sql, function(status){
            callback(status);
        })
    },

    deleteUser : function(user, callback){
        var sql = "delete from user where uname ='"+user+"'"
        db.execute(sql, function(status){
            callback(status);
        })
    }

}