# Generated by Django 4.2.11 on 2024-03-09 10:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='level',
            name='level',
            field=models.IntegerField(null=True),
        ),
    ]