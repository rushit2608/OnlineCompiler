from django.urls import re_path
from asgi_websocket_app.consumer import CompilerConsumer

websocket_urlpatterns = [
    re_path(r'ws/compiler/$', CompilerConsumer.as_asgi()),
]
