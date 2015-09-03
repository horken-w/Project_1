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

	$.each(list, function(i, val){
		$('#menulist').append(menuList(val));
	})
}
function menuList(item){
	var buildmenu = '<li class="dd-item dd3-item" data-id="' + item.linklistid + '">';
		buildmenu += '<div class="dd-handle dd3-handle">DragHere</div><div class="dd3-content" name=" menu' + item.linklistid + '">' + item.name + '</div></li>';
		if(item.menu){
			$.each(item.menu, function(i, sub){
				buildmenu+= menuList(sub);
			})
		}
	return buildmenu;
}