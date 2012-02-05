An easy way to get stuff from the Blipfoto API within a browser.

## Set up:

	<script src='BlipJS.js'></script>
	<script>
	var blip = new BlipJS('yourapikey');
	</script>

## Get the latest uploads

	blip.view('upload',function(entries){
		console.log(entries.length);			//=> 12 (the default)
	console.log(entries[0].title);				//=> 'the entry title'
	console.log(entries[0].permalink);			//=> 'http://www.blipfoto.com/entry/123456'
		});
	

## Perform a search

	blip.search('by joe',function(entries){
		console.log(entries.length);				//=> 12 (the default)
		});
	
## Get info about a specific entry

	blip.entry(123456,function(entry){
		console.log(entry.title);					//=> 12 'the entry title'
		});
	

##Do a custom request

	blip.get('somecustomresource',{
		params:['param1=value1', 'param2=value2'],
		complete:function(data){
			// yay :)
			}
		error:function(code, message){
			// aw :(
			}
		});