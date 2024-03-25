# -*- coding: utf-8 -*-
import json
from rest_framework import serializers
from pkg.audit.models import AuditLog


class AuditLogSerializer(serializers.ModelSerializer):
    """操作日志数据项序列化"""

    class Meta:
        model = AuditLog
        fields = "__all__"

    def to_representation(self, instance):
        data = super(AuditLogSerializer, self).to_representation(instance)
        if instance.operation_object:
            try:
                data['operation_object'] = json.loads(instance.operation_object)
            except Exception as e:
                pass
        if instance.response_data:
            try:
                data['response_data'] = json.loads(instance.response_data)
            except Exception as e:
                pass
        data["operator"] = instance.operator
        data['user_obj'] = {
            'username': instance.user.username,
            'chname': instance.user.chname
        }
        return data
