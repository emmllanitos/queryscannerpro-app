# Generated by Django 4.2.5 on 2023-10-10 13:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('queryscannerpro', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='queryfile',
            old_name='content',
            new_name='result',
        ),
    ]
