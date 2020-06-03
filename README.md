# Bulk Account Import Generator #
Simple script to generate a number of accounts to import into Salesforce using the 
Bulk API.

## Using the Bulk API ##

### Start a new Job ###
```
POST /services/data/v48.0/jobs/ingest HTTP/1.1
Host: https://mydomain.my.salesforce.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer 00D5I00...S0kwbfHIOV6.LQ6N16.a8uSv...vXBRYC

{
	"object": "Account",
	"contentType": "CSV",
	"operation": "upsert",
	"lineEnding": "CRLF",
	"externalIdFieldName": "External_ID__c"
}
```

### Add data to Job ###
```
PUT /services/data/v48.0/jobs/ingest/7505I0000027RCfQAM/batches HTTP/1.1
Host: https://mydomain.my.salesforce.com
Content-Type: text/csv
Accept: application/json
Authorization: Bearer 00D5I00...S0kwbfHIOV6.LQ6N16.a8uSv...vXBRYC

External_ID__c,Imported__c,Name,BillingPostalCode,BillingCountry,BillingCity,BillingState
IMP-00000001,1,Noisy Frog 7024,5936,Norge,MANGER,ALVER
IMP-00000002,1,Autumn King 5343,7436,Norge,TRONDHEIM,TRONDHEIM
IMP-00000003,1,Withered Sun 4378,7893,Norge,SKOROVATN,NAMSSKOGAN
IMP-00000004,1,Quiet Rice 5638,9376,Norge,SKATVIK,SENJA
IMP-00000005,1,Throbbing Wildflower 6412,0875,Norge,OSLO,OSLO
IMP-00000006,1,Sweet Fog 9123,8118,Norge,MOLDJORD,BEIARN
IMP-00000007,1,Spring Term 3634,5775,Norge,NÅ,ULLENSVANG
IMP-00000008,1,Snowy Cell 6993,0360,Norge,OSLO,OSLO
IMP-00000009,1,Throbbing Butterfly 5359,2024,Norge,GJERDRUM,GJERDRUM
IMP-00000010,1,Shrill Base 1551,7562,Norge,SAKSVIK,MALVIK
```

### Close Job ###
```
PATCH /services/data/v48.0/jobs/ingest/7505I0000027RCfQAM HTTP/1.1
Host: https://mydomain.my.salesforce.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer 00D5I00...S0kwbfHIOV6.LQ6N16.a8uSv...vXBRYC

{
	"state": "UploadComplete"
}
```

### Abort the Job ###
```
PATCH /services/data/v48.0/jobs/ingest/7505I0000027RCfQAM HTTP/1.1
Host: https://mydomain.my.salesforce.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer 00D5I00...S0kwbfHIOV6.LQ6N16.a8uSv...vXBRYC

{
	"state": "Aborted"
}
```

### Job Status ###
```
GET /services/data/v48.0/jobs/ingest/7505I0000027RCfQAM HTTP/1.1
Host: https://mydomain.my.salesforce.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer 00D5I00...S0kwbfHIOV6.LQ6N16.a8uSv...vXBRYC
```
