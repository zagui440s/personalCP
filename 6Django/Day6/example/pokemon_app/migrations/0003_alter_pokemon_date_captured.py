# Generated by Django 4.2 on 2023-04-19 08:11

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pokemon_app', '0002_alter_pokemon_date_captured'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pokemon',
            name='date_captured',
            field=models.DateTimeField(default=datetime.datetime(2023, 4, 19, 8, 11, 3, 140601, tzinfo=datetime.timezone.utc)),
        ),
    ]