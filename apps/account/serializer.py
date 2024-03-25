import json

from rest_framework import serializers
from django.utils.translation import gettext_lazy as _
from .models import WaUser, WaUserProperty, Loignlog
from django.contrib.auth.hashers import make_password
from django.conf import settings
from pkg.casbin.adapter import adapter
from apps.system.models import SystemRole, SystemUserRole
from django.contrib.auth.hashers import check_password, make_password


class LoignlogSerializer(serializers.ModelSerializer):

    class Meta:
        model = Loignlog
        fields = "__all__"

    def to_representation(self, instance):
        data = super(LoignlogSerializer, self).to_representation(instance)
        data['user_obj'] = {
            'username': instance.user.username,
            'chname': instance.user.chname
        }
        return data


class WaUserSerializer(serializers.ModelSerializer):
    role = serializers.CharField(required=False)

    class Meta:
        model = WaUser
        exclude = ('password',)

    def create(self, validated_data):
        role_id = validated_data.pop('role')

        password = validated_data.get('password', None)
        if password is None:
            password = settings.DEFAULT_PASSWORD
        validated_data['password'] = make_password(password)
        user = WaUser.objects.create(**validated_data)
        if role_id is not None:
            role_name = SystemRole.objects.get(id=role_id)
            adapter.add_policy(sec=None, ptype='g', rule=[validated_data['username'],
                                                          role_name.code])

            SystemUserRole.objects.create(user_id=user, role_id=role_name)
        return user

    def update(self, instance, validated_data):
        role_id = validated_data.get('role', None)
        if role_id is not None:
            role_name = SystemRole.objects.get(id=role_id)
            user_role = SystemUserRole.objects.filter(user_id=instance)
            old_role_name = None
            if user_role:
                old_role_name = user_role[0].role_id
                adapter.remove_policy(sec=None, ptype='g', rule=[instance.username, old_role_name.code])
            adapter.add_policy(sec=None, ptype='g', rule=[validated_data['username'], role_name.code])
            if role_name != old_role_name:
                SystemUserRole.objects.update_or_create(
                    defaults={'role_id': role_name},
                    user_id=instance
                )

        return super().update(instance, validated_data)

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        user_role = SystemUserRole.objects.filter(user_id=instance)
        if user_role:
            representation['role'] = user_role[0].role_id.id
            representation["role_name"] = user_role[0].role_id.name
        return representation


class WaUserPropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = WaUserProperty
        fields = '__all__'


class WaUserPasswordChangeSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_old_password(self, value):
        user = self.context['request'].user

        if not check_password(value, user.password):
            raise serializers.ValidationError("Current password is incorrect.")

        return value

    def validate_new_password(self, value):
        # Add any additional validation for the new password here.
        return value

    def save(self):
        user = self.context['request'].user
        new_password = self.validated_data['new_password']
        user.password = make_password(new_password)
        user.save()
