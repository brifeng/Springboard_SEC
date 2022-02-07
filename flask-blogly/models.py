"""Models for Blogly."""
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def connect_db(app):
    db.app = app
    db.init_app(app)


class User(db.Model):
    __tablename__ = 'users'

    # @classmethod
    # def get_by_species(cls, species):
    #     return cls.query.filter_by(species=species).all()

    # @classmethod
    # def get_all_hungry(cls):
    #     return cls.query.filter(cls.hunger > 20).all()

    # def __repr__(self):
    #     p = self
    #     return f"<Pet id={p.id} name={p.name} species={p.species} hunger={p.hunger}"

    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    first_name = db.Column(db.String(50), nullable = False)
    last_name = db.Column(db.String(50), nullable = False)
    image_url = db.Column(db.String)

    def greet(self):
        return f"Hi, I am {self.first_name} {self.last_name}"

