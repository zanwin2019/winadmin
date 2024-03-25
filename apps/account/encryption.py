# from builtins import chr
# from builtins import str
# from builtins import range
# import hashlib
# import random
# from base64 import urlsafe_b64encode, urlsafe_b64decode

# from Crypto.Cipher import AES

# from django.conf import settings

# """
# 登录态加密方法.

# 使用AES算法，ECB模式
# """


# def pad(text, blocksize=16):
#     """
#     PKCS#5 Padding
#     """
#     pad = blocksize - (len(text) % blocksize)
#     return text + pad * chr(pad)


# def unpad(text):
#     """
#     PKCS#5 Padding
#     """
#     pad = ord(text[-1])
#     return text[:-pad]


# def decrypt(ciphertext, key="", base64=True):
#     """
#     AES Decrypt
#     """
#     if not key:
#         key = settings.SECRET_KEY

#     if base64:
#         ciphertext = urlsafe_b64decode(str(ciphertext + "=" * (4 - len(ciphertext) % 4)))

#     data = ciphertext
#     key = hashlib.md5(key).digest()
#     cipher = AES.new(key, AES.MODE_ECB)
#     return unpad(cipher.decrypt(data))


# def encrypt(plaintext, key="", base64=True):
#     """
#     AES Encrypt
#     """
#     if not key:
#         key = settings.SECRET_KEY

#     key = hashlib.md5(key).digest()
#     cipher = AES.new(key, AES.MODE_ECB)
#     ciphertext = cipher.encrypt(pad(plaintext))

#     # 将密文base64加密
#     if base64:
#         ciphertext = urlsafe_b64encode(str(ciphertext)).rstrip("=")

#     return ciphertext


# def salt(length=8):
#     """
#     生成长度为length 的随机字符串
#     """
#     aplhabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
#     return "".join([random.choice(aplhabet) for _ in range(length)])
