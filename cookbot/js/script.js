'use strict';
$(document).ready(function() {
	$.get("https://7x5anc9kic.execute-api.us-east-1.amazonaws.com/prod/RecipeUpdate?TableName=RecipesList", function(data, status) {
		var json = JSON.parse(JSON.stringify(data));
		var items = json.Items;
		var dict;
		if (items) { 
			for (var i = 0; i < items.length; i++) {
				dict = items[i];
				var eachRecipe = dict.RecipeName;
				eachRecipe = toTitleCase(eachRecipe);
				var recipeImage = dict.URL;
				var recipeID = eachRecipe.replace(/\s+/g, '_').toLowerCase();

				$('#recipeTable').append( //fix this formatting pls
					'<div class="col-xs-12 recipe-box"><div class="col-xs-12 col-sm-4 recipe-img"><img class="recipe-box-image" src="' + recipeImage + '"></div>' +
					'<div class="col-xs-12 col-sm-8 recipe-text"><div class="recipe-title">' + eachRecipe + '</div>' +
					'<div class="recipe-buttons"><form class="recipe-button" action="viewingreds.html"><img src="img/ingreds.svg">' +
					'<input type="hidden" name="varname" value="'+ recipeID +'"/><span><input type="submit" value="View Ingredients"></span></form>' +
					'<form id="view-recipe-button" class="recipe-button" action="viewrecipe.html"><img src="img/recipe.svg">' +
					'<input type="hidden" name="varname" value="'+ recipeID +'"/><span><input type="submit" value="View Recipe"></span></form>' 
				); 
			}	
		}
	});

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
    		window.location = 'index.html?submit=success';
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

	var query = decodeURIComponent(window.location.search.split('=')[1]);
	checkSuccess(query); 

});

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function checkSuccess(success_str) {
	if(success_str === "success") {
		// alert("success is here");
		$(".success-box").css("display", "block");
	} else {
		$(".success-box").css("display", "none");
	}
}
/* Taken from http://stackoverflow.com/questions/4878756/javascript-how-to-capitalize-first-letter-of-each-word-like-a-2-word-city */