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

				$('#recipeTable').append(
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

	'use strict';
	var query = decodeURIComponent(window.location.search.split('=')[1]);
	$.get("https://7x5anc9kic.execute-api.us-east-1.amazonaws.com/prod/RecipeUpdate?TableName=RecipesList", function(data, status) {
		var json = JSON.parse(JSON.stringify(data));
		var items = json.Items;
		var dict;
		if (items) {
			for (var i = 0; i < items.length; i++) {
				dict = items[i];
				if (dict.RecipeName.toLowerCase() === query) {
					var ingredients = dict.Ingredients;
					var value;
					for (var j = 0; j < ingredients.length; j++) {
						value = ingredients[j];
						$("#list").append("<ul>"+ value + "</ul>");
					}
				}
			}
		} else {
			$("#list").append("<ul> No recipe found. </ul>");
		}
	});

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