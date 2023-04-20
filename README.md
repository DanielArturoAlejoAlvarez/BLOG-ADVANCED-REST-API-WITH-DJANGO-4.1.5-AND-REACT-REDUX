# BLOG ADVANCED REST API WITH DJANGO 4.1.5 AND REACT REDUX


## Description

This repository is a Software of Application with Python,Django, Django Rest Framework, TailwindCSS, React, Redux,etc

## Installation

Using Django 4.1.5 preferably.

## DataBase

Using SQLite3 preferably.

## Apps

Using Postman, Insomnia,etc

## Usage

```html
$ git clone https://github.com/DanielArturoAlejoAlvarez/
BLOG-ADVANCED-REST-API-WITH-DJANGO-4.1.5-AND-REACT-REDUX.git[NAME APP]



$ python3 manage.py runserver 

$ npm install (Frontend)

$ npm run start

```

Follow the following steps and you're good to go! Important:

![alt text](https://miro.medium.com/v2/resize:fit:1200/1*lAMsvtB6afHwTQYCNM1xvw.png)

## Coding

![alt text](https://developers.giphy.com/branch/master/static/api-512d36c09662682717108a38bbb5c57d.gif)

### Serializers

```python
...
from rest_framework import serializers
from .models import Post
from apps.category.serializers import CategorySerializer


class PostSerializer(serializers.ModelSerializer):
    thumbnail=serializers.CharField(source='get_thumbnail')
    video=serializers.CharField(source='get_video')
    category=CategorySerializer()

    class Meta:
        model=Post
        fields=[
            'blog_uuid',
            'title',
            'slug',
            'thumbnail',
            'video',
            'content',
            'excerpt',
            'category',
            'published',
            'status',
        ]
...
```

### Models

```python
...
from django.db import models
from django.utils import timezone
import uuid
from apps.category.models import Category

def blog_directory_path(instance,filename):
    return 'blog/{0}/{1}'.format(instance.title, filename)


class Post(models.Model):
    class PostObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status='published')

    options = (
        ('draft', 'Draft'),
        ('published', 'Published')
    )

    blog_uuid=models.UUIDField(default=uuid.uuid4, unique=True)
    title=models.CharField(max_length=255)
    slug=models.SlugField(unique=True)
    thumbnail=models.ImageField(upload_to=blog_directory_path, max_length=512)
    video=models.FileField(upload_to=blog_directory_path, blank=True, null=True)
    content=models.TextField()
    excerpt=models.CharField(max_length=100)

    #user=models.CharField(max_length=100)
    category=models.ForeignKey(Category, on_delete=models.PROTECT)

    published=models.DateTimeField(default=timezone.now)
    status=models.CharField(max_length=10, choices=options, default='draft')

    objects = models.Manager()
    postobjects = PostObjects()

    class Meta:
        ordering = ('-published',)

    def __str__(self):
        return self.title 

    def get_video(self):
        if self.video:
            return self.video.url 
        return ''

    def get_thumbnail(self):
        if self.thumbnail:
            return self.thumbnail.url 
        return ''


...
```

### Routes

```python
...
from django.contrib import admin
from django.urls import path,include,re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('api/blog/', include('apps.blog.urls')),
    path('api/category/', include('apps.category.urls')),
    path('admin/', admin.site.urls),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


urlpatterns += [
    re_path(r'^.*', TemplateView.as_view(template_name='index.html'))
]
...
```

### Views

```python
...
from django.shortcuts import render, get_object_or_404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status,permissions

from .models import Post
from apps.category.models import Category
from .serializers import PostSerializer
from .pagination import SmallSetPagination,MediumSetPagination,LargeSetPagination

from django.db.models.query_utils import Q


class BlogListView(APIView):
    def get(self,request,format=None):
        if Post.postobjects.all().exists():
            posts=Post.postobjects.all()

            paginator=SmallSetPagination()
            results=paginator.paginate_queryset(posts,request)

            serializer=PostSerializer(results, many=True)
            return paginator.get_paginated_response({
                'posts': serializer.data
            })
        else:
            return Response({
                'error': 'No posts found!'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class BlogListCategoryView(APIView):
    def get(self,request,category_id,format=None):
        if Post.postobjects.all().exists():
            category=Category.objects.get(id=category_id)

            posts=Post.postobjects.all().filter(category=category)

            paginator=SmallSetPagination()
            results=paginator.paginate_queryset(posts,request)

            serializer=PostSerializer(results, many=True)
            return paginator.get_paginated_response({
                'posts': serializer.data
            })
        else:
            return Response({
                'error': 'No posts found!'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class PostDetailView(APIView):
    def get(self,request,post_slug,format=None):
        post=get_object_or_404(Post, slug=post_slug)
        serializer=PostSerializer(post)
        return Response({
            'post': serializer.data
        }, status=status.HTTP_200_OK)



class SearchBlogView(APIView):
    def get(self,request,search_term):
        matches=Post.postobjects.filter(
            Q(title__icontains=search_term) |
            Q(content__icontains=search_term) |
            Q(category__name__icontains=search_term)
        )

        paginator=MediumSetPagination()
        #results=paginator.paginate_queryset(matches,request)
        serializer=PostSerializer(matches, many=True)

        return Response({
            'filtered_posts': serializer.data
        }, status=status.HTTP_200_OK)

...
```

### Redux (Actions)

```javascript
...
import {
  GET_BLOG_LIST_SUCCESS,
  GET_BLOG_LIST_FAIL,
  GET_BLOG_SUCCESS,
  GET_BLOG_FAIL,
  GET_BLOG_LIST_CATEGORIES_SUCCESS,
  GET_BLOG_LIST_CATEGORIES_FAIL,
  GET_SEARCH_BLOG_SUCCESS,
  GET_SEARCH_BLOG_FAIL
} from "../types/blog.types";

import axios from "axios";

//Post Actions
export const get_blog_list = () => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json"
    }
  };

  try {
    const resp = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/blog/`,
      config
    );
    if (resp.status === 200) {
      dispatch({
        type: GET_BLOG_LIST_SUCCESS,
        payload: resp.data
      });
    } else {
      dispatch({
        type: GET_BLOG_LIST_FAIL
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_BLOG_LIST_FAIL
    });
  }
};

