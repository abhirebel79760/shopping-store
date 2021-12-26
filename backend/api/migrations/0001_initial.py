from django.db import migrations
from api.user.models import CustomUser


class Migration(migrations.Migration):
    def seed_data(apps, schema_editor):
        user = CustomUser(name="hitesh", email="abhishekshukla9449@gmail.com", is_staff="True", is_active="True", is_superuser="True", phone="98760303", gender="Male")

        user.set_password("Abhishek@1")
        user.save()
    
    dependencies =[

    ]

    operations=[
        migrations.RunPython(seed_data),
    ]