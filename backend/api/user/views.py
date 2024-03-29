
from rest_framework import serializers, viewsets
from rest_framework import permissions
from rest_framework.permissions import AllowAny
from .models import CustomUser
from .serializers import UserSrializer
from django.http import JsonResponse, request
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import login, logout
import random
import re

# Create your views here.


def generate_session_token(length=10):
    return ''.join(random.SystemRandom().choice([chr(i) for i in range(97, 123)] + [str(i) for i in range(10)]) for _ in range(length))


@csrf_exempt
def signin(request):
    if not request.method == 'POST':
        return JsonResponse({'error': 'Send a post request with value parameter only'})

    username = request.POST.get('email', False)
    password = request.POST.get('password', False)

    # validation part

    if not re.match("^[\w\.\+\-]+\@[\w]+\.[a-z]{2,3}$", str(username)):
        return JsonResponse({'error': ' Enter a vaild email'})

    if len(password) < 3:
        return JsonResponse({'error': 'password need to a least of 3 char'})

    UserModel = get_user_model()

    try:
        user = UserModel.objects.get(email=username)

        if user.check_password(password):
            usr_dict = UserModel.objects.filter(
                email=username).values().first()
            usr_dict.pop('password')

            if user.session_token != "0":
                user.session_token = "0"
                user.save()
                return JsonResponse({'error': "Previos session exists!"})

            token = generate_session_token()
            user.session_token = token
            user.save()
            login(request, user)
            return JsonResponse({'token': token, 'user': usr_dict})
        else:
            return JsonResponse({'error': 'invalid password'})

    except UserModel.DoesNotExist:
        return JsonResponse({'error': 'invalid email'})


def signout(request, id):
    logout(request)

    UserModel = get_user_model()

    try:
        user = UserModel.objects.get(pk=id)
        user.session_token = "0"
        user.save()
    except UserModel.DoesNotExist:
        return JsonResponse({'error': 'invalid user Id'})

    return JsonResponse({'success': 'Logout success'})


class UserViewSet(viewsets.ModelViewSet):
    permission_classes_by_action = {'create': [AllowAny]}

    queryset = CustomUser.objects.all().order_by('id')
    serializer_class = UserSrializer

    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            return [permission() for permission in self.permission_classes]
