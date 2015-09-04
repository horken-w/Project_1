$(function(){
	$.ajax({
		url: 'menuJSON(userlist).json',
		type: 'post',
		datatype: 'json',
		success: setmenu
	})
	$('#menulistLeft').nestable({
		group: 1
	});
	$('#menulistRight').nestable({
		group: 1,
		maxDepth: 2
	});	
})
function setmenu(jmenu){
	var list=$.parseJSON(jmenu);

	$.each(list.menuList, function(i, val){
		var $menu=menuList(val)
		$('#menulistLeft').append($menu);
	})
	if(list.userList.length <= 0)
		$('<div class="dd-empty"></div>').appendTo('#menulistRight');
	else{
		$.each(list.userList, function(i, val){
			$('#menulistRight').append('<ol class="dd-list">'+modelList(val)+'</ol>');
		})
	}
}
function modelList(item){
	var buildmenu = '<li class="dd-item dd3-item" data-id="' + item.linklistid + '">';
		buildmenu += '<div class="dd-handle dd3-handle">DragHere</div><div class="dd3-content" name=" menu' + item.linklistid + '">' + item.name + '</div>';
		if(item.menu && item.menu.length>0){
			buildmenu+='<ol class="dd-list">';
			$.each(item.menu, function(i, sub){
				buildmenu+= modelList(sub);
			});
			buildmenu+='</ol>'
			console.log(item.menu)
		}
	buildmenu+='</li>'
	return buildmenu;
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