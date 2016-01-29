__author__ = 'Jeffrey'
from models import Commit, Brink
from shared import db

def getAssociatedCommits(brinkId):
    commits = Commit.query.filter(Commit.brinkId == brinkId).all()
    return commits

def updateBrink(name, brinkPoint, brinkId):

    #TODO: refactor to use an associated user
    c = Commit()
    c.brinkPoint = brinkPoint
    c.name = name
    c.brinkId = brinkId
    db.session.add(c)
    db.session.commit()
    associatedBrink = Brink.query.filter(Brink.id == brinkId).first()

    #if the brinkPoint is lower than the highest brinkPoint of the brink,
    #then the commit's brinkPoint is already reached, and should be flipped
    if(brinkPoint >= associatedBrink.brinkPoint):
        c.flipped = True
        db.session.commit()
        return True
    commits = Commit.query.filter(Commit.brinkId == brinkId).all()
    return calculateFlip(commits, associatedBrink)


def calculateFlip(commits, associatedBrink):
    commits.sort(key=lambda x: x.brinkPoint)
    for i in range(0, len(commits)):
        c = commits[i]
        if i+1 >= c.brinkPoint:
            associatedBrink.flipped = True
            associatedBrink.brinkPoint = c.BrinkPoint
            #flip the associated commits
            for j in range(0, i):
                commits[j].flipped = True
            db.session.commit()
    return associatedBrink.flipped


