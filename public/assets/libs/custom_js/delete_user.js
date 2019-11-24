$(document).ready(function(){
	$('.delete-usr').on('click', function(e){
		$target = $(e.target);
		//console.log()
		//console.log($target.attr('data-id'))
		const id = $(this).find('i:first').attr('data-id')
		if(!id){
			console.log("no jalo")
			return;
		}else{
			//console.log(id);
			$.ajax({
				type : 'DELETE',
				url : '/usuario/' + id,
				success: function(res){
					//console.log(res);
					//$(e.target).parent().parent().parent().remove()
					$(e.target).closest( "tr" ).remove()
				}
			});
		}
	});
});