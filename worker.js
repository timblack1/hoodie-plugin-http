/**
 * Hoodie plugin http-get
 * This is where you put your backend code.
 */
 
var http = require('http'),
    https = require('https')

function get(hoodie, db, task){
    var http_lib = http
    if (task.url.indexOf('https') === 0){
        // Switch to using https if necessary
        var http_lib = https
    }
    http_lib.get(task.url, function(res){
        var pageData = ''
        res.on('data', function(chunk){
            pageData += chunk
        })
        res.on('end', function(){
            // Check to see if we got a 404 response
		    if (res.statusCode == '404'){
				// If we got a 404, then notify the user this page doesn't exist
				task.status_code = '404'
                hoodie.task.error(db, task, '404 error');
			}else{
				// Write the contents of the html variable back to the database
                task.data = pageData
                hoodie.task.success(db, task);
			}
        })
    });
}


module.exports = function (hoodie, callback) {

    // setup task handlers
    hoodie.task.on('http-get:add', function (db, task) {
        get(hoodie, db, task);
    });
    // TODO: Flesh out these stubs
//     hoodie.task.on('http-put:add', function (db, task) {
//         put(hoodie, db, task);
//     });
//     hoodie.task.on('http-post:add', function (db, task) {
//         post(hoodie, db, task);
//     });
//     hoodie.task.on('http-delete:add', function (db, task) {
//         delete(hoodie, db, task);
//     });

    // plugin initialization complete
    callback();

};
