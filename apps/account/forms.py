from builtins import object
from django.contrib.auth.forms import UserCreationForm, UserChangeForm

from .models import WaUser


class WaUserCreationForm(UserCreationForm):
    """
    A form that creates a user, with no privileges, from the given email andpassword
    """

    def __init__(self, *args, **kargs):
        super(WaUserCreationForm, self).__init__(*args, **kargs)

    class Meta(object):
        model = WaUser
        fields = ("username",)


class WaUserChangeForm(UserChangeForm):
    """
    A form for updating users

    Includes all the fields onthe user,
    but replaces the password field with admin'spassword hash display field.
    """

    def __init__(self, *args, **kargs):
        super(WaUserChangeForm, self).__init__(*args, **kargs)

    class Meta(object):
        model = WaUser
        fields = ("username", "password")
