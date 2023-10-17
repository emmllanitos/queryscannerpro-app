from django.db import models

class QueryFile(models.Model):
    filename = models.CharField(max_length=100)
    result = models.JSONField()
    user = models.CharField(blank=True, max_length=100)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.filename
