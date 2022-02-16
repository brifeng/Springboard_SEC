from app import db
from models import Pet

db.drop_all()
db.create_all()

p1 = Pet(
    name="Woofly",
    species="dog",
    photo_url=
    "https://kb.rspca.org.au/wp-content/uploads/2018/11/golder-retriever-puppy.jpeg"
)
p2 = Pet(
    name="Porchetta",
    species="porcupine",
    photo_url=
    "https://i.natgeofe.com/n/d0c2bc16-95be-4d1f-a1e4-322a0669a7f2/porcupines_thumb.JPG"
)
p3 = Pet(
    name="Snargle",
    species="cat",
    photo_url=
    "https://static.independent.co.uk/2021/06/16/08/newFile-4.jpg?quality=75&width=982&height=726&auto=webp"
)
p4 = Pet(
    name="Kitty",
    species="cat",
    photo_url="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/VAN_CAT.png/1280px-VAN_CAT.png",
    is_available=False
)
db.session.add_all([p1, p2, p3, p4])
db.session.commit()
