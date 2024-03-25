# -*- coding: utf-8 -*-

import os
from config.default import *  # noqa
"""
You can load different configurations depending on yourcurrent environment.

 This can be the following values:

      development
      testing
      production
"""

ENVIRONMENT = os.environ.get("APP_ENV", "development")
# Inherit from environment specifics
conf_module = "config.%s" % ENVIRONMENT

try:
    module = __import__(conf_module, globals(), locals(), ['*'])
except ImportError as e:
    raise ImportError("Could not import conf '%s' (Is it on sys.path?): %s" % (conf_module, e))

for setting in dir(module):
    if setting == setting.upper():
        locals()[setting] = getattr(module, setting)
