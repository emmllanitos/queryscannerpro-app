from rest_framework import viewsets
from .serializers import QueryScannerProSerializer
from .models import QueryFile

# Create your views here.


class QueryFileView(viewsets.ModelViewSet):
    serializer_class = QueryScannerProSerializer
    queryset = QueryFile.objects.all()
