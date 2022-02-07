from unittest import TestCase

from app import app
from models import db, User

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_test'
app.config['SQLALCHEMY_ECHO'] = False

app.config['TESTING'] = True

app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

db.drop_all()
db.create_all()

class UserViewsTestCase(TestCase):
    """Tests views for Users"""

    def setUp(self):
        User.query.delete()

        user = User(first_name="First", last_name="Last", image_url="www.https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/BTS_for_Dispatch_White_Day_Special%2C_27_February_2019_01.jpg/300px-BTS_for_Dispatch_White_Day_Special%2C_27_February_2019_01.jpg")

        db.session.add(user)
        db.session.commit()

        self.user_id = user.id
        self.user_first_name = user.first_name

    def tearDown(self):
        db.session.rollback()

    def test_list_users(self):
        with app.test_client() as client:
            resp = client.get("/users")
            html = resp.get_data(as_text=True)
            
            self.assertEqual(resp.status_code, 200)
            self.assertIn('First', html)

    def test_show_user(self):
        with app.test_client() as client:
            resp = client.get(f"/users/{self.user_id}")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h1>First Last Details</h1>', html)

    def test_add_user(self):
        with app.test_client() as client:
            resp = client.get("/users/new")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h1>Create a User</h1>', html)

    def test_edit_user(self):
        with app.test_client() as client:
            resp = client.get(f"/users/{self.user_id}/edit")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h1>Edit a User</h1>', html)
            self.assertIn(f'value="{self.user_first_name}"', html)