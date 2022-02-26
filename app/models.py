from django.db import models

# Create your models here.
class Restuarant(models.Model):
    name = models.CharField(max_length=60)
    gb_rating = models.DecimalField
    def __str__(self):
        return self.name