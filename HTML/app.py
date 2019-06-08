from sqlalchemy import func
import sqlalchemy
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)


engine = create_engine("sqlite:///db/kidPlaces_db.sqlite")
Base = automap_base()
Base.prepare(engine, reflect=True)
CityRank = Base.classes.Crank
CityPlace = Base.classes.KPlaces
CityRest = Base.classes.KRestaurant



# app
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///db/kidPlaces_db.sqlite"

db = SQLAlchemy(app)

# ROute to home page

@app.route("/")
def home():
        return render_template("index.html")
    
# route to jason data city rank
@app.route("/crank")
def crank():
   results = db.session.query(CityRank.Rank,CityRank.City).all()

   rank = [int(result[0]) for result in reversed(results)]
   city = [result[1] for result in results]

   trace = {"x": city, "y": rank, "type": "bar", "orintation": "h"}
   
   return jsonify(trace)



# route to jason data city places

@app.route("/place")
def place():
   results = db.session.query(CityPlace.Business_Name,CityPlace.Business_type, CityPlace.Address, CityPlace.City, CityPlace.Latitude ,CityPlace.Longitude, CityPlace.url).all()
   return jsonify(results)

@app.route("/resta")
def resta():
   results = db.session.query(CityRest.Restaurant_name,CityRest.Restaurant_address).all()
   return jsonify(results)

if __name__ == "__main__":
    app.run()
