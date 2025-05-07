from .base import *
import socket

# Debug mode
DEBUG = True

# Security
ALLOWED_HOSTS = env.list("ALLOWED_HOSTS", default=["*"])
SECURE_SSL_REDIRECT = False
SESSION_COOKIE_SECURE = False
CSRF_COOKIE_SECURE = False

# Database
DATABASES["default"]["ATOMIC_REQUESTS"] = True

# Email
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

# Debug toolbar
# INSTALLED_APPS += ['debug_toolbar']
# MIDDLEWARE.insert(0, 'debug_toolbar.middleware.DebugToolbarMiddleware')

# Docker-specific debug toolbar config
hostname, _, ips = socket.gethostbyname_ex(socket.gethostname())
INTERNAL_IPS = [ip[: ip.rfind(".")] + ".1" for ip in ips] + ["127.0.0.1"]

# CORS
CORS_ALLOW_ALL_ORIGINS = True
CORS_ORIGIN_WHITELIST = env.list(
    "CORS_ORIGIN_WHITELIST", default=["http://localhost:5173", "http://127.0.0.1:5173"]
)

# Django extensions
INSTALLED_APPS += ["django_extensions"]

# Logging
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
        },
    },
    "root": {
        "handlers": ["console"],
        "level": "DEBUG",
    },
}

# DRF
REST_FRAMEWORK["DEFAULT_RENDERER_CLASSES"] = [
    "rest_framework.renderers.JSONRenderer",
    "rest_framework.renderers.BrowsableAPIRenderer",
]

# Celery
CELERY_TASK_ALWAYS_EAGER = True
CELERY_TASK_EAGER_PROPAGATES = True
