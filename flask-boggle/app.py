from boggle import Boggle
from flask import Flask, render_template, session, jsonify
from flask_debugtoolbar import DebugToolbarExtension

boggle_game = Boggle()

app = Flask(__name__)
app.config['SECRET_KEY'] = 'chickenzarecool123'
debug = DebugToolbarExtension(app)


@app.route('/')
def home():
    session['board'] = boggle_game.make_board()
    if not 'times-played' in session:
        session['times-played'] = 0
    if not 'high-score' in session:
        session['high-score'] = 0
    return render_template('home.html',
                           board=session['board'],
                           times=session['times-played'],
                           high=session['high-score'])


@app.route('/check-word/<word>')
def check_word(word):
    return boggle_game.check_valid_word(session['board'], word)


@app.route('/start-game')
def start():
    session['times-played'] = session['times-played'] + 1
    return jsonify({'timesPlayed': session['times-played']})


@app.route('/update-high-score/<int:high>')
def update_high_score(high):
    if session['high-score'] < high:
        session['high-score'] = high
    return jsonify({'highScore': session['high-score']})
