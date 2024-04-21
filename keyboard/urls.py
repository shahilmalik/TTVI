"""
URL configuration for vi project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
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
from pages.views import beginner_guide, home_view, taketest, check, update_level, check_position, finger_placement_assist, beginner_guide, update_sublevel

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',home_view,name="Home"),
    path('take_test',taketest),
    # path('validate_keystrokes/', validate_keystrokes, name='validate_keystrokes'),
    path('check_position/', check_position),
    path('update_sublevel/', update_sublevel, name='update_sublevel'),
    path('update_level/', update_level, name='update_level'),
    path('finger_placement_assist/', finger_placement_assist),
    path('beginner_guide/', beginner_guide),
]