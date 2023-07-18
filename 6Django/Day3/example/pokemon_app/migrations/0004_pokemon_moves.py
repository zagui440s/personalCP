# Generated by Django 4.2 on 2023-07-18 06:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('move_app', '0001_initial'),
        ('pokemon_app', '0003_alter_pokemon_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='pokemon',
            name='moves',
            field=models.ManyToManyField(related_name='pokemon', to='move_app.move'),
        ),
    ]
