function setmenu(jmenu){
	var list=$.parseJSON(jmenu);

	$.each(list.menuList, function(i, val){
		
		$('#menulistLeft').append(menuList(val));
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

function menuList(item){
	var buildmenu = '<li class="dd-item dd3-item dd-nonest" data-name="' + item.name + '" data-auth="' + item.viewable + '">';
		buildmenu += '<div class="dd-handle dd3-handle">DragHere</div><div class="dd3-content" name=" menu' + item.linklistid + '">' + item.name + '</div></li>';
		if(item.menu){
			$.each(item.menu, function(i, sub){
				buildmenu+= menuList(sub);
			})
		}
	return buildmenu;
}

function setPermissions(e){
	var p=123;
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
            	// $(this).attr({
            	// 	'data-viewable': e.view.val() 
            	// })
            	data.close();
            }
        }]
    });
}
$(function(){
	$.ajax({
		url: 'menuJSON(userlist).json',
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
		group: 1,
		maxDepth: 3
	})

var a;
	$('input[type=button]:first-child').on('click', function(){
		updateOutput($('#menulistRight').data('output', $('#nestable-output')));
	});
	$('#menulistRight').on('click','.dd3-content', function(e){
		var permse=setPermissions(e);
	});
})