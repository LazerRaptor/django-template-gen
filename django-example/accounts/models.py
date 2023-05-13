from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager


class UserManager(BaseUserManager):
    def get_by_natural_key(self, username):
        return self.get(email__iexact=username)

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Field \"email\" cannot be empty.")
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_active", True)
        user = self.create_user(email, password, **extra_fields)
        return user


class User(AbstractUser):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=120, blank=True, default="")
    email = models.EmailField(unique=True)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email
