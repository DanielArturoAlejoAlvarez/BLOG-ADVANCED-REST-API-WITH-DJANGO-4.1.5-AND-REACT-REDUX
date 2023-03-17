from django.db import models

from django.utils import timezone
from apps.category.models import Category
import uuid



def blog_directory_path(instance,filename):
    return 'blog/{0}/{1}' .format(instance.title,filename)


class Post(models.Model):

    class PostObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status='published')
        
    options=(
        ('draft','Draft'),
        ('piblished','Published')
    )



    blog_uuid=models.UUIDField(default=uuid.uuid4,unique=True)
    title=models.CharField(max_length=255)
    slug=models.SlugField(max_length=255,unique=True)
    thumbnail=models.ImageField(upload_to=blog_directory_path,max_length=512)
    video=models.FileField(upload_to=blog_directory_path,blank=True,null=True)
    content=models.TextField()
    excerpt=models.CharField(max_length=100)

    #author=models.CharField(max_length=100)
    category=models.ForeignKey(Category, on_delete=models.PROTECT)

    published=models.DateTimeField(default=timezone.now)
    status=models.CharField(max_length=10, choices=options, default='draft')

    objects=models.Manager()
    postobjects=PostObjects()

    class Meta:
        oredering=('-published',)

    def __str__(self):
        return self.title
    
    def get_video(self):
        if self.video:
            return self.video.url
        
    def get_thumbnail(self):
        if self.thumbnail:
            return self.thumbnail.url

