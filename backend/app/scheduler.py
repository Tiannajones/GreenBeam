from apscheduler.schedulers.background import BackgroundScheduler
from .views import add_all_restaurants_to_model,delete_all_restaurants_in_model

def beginning_of_day():
  scheduler = BackgroundScheduler()
  
  scheduler.add_job(add_all_restaurants_to_model()) #needs more info
  scheduler.start()