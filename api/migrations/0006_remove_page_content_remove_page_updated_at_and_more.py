# Generated by Django 5.2.3 on 2025-07-04 14:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_page'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='page',
            name='content',
        ),
        migrations.RemoveField(
            model_name='page',
            name='updated_at',
        ),
        migrations.AlterField(
            model_name='page',
            name='published',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='page',
            name='title',
            field=models.CharField(max_length=200),
        ),
    ]
