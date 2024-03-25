# -*- coding: utf-8 -*-

import django
from django.db import models
from django.db.models.query import QuerySet
from mptt.managers import TreeManager

if django.VERSION >= (1, 6):
    # TreeManager bug:
    if 'get_query_set' in TreeManager.__dict__:
        # TreeManager should not define this, it messes things up.
        del TreeManager.get_query_set

        # See also:
        # https://github.com/django-mptt/django-mptt/pull/388

        # Once this has been merged, a new release for django-mptt has been
        # made, and we can specify the new version in our requirements, this
        # hack can be removed.


class SoftDeleteQuerySet(QuerySet):
    def delete(self):
        return super(SoftDeleteQuerySet, self).update(is_deleted=True)

    def hard_delete(self):
        return super(SoftDeleteQuerySet, self).delete()


class BaseTreeManager(TreeManager):
    """soft delete: objects.delete()"""

    def get_queryset(self):
        return SoftDeleteQuerySet(
            self.model, using=self._db).filter(is_deleted=False)
        # return SoftDeleteQuerySet(self.model).select_related("parent")


class Manager(models.Manager):
    """支持软删除"""

    def get_queryset(self):
        return SoftDeleteQuerySet(self.model).filter(is_deleted=False)
