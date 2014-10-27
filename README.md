LoadJS
======

LoadJS is a small Javascript Library based on jQuery Deferred for loading Javascript files on demand, only when needed and with caching system. There are many  javascript libraries online but mostot them are limited on loading a single file . LoadJS has an unlimited number of parameters and loading is   not parallel.

## Why use LoadJs:
  - load javascript only when needed
  - Javascript is loaded only once, on further requests it will not reload any file
  - Make your web app render faster even on slow macchines
  - Load multiple javascript files with order and dependencies

## How to use:

First step just load jQuery.js (1.7>) and load-js.js:
  ```html
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
  <script src="/js/load-js.js</script>
  ```

Then just use it:
  ```js
  // create a global LoadJS object to use around your web app
  var loadjs = new LoadJS();
  
  //now use loadjs object to load javascript, 
  //example I need to load tinymce.js only when user opens an editor
  //the first time user open the editor this call will take some milliseconds
  loadjs.load('/tinymce/tinymce.min.js').done(function(){
    openEditor();
  });
  
  //if now the user reopen the editor, the done function will return immediately
  loadjs.load('/tinymce/tinymce.min.js').done(function(){
    openEditor();
  });
  ```
  
## Load multiple javascript with dependencies
  ```js
  // create a global LoadJS object to use around your web app
  var loadjs = new LoadJS();
  
  //We have the following situation
  //Library a.js 
  //Library b.js depends on a.js
  //Library c.js depends on b.js
  //We need to load this javascript only when needed and in this order: a.js -> b.js -> c.js
  loadjs.load('a.js','b.js','c.js').done(function(){
    startSomeFunction();
  });
  
  //if later I need only a.js in another context, this function will be called immediately
  loadjs.load('a.js').done(function(){
    anotherFunction();
  });
  ```