export const get_blog_list_page = (p) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json"
    }
  };

  try {
    const resp = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/blog/?p=${p}`,
      config
    );
    if (resp.status === 200) {
      dispatch({
        type: GET_BLOG_LIST_SUCCESS,
        payload: resp.data
      });
    } else {
      dispatch({
        type: GET_BLOG_LIST_FAIL
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_BLOG_LIST_FAIL
    });
  }
};

export const get_blog = (slug) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json"
    }
  };

  try {
    const resp = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/blog/${slug}`,
      config
    );
    if (resp.status === 200) {
      dispatch({
        type: GET_BLOG_SUCCESS,
        payload: resp.data
      });
    } else {
      dispatch({
        type: GET_BLOG_FAIL
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_BLOG_FAIL
    });
  }
};

//Category Actions
export const get_blog_list_categories = (category_id) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json"
    }
  };

  try {
    const resp = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/blog/category/${category_id}`,
      config
    );
    if (resp.status === 200) {
      dispatch({
        type: GET_BLOG_LIST_CATEGORIES_SUCCESS,
        payload: resp.data
      });
    } else {
      dispatch({
        type: GET_BLOG_LIST_CATEGORIES_FAIL
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_BLOG_LIST_CATEGORIES_FAIL
    });
  }
};

export const get_blog_list_categories_page =
  (category_id, p) => async (dispatch) => {
    const config = {
      headers: {
        Accept: "application/json"
      }
    };

    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/blog/category/${category_id}?p=${p}`,
        config
      );
      if (resp.status === 200) {
        dispatch({
          type: GET_BLOG_LIST_CATEGORIES_SUCCESS,
          payload: resp.data
        });
      } else {
        dispatch({
          type: GET_BLOG_LIST_CATEGORIES_FAIL
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_BLOG_LIST_CATEGORIES_FAIL
      });
    }
  };


  export const search_blog = (search_term) => async (dispatch) => {
    const config = {
      headers: {
        Accept: "application/json"
      }
    };
  
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/blog/search/${search_term}`,
        config
      );
      if (resp.status === 200) {
        dispatch({
          type: GET_SEARCH_BLOG_SUCCESS,
          payload: resp.data
        });
      } else {
        dispatch({
          type: GET_SEARCH_BLOG_FAIL
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_SEARCH_BLOG_FAIL
      });
    }
  };
...
```

### Redux (Reducers)

```javascript
...
import {
  GET_BLOG_LIST_SUCCESS,
  GET_BLOG_LIST_FAIL,
  GET_BLOG_SUCCESS,
  GET_BLOG_FAIL,
  GET_BLOG_LIST_CATEGORIES_SUCCESS,
  GET_BLOG_LIST_CATEGORIES_FAIL,
  GET_SEARCH_BLOG_SUCCESS,
  GET_SEARCH_BLOG_FAIL
} from "../types/blog.types";

const initialState = {
  blog_list: null,
  post: null,
  blog_list_category: null,
  count: null,
  next: null,
  previous: null,
  filtered_posts: null
};

export default function blog(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_BLOG_LIST_SUCCESS:
      return {
        ...state,
        blog_list: payload.results.posts,
        count: payload.count,
        next: payload.next,
        previous: payload.previous
      };
    case GET_BLOG_LIST_FAIL:
      return {
        ...state,
        blog_list: null,
        count: null,
        next: null,
        previous: null
      };
    case GET_BLOG_LIST_CATEGORIES_SUCCESS:
      return {
        ...state,
        blog_list_category: payload.results.posts,
        count: payload.count,
        next: payload.next,
        previous: payload.previous
      };
    case GET_BLOG_LIST_CATEGORIES_FAIL:
      return {
        ...state,
        blog_list_category: null,
        count: null,
        next: null,
        previous: null
      };
    case GET_BLOG_SUCCESS:
      return {
        ...state,
        post: payload.post
      };
    case GET_BLOG_FAIL:
      return {
        ...state,
        post: null
      };
    case GET_SEARCH_BLOG_SUCCESS:
      return {
        ...state,
        filtered_posts: payload.filtered_posts
      };
    case GET_SEARCH_BLOG_FAIL:
      return {
        ...state,
        filtered_posts: null
      };
  

    default:
      return state;
  }
}

...
```

### Store

```javascript
...
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import rootReducer from './redux/reducers'
import { composeWithDevTools } from "redux-devtools-extension";


const initialState = {}

const middleware = [thunk]

const store = createStore(
    rootReducer,
    initialState,

    composeWithDevTools(applyMiddleware(...middleware))
)

export default store
...

```

### App React
```javascript
...
import Error404 from "containers/errors/Error404";
import Home from "containers/pages/Home";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import store from './store'
import Blog from "containers/pages/blog/Blog";
import BlogPost from "containers/pages/blog/BlogPost";
import BlogCategory from "containers/pages/blog/category/BlogCategory";
import Search from "containers/pages/blog/Search";
import About from "containers/pages/About";
import Contact from "containers/pages/Contact";


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="*" element={<Error404 />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/post/:slug" element={<BlogPost />} />
          <Route path="/blog/categories/:category_id" element={<BlogCategory />} />
          <Route path="/search/:term" element={<Search />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;

...
```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/DanielArturoAlejoAlvarez/
BLOG-ADVANCED-REST-API-WITH-DJANGO-4.1.5-AND-REACT-REDUX. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

```

```
