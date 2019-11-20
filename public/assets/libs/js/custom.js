$(document).ready(function(){
	$('.delete-usr').on('click', function(e){
		$target = $(e.target);
		const id = $target.attr('data-id');
		//const role = $('#role').attr('data-role');
		if(!id){
			//location.reload();
			return;
		}
		else{
			console.log(id);
		}

		$.ajax({
			type : 'DELETE',
			url : '/usuario/' + id,
			success: function(res){
				//console.log(res);
				$(e.target).parent().parent().parent().remove()
			}
		});
	});
});