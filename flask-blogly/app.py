"""Blogly application."""

from flask import Flask, render_template, redirect, request
from models import db, connect_db, User, Post, Tag, PostTag

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
    user = User.query.get(user_id)
    
    db.session.delete(user)
    db.session.commit()

    return redirect('/')

@app.route('/users/<int:user_id>/posts/new')
def add_post_page(user_id):
    user = User.query.get(user_id)
    all_tags = Tag.query.all()
    return render_template("add-post.html", user=user, all_tags=all_tags)

@app.route('/users/<int:user_id>/posts/new', methods=["POST"])
def add_post(user_id):
    title = request.form["title"]
    content = request.form["content"]
    post = Post(title=title, content=content, user_id=user_id)

    db.session.add(post)
    db.session.commit()

    tag_names = request.form.getlist('tags')
    tags = Tag.query.filter(Tag.id.in_(tag_names)).all()
    for tag in tags:
        post.tags.append(tag)
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
    all_tags = Tag.query.all()

    tags_in_post = []
    for tag in post.tags:
        tags_in_post.append(tag.id)    

    return render_template("post-edit.html", post=post, all_tags=all_tags, tag_ids=tags_in_post)

@app.route('/posts/<int:post_id>/edit', methods=["POST"])
def edit_post(post_id):
    post = Post.query.get(post_id)

    post.title = request.form["title"]
    post.content = request.form["content"]

    db.session.commit()

    tag_names = request.form.getlist('tags')
    tags = Tag.query.filter(Tag.id.in_(tag_names)).all()
    post.tags = []
    for tag in tags:
        post.tags.append(tag)
    db.session.add(post)
    db.session.commit()

    return redirect(f'/posts/{post_id}')

@app.route('/posts/<int:post_id>/delete')
def delete_post(post_id):
    post = Post.query.get(post_id)
    
    db.session.delete(post)
    db.session.commit()

    return redirect(f'/users/{post.user_id}')

@app.route('/tags/')
def all_tags():
    all_tags = Tag.query.all()
    return render_template('all-tags.html', all_tags=all_tags)

@app.route('/tags/<int:tag_id>')
def show_tag(tag_id):
    tag = Tag.query.get(tag_id)
    return render_template('tag.html', tag=tag)

@app.route('/tags/new')
def new_tag_page():
    return render_template('new-tag.html')

@app.route('/tags/new', methods=["POST"])
def new_tag():
    name = request.form["name"]
    tag = Tag(name=name)
    db.session.add(tag)
    db.session.commit()

    return redirect('/tags')

@app.route('/tags/<int:tag_id>/edit')
def edit_tag_page(tag_id):
    tag = Tag.query.get(tag_id)
    return render_template('tag-edit.html', tag=tag)

@app.route('/tags/<int:tag_id>/edit', methods=["POST"])
def edit_tag(tag_id):
    tag = Tag.query.get(tag_id)

    tag.name = request.form["name"]
    db.session.commit()

    return redirect('/tags')

@app.route('/tags/<int:tag_id>/delete')
def delete_tag(tag_id):
    tag = Tag.query.get(tag_id)
    
    db.session.delete(tag)
    db.session.commit()

    return redirect('/tags')