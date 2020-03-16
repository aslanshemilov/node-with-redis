//./app/routing.js

//const contentDisposition = require("content-disposition");
//var r = require("request").defaults({
//  json: true
//});

var await = require('await');
var async = require('async');
const redis = require("redis");
//var redisClient = redis.createClient(); //creates a new client
  /*
    By default, redis.createClient() will use 127.0.0.1 and 6379 as the hostname and port respectively. 
    If you have a different host/port you can supply them as following:
  */
 var redisport = 6379;
 var redishost = "192.168.1.211"; 
 var redisClient = redis.createClient(redisport, redishost);

 /*
    Now, you can perform some action once a connection has been established. 
    Basically, you just need to listen for "connect" events as shown below.
 */

 redisClient.on("connect", function() {
   console.log("Redis connected");
 });

//  redisClient.on("error", function() {
//    console.log("Error in Redis");
//  });

/* start routing here */
module.exports = function (app) {
    // home page route (http://localhost:8080)
    // load the index.ejs file
    app.get("/", (request, response) => {
        response.render('index', {
            title: 'Home Page',
            nav: [{
                Link: '/login',
                Text: 'Login',
                Class: ''
            }, {
                Link: '/admin',
                Text: 'Admin',
                Class: ''
            }]
        });
        // log each request to the console
        console.log(request.method, request.url);
        /*
        response.status(200).send(`
                <div>
                <h1>Todo List</h1>
                <ul>
                    <li style="text-decoration:line-through">Learn about Express routing</li>
                    <li style="text-decoration:line-through">Create my own routes</li>
                </ul>
                </div>
            `);
        */
    });

    // about page route (http://localhost:8080/about)
    app.get("/about", (request, response) => {
        response.render('about', {
            title: 'About Page',
            nav: [{
                Link: '/login',
                Text: 'Login',
                Class: ''
            }, {
                Link: '/admin',
                Text: 'Admin',
                Class: ''
            }]
        });
        //response.send("Hello World!");
    });
    //https://www.sitepoint.com/using-redis-node-js/
    var getAllRedisKeys = () => {
        /*
        var _keys = null;
        async.parallel({
            rediskeys: function(callback){
                redisClient.keys("*", function(e, keys) {
                  if (!e){
                        //_keys = keys;
                        callback("success", keys);
                    } else {
                        console.log(e);
                        callback(e, keys);
                  }                
                });
            }
        },
          function(error, data) {
            _keys["status"] = error;
            _keys["data"] = data;
          }
        );  
      return _keys;
      */

      /*
      return new Promise((fullfill, reject)=>{
        redisClient.keys("*", function(err, keys) {
            if (err) reject(err);
            else fullfill([message, keys]);

        });
      });
      */

        //const keys = await redisClient.collection.keys('*');
        //const values = await redisClient.collection.mget(keys);
        //return values

         return new Promise((resolve, reject) => {
           redisClient.keys("*", function(err, keys) {
             if (err){
                reject(err);
             } else {
                resolve(keys);
             }
           });
         });


    };

    app.get("/redis-keys", (req, res) => {
        /*
      var user = [
        {
          id: 1,
          name: "AS"
        },
        {
          id: 2,
          name: "AB"
        }
      ];
      */

      // simple logger for this router's requests
      console.log(
        "method: %s, url: %s, path: %s.",
        req.method,
        req.url,
        req.path
      );

      // Set header to force files to download
      //res.setHeader('Content-Type', "application/json; charset=utf-8");
      //res.setHeader('Content-Disposition', contentDisposition(path))
      //res.status(200).json(user);
      
      /*
      var jobs = [];
      redisClient.keys("*", function(err, keys) {
        if (err) return console.log(err);
        if (keys) {
          async.map(
            keys,
            function(key, cb) {
              redisClient.get(key, function(error, value) {
                if (error) return cb(error);
                var job = {};
                job["jobId"] = key;
                job["data"] = value;
                cb(null, job);
              });
            },
            function(error, results) {
              if (error) return console.log(error);
              console.log(results);
              res.json({ data: results });
            }
          );
        }
      });
      */
      var redisKeys = [];
      var countLoop = 0;

      redisClient.keys("*", function(e, keys) {
        if (e) console.log(e);
        //res.status(200).json({ data: keys, total: keys.length });
        
        // //keys.forEach(function(key) {
        //     //redisClient.get(key, function(err, value) {
        //         //console.log(value);
        //         // if (typeof value != "undefined"){
        //         //     console.log("key: %s, value: %s.", key, value);
        //         //     var obj = new Object(); //{};
        //         //     obj[count] = key;
        //         //     obj["value"] = value;
        //         //     redisKeys.push(obj);
        //         //     count = count + 1;
        //         // } 
        //     //});
        // //}); 
        
        // // for (var k in keys) {
        // //   if (keys.hasOwnProperty(k)) {
        // //     //console.log("Key is " + k + ", value is " + keys[k]);
        // //     countLoop++;
        // //     console.log(countLoop);
        // //   }
        // // }
        
        async.parallel({
            rediscall: function(callback) {
                for (var k in keys) {
                    if (keys.hasOwnProperty(k)) {
                        //console.log("Key is " + k + ", value is " + keys[k]);
                        //countLoop++;
                        //console.log(countLoop);
                        if (typeof keys[k] != "undefined") {
                          console.log("key: %s, value: %s.", k, keys[k]);
                          var obj = new Object(); //{};
                          obj[k] = keys[k];
                          //obj["value"] = keys[k];
                          redisKeys.push(obj);
                          countLoop++;
                        }
                    }
                }

        //         /*
        //         keys.forEach(function(key) {
        //             redisClient.get(key, function(error, value) {
        //               if (error) {
        //                 throw error;
        //               }

        //               //console.log(value);
        //               if (typeof value != "undefined") {
        //                 console.log("key: %s, value: %s.", key, value);
        //                 var obj = new Object(); //{};
        //                 obj[key] = key;
        //                 obj["value"] = value;
        //                 redisKeys.push(obj);
        //                 countLoop++;
        //               }
        //             });
        //         });
        //         */
                 
                callback(res.statusCode);
            }
          },
          function(error, data) {
            res.json({
             status: error,
             data: redisKeys,
             total: countLoop
            });
            /*
            res.render("about", {
              title: "Data Page",
              nav: [
                {
                  Link: "/login",
                  Text: "Login",
                  Class: ""
                },
                {
                  Link: "/admin",
                  Text: "Admin",
                  Class: ""
                }
              ],
              mayData: redisKeys
            });
            */

          }
        );

        
          
        
      }); //keys
      
      //res.status(200).json({ data: countLoop.toString() });


      
    });

    /*
    app.get("/jobs", function(req, res) {
      var jobs = [];
      redisClient.keys("*", function(err, keys) {
        if (err) return console.log(err);
        if (keys) {
          async.map(
            keys,
            function(key, cb) {
              redisClient.get(key, function(error, value) {
                if (error) return cb(error);
                var job = {};
                job["jobId"] = key;
                job["data"] = value;
                cb(null, job);
              });
            },
            function(error, results) {
              if (error) return console.log(error);
              console.log(results);
              res.json({ data: results });
            }
          );
        }
      });
    });
    */



};
/* end routing here */
