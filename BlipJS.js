/*****

BlipJS v1.0

A dead-simple, client-side way to grab info via the Blipfoto API.

Copyright 2011 Graham Bradley
This work is licensed under a Creative Commons Attribution-Noncommercial 3.0
Unported License (http://creativecommons.org/licenses/by-nc/3.0/).

*****/

(function(G, D){

	var name = 'BlipJS', 
		me = function(key, conf){
			this.key = key;
			this.conf = conf || {
				baseURL : 'http://api.blipfoto.com/',
				version : 2,
				test : 0
				};
				
			this._requestID = 0;
			};
	
	me._sendRequest = function(requestID, url, opt){
		var script = D.createElement('script'),
			id = name+requestID;
			
		me._requestCache[id] = function(json){
			delScript = D.getElementById(id);
			if (delScript){
				delScript.parentNode.removeChild(delScript);
				}
			delete me._requestCache[id];
			
			if (json.error && json.error.code){
				if (opt.error){
					opt.error(json.error);
					}
				}
			else if (opt.complete){
				opt.complete(json.data);
				}
			};

		script.id = id;
		script.src = url+'&callback='+name+'._requestCache["'+id+'"]';
		D.getElementsByTagName('head')[0].appendChild(script);
		};
		
	me._requestCache = {};
		
	me.prototype = {
		get : function(resource, opt){
			return this._request('get', resource, opt);
			},
			
		search : function(query, callback, max){
			return this._request('get', 'search', {
				params : ['max='+(max || 12), 'query='+encodeURIComponent(query)],
				complete : callback
				});
			},
			
		view : function(view, callback, max){
			return this._request('get', 'view', {
				params:['max='+(max || 12), 'view='+view],
				complete : callback
				});
			},
			
		entry : function(which, callback, what){
			return this._request('get', 'entry', {
				params:[(typeof which == 'number' ? 'entry_id=' : 'entry_date=latest&display_name=')+which, 'data='+((what || ['display_name','journal_title','entry_id','date','title','image']).join(','))],
				complete : function(data){
					callback(data[0]);
					}
				});
			},
			
		_request : function(method, resource, opt){
		
			var opt = opt || {},
				url = this.conf.baseURL+method+'/'+resource+'/?'+this._getDefaultParams().concat(opt.params || []).join('&');
			
			me._sendRequest(this._requestID++, url, opt);
			},
			
		_getDefaultParams : function(){
			
			var params = ['api_key='+this.key, 'version='+this.conf.version, 'nohttperror=1',  'format=JSON'];
				
			if (this.test){
				params.push('test=1');
				}
			
			return params;
			}
		};
		
	G[name] = me;

	})(window, document);