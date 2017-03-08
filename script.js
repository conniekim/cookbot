$(document).ready(function() {
	var ingredients_max_field = 20;
	var steps_max_field = 15;
	var ingredients_wrapper = $("#ingredients");
	var steps_wrapper = $("#steps");
	var add_ingredients_btn = $("#add-more-ingredients");
	var add_steps_btn = $("#add-more-steps");
	var x = 5; 
	var y = 3;
	$(add_ingredients_btn).click(function(e){
		e.preventDefault();
		if (x < ingredients_max_field) {
			x+=2;
			$(ingredients_wrapper).append('<ul><input type="text" name="ingredient"></ul>'+
			'<ul><input type="text" name="ingredient"></ul>');
		}
	});
	$(add_steps_btn).click(function(e) {
		e.preventDefault();
		if (y < steps_max_field) {
			y++;
			$(steps_wrapper).append('<ul><input type="text" name="step"></ul>');
		}
	});
});