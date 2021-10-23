# exclusive-promocode.com

## S3 Bucket: https://s3.console.aws.amazon.com/s3/buckets/exclusive-promocode.com

### Brazzers Landings go inside:
- `exclusive-promocode.com/brazzers-ultra-4k/`
- `exclusive-promocode.com/brazzers/`

#### Deployement
- run: `sh deploy_brazzer.sh`

### Surveys Landing go inside:
- `exclusive-promocode.com/surveys/`

## Type of questions format

### Regular Question

```json
{
    "question": "Are you currently a Netflix subscriber?",
    "answers": [
        "Yes",
        "No",
        "Prefer Not To Answer"
    ]
}
```

### Email Question (Always the last one and only once in a survey)

```json
{
    "question": "Complete your information",
    "email": true,
    "answers": [
        "Continue",
        "Skip"
    ]
}
```

### Yes no question with redirect when clicking on Yes

```json
{
    "question": "Are you currently a Netflix subscriber?",
    "yesNoRedirect": true,
    "redirectUrl": "https://google.com"
}
```