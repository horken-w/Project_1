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
		buildItem(val);
	})
}
function buildItem(item){
	$('#menulist').append('<li class="dd-item dd3-item" data-id="' + item.linklistid + '"><div class="dd-handle dd3-handle">Drag</div><div class="dd3-content" name="' + item.linklistid + '">' + item.name + '</div></li>')
}
