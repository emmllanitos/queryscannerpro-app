from rest_framework import viewsets
from .serializers import QueryScannerProSerializer
from .models import QueryFile
from rest_framework.decorators import api_view
from rest_framework.response import Response


class QueryFileView(viewsets.ModelViewSet):
    serializer_class = QueryScannerProSerializer
    queryset = QueryFile.objects.all()


@api_view(['POST'])
def procesar_archivo(request):
    if request.method == 'POST':
        filename = request.POST.get('filename', '')
        content = request.POST.get('content', '')
        user = request.POST.get('user', '')

        if not filename or not content or not user:
            return Response({'status': 'Error: Los campos no pueden estar vacíos'}, status=400)

        # lógica

        print(f'Nombre del archivo: {filename}')
        print(f'Contenido del archivo: {content}')
        print(f'Usuario: {user}')

        return Response({'status': "success"})

    return Response({'status': 'Método no permitido'}, status=405)
