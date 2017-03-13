'use strict';
$(document).ready(function() {
	var query = window.location.search.split('=')[1];
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
		}
	});
});
