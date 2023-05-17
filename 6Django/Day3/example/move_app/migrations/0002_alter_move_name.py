# Generated by Django 4.2 on 2023-04-16 06:35

from django.db import migrations, models
import move_app.validators


class Migration(migrations.Migration):

    dependencies = [
        ('move_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='move',
            name='name',
            field=models.CharField(max_length=250, validators=[move_app.validators.validate_move_name]),
        ),
    ]