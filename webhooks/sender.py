import sys
import requests
import hmac
import hashlib

secret = 'abcd!'
endpoint = 'http://localhost:8000/webhooks/on_message_sent'

for message in sys.stdin:
    signature = hmac.new(secret.encode('utf8'), message.encode('utf8'), hashlib.sha256).hexdigest()
    res = requests.post(endpoint, 
                        data={'message': message},
                        headers={'x-signature': signature})
    print(f"{res.status_code} {res.content}")