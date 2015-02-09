# bookmarks-api
API for saving and retrieving bookmarks


| Root | Description |
| ---- | ------------|
| /user | Get Details for a user |

# User
## /user

/user/{user-id}

A user represents a person. The /{user-id} node returns data for a single user.

### Fields

| Name | Description | Type |
| ---- | ----------- | ---- |
| id   | The unique id of the persons account | string |
| email | The persons primary email | string |
|first_name | The person's first name | string |
| last_name | The person's last name | string |
| name | The person's full name | string |

### Edges

| Name | Description |
| ---- | ------------|
| /bookmark | Get the bookmarks for a user |

# /{user-id}/bookmark
An array of the user's bookmark objects

----

# Bookmark
## /bookmark

/bookmark/{bookmark-id}

## Reading
### Fields

| Name | Description | Type |
| ---- | ----------- | ---- |
| date_added | Date the bookmark was added | datetime |
| id | number used as unique identifier | long |
| name | The name specified for the bookmark | string |
| type | The type of bookmark (defaults to url) | string |
| url | The web address of the bookmark | string |

## Creating

| Name | Description | Type |
| ---- | ----------- | ---- |
| name | The name specified for the bookmark | string |
| type | The type of bookmark (defaults to url) | string |
| url | The web address of the bookmark | string |
