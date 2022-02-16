from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField, SelectField
from wtforms.validators import InputRequired, Optional, URL, NumberRange

SPECIES = ["cat", "dog", "porcupine"] # List of possible species to choose from


class AddPetForm(FlaskForm):
    """FlaskForm for adding a new pet. Name is required. Species must be either a cat, dog, or porcupine. Age, although optional, must be between 0 and 30."""
    name = StringField("Pet Name", validators=[InputRequired()])
    species = SelectField("Species", choices=[(sp, sp) for sp in SPECIES])
    photo_url = StringField("URL of Photo", validators=[URL(), Optional()]) # must be a URL
    age = IntegerField("Age",
                       validators=[Optional(),
                                   NumberRange(min=0, max=30)])
    notes = StringField("Notes", validators=[Optional()])
    is_available = BooleanField("Available") # defaults to True (available)


class EditPetForm(FlaskForm):
    """FlaskForm for editing an existing pet. Only the pet photo, notes, and availability can be updated."""
    photo_url = StringField("URL of Photo", validators=[URL(), Optional()])
    notes = StringField("Notes", validators=[Optional()])
    is_available = BooleanField("Available")
