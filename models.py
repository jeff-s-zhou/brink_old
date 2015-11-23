from sqlalchemy import Column, Integer, Text

__author__ = 'Jeffrey'

from shared import db

class Brink(db.Model):
    id = Column(Integer, primary_key=True)
    title = Column(Text, unique=False)
    description = Column(Text, unique=False)

class Commit(db.Model):
    id = Column(Integer, primary_key=True)
    name = Column(Text, unique=False)
    brinkPoint = Column(Integer, unique=False)
    brinkId = Column(Integer, unique=False)