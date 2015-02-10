Travis-CI: [![Build Status](https://travis-ci.org/damc-dev/bookmarks-api.svg?branch=master)](https://travis-ci.org/damc-dev/bookmarks-api)

# bookmarks-api
API for saving and retrieving bookmarks


| Root | Description |
| ---- | ------------|
| /user | Get Details for a user |

# User
## /user

/user/{user-id}

A user represents a person. The /{user-id} node returns data for a single user.

## Reading
```
GET /v1.0/user/{user-id}
```

### Fields

| Name | Description | Type |
| ---- | ----------- | ---- |
| id   | The unique id of the persons account | string |
| created_date | The Date the user was created | datetime |
| email | The persons primary email | string |
|first_name | The person's first name | string |
| last_name | The person's last name | string |
| name | The person's full name | string |

## Creating
```
POST /v1.0/user
```

### Fields

| Name | Description | Type |
| ---- | ----------- | ---- |
| email | The persons primary email | string |
|first_name | The person's first name | string |
| last_name | The person's last name | string |
| name | The person's full name | string |

## Edges

| Name | Description |
| ---- | ------------|
| /bookmarks | Get the bookmarks for a user |

## /user/{user-id}/bookmarks
An array of the user's bookmark objects

----

# Bookmark
## /bookmark

/bookmark/{bookmark-id}

## Reading
```
GET /v1.0/bookmark/{bookmark-id}
```

### Fields

| Name | Description | Type |
| ---- | ----------- | ---- |
| date_added | Date the bookmark was added | datetime |
| id | number used as unique identifier | long |
| name | The name specified for the bookmark | string |
| type | The type of bookmark (defaults to url) | string |
| url | The web address of the bookmark | string |

## Creating
```
POST /v1.0/bookmark
```
| Name | Description | Type |
| ---- | ----------- | ---- |
| name | The name specified for the bookmark | string |
| type | The type of bookmark (defaults to url) | string |
| url | The web address of the bookmark | string |
