__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Standard library imports...
import json

# Third-party imports...
from rest_framework import permissions, status, views, viewsets
from rest_framework.response import Response

# Django imports...
from django.contrib.auth import authenticate, get_user_model, login, logout

# Local imports...
from .permissions import IsAccountOwner
from .serializers import UserSerializer

User = get_user_model()


class UserViewSet(viewsets.ModelViewSet):
    lookup_field = 'username'
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return [permissions.AllowAny()]

        if self.request.method == 'POST':
            return [permissions.AllowAny()]

        return [permissions.IsAuthenticated(), IsAccountOwner()]

    def create(self, request):
        serializer = self.serializer_class(data=request.data, partial=True)

        if serializer.is_valid():
            User.objects.create_user(**serializer.validated_data)

            return Response(serializer.validated_data, status=status.HTTP_201_CREATED)

        return Response({
            'status': 'Bad request',
            'message': 'Account could not be created with received data.'
        }, status=status.HTTP_400_BAD_REQUEST)


class LogInView(views.APIView):
    def post(self, request, format=None):
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        # Authenticate the user...
        user = authenticate(username=username, password=password)

        if user is not None:
            if user.is_active:
                login(request, user)

                return Response(UserSerializer(user).data)

            else:
                return Response({
                    'status': 'Unauthorized',
                    'message': 'This account has been disabled.'
                }, status=status.HTTP_401_UNAUTHORIZED)

        else:
            return Response({
                'status': 'Unauthorized',
                'message': 'Username/password combination invalid.'
            }, status=status.HTTP_401_UNAUTHORIZED)


class LogOutView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, format=None):
        logout(request)

        return Response({}, status=status.HTTP_204_NO_CONTENT)
