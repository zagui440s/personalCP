# Generated by Django 5.1.3 on 2024-11-13 16:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pokemon_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='pokemon',
            name='captured',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='pokemon',
            name='date_encountered',
            field=models.DateField(default='2024-11-13'),
        ),
    ]
