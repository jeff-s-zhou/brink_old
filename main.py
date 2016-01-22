__author__ = 'Jeffrey'

from flask.ext.restless import APIManager
from flask import Flask, request, redirect, url_for, render_template, session, flash
from shared import db
from models import Brink, Commit
from brinkService import updateBrink, createBrink

app = Flask('brink', static_url_path='')
db.init_app(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///brink.db'

with app.app_context():
    db.create_all()
    api_manager = APIManager(app, flask_sqlalchemy_db=db)
    api_manager.create_api(Brink, methods=['GET', 'POST', 'DELETE', 'PUT'])
    api_manager.create_api(Commit, methods=['GET', 'DELETE', 'PUT'])
    #b = Brink()

    #placerholder seed data
    '''b.title = "Lets march on washington"
    b.description = "leggo"
    b.flipped = False;
    db.session.add(b)
    db.session.commit()'''

@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        #TODO: actual validation
        if request.form['username'] != 'admin':
            error = 'Invalid username'
        elif request.form['password'] != 'password':
            error = 'Invalid password'
        else:
            #TODO: actual name on flash
            session['logged_in'] = True
            flash('Hello, Jeff')
            return redirect(url_for('index'))
    return render_template('login.html', error=error)


@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    flash('You were logged out.')
    return redirect(url_for('index'))


@app.route('/create', methods=['POST'])
def create():
    title = request.form['title']
    description = request.form['description']
    Brink = createBrink(title, description)
    return redirect(url_for('brink'), Brink.id)


@app.route('/brink/<brinkId>')
def brink(brinkId):
    #TODO: lookup brink information
    return render_template('brink.html')


@app.route('/commit', methods=['POST'])
def commit():
    name = request.form['name']
    brinkPoint = int(request.form['brinkPoint'])
    updateBrink(name, brinkPoint, 1)
    #append success message here
    return render_template('brink.html')
    #return render_template('show_')
    #return jsonify(name=n, brinkPoint=b)


'''
index. can create a brink from here
'''
@app.route('/')
def index():
    return render_template("index.html")

if __name__ == '__main__':
    app.run()