from flask import Flask, render_template, redirect, render_template
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, Pet

from forms import AddPetForm, EditPetForm

app = Flask(__name__)
app.config["SECRET_KEY"] = "oh-so-secret"
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///adopt"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

debug = DebugToolbarExtension(app)

connect_db(app)


@app.route('/')
def homepage():
    """Render home page."""
    pets = Pet.query.all()
    return render_template('home.html', pets=pets)


@app.route('/add', methods=["GET", "POST"])
def add_pet():
    """Renders add pet form (GET) or handles add pet form submission (POST)"""
    form = AddPetForm()
    if form.validate_on_submit():
        name = form.name.data
        species = form.species.data
        photo_url = form.photo_url.data
        age = form.age.data
        notes = form.notes.data
        is_available = form.is_available.data
        p = Pet(name=name,
                species=species,
                photo_url=photo_url,
                age=age,
                notes=notes,
                is_available=is_available)

        db.session.add(p)
        db.session.commit()
        return redirect('/')
    else:
        return render_template('add-pet-form.html', form=form)


@app.route('/<int:pet_id>', methods=["GET", "POST"])
def pet_page(pet_id):
    """Renders pet page (GET) or handles edit pet form submission (POST)"""
    pet = Pet.query.get(pet_id)
    form = EditPetForm(obj=pet)
    if form.validate_on_submit():
        pet.photo_url = form.photo_url.data
        pet.notes = form.notes.data
        pet.is_available = form.is_available.data
        db.session.commit()
        return redirect(f'/{pet_id}')
    else:
        return render_template('pet-info.html', pet=pet, form=form)