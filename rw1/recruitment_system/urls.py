"""
URL configuration for recruitment_system project.
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),

    # Built-in Django auth views: login/, logout/, password_change/, etc.
    path('accounts/', include('django.contrib.auth.urls')),

    # App routes
    path('applications/', include('applications.urls')),
    # path('jobs/', include('jobs.urls')),  # add when jobs app gets its own views
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
