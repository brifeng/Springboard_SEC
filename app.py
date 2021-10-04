from flask import Flask, request, render_template
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)

app.config['SECRET_KEY'] = 'chickenzarecool123'
debug = DebugToolbarExtension(app)

@app.route('/')
def home():
    return """
    <html>
        <body>
            <h1>Home Page</h1>
            <p>Welcome to my simple app</p>
            <a href='/hello'>Hi!</a>
            <a href='/goodbye'>Bye!</a>
        </body>
    </html>
    """
    
@app.route('/hello')
def say_hello():
    return render_template("hello.html")

@app.route('/goodbye')
def say_bye():
    return 'bye'

@app.route('/search')
def search():
    term = request.args["term"]
    return "search term: {term}"

@app.route('/post', methods=["POST"])
def post_demo():
    return "you made a post request"

@app.route('/post', methods=["GET"])
def get_demo():
    return 'you made a get request'