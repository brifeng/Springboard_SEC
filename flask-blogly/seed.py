"""Seed file to make sample data for db."""

from models import db, User, Post, Tag, PostTag
from app import app

# Create all tables
db.drop_all()
db.create_all()

# Make a bunch of users
user1 = User(first_name="RM", last_name="BTS")
user2 = User(first_name="JHope", last_name="BTS")
user3 = User(first_name="Jin", last_name="BTS")
user4 = User(first_name="Suga", last_name="BTS")
user5 = User(first_name="Jimin", last_name="BTS")
user6 = User(first_name="V", last_name="BTS")
user7 = User(first_name="Jungkook", last_name="BTS")
user8 = User(first_name="BTS", last_name="Group", image_url="https://upload.wikimedia.org/wikipedia/commons/4/4f/BTS_for_Dispatch_White_Day_Special%2C_27_February_2019_01.jpg")

db.session.add_all([user1, user2, user3, user4, user5, user6, user7, user8])

db.session.commit()


post1 = Post(title="Title", content = "Content", created_at = "now", user_id = 8)

db.session.add(post1)
db.session.commit()

tag1 = Tag(name='funny')
db.session.add(tag1)
db.session.commit()

assoc = PostTag(post_id=1, tag_id=1)
db.session.add(assoc)
db.session.commit()