$(document).ready(function(){

	$('#campo_op').fadeOut(0);
	$('#data-type').fadeOut(0);
	$('#dato-cte').fadeOut(0);

	$("input[name='type_field']").change(function(){
		//console.log(this.value)
		if(this.value == "es_abierta"){
			$("#data-type").slideDown()
			$("#campo_op").slideUp()
			$("#dato-cte").slideUp()
		}else if(this.value == "es_cerrada" || this.value == "es_multi"){
			$("#campo_op").slideDown()
			$("#data-type").slideUp();
			$("#dato-cte").slideUp()
		}else if(this.value == "es_cte"){
			$("#dato-cte").slideDown()
			$("#data-type").slideUp();
			$("#campo_op").slideUp()
		}else{
			$("#data-type").slideUp();
			$("#campo_op").slideUp()
			$("#dato-cte").slideUp()
		}
	});


	$('.delete-p').on('click', function(e){
		$target = $(e.target);
		const id = $(this).find('i:first').attr('data-id')
		if(!id){
			console.log("no jalo")
			return;
		}else{
			//console.log(id);
			$.ajax({
				type : 'DELETE',
				url : '/plantilla/' + id,
				success: function(res){
					//console.log(res);
					$(e.target).closest( "tr" ).remove()
				}
			});
		}
	});

	$('.delete-field').on('click', function(e){
		$target = $(e.target);
		const id = $(this).find('i:first').attr('data-id')
		if(!id){
			console.log("no jalo")
			return;
		}else{
			$.ajax({
				type : 'DELETE',
				url : '/plantilla/campo/' + id,
				success: function(res){
					//console.log(res);
					$(e.target).closest( "tr" ).remove()
				}
			});
		}
	});

});