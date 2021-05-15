import json
import requests
from datetime import datetime

WEBSITE_BASE_URL = "https://exclusive-promocode.com"
EMAIL_SUB_API_URL = "https://api.pushnami.com/api/email/subscribe"

def handler(event, context):
    body = json.loads(event.get("body"))
    email = body.get("email")
    registration_url = body.get("registration_url")

    if not email or not registration_url:
        return not_invalid_body_response()

    res = requests.post(
        url=EMAIL_SUB_API_URL,
        json={
            "key": "", #TODO GET
            "email": email,
            "registrationUrl": registration_url,
            "timestamp": datetime.now().isoformat()
        }
    )

    if res.ok:
        response_content = res.json()
        subscribedEmail = response_content.get("subscriberEmail")
        subscribedId = response_content.get("subscriberId")
        return {
            "success": True
        }
    
    return internal_server_error_response()


def not_invalid_body_response():
    return {
        "statusCode": 400,
        "headers": response_headers(),
        "body": json.dumps({
            "errorMessage": "Invalid body"
        })
    }


def internal_server_error_response():
    return {
        "statusCode": 500,
        "headers": response_headers(),
        "body": json.dumps({
            "errorMessage": "Internal server error"
        })
    }
    

def response_headers():
    return {
      'Access-Control-Allow-Origin': WEBSITE_BASE_URL,
      'Access-Control-Allow-Credentials': True,
    },