$(function(){
	$.ajax({
		url: 'menuJSON(userlist).json',
		type: 'post',
		datatype: 'json',
		success: setmenu
	})
	var updateOutput = function(e){
		console.log(e);
	    var list   = e.length ? e : $(e.target),
	        output = list.data('output');
	    if (window.JSON) {
	        output.html(window.JSON.stringify(list.nestable('serialize')));//, null, 2));
	    } else {
	        output.html('JSON browser support required for this demo.');
	    }
	};
	$('#menulistLeft').nestable({
		group: 1,
		maxDepth:0
	});
	$('#menulistRight').nestable({
		group: 1
	})

	$('input[type=button]').on('click', function(){
		updateOutput($('#menulistRight').data('output', $('#nestable-output')));
	});
})
function setmenu(jmenu){
	var list=$.parseJSON(jmenu);

	$.each(list.menuList, function(i, val){
		
		$('#menulistLeft').children().append(menuList(val));
	})
	if(list.userList.length <= 0)
		$('<div class="dd-empty"></div>').appendTo('#menulistRight');
	else{
		$.each(list.userList, function(i, val){
			$('#menulistRight').children().append(modelList(val));
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