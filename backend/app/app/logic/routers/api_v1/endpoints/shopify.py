from typing import cast, Tuple, Dict, Any, List
from app.db.session import database

from sqlalchemy import select
from fastapi import APIRouter, Depends
import jwt
from app.models.user import users, oauth_accounts
from sqlalchemy.orm import Session
from app.core import config
from app.schemas import user


from app.logic.deps import (get_db,
                            get_current_user,
                            get_current_active_user,
                            get_current_superuser
                            )

import httpx
import json

SECRET = config.SECRET
ALGORITHM = 'HS256'

router = APIRouter()

API_ENDPOINT = "https://{shop}/admin/api/2021-04/{query}"


async def httpx_query(shop, query, method, **kwargs):
    api_url = API_ENDPOINT.format(shop=shop, query=query)

    headers = {
        'Access': 'application/json',
        'Content-Type': 'application/json',
    }

    if 'headers' in kwargs.keys():
        for i in kwargs['headers'].keys():
            headers[i] = kwargs['headers'][i]

    if method.lower() == 'get':
        async with httpx.AsyncClient() as client:
            response = await client.get(api_url, headers=headers)
    elif method.lower() == 'post':
        async with httpx.AsyncClient() as client:
            response = await client.post(api_url, headers=headers,
                                         data=json.dumps(kwargs['data'])
                                         )
    # Methods Put and Delete not implemented
    response_data = cast(Dict[str, Any], response.json())
    return response_data


@router.get('/getimages')
async def get_images(
    user=Depends(get_current_user)
):

    user_id = user.id
    access_token = ''

    for i in user.oauth_accounts:
        if i.oauth_name == "shopify":
            access_token = i.access_token
            break
        else:
            raise ValueError("User dont have oauth account")

    shopify_myshopify_domain = user.shopify_myshopify_domain

    query = "products.json?fields=id,images,title"

    response = await httpx_query(shopify_myshopify_domain, query, 'get',
                                 headers={
                                     "X-Shopify-Access-Token": access_token}
                                 )

    delete_keys = ['id', 'position', 'created_at', 'updated_at',
                   'alt', 'width', 'height', 'variant_ids',
                   'admin_graphql_api_id'
                   ]

    for i in response['products']:
        for e in i['images']:
            for y in delete_keys:
                e.pop(y)

    return response


# TODO
@router.post('/reccuringcharge')
async def create_charge(user=Depends(get_current_user)):

    user_id = user.id
    access_token = ''

    for i in user.oauth_accounts:
        if i.oauth_name == "shopify":
            access_token = i.access_token
            break
        else:
            raise ValueError("User dont have oauth account")

    shopify_myshopify_domain = user.shopify_myshopify_domain

    api_query = "recurring_application_charges.json"

    data = {
        "recurring_application_charge":
        {
            "name": "Super Duper Plan",
            "price": "0.00",
            "return_url": "https://learn-integrations.myshopify.com",
            "capped_amount": 3500,
            "terms": "10 images for free",
            "test": True
        }
    }

    response = await httpx_query(shopify_myshopify_domain, api_query, 'post',
                                 headers={
                                     "X-Shopify-Access-Token": access_token},
                                 data=data
                                 )
    # print(data)
    return response


@router.get('/reccuringcharge')
async def check_charge(user=Depends(get_current_user)):

    user_id = user.id
    access_token = ''
    for i in user.oauth_accounts:
        if i.oauth_name == "shopify":
            access_token = i.access_token
            break
        else:
            raise ValueError("User dont have oauth account")
    shopify_myshopify_domain = user.shopify_myshopify_domain

    query = "recurring_application_charges.json"

    data = await httpx_query(shopify_myshopify_domain, query, 'get',
                             headers={"X-Shopify-Access-Token": access_token}
                             )

    current_active_charge = {}

    for i in data['recurring_application_charges']:
        if i['status'] == 'active':
            current_active_charge['id'] = i['id']
            current_active_charge['balance_remaining'] = i['balance_remaining']
            current_active_charge['name'] = i['name']

    if current_active_charge != {}:
        return current_active_charge
    else:
        return await createcharge(token)


@router.post('/payusecharge')
async def pay_usecharge(price: int, description: str,
	id: int, user=Depends(get_current_user)
	):
    user_id = user.id

    access_token = ''
    for i in user.oauth_accounts:
        if i.oauth_name == "shopify":
            access_token = i.access_token
            break
        else:
            raise ValueError("User dont have oauth account")
    shopify_myshopify_domain = user.shopify_myshopify_domain

    data = {
        "usage_charge": {
            "description": description,
            "price": price
        }
    }

    api_query = "recurring_application_charges/{id}/usage_charges.json".format(
        id=id)

    response_data = await httpx_query(shopify_myshopify_domain, api_query, 'post',
                                      headers={
                                          "X-Shopify-Access-Token": access_token},
                                      data=data
                                      )

    return response_data


@router.get('/test')
async def test(user=Depends(get_current_user)):

    return user
