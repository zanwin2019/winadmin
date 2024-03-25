from django.db import models
from pkg.common.constants import LEN_LONG


class CasbinRule(models.Model):
    ptype = models.CharField(max_length=LEN_LONG)
    v0 = models.CharField(max_length=LEN_LONG)
    v1 = models.CharField(max_length=LEN_LONG)
    v2 = models.CharField(max_length=LEN_LONG, null=True, blank=True)
    v3 = models.CharField(max_length=LEN_LONG, null=True, blank=True)
    v4 = models.CharField(max_length=LEN_LONG, null=True, blank=True)
    v5 = models.CharField(max_length=LEN_LONG, null=True, blank=True)

    class Meta:
        unique_together = ['ptype', 'v0', 'v1', 'v2']
        app_label = 'casbin'
        db_table = 'casbin_rule'
        verbose_name = verbose_name_plural = "权限策略"

    def __str__(self):
        text = self.ptype

        if self.v0:
            text = text + ', ' + self.v0
        if self.v1:
            text = text + ', ' + self.v1
        if self.v2:
            text = text + ', ' + self.v2
        if self.v3:
            text = text + ', ' + self.v3
        if self.v4:
            text = text + ', ' + self.v4
        if self.v5:
            text = text + ', ' + self.v5
        return text

    def __repr__(self):
        return '<CasbinRule {}: "{}">'.format(self.id, str(self))
