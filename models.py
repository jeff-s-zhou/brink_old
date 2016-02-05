
from sqlalchemy import Column, Integer, Text, Boolean, DateTime

__author__ = 'Jeffrey'

from shared import db

class Brink(db.Model):
    id = Column(Integer, primary_key=True)
    title = Column(Text, unique=False)
    description = Column(Text, unique=False)
    #store the highest brink point, so every commit with a smaller brink is automatically flipped
    brinkPoint = Column(Integer, unique=False)
    flipped = Column(Boolean, unique=False)

class Commit(db.Model):
    id = Column(Integer, primary_key=True)
    name = Column(Text, unique=False)
    brinkPoint = Column(Integer, unique=False)
    brinkId = Column(Integer, unique=False)
    flipped = Column(Boolean, unique=False)
    #time it was flipped, calculated on server side
    flipTime = Column(DateTime, unique=False, default=None)

