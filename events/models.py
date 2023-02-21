from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    email = models.EmailField(unique=True)

    def __str__(self) -> str:
        return f'{self.first_name} {self.last_name}'

    class Meta:
        indexes = [models.Index(fields=['last_name', 'first_name'])]
        ordering = ['last_name']

class Event(models.Model):
    STATUS_DRAFT = 'DR'
    STATUS_PRIVATE = 'PV'
    STATUS_PUBLIC = 'PB'

    STATUS_CHOICES = [
        (STATUS_DRAFT, 'Draft'),
        (STATUS_PRIVATE, 'Private'),
        (STATUS_PUBLIC, 'Public')
    ]
    title = models.CharField(max_length=80)
    slug = models.SlugField()
    date = models.DateTimeField('date and time of the event')
    status = models.CharField(max_length=2,choices=STATUS_CHOICES)
    location = models.CharField(max_length=140)
    # we could use GeoDjango for precise location data (PointField)
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='events_created')
    subscribers = models.ManyToManyField(User, related_name='events_subscribed', blank=True)

    def __str__(self) -> str:
        return f'{self.title}, {self.date}'

    class Meta:
        ordering = ['date']
    

    #* RETRIEVE SUBSCRIBERS TO AN EVENT:
    # event1 = Event.objects.get(title='Event 1')
    # subscribers = event1.subscribers.all()


# =============================================================
# class Subscription(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     event = models.ForeignKey(Event, on_delete=models.CASCADE)
    
#     def __str__(self) -> str:
#         return f'{self.user} subscribed to {self.event}'

#     class Meta:
#         unique_together = ('user', 'event')

    #* Generic Relationship: 
    # we could define a generic relationship so subscriptions could be reused for other types of subscriptions, instead of event, write:
    # content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    # object_id = models.PositiveIntegerField()
    # content_object = GenericForeignKey()
