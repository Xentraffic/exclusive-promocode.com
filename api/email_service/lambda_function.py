try:
  import unzip_requirements
except ImportError:
  pass

import json
import urllib.parse
import re

from mailchimp3 import MailChimp

LIST_ID = '8da1ffa334'
WEBSITE_BASE_URL = "https://exclusive-promocode.com"

mailchimp_client = MailChimp(
    mc_api='a0440e29b1e78a2f4ff64d53fcdd6eb7-us2', 
    mc_user='xentraffic'
)

def handler(event, context):  
    body = event.get("body") or ""
    query_string = parse_query_string(body)
        
    email = query_string.get("email")
    source = query_string.get("source", "UNKNOWN")
    
    try:
        if not email:
            return not_invalid_body_response()

        if check_email(email):
            return not_invalid_body_response("Invalid email")   

        resp = mailchimp_client.lists.members.create(LIST_ID, {
            'email_address': email,
            'status': 'subscribed',
            'merge_fields': {
                'SOURCE': source
            },
        })

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

def check_email(email):
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