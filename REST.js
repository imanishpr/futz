var mysql = require("mysql");
var bodyParser  = require("body-parser");
function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection,md5) {
    router.get("/",function(req,res){
        res.json({"Message" : "Hello World !"});
    });

    router.get("/users",function(req,res){
        var query = "SELECT * FROM ??";
        var table = ["userinfo"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Users" : rows});
            }
        });
});

    router.get("/user-interests/:user_id",function(req,res){
        var query = "select * from ?? as a join ?? as b on a.instid=b.instid where ??=?";
        var table = ["interests_list","interests","userid",req.params.user_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "interests" : rows});
            }
        });
    });
    router.get("/user-other-interests/:user_id",function(req,res){
        var query = "select * from ?? where ??=?";
        var table = ["other_interest","userid",req.params.user_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Users" : rows});
            }
        });
    });
    router.post("/add-interest",function(req,res){
        var query = "INSERT INTO ?? VALUES (?,?)";
        var table = ["interests_list"," ",req.body.interest];
        query = mysql.format(query,table);
        console.log(query);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Interest Added !"});
            }
        });
    });
    router.delete("/del-user-interest/",function(req,res){
        var query = "DELETE from ?? WHERE ??=? AND  ??=?";
        var table = ["interests","userid",req.body.userid,"instid",req.body.instid];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Deleted the interest of user"});
            }
        });
    });

    router.post("/add-user-interest",function(req,res){
        var query = "INSERT INTO ?? VALUES (?,?)";
        var table = ["interests", req.body.userid, req.body.instid];
        query = mysql.format(query,table);
        console.log(query);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Interest Added to user!"+ req.body.userid});
            }
        });
    });
    router.post("/add-other-user-interest",function(req,res){
        var query = "INSERT INTO ?? VALUES (?,?)";
        var table = ["other_interest", req.body.userid, req.body.oinst];
        query = mysql.format(query,table);
        console.log(query);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Interest Added to user!"+ req.body.userid});
            }
        });
    });
    router.delete("/del-user-o-interest/",function(req,res){
        var query = "DELETE from ?? WHERE ??=? AND  ??=?";
        var table = ["other_interest","userid",req.body.userid,"ointerest",req.body.oinst];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Deleted the o-interest of user"});
            }
        });
    });
}


module.exports = REST_ROUTER;