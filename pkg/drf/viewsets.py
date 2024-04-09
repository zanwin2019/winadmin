from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from pkg.common.log import logger
from pkg.drf.mixins import ApiGenericMixin
from pkg.drf.mixins import CustomPageNumberPagination


class APIView(ApiGenericMixin, APIView):
    """APIView"""
    pass


class ModelViewSet(ApiGenericMixin, viewsets.ModelViewSet):
    """按需改造DRF默认的ModelViewSet类"""
    permission_classes = [IsAuthenticated, ]
    pagination_class = None

    def get_queryset(self):
        if self.request.query_params.get("page"):
            self.pagination_class = CustomPageNumberPagination
        return super().get_queryset()

    def perform_create(self, serializer):
        """创建时补充基础Model中的字段
        """
        user = serializer.context.get('request').user
        username = getattr(user, 'username', 'guest')
        serializer.save(creator=username)

    def perform_update(self, serializer):
        """更新时补充基础Model中的字段
        """
        user = serializer.context.get('request').user
        username = getattr(user, 'username', 'guest')
        serializer.save(updater=username)

    def create(self, request, *args, **kwargs):
        r_data = request.data
        r_data['creator'] = request.user.username
        serializer = self.get_serializer(data=r_data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        headers = self.get_success_headers(serializer.data)
        return Response(instance, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance_object = self.get_object()
        r_data = request.data
        serializer = self.get_serializer(instance_object, data=r_data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        instance = serializer.save()

        if getattr(instance_object, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance_object._prefetched_objects_cache = {}

        return Response(instance)

    def destroy(self, request, *args, **kwargs):
        instance_object = self.get_object()
        if hasattr(instance_object, 'is_deleted'):
            instance_object.is_deleted = 1
            instance_object.save()
        else:
            instance_object.delete()
        return Response(instance_object)


class ReadOnlyModelViewSet(ApiGenericMixin, viewsets.ReadOnlyModelViewSet):
    """按需改造DRF默认的ModelViewSet类"""

    pass


class ViewSet(ApiGenericMixin, viewsets.ViewSet):
    """按需改造DRF默认的ViewSet类"""

    pass


class GenericViewSet(ApiGenericMixin, viewsets.GenericViewSet):
    """按需改造DRF默认的GenericViewSet类"""

    pass
