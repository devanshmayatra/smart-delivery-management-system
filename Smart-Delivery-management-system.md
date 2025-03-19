---
title: Smart Delivery management system
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.28"

---

# Smart Delivery management system

Base URLs:

# Authentication

# partners

## GET get_partners

GET /api/partners

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## POST add_partner

POST /api/partners

> Body Parameters

```json
{
  "name": "Rajesh Kumar",
  "email": "rajesh.kumar@example.com",
  "phone": "9876543210",
  "status": "active",
  "currentLoad": 0,
  "areas": [
    "67d84ed5a588b7f85b2ba5c8"
  ],
  "shift": {
    "start": "2025-03-17T08:00:00Z",
    "end": "2025-03-17T16:00:00Z"
  },
  "metrics": {
    "rating": 0,
    "completedOrders": 0,
    "cancelledOrders": 0
  }
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» name|body|string| yes |none|
|» email|body|string| yes |none|
|» phone|body|string| yes |none|
|» status|body|string| yes |none|
|» currentLoad|body|integer| yes |none|
|» areas|body|[string]| yes |none|
|» shift|body|object| yes |none|
|»» start|body|string| yes |none|
|»» end|body|string| yes |none|
|» metrics|body|object| yes |none|
|»» rating|body|integer| yes |none|
|»» completedOrders|body|integer| yes |none|
|»» cancelledOrders|body|integer| yes |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## PUT update_partner

PUT /api/partners/67d7b7ac37210511cea3c376

> Body Parameters

```json
{
  "name": "Devansh Mayatra",
  "shift": {}
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» name|body|string| yes |none|
|» shift|body|object| yes |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## DELETE delete_partner

DELETE /api/partners/67d7b7ba37210511cea3c379

> Body Parameters

```json
{
  "name": "Devansh Mayatra",
  "shift": {}
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» name|body|string| yes |none|
|» shift|body|object| yes |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

# orders

## GET get_orders

GET /api/orders

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## POST add_order

POST /api/orders

> Body Parameters

```json
{
  "orderNumber": "ORD1003",
  "customer": {
    "name": "Aryan Mehta",
    "phone": "9876543210",
    "address": "123, MG Road, Bengaluru"
  },
  "area": "67d84ed5a588b7f85b2ba5c8",
  "items": [
    {
      "name": "Burger",
      "quantity": 2,
      "price": 150
    },
    {
      "name": "Fries",
      "quantity": 1,
      "price": 80
    }
  ],
  "status": "pending",
  "scheduledFor": "2025-03-17T13:00:00Z",
  "assignedTo": null,
  "totalAmount": 380
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» orderNumber|body|string| yes |none|
|» customer|body|object| yes |none|
|»» name|body|string| yes |none|
|»» phone|body|string| yes |none|
|»» address|body|string| yes |none|
|» area|body|string| yes |none|
|» items|body|[object]| yes |none|
|»» name|body|string| yes |none|
|»» quantity|body|integer| yes |none|
|»» price|body|integer| yes |none|
|» status|body|string| yes |none|
|» scheduledFor|body|string| yes |none|
|» assignedTo|body|null| yes |none|
|» totalAmount|body|integer| yes |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## POST assign_order

POST /api/orders/assign

> Body Parameters

```json
{
  "orderID": "67d934be25becbbe8f543fcf",
  "partnerID": "67d923ee651a4dfa15c6f837"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» orderID|body|string| yes |none|
|» partnerID|body|string| yes |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## PUT change-order_status

PUT /api/orders/67d934be25becbbe8f543fcf/status

> Body Parameters

```json
{
  "status": "delivered"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» status|body|string| yes |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

# assignments

## POST assign_all_orders

POST /api/assignments/run

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## GET get_assignments

GET /api/assignments

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## GET get_metrics

GET /api/assignments/metrics

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

# area

## GET get_areas

GET /api/area

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## POST add_area

POST /api/area

> Body Parameters

```json
{
  "name": "Nalasopara"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» name|body|string| yes |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

# Data Schema

<h2 id="tocS_Pet">Pet</h2>

<a id="schemapet"></a>
<a id="schema_Pet"></a>
<a id="tocSpet"></a>
<a id="tocspet"></a>

```json
{
  "id": 1,
  "category": {
    "id": 1,
    "name": "string"
  },
  "name": "doggie",
  "photoUrls": [
    "string"
  ],
  "tags": [
    {
      "id": 1,
      "name": "string"
    }
  ],
  "status": "available"
}

```

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|id|integer(int64)|true|none||Pet ID|
|category|[Category](#schemacategory)|true|none||group|
|name|string|true|none||name|
|photoUrls|[string]|true|none||image URL|
|tags|[[Tag](#schematag)]|true|none||tag|
|status|string|true|none||Pet Sales Status|

#### Enum

|Name|Value|
|---|---|
|status|available|
|status|pending|
|status|sold|

<h2 id="tocS_Category">Category</h2>

<a id="schemacategory"></a>
<a id="schema_Category"></a>
<a id="tocScategory"></a>
<a id="tocscategory"></a>

```json
{
  "id": 1,
  "name": "string"
}

```

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|id|integer(int64)|false|none||Category ID|
|name|string|false|none||Category Name|

<h2 id="tocS_Tag">Tag</h2>

<a id="schematag"></a>
<a id="schema_Tag"></a>
<a id="tocStag"></a>
<a id="tocstag"></a>

```json
{
  "id": 1,
  "name": "string"
}

```

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|id|integer(int64)|false|none||Tag ID|
|name|string|false|none||Tag Name|

