__author__ = 'Jeffrey'

from flask.ext.restless import APIManager
from flask import Flask, request, jsonify
from shared import db
from models import Brink, Commit

app = Flask('brink', static_url_path='')
db.init_app(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///brink.db'

with app.app_context():
    db.create_all()
    api_manager = APIManager(app, flask_sqlalchemy_db=db)
    api_manager.create_api(Brink, methods=['GET', 'POST', 'DELETE', 'PUT'])
    api_manager.create_api(Commit, methods=['GET', 'DELETE', 'PUT'])

@app.route('/commit', methods=['POST'])
def commit():
    n = request.json['name']
    b = int(request.json['brinkPoint'])
    return jsonify(name=n, brinkPoint=b)

@app.route('/')
def index():
    return app.send_static_file("index.html")

if __name__ == '__main__':
    app.run()