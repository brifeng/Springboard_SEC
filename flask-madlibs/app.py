from flask import Flask, render_template, request
from stories import Story, story
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SECRET_KEY'] = 'chickenzarecool123'
debug = DebugToolbarExtension(app)


@app.route('/form')
def form():
    return render_template('form.html')


@app.route('/story/')
def show_story():
    answers = {
        'place': request.args.get('place'),
        'noun': request.args.get('noun'),
        'verb': request.args.get('verb'),
        'adjective': request.args.get('adjective'),
        'plural_noun': request.args.get('plural_noun'),
    }
    madlibs = story.generate(answers)
    return render_template('story.html', madlib = madlibs)
 