from rest_framework import serializers
from .models import Tenant, Domain


class DomainsSerializer(serializers.ModelSerializer):
    # 将 tenant 字段标记为 read_only=True，以避免验证
    tenant = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = Domain
        fields = '__all__'


class TenantSerializer(serializers.ModelSerializer):
    domains = DomainsSerializer(many=True, required=False)

    class Meta:
        model = Tenant
        fields = '__all__'

    def create(self, validated_data):
        # 从 validated_data 中获取域名数据
        domains_data = validated_data.pop('domains', [])

        # 创建租户
        tenant = Tenant.objects.create(**validated_data)

        # 创建或更新关联的域名
        for domain_data in domains_data:
            domain_data.update({
                "tenant": tenant
            })
            domain, created = Domain.objects.update_or_create(domain=domain_data['domain'], defaults=domain_data)
            # 将域名关联到租户
            tenant.domains.add(domain)

        return tenant

    def update(self, instance, validated_data):
        # 从 validated_data 中获取域名数据
        domains_data = validated_data.pop('domains', [])

        # 更新租户信息
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()

        # 创建或更新关联的域名
        for domain_data in domains_data:
            domain = Domain.objects.get(tenant=instance)
             # 更新域名信息
            for key, value in domain_data.items():
                setattr(domain, key, value)
            domain.save()
            # 将新域名关联到租户
            instance.domains.add(domain)

        return instance
