$(function(){
	$.ajax({
		url: 'menuJSON.json',
		type: 'post',
		datatype: 'json',
		success: setmenu
	})
	$('#menulist').nestable({
		group: 1,
		maxDepth: 1
	});
		

})
function setmenu(jmenu){
	var list=$.parseJSON(jmenu);
	console.log(list);
	$.each(list, function(i, val){
		$('#menulist').append(buildItem(val));
	})
}
function buildItem(item){
	var menubuild=
	
}
