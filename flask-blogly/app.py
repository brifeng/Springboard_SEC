"""Blogly application."""

from flask import Flask, render_template, redirect, request
from models import db, connect_db, User, Post
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)

@app.route('/')
def homepage():
    return redirect('/users')

@app.route('/users')
def show_users():
    users = User.query.all()
    return render_template("home.html", users=users)


@app.route('/users/new')
def create_user_page():
    return render_template("new-user.html")

@app.route('/users/new', methods = ["POST"])
def create_user():
    first_name = request.form["first_name"]
    last_name = request.form["last_name"]
    image_url = request.form["image_url"]

    user = User(first_name=first_name, last_name=last_name, image_url=image_url)

    db.session.add(user)
    db.session.commit()

    return redirect('/')

@app.route('/users/<int:user_id>')
def user_details(user_id):
    user = User.query.get_or_404(user_id)
    return render_template('details.html', user=user)

@app.route('/users/<int:user_id>/edit')
def user_edit_page(user_id):
    user = User.query.get_or_404(user_id)
    return render_template("user-edit.html", user=user)

@app.route('/users/<int:user_id>/edit', methods=["POST"])
def user_edit(user_id):
    first_name = request.form["first_name"]
    last_name = request.form["last_name"]
    image_url = request.form["image_url"]

    user = User.query.get_or_404(user_id)
    user.first_name = first_name
    user.last_name = last_name
    user.image_url = image_url

    db.session.commit()

    return redirect('/')

@app.route('/users/<int:user_id>/delete')
def delete_user(user_id):
    User.query.filter_by(id=user_id).delete()
    
    db.session.commit()

    return redirect('/')

@app.route('/users/<int:user_id>/posts/new')
def add_post_page(user_id):
    user = User.query.get(user_id)
    return render_template("add-post.html", user=user)

@app.route('/users/<int:user_id>/posts/new', methods=["POST"])
def add_post(user_id):
    title = request.form["title"]
    content = request.form["content"]
    created_at = str(datetime.now())
    post = Post(title=title, content=content, created_at=created_at, user_id=user_id)

    db.session.add(post)

    db.session.commit()

    return redirect(f'/posts/{post.id}')

@app.route('/posts/<int:post_id>')
def show_post(post_id):
    post = Post.query.get_or_404(post_id)
    return render_template("post.html", post=post)

@app.route('/posts/<int:post_id>/edit')
def edit_post_page(post_id):
    post = Post.query.get_or_404(post_id)
    return render_template("post-edit.html", post=post)

@app.route('/posts/<int:post_id>/edit', methods=["POST"])
def edit_post(post_id):
    post = Post.query.get(post_id)

    post.title = request.form["title"]
    post.content = request.form["content"]

    db.session.commit()

    return redirect(f'/posts/{post_id}')

@app.route('/posts/<int:post_id>/delete')
def delete_post(post_id):
    post = Post.query.filter_by(id=post_id)
    user_id = post.one().user.id
    post.delete()

    db.session.commit()

    return redirect(f'/users/{user_id}')