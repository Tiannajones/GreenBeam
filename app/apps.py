from django.apps import AppConfig

'''
https://github.com/testdrivenio/django-custom-user-model/blob/master/abstract-base-user-example/users/apps.py
'''

class UserConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'users'
