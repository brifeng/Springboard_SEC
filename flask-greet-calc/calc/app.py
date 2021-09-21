# Put your app in here.
from flask import Flask, request
from operations import add, sub, mult, div

app = Flask(__name__)


@app.route('/add')
def add_page():
    a, b = int(request.args['a']), int(request.args['b'])
    return str(add(a, b))


@app.route('/sub')
def sub_page():
    a, b = int(request.args['a']), int(request.args['b'])
    return str(sub(a, b))


@app.route('/mult')
def mult_page():
    a, b = int(request.args['a']), int(request.args['b'])
    return str(mult(a, b))


@app.route('/div')
def div_page():
    a, b = int(request.args['a']), int(request.args['b'])
    return str(div(a, b))


@app.route('/math/<operation>')
def calc(operation):
    a, b = int(request.args['a']), int(request.args['b'])
    OPERATIONS = {
        "add": add(a,b),
        "sub": sub(a,b),
        "mult": mult(a,b),
        "div": div(a,b)
    }
    return str(OPERATIONS[operation])

    # if operation == "add":
    #     a, b = int(request.args['a']), int(request.args['b'])
    #     return str(add(a, b))
    # elif operation == "sub":
    #     a, b = int(request.args['a']), int(request.args['b'])
    #     return str(sub(a, b))
    # elif operation == "mult":
    #     a, b = int(request.args['a']), int(request.args['b'])
    #     return str(mult(a, b))
    # elif operation == "div":
    #     a, b = int(request.args['a']), int(request.args['b'])
    #     return str(div(a, b))
    # else:
    #     return "ERROR"