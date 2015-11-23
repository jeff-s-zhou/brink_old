from sqlalchemy import Column, Integer, Text, Boolean

__author__ = 'Jeffrey'

from shared import db

class Brink(db.Model):
    id = Column(Integer, primary_key=True)
    title = Column(Text, unique=False)
    description = Column(Text, unique=False)
    flipped = Column(Boolean, unique=False)

class Commit(db.Model):
    id = Column(Integer, primary_key=True)
    name = Column(Text, unique=False)
    brinkPoint = Column(Integer, unique=False)
    brinkId = Column(Integer, unique=False)