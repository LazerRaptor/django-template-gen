"""config URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.template.response import TemplateResponse
from django.contrib.auth import get_user_model
from ninja import NinjaAPI, Schema
from typing import List


api = NinjaAPI()


class UserSchema(Schema):
    username: str
    first_name: str
    last_name: str
    email: str


class ContextSchema(Schema):
    users: List[UserSchema]


@api.get("/")
def homepage(request):
    context = ContextSchema(
        users=list(get_user_model().objects.all())
    ).json()
    return TemplateResponse(request, "homepage.html", context={"context": context})


urlpatterns = [
    path("admin/", admin.site.urls),
    path("", api.urls),
]
