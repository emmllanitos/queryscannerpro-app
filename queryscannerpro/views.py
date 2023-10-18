from rest_framework import viewsets
from .serializers import QueryScannerProSerializer
from .models import QueryFile
from rest_framework.decorators import api_view
from rest_framework.response import Response
from queryscannerpro.getFindQuery import extQuery


class QueryFileView(viewsets.ModelViewSet):
    serializer_class = QueryScannerProSerializer
    queryset = QueryFile.objects.all()


@staticmethod
def validar_campos(filename, content, user):
    if not filename.strip() or not user.strip() or not content.strip():
        return False
    return True


@api_view(['POST'])
def procesar_archivo(request):
    if request.method == 'POST':
        filename = request.POST.get('filename', '')
        content = request.POST.get('content', '')
        user = request.POST.get('user', '')

        if not validar_campos(filename, content, user):
            return Response({'status': 'Error: Los campos no pueden estar vacíos'}, status=400)

        # lógica
        response = extQuery(content)

        print(response)

        # Insertar en la base de datos
        query_file = QueryFile(filename=filename, result=[], user=user)
        query_file.save()

        return Response({'status': "success"})

    return Response({'status': 'Método no permitido'}, status=405)
