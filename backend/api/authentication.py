import datetime
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
import jwt
from django.conf import settings
from django.contrib.auth import get_user_model

User = get_user_model()

def create_refresh_token(user_id):
    expiration_time = datetime.utcnow() + datetime.timedelta(hours=1)

    payload = {
        'user_id': user_id,
        'exp': expiration_time,
        'iat': datetime.utcnow(),
    }

    token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
    return token

class JWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        token = request.COOKIES.get('jwt') 
        print(request.path)

        if request.path == "/api/auth/login/":
            return None
        
        if not token:
            return None 
        
        try:
            decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = decoded_token.get('user_id')
            if not user_id:
                raise AuthenticationFailed("Invalid token: User ID not found")

            user = User.objects.get(id=user_id)
            return (user, None) 

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Token has expired")
        except jwt.InvalidTokenError:
            raise AuthenticationFailed("Invalid token")
        except User.DoesNotExist:
            raise AuthenticationFailed("No such user")
