# Generated by Django 4.2.16 on 2024-11-19 05:35

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('test_module', '0005_userquizattempt_test_module_id_d62726_idx'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userquizattempt',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user', to=settings.AUTH_USER_MODEL),
        ),
    ]