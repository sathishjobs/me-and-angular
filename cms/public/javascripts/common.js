$(document).ready(function(){

$(".social_link_btn").click(function(){
	$("#social_link").modal("show");
	//alert("button clicked");
});

$(".faq_btn").click(function(){
	$("#faqe").modal("show");
});


$(".what_is_next_btn").click(function(){
	$("#what_is_next").modal("show");
});



//social link ajax part 
	$(".social_link_update").ajaxForm({

		dataType:'json',
		beforeSend:function()
		{
			//$(".aloader").show();
			
		},
		success:function(data)
		{
			if(data.type=='success')
			{
				
				$(".link_name").text(data.icon);
				$(".link_msg").show();
				setTimeout(function(){ 
					
					location.reload();
				}, 2000);

			}
			
		},

		complete:function(response)
		{
			//$(".aloader").hide();
			//alert(response.responseText);
			
		}

	});


//end social link ajax part



});