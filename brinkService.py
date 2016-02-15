from sqlalchemy import func
from itertools import groupby

__author__ = 'Jeffrey'
from models import Commit, Brink
from shared import db

def getAssociatedFlippedCommits(brinkId):
    commits = Commit.query.filter(Commit.brinkId == brinkId, Commit.flipped == True).all()
    #sort by date first?
    commits.sort(key=lambda c: c.flipTime)
    #group into sublists by date
    #convert to a string at this point because jsonifying objects is a pain in the ass
    i = 0
    groupedByDate = []
    for k, g in groupby(commits, lambda c: c.flipTime):
        groupedByDate.append(convertToString(k, g, i))
        #i is the index required by the key prop in react
        i+=1
    return groupedByDate

#TODO: refactor with user info for login system
#TODO: eventually we'll want to return this as json objects
def convertToString(dateTime, group, index):
    groupList = list(group)
    groupToString = ','.join([commit.name for commit in groupList])
    return ('{}: {}'.format(dateTime.isoformat(), groupToString), index)

def updateBrink(name, brinkPoint, brinkId):
    #TODO: refactor to use an associated user
    c = Commit()
    c.brinkPoint = brinkPoint
    c.name = name
    c.brinkId = brinkId
    c.flipped = False
    db.session.add(c)
    db.session.commit()
    associatedBrink = Brink.query.filter(Brink.id == brinkId).first()

    #if the brinkPoint is lower than the highest brinkPoint of the brink,
    #then the commit's brinkPoint is already reached, and should be flipped
    if(brinkPoint <= associatedBrink.brinkPoint):
        c.flipped = True
        c.flipTime = func.now()
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
            associatedBrink.brinkPoint = c.brinkPoint
            #flip the associated commits, including the current one
            for j in range(0, i+1):
                commits[j].flipped = True
                if(commits[j].flipTime == None):
                    commits[j].flipTime = func.now()
                
            db.session.commit()
    return associatedBrink.flipped


