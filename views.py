__author__ = 'Jeffrey'

from flask import request, jsonify
from main import app
from brinkService import updateBrink

#TODO: figure out why I can't move views here, and why packages won't work
'''@app.route('/commit', methods=['POST'])
def commit():
    n = request.json['name']
    b = int(request.json['brinkPoint'])
    updateBrink(n, b, 1)
    return jsonify(name=n, brinkPoint=b)

@app.route('/')
def index():
    return app.send_static_file("index.html")'''