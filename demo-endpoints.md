# OceanIQ Demo Endpoints

For authenticated requests, add header after logging in:

User: 
Authorization: Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiIxMyIsImlhdCI6MTc3NzMyMzAwOCwiZXhwIjoxNzc3NDA5NDA4fQ.y1cs5vqpMCvTMdEEiZrxHMRffVc2IY8aui290dbsbJD7Tm2s6938VOdsAQif2fB7

Admin: 
Authorization: Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiIxNSIsImlhdCI6MTc3NzM2NzY3MiwiZXhwIjoxNzc3NDU0MDcyfQ.M3UcCYlmk6b8__CJDrZa3gwst3_vM0cACmH2Rc8qRsglhuwXRzFb9mJAkVanW8sL

# 1. Auth

## Register User

```http
POST http://localhost:8080/api/v1/auth/register
```

```json
{
  "name": "Demo User",
  "email": "demo.user@example.com",
  "password": "password123"
}
```

## Login User

```http
POST http://localhost:8080/api/v1/auth/login
```

```json
{
  "email": "demo.user@example.com",
  "password": "password123"
}
```
Copy returned token into `Authorization` header for protected requests

## Register / Login Admin

```http
POST http://localhost:8080/api/v1/auth/register
```

```json
{
  "name": "Demo Admin",
  "email": "demo2.admin@example.com",
  "password": "password123"
}
```

POST http://localhost:8080/api/v1/auth/login

```json
{
  "email": "demo2.admin@example.com",
  "password": "password123"
}
```

in PostreSQL, run query: 

```SQL
UPDATE users
SET role = 'ADMIN'
WHERE email = 'demo2.admin@example.com';
```
Login again and copy returned token into `Authorization` header for  admin protected requests

## Update user status

```http
PUT http://localhost:8080/api/v1/admin/users/15/role
```
```json
{
  "role": "ADMIN"
}
```

# 2. Region & Species data

## Get Regions

```http
GET http://localhost:8080/api/v1/regions
```

## Get Region By ID

```http
GET http://localhost:8080/api/v1/regions/1
```

## Get Regions By Ocean

```http
GET http://localhost:8080/api/v1/regions/ocean/Pacific
```

## Get Species

```http
GET http://localhost:8080/api/v1/species
```

## Get Species Categories

```http
GET http://localhost:8080/api/v1/species/categories
```

## Get Species Habitat

```http
GET http://localhost:8080/api/v1/species/habitats
```


## Get Conservation Stats

```http
GET http://localhost:8080/api/v1/species/conservation/stats
```

# 3. Learning Modules

## Get All Learning Modules

```http
GET http://localhost:8080/api/v1/modules
```

## Search Learning Modules

```http
GET http://localhost:8080/api/v1/modules?search=marine
```

## Get Learning Module By ID

```http
GET http://localhost:8080/api/v1/modules/1
```

## Update Module Progress

(Requires login)

```http
POST http://localhost:8080/api/v1/modules/progress
```

```json
{
  "moduleId": 1,
  "progress": 50,
  "currentLesson": 1
}
```

# 4. Interactive Timeline

## Get Timeline Events

```http
GET http://localhost:8080/api/learn/timeline
```

## Create Timeline Event

```http
POST http://localhost:8080/api/learn/timeline
```

```json
{
  "year": "2026",
  "title": "OceanIQ Demo Milestone",
  "description": "A demo timeline event for the presentation.",
  "extendedDetails": "This shows that timeline events can be created through the API.",
  "impact": "positive"
}
```

## Update Timeline Event

```http
PUT http://localhost:8080/api/learn/timeline/1
```

```json
{
  "year": "2026",
  "title": "Updated OceanIQ Demo Milestone",
  "description": "Updated timeline event.",
  "extendedDetails": "Updated details.",
  "impact": "positive"
}
```

## Delete Timeline Event

```http
DELETE http://localhost:8080/api/learn/timeline/1
```

# 5. Research Hub / Datasets

## Get Datasets

```http
GET http://localhost:8080/api/v1/datasets
```

## Search Datasets

```http
GET http://localhost:8080/api/v1/datasets?search=marine
```

## Filter Datasets By Status

```http
GET http://localhost:8080/api/v1/datasets?status=VERIFIED
```
Other valid statuses - (PENDING, VERIFIED, FLAGGED)


## Get Dataset By ID

```http
GET http://localhost:8080/api/v1/datasets/1
```

## Create Dataset

(Requires login)

```http
POST http://localhost:8080/api/v1/datasets
```

```json
{
  "name": "Demo Marine Biodiversity Dataset",
  "description": "Dataset uploaded during the presentation demo.",
  "category": "Marine Biodiversity",
  "regionId": 1,
  "speciesIds": [],
  "fileUrl": "/uploads/demo-marine-biodiversity.csv",
  "fileSize": 2048
}
```

