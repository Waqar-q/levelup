from rest_framework.pagination import PageNumberPagination, LimitOffsetPagination

class LimitPagination(LimitOffsetPagination):
    limit_query_param = 'limit'
    offset_query_param = 'offset'

class PagePagination(PageNumberPagination):
    page_query_param = 'page'
    page_size = 10
    