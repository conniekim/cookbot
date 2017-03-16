$(document).ready(function() {
    $("#save").click(function() {
    	var theUrl = "https://7x5anc9kic.execute-api.us-east-1.amazonaws.com/prod/RecipeUpdate?TableName=RecipesList"; 
    	
    	var title = $("input[name='title']").val(); 
    	var imageURL = $("input[name='url']").val(); 
        if(!imageURL) {
            imageURL = "http://placehold.it/200x150";
        }

    	var ingreds = [];
		$("input[name='ingredient']").each(function() {
		    var value = $(this).val();
		    if(value) {
		    	ingreds.push(value);
			}
		});

    	var steps = [];
		$("input[name='step']").each(function() {
		    var stepValue = $(this).val();
		    if(stepValue) {
		    	steps.push(stepValue);
			}
		});

		// console.log(title);
		// console.log(imageURL);
		// console.log(ingreds);
		// console.log(steps);

    	$.post(theUrl, JSON.stringify({
            "type": "POST", 
            "data": {
                "TableName": "RecipesList",
                //New item information to be posted 
                "Item": {
                    "RecipeName" : title, 
                    "Directions" : steps,
                    "Ingredients" : ingreds,
                    "URL" : imageURL
                }
            }
        }), 
        function(data, status){
    		alert(status);
    	})
    });

	var ingredients_max_field = 20;
	var steps_max_field = 15;
	var ingredients_wrapper = $(".ingredients-form");
	var steps_wrapper = $(".steps-form");
	var add_ingredients_btn = $("#add-more-ingredients");
	var add_steps_btn = $("#add-more-steps");
	var x = 5; 
	var y = 3;
	$(add_ingredients_btn).click(function(e){
		e.preventDefault();
		if (x < ingredients_max_field) {
			x++;
			$(ingredients_wrapper).append('<div class="col-xs-12"><input type="text" name="ingredient" class="col-xs-12"></div>');
		}
	});
	$(add_steps_btn).click(function(e) {
		e.preventDefault();
		if (y < steps_max_field) {
			y++;
			$(steps_wrapper).append('<div class="col-xs-12"><input type="text" name="step" class="col-xs-12"></div>');
		}
	});
});