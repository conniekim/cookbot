$(document).ready(function() {
	read_database();

	var ingredients_max_field = 20;
	var steps_max_field = 15;
	var ingredients_wrapper = $("#ingredients-list");
	var steps_wrapper = $("#steps-list");
	var add_ingredients_btn = $("#add-more-ingredients");
	var add_steps_btn = $("#add-more-steps");
	var x = 5; 
	var y = 3;
	$(add_ingredients_btn).click(function(e){
		e.preventDefault();
		if (x < ingredients_max_field) {
			x+=2;
			$(ingredients_wrapper).append('<li><input type="text" name="ingredient"></li>'+
			'<li><input type="text" name="ingredient"></li>'); 
			// appended under the form
		}
	});
	$(add_steps_btn).click(function(e) {
		e.preventDefault();
		if (y < steps_max_field) {
			y++;
			$(steps_wrapper).append('<li><input type="text" name="step"></li>');
		}
	});
	var all_recipe_boxes = document.getElementsByClassName('col-lg-12 recipe-box');
	var start_href = window.location.href;
	start_href = start_href.substring(0, start_href.lastIndexOf('/'));
	for (var i=0; i<all_recipe_boxes.length; i++) {
		var box = all_recipe_boxes[i];
		var box_button = $(box).find(".recipe-buttons");
		var title = $(box).find(".recipe-title").text();
		var titleURL = encodeURIComponent(title.toLowerCase());
		var ingredients_link = "/ingredients.html?query="+titleURL;
		var recipe_link = "/recipe.html?query="+titleURL;
		var recipe = $(box_button).find('#view-recipe-button');
		var root_form = $(box_button).find('form.recipe-button');
		var view_recipe = $(recipe).first('span').text();
		var view_ingredients = $(root_form).first('span').text();
		$(recipe).first('span').html('<span><a href='+start_href+recipe_link+">"+view_recipe+"</a></span>");
		$(root_form).first('span').html('<span><a href='+start_href+ingredients_link+">"+view_ingredients+"</a></span>");
	}
});

function read_database() {
	$.ajax({
	  url: "/readdatabase",
	  success: function (result, status) { 
	  	console.log("reached here");
	  	var recipes = result;
	  	for(var i = 0; i < recipes.length; i++) {
	  		$('#recipeTable').append(
				'<div class="col-lg-12 recipe-box"><div class="col-lg-4 recipe-img"><img src="http://placehold.it/200x150"></div>' +
				'<div class="col-lg-8 recipe-text"><div class="recipe-title">' + recipes[i]['RecipeName'] + '</div>' +
				'<div class="recipe-buttons"><form class="recipe-button"><img src="http://placehold.it/40x40"><span>View Ingredients</span></form>' +
				'<form id="view-recipe-button" class="recipe-button"><img src="http://placehold.it/40x40"><span>View Recipe</span></form></div></div></div>'
			); 
	  	}
	  },
	});
}

// function read_database() {
// 	$.ajax({
// 	  url: "/readdatabase",
// 	  success: function (result, status) { 
// 	  	console.log("reached here");
// 	  	var recipes = result;
// 	  	for(var i = 0; i < recipes.length; i++) {
// 	  		// $('#recipeTable').append('<tr><td> ' + recipes[i]['RecipeName'] + '</td><td>');
// 	  		$('#recipeTable').append('<div class="col-lg-12"> ' + recipes[i]['RecipeName'] + '</div>');
// 	  		// $('#recipeTable').append('<tr><td> ' + recipes[i]['Ingredients'] + '</td><td>');
// 	  		// $('#recipeTable').append('<tr><td> ' + recipes[i]['Directions'] + '</td><td>');
// 	  	}
// 	  },
// 	});
// }
