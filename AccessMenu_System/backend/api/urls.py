from django.urls import path

from . import views

urlpatterns = [
    path('getMenu', views.getFullMenu),
    path('uploadToChroma', views.uploadToChroma),
    path('uploadData', views.uploadData),
    path('filterData', views.filterData),
    path('deleteCollections', views.deleteCollections),
]
