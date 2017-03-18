'use strict'; 
$(document).ready(function() {
	var query = decodeURIComponent(window.location.search.split('=')[1]);
	query = query.replace(/\_/g, " ");
	if (query !== undefined) {
		$('#title-content h1').text(toTitleCase(query)); 
	} else {
		$("#title-content h1").text("No recipe found"); 
	}
	$.get("https://7x5anc9kic.execute-api.us-east-1.amazonaws.com/prod/RecipeUpdate?TableName=RecipesList", function(data, status) {
		var json = JSON.parse(JSON.stringify(data));
		var items = json.Items;
		var dict; 
		if (items) { 
			for (var i = 0; i < items.length; i++) {
				dict = items[i];
				// var spacedQuery = query.replace(/\_/g, " ");
				// console.log("query: " + query);
				// console.log("recipename: " + dict.RecipeName.toLowerCase()); 
				if (dict.RecipeName.toLowerCase() === query) {
					$('#upload-content-container').append("<img src="+dict.URL+">");
					var ingredients = dict.Ingredients;
					var directions = dict.Directions;
					var value;
					var step;
					for (var j = 0; j < ingredients.length; j++) {
						value = ingredients[j];
						$("#ingredients form").append("<div class=&quot;col-xs-12&quot;><div>"+ value + "</div></div>");
					}
					for (var k = 0; k < directions.length; k++) {
						step = directions[k];
						$("#steps form").append("<div class=&quot;col-xs-12&quot;><div>"+ step + "</div></div>");
					}
				}
			}
		} else {
			$("#title-content h1").text("No recipe found");
		}
	});
});
 
function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}



