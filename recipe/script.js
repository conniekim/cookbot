'use strict';
$(document).ready(function() {
	var query = decodeURIComponent(window.location.search.split('=')[1]);
	if (query !== undefined) {
		$('header').text(query);
	} else {
		$("header").text("No recipe found");
	}
	$.get("https://7x5anc9kic.execute-api.us-east-1.amazonaws.com/prod/RecipeUpdate?TableName=RecipesList", function(data, status) {
		var json = JSON.parse(JSON.stringify(data));
		var items = json.Items;
		var dict;
		if (items) {
			for (var i = 0; i < items.length; i++) {
				dict = items[i];
				if (dict.RecipeName.toLowerCase() === query) {
					$('#upload-display').append("<img src="+dict.URL+">");
					var ingredients = dict.Ingredients;
					var directions = dict.Directions;
					var value;
					var step;
					for (var j = 0; j < ingredients.length; j++) {
						value = ingredients[j];
						$("#ingredients-display").append("<ul>"+ value + "</ul>");
					}
					for (var k = 0; k < directions.length; k++) {
						step = directions[k];
						$("#steps-display").append("<ul>"+ step + "</ul>");
					}
				}
			}
		} else {
			$("header").text("No recipe found");
		}
	});
});


