# bendrocorp-node-sdk

[![Build Status](https://travis-ci.org/BendroCorp/bendrocorp-node-sdk.svg?branch=master)](https://travis-ci.org/BendroCorp/bendrocorp-node-sdk) 

#### Pre-Release - should not be used for anything anyone actually cares about :smile:

#### AuthClient
Used to fetch and manage a token. Currently this only supports password authentication and refresh authentication.
```
const authClient = new AuthClient();

// or

// if you want the SDK to manage refresh_tokens for you
const authClient = new AuthClient({ auto_refresh: true });
```

then

```
// this will authorize the client and create an internal token set
await authClient({ email: string, password: string, code?: number, device: string, offline_access?: boolean});
```

If you have already have a saved credential, you can set the credential with the following method:
```
authClient.setCredentials({ access_token?: string, refresh_token?: string, id_token?: string })
```

#### reports (Resource)

##### List
```
// will return the list that the authenticated user has access to
const reportsList = await new offenderResource({ auth: authClient }).list({ kind: 'reports'|'templates' })
```

##### Create
```
// to create a report (any member can)
const newReport = await new offenderResource({ auth: authClient }).create(
  type:'report',
  report: { 
    template_id: string 
  }
) 

// to create a template (you must have proper access)
const newReport = await new offenderResource({ auth: authClient }).create(
  type:'template',
  template: { 
    name: string
  }
) 

// to create a template (you must have proper access)
const newReport = await new offenderResource({ auth: authClient }).create(
  type:'field',
  field: {
    template_id: string,
    name: string,
    validator: string,
    field_presentation_type_id: number,
    required: boolean,
    ordinal: number
  } 
) 
```

##### Update
```
// to update a report (any member can)
const updatedReport = await new offenderResource({ auth: authClient }).update(
  type:'report',
  report: { 
    id: number,
    report_for_id: number,
    draft?: boolean // send this as true to submit the report for approval
  }
) 

// to update a template (you must have proper access)
const updatedTemplate = await new offenderResource({ auth: authClient }).update(
  type:'template',
  template: {
    id: string, 
    name: string
  }
) 

// to update a field (you must have proper access)
const updatedfield = await new offenderResource({ auth: authClient }).update(
  type:'field',
  field: {
    id: string,
    name: string,
    validator: string,
    field_presentation_type_id: number,
    required: boolean,
    ordinal: number
  } 
)

const updatedValue = await new offenderResource({ auth: authClient }).update(
  type:'value',
  value: {
    id: string,
    value: string
  } 
) 
```

##### Archive
```
// to update a report (any member can)
const message = await new offenderResource({ auth: authClient }).archive(
  type:'report',
  report: { 
    id: number
  }
) 

// to update a template (you must have proper access)
const message = await new offenderResource({ auth: authClient }).archive(
  type:'template',
  template: {
    id: string
  }
) 

// to update a field (you must have proper access)
const message = await new offenderResource({ auth: authClient }).archive(
  type:'field',
  field: {
    id: string
  } 
)
```