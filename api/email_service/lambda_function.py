try:
  import unzip_requirements
except ImportError:
  pass

import json
import urllib.parse
import re
import os

from mailwizz.base import Base
from mailwizz.config import Config
from mailwizz.endpoint.list_subscribers import ListSubscribers

LIST_ID = os.environ["LIST_ID"]
MAILWIZZ_API_KEY = os.environ["MAILWIZZ_API_KEY"]
MAILWIZZ_API_URL = "https://www.ap.exclusive-deals-everyday.com/api/index.php"
WEBSITE_BASE_URL = "https://exclusive-promocode.com"

def setup():
    # configuration object
    config = Config({
        'api_url': MAILWIZZ_API_URL,
        'public_key': MAILWIZZ_API_KEY,
        'private_key': "",
        'charset': 'utf-8'
    })

    # now inject the configuration and we are ready to make api calls
    Base.set_config(config)

setup()

endpoint = ListSubscribers()

def handler(event, context):  
    body = event.get("body") or ""
    query_string = parse_query_string(body)
        
    email = query_string.get("email")
    source = query_string.get("source", "UNKNOWN")
    
    try:
        if not email:
            return not_invalid_body_response()

        if not is_email_valid(email):
            return not_invalid_body_response("Invalid email")   

        endpoint.create(
            LIST_ID,
            {
                'EMAIL': email,
                'SOURCE': source
            }
        )

        return success_response()
    except Exception as e:
        return internal_server_error_response()

def parse_query_string(qs):
    qs_elements = qs.split("&")
    query_params = {}
    for qs_element in qs_elements:
        key_value = qs_element.split("=")
        query_params[key_value[0]] = urllib.parse.unquote(key_value[1])
    return query_params

def is_email_valid(email):
    if(re.fullmatch(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', email)):
        return True
    else:
        return False

def success_response():
    return {
        "statusCode": 200,
        "headers": response_headers(),
        "body": json.dumps({
            "success": True
        })
    }


def not_invalid_body_response(msg="Invalid body"):
    return {
        "statusCode": 400,
        "headers": response_headers(),
        "body": json.dumps({
            "errorMessage": msg
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
      'Content-Type': 'application/json'
    }