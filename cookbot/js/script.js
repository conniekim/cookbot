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
				var recipeImage = dict.URL;
				var recipeID = eachRecipe.replace(/\s+/g, '_').toLowerCase();

				$('#recipeTable').append(
					'<div class="col-lg-12 recipe-box"><div class="col-lg-4 recipe-img"><img class="recipe-box-image" src="' + recipeImage + '"></div>' +
					'<div class="col-lg-8 recipe-text"><div class="recipe-title">' + eachRecipe + '</div>' +
					'<div class="recipe-buttons"><form class="recipe-button" action="viewingreds.html"><img src="http://placehold.it/40x40">' +
					'<input type="hidden" name="varname" value="'+ recipeID +'"/><span><input type="submit" value="View Ingredients"></span></form>' +
					'<form id="view-recipe-button" class="recipe-button" action="viewrecipe.html"><img src="http://placehold.it/40x40">' +
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

});