## Increment Dataset Download Count

```http
POST http://localhost:8080/api/v1/datasets/1/download
```

## Update Dataset Status

(Admin only)

```http
PUT http://localhost:8080/api/v1/datasets/1/status?status=VERIFIED
```

## Flag Dataset

(Admin only)

```http
PUT http://localhost:8080/api/v1/datasets/1/flag
```

```json
{
  "reason": "Demo flag reason"
}
```

## Delete Dataset

(Admin only)

```http
DELETE http://localhost:8080/api/v1/datasets/1
```

# 6. Impact Reports

## Get Impact Reports

```http
GET http://localhost:8080/api/v1/impact
```

## Filter Impact Reports By Level

```http
GET http://localhost:8080/api/v1/impact?impact=HIGH
```
Valid impact levels - (HIGH, MODERATE, LOW)


## Filter Impact Reports By Type

```http
GET http://localhost:8080/api/v1/impact?type=EIA
```

Valid report types - (EIA, REMP, APEI)


## Create Impact Report

(Requires login)

```http
POST http://localhost:8080/api/v1/impact
```

```json
{
  "title": "Demo Environmental Impact Assessment",
  "impact": "HIGH",
  "reportType": "EIA",
  "regionId": 1
}
```

# 7. Incident Reporting

## Get Incident Reports

```http
GET http://localhost:8080/report
```

## Get Incident Report By ID

```http
GET http://localhost:8080/report/1
```

## Find Incident Report By Title

```http
GET http://localhost:8080/report/findByTitle?title=Demo%20Illegal%20Fishing%20Report
```

## Submit Incident Report

(Requires login)

```http
POST http://localhost:8080/report
```

```json
{
  "userId": 1,
  "contractorId": 1,
  "regionId": 1,
  "regionName": "Clarion-Clipperton Zone",
  "reportType": "ILLEGAL_FISHING",
  "title": "Demo Illegal Fishing Report",
  "summaryText": "This is a presentation demo incident report."
}
```
## Find Incident Report By Report Type

GET http://localhost:8080/report?reportType=ILLEGAL_FISHING

Valid report types - POLLUTION, ILLEGAL_FISHING, HABITAT_DESTRUCTION, SPECIES_THREAT, OTHER

## Update Incident Status

(Admin only)

```http
PATCH http://localhost:8080/report/1/status
```

```json
{
  "status": "UNDER_REVIEW"
}
```

Valid statuses - (DRAFT, SUBMITTED, UNDER_REVIEW, APPROVED, REJECTED)


## Delete Incident Report

(Admin only)

```http
DELETE http://localhost:8080/report/1
```

# 8. Incident Evidence / Report 

## Get Evidence Files

```http
GET http://localhost:8080/reportfile
```

## Get Evidence File By ID

```http
GET http://localhost:8080/reportfile/1
```

## Find Evidence By File Name

```http
GET http://localhost:8080/reportfile/findByFileName?fileName=demo-photo.jpg
```

### Create Evidence File

(Requires login)

```http
POST http://localhost:8080/reportfile
```

```json
{
  "reportId": 1,
  "fileName": "demo-photo.jpg",
  "fileUrl": "/uploads/demo-photo.jpg",
  "mimeType": "image/jpeg",
  "fileSize": 1024,
  "checksum": "demo-checksum",
  "evidenceType": "PHOTO"
}
```

### Update Evidence File

```http
PUT http://localhost:8080/reportfile/1
```

```json
{
  "fileName": "updated-demo-photo.jpg",
  "fileUrl": "/uploads/updated-demo-photo.jpg",
  "mimeType": "image/jpeg",
  "fileSize": 2048,
  "checksum": "updated-demo-checksum",
  "evidenceType": "PHOTO"
}
```

### Delete Evidence File

```http
DELETE http://localhost:8080/reportfile/1
```

## 9. Admin Users

Admin only

### Get Users

```http
GET http://localhost:8080/api/v1/admin/users
```

### Get User By ID

```http
GET http://localhost:8080/api/v1/admin/users/1
```

### Flag User

```http
PUT http://localhost:8080/api/v1/admin/users/1/flag
```

```json
{
  "reason": "Demo admin flag reason"
}
```

### Update User Role

```http
PUT http://localhost:8080/api/v1/admin/users/1/role
```

```json
{
  "role": "ADMIN"
}
```

### Delete User

```http
DELETE http://localhost:8080/api/v1/admin/users/1
```

## 10. Admin Stats

(Admin only)

### Get User Stats

```http
GET http://localhost:8080/api/v1/admin/stats?page=0&size=10
```

### Get Stats For User

```http
GET http://localhost:8080/api/v1/admin/stats/1
```

### Get Leaderboard

```http
GET http://localhost:8080/api/v1/admin/stats/leaderboard?page=0&size=10
```
