$(document).ready(function(){
	$('.delete-nna').on('click', function(e){
		$target = $(e.target);
		const id = $(this).find('i:first').attr('data-id')
		if(!id){
			console.log("no jalo")
			return;
		}else{
			console.log(id);
			$.ajax({
				type : 'DELETE',
				url : '/nna/' + id,
				success: function(res){
					$(e.target).closest( "tr" ).remove()
				}
			});
		}
	});
});