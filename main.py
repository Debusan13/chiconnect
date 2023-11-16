from flask import Flask, render_template, request, jsonify, url_for, redirect
import os

API_KEY = os.environ.get('API_KEY')
app = Flask(__name__)

app = Flask(__name__)

app.jinja_env.variable_start_string = '[['
app.jinja_env.variable_end_string = ']]'

# @app.route("/review", methods=['GET'])
# def review_page():
#     return render_template("review.html")

@app.route("/review", methods=['GET'])
def review():
    businessName = request.args.get('businessName')
    print(f'QUERY IN REVIEW: {businessName}')
    # return render_template("review.html", api_key=API_KEY, Name=businessName)

@app.route("/search", methods=['GET', 'POST'])
def search():
    query = request.args.get('query')
    print(f'user searched for: {query}')
    if request.method == 'POST':
        businessName = request.form.get('businessName', '')
        # query = request.form.get('searchQuery', '')
        return redirect(url_for('review', businessName=businessName))
    return render_template("search.html", api_key=API_KEY, query=query)

# @app.route("/search/<input>", methods=['GET'])
# def search

@app.route("/", methods=['GET', 'POST'])
def home_page():
    if request.method == 'POST':
        query = request.form.get('searchQuery', '')
        # name = request.form.get('searchQueryName', '')
        # Here you would typically process the search_query.
        # For now, we're just passing it back to the template.
        return redirect(url_for('search', query=query))

        # return render_template("index.html", api_key=API_KEY, search_query=search_query)
    return render_template("index.html", api_key=API_KEY)

# @app.route(".")

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
