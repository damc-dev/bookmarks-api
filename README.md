Travis-CI: [![Build Status](https://travis-ci.org/damc-dev/bookmarks-api.svg?branch=master)](https://travis-ci.org/damc-dev/bookmarks-api)

# bookmarks-api
API for saving and retrieving bookmarks

# Bookmark
## List
```
GET /bookmark
```
Lists all bookmarks

## Find
```
GET /bookmark/{bookmark-id}
```

### Fields

| Name | Description | Type |
| ---- | ----------- | ---- |
| date_added | Date the bookmark was added | datetime |
| id | number used as unique identifier | long |
| name | The name specified for the bookmark | string |
| type | The type of bookmark (defaults to url) | string |
| url | The web address of the bookmark | string |

## Create
```
POST /bookmark
```
### Fields
| Name | Description | Type |
| ---- | ----------- | ---- |
| name | The name specified for the bookmark | string |
| type | The type of bookmark (defaults to url) | string |
| url | The web address of the bookmark | string |

## Update

```
PUT /bookmark/{bookmark-id}
```
### Fields
| Name | Description | Type |
| ---- | ----------- | ---- |
| name | The name specified for the bookmark | string |
| type | The type of bookmark (defaults to url) | string |
| url | The web address of the bookmark | string |

## Delete
```
DELETE /bookmark/{bookmark-id}
```
