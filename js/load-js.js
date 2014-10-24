var LoadJs = function() {
	this.loaded 	= {};
	this.resolver 	= new $.Deferred();
};

LoadJs.prototype = {
	load: function()
	{
		var args 	= Array.prototype.slice.call(arguments, 0);
		var url 	= args.splice(0, 1);//1.Url
		var self 	= this;
		var prom 	= self.loadFile(url);
		if(args.length>0)
		{
			if(self.loaded[url])//if already loaded just go to the next script to load
			{
				self.load.apply(self, args);
			}
			else
			{
				prom.done(function(){
					self.load.apply(self, args);
				});
			}
		}
		else
		{
			prom.done(function(){
				self.resolver.resolve();//resolve 
				self.resolver 	= new $.Deferred();//and recreate the resolver
			});
		}
		return this.resolver;
		
	},
	loadFile: function(url)
	{
		var self 	= this;
		var fakeDef = new $.Deferred();
		if(self.loaded[url]!==undefined) 
		{
			console.log(url, 'loaded already');
			setTimeout(function(){
				fakeDef.resolve();	
			},200)
			
			return fakeDef.promise();
		}

	    // Adding the script tag to the head as suggested before
	    var head 	= document.getElementsByTagName('head')[0];
	    var script 	= document.createElement('script');
	    script.type = 'text/javascript';
	    script.src 	= url;

	    // Then bind the event to the callback function.
	    // There are several events for cross browser compatibility.
	    script.onreadystatechange = function(){
	    	self.loaded[url] = true;
	    	fakeDef.resolve();
	    };
	    script.onload = function(){
	    	self.loaded[url] = true;
	    	fakeDef.resolve();
	    };

	    // Fire the loading
	    head.appendChild(script);
	    
	    return fakeDef.promise();
	    
	    //we could use jquery getScript but this seems to hang the browser when Eval libraries that self-initialize them self
	    //the above approch seems to be more performant and robust
//		return $.ajax({ dataType: "script", async:true, cache: true, url: url, success: function(){ console.log('loaded script'); self.loaded[url] = true; }	});
	}
};
