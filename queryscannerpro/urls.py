from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers
from queryscannerpro import views

router = routers.DefaultRouter()
router.register(r'', views.QueryFileView, 'QueryFile')

urlpatterns = [
    path("api/db/", include(router.urls)),
    path('api/file/', views.procesar_archivo),
    path('docs/', include_docs_urls(title="Query Scanner Pro API",
         description="Documentacion de la aplicacion Query Scanner Pro"))
]
