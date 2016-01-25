__author__ = 'Jeffrey'
from models import Commit, Brink
from shared import db

def updateBrink(name, brinkPoint, brinkId):
    c = Commit()
    c.brinkPoint = brinkPoint
    c.name = name
    c.brinkId = brinkId
    #TODO: validation here or in view
    db.session.add(c)
    db.session.commit()
    associatedBrink = Brink.query.filter(Brink.id == brinkId).first()
    commits = Commit.query.filter(Commit.brinkId == brinkId).all()
    return calculateFlip(commits, associatedBrink)


def calculateFlip(commits, associatedBrink):
    commits.sort(key=lambda x: x.brinkPoint)
    for i in range(0, len(commits)):
        c = commits[i]
        if i+1 >= c.brinkPoint:
            associatedBrink.flipped = True
            db.session.commit()
    return associatedBrink.flipped
