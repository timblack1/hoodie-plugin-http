# Hoodie Plugin HTTP

This is a Hoodie plugin which provides an interface to HTTP PUT, POST, GET, 
or DELETE data at any URL.

PLEASE NOTE that only the GET method is implemented at present.

## Example usage

```javascript
// Get HTML from URL and save it in a Backbone model
hoodie.task.start('http-get', { url: page_url }).done(function(task){
    // Save the data returned in task.data
    thiz.model.set('url_data', task.data)
    thiz.model.save()
}).fail(function(error){
    // Notify the user here that the URL was not correct, and returned a '404 page not found' error.
    thiz.notify_user_of_bad_url('Is that URL correct?  It returns a "404 page not found" error.  Please enter a valid URL.')
})
```

## Development notes

(Note that the rest of this README is just copied unmodified from the example Hoodie plugin template.)

It contains a Gruntfile with appropriate tasks for running jshint, unit tests
and browser tests against a Hoodie server.

You'll need to have phantomjs and grunt installed:

```
npm install -g phantomjs grunt-cli
```

## To run tests / linting

Install dev dependencies:

```
npm install
```

Then run the 'test' task

```
grunt test
```

You can also run `test:unit` or `test:browser` individually.

If your plugin depends on other plugins being present (usually it will at
least depend on the hoodie users plugin), then make sure they're included
in your devDependencies in package.json and listed in the hoodie.plugins
property. This way, they'll also get started when the browser tests are
run.

NOTE: When running the browser tests, the grunt tasks will remove the local
Hoodie 'data' directory completely so you get a clean database to test
against. Be careful you don't use this path for any data you may want to
keep!
