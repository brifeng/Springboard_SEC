from boggle import Boggle
from flask import Flask, render_template, session

boggle_game = Boggle()

app = Flask(__name__)
app.config['SECRET_KEY'] = 'chickenzarecool123'

# session['times-played'] = 0
# session['high-score'] = 0


@app.route('/')
def home():
    session['board'] = boggle_game.make_board()
    return render_template('home.html', board=session['board'])


@app.route('/check-word/<word>')
def check_word(word):
    return boggle_game.check_valid_word(session['board'], word)


# @app.route('/start-game')
# def start():
#     session['times-played'] = session['times-played'] + 1


# @app.route('/update-high-score/<int:high>')
# def update_high_score(high):
#     session['high-score'] = high