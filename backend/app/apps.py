from django.apps import AppConfig


class AppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app'
    
    #for scheduling the population of our database from Yelp API data
    #def ready(self):
       # print("Starting Scheduler ...")
       # from .scheduler import beginning_of_day
       # beginning_of_day()
