from boto.dynamodb2.fields import HashKey
from boto.dynamodb2.table import Table
 
from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_dynamo import Dynamo

app = Flask(__name__)

app.config['DYNAMO_TABLES'] = [
    Table('RecipesList', schema=[HashKey('RecipeName')]),
]

dynamo = Dynamo(app)

# recipes = Table('Recipes')
recipes = Table('RecipesList')

@app.route("/inputdatabase", methods=['POST'])
def input_to_database():
	inputData = request.form["input"]
	recipes.put_item(data={
		'RecipeName': inputData,
		'Ingredients': ['Bacon', 'Eggs'],
		'Directions': ['Fry bacon on pan', 'Use fats from bacon to fry eggs', 'Mix bacon and eggs together', 'Top with ketchup']
	})
	return redirect(url_for('home')) #redirects to the route for the function home

# #how to get the recipe outputted as json on page hehe 
# @app.route("/inputrecipe", methods=['POST'])
# def input_recipe(): 
# 	recipeList = []
# 	title = request.form['title']
# 	ingredsList = request.form.getlist('ingredient')
# 	stepsList = request.form.getlist('step')
# 	recipeInfo = {
# 		'RecipeName': title,
# 		'Ingredients': ingredsList,
# 		'Directions': stepsList
# 	}
# 	recipeList.append(recipeInfo)
# 	return jsonify(recipeList)

@app.route("/inputrecipe", methods=['POST'])
def input_recipe(): 
	title = request.form['title']
	ingreds = request.form.getlist('ingredient')
	steps = request.form.getlist('step')

	ingredsList = []
	stepsList = []
	for each in ingreds: 
		if each:
			ingredsList.append(each)
	for each in steps: 
		if each:
			stepsList.append(each)

	recipes.put_item(data= {
			'RecipeName': title,
			'Ingredients': ingredsList,
			'Directions': stepsList
		})
	return redirect(url_for('home'))


@app.route("/readdatabase")
def read_from_database():
	results = recipes.scan()
	dataset = []
	for each in results:
		recipeInfo = {
			'RecipeName': each['RecipeName'],
			'Ingredients': each['Ingredients'],
			'Directions': each['Directions']
		}
		dataset.append(recipeInfo)
	return jsonify(dataset)

# @app.route("/")
# def hello():
#     return "Hello World!"
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/addrecipe')
def addRecipe():
	return render_template('addrecipe.html')

if __name__ == "__main__":
    app.run()