"""Seed file to make sample data for db."""

from models import db, User
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

# # Make a bunch of employees

# river = Employee(name="River Bottom", state="NY", dept_code="mktg")
# summer = Employee(name="Summer Winter", state="OR", dept_code="mktg")
# joaquin = Employee(name="Joaquin Phoenix", dept_code="acct")
# octavia = Employee(name="Octavia Spencer", dept_code="r&d")
# larry = Employee(name="Larry David", dept_code="r&d", state="NY")
# kurt = Employee(name="Kurt Cobain", dept_code="it", state="WA")
# rain = Employee(name="Rain Phoenix", dept_code="it")

# db.session.add_all([river, summer, joaquin, octavia, larry, kurt, rain])

# db.session.commit()