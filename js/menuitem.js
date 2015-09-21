function setmenu(jmenu){
	var lists=$.parseJSON(jmenu);
	console.log(lists);
	$.each(lists.menuList, function(i, val){
		menuList(val);
	})
	$('<div class="dd-empty"></div>').appendTo('#menulistRight');
}
function modelList(item){
	var buildmenu = '<li class="dd-item dd3-item" data-name="' + item.name + '" data-auth="' + item.viewable + '">';
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
function backendMenu(item){

}
function menuList(item){
	if(item.url=== undefined || item.url==''){
		var $li=$('<li></li>');
		$li.append($('<div></div>',{
			class: 'dd-handle dd3-handle',
			text: 'DragHere'
		})).append($('<div></div>',{
			class: 'dd3-content blue',
			name: 'menu '+ item.id,
			text: item.name
		})).addClass('dd-item dd3-item').attr('data-id', item.id).appendTo('#menulistLeft');
	}else{
		var $li=$('<li></li>');
		$li.append($('<div></div>',{
			class: 'dd-handle dd3-handle',
			text: 'DragHere'
		})).append($('<div></div>',{
			class: 'dd3-content skyblue',
			name: 'menu '+ item.id,
			text: item.name
		})).addClass('dd-item dd3-item dd-nonest').attr('data-id', item.id).appendTo('#menulistLeft');
	}
}
function setPermissions(e){
	 BootstrapDialog.show({
        title: '使用者權限設定',
        closable: false,
        message: $('<div></div>').load('../nestableList/permiss.html'),
        buttons: [{
            label: '送出',
            cssClass: 'btn-primary',
            hotkey: 13, // Enter.
            action: function(data) {
            	$(e.target).parent()
            	.attr({
            	    'data-viewable': $('input[name="view"]:checked').val(),
            	    'data-delable': $('input[name="del"]:checked').val(),
            	    'data-ediable': $('input[name="modify"]:checked').val()
            	 })
            	data.close();
            }
        }]
    });
}
$(function(){
	$.ajax({
		url: 'menuJSON.json',
		type: 'post',
		datatype: 'json',
		success: setmenu
	})
	var updateOutput = function(e){
	    var list   = e.length ? e : $(e.target),
	        output = list.data('output');
	    if (window.JSON) {
	        output.html(window.JSON.stringify(list.nestable('serialize')));//, null, 2));
	    } else {
	        output.html('JSON browser support required for this demo.');
	    }
	};
	$('#menulistLeft').nestable({
		group: 1
	});
	$('#menulistRight').nestable({
		group: 1
	})
	$('input[type=button]:first-child').on('click', function(){
		updateOutput($('#menulistRight').data('output', $('#nestable-output')));
	});
	$('#menulistRight').on('click','.skyblue', function(e){
		var permse=setPermissions(e);
	});
})