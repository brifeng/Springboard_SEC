from flask import Flask, render_template, request, redirect, flash
from flask_debugtoolbar import DebugToolbarExtension

from surveys import satisfaction_survey

app = Flask(__name__)
app.config['SECRET_KEY'] = 'chickenzarecool123'
debug = DebugToolbarExtension(app)


responses = []


@app.route('/')
def start_page():
    title = satisfaction_survey.title
    ins = satisfaction_survey.instructions
    return render_template('start.html', title=title, instructions=ins)


@app.route('/answer', methods=["POST"])
def answer():
    responses.append(request.form['question'])
    if len(responses) < len(satisfaction_survey.questions):
        return redirect(f'questions/{len(responses)}')
    return redirect('/thanks')


@app.route('/questions/<int:num>')
def question(num):
    if not len(responses) == num:
        flash("Oops! You tried to access an invalid question.")
        return redirect(f'{len(responses)}')
    elif not num in range(len(satisfaction_survey.questions)):
        return redirect('/thanks')
    question = satisfaction_survey.questions[num].question
    choices = satisfaction_survey.questions[num].choices
    return render_template('question.html', question=question, choices=choices)


@app.route('/thanks')
def end():
    print(responses)
    return render_template('thanks.html')
