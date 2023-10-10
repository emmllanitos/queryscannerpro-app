from django.db import models

# Create your models here.


class QueryFile(models.Model):
    filename = models.CharField(max_length=200)
    result = models.TextField(blank=True)
    user = models.CharField(blank=True, max_length=200)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.filename
