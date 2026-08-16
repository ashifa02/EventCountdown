from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import EventViewSet, RegisterView

router = DefaultRouter()
router.register('events', EventViewSet, basename='event')

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
]

urlpatterns += router.urls