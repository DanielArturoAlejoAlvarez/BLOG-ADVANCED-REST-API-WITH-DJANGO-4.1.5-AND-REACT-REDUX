from django.shortcuts import render

from .serializers import CategorySerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status,permissions
from rest_framework.pagination import PageNumberPagination
from .models import Category


class CategoryListView(APIView):
    def get(self,request,format=None):
        if Category.objects.all().exists():
            categories=Category.objects.all()
            result = []
            
            for category in categories:
                if not category.parent:
                    item={}
                    item['id']=category.id
                    item['name']=category.name 
                    item['thumbnail']=category.thumbnail.url
                    
                    item['sub_categories']=[]
                    
                    for cat in categories:
                        if cat.parent and cat.parent.id == category.id:
                            sub_item={}
                            sub_item['id']=cat.id
                            sub_item['name']=cat.name 
                            sub_item['thumbnail']=cat.thumbnail.url
                            
                            item['sub_categories'].append(sub_item)
                            
                    result.append(item)
            return Response({
                'categories': result
            }, status=status.HTTP_200_OK)
            
        else:
            return Response({
                'error': 'Categories not found!'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            
