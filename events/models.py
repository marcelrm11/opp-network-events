from django.db import models

class User(models.Model):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=32)
    first_name = models.CharField(max_length=60)
    last_name = models.CharField(max_length=60)
    super_user = models.BooleanField(default=False)

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
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    # users = ! show list

    def __str__(self) -> str:
        return f'{self.title}, {self.date}'

    class Meta:
        ordering = ['date']

class Subscriptions(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    # we could define a generic relationship so subscriptions could be reused for other types of subscriptions
    # content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    # object_id = models.PositiveIntegerField()
    # content_object = GenericForeignKey()
