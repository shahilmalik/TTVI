from django.db import models

class Level(models.Model):
    level = models.IntegerField(default=1)
    subLevel = models.IntegerField(default=1)