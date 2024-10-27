# FundMyHack
## Submission for JumpStart: Huddle Hive Hackathon
This project scrapes over 3000 sponsors from DevPost. Since the sponsors have previously sponsored hackathons, they are likely to sponsor again. 
The returned data is a JSON file that is formatted for each sponsor by the following:

``` javascript

"www.stickergiant.com": {
        "participants_num": 6640,
        "hackathon_num": 13,
        "name": "StickerGiant",
        "logo": "https://s3.amazonaws.com/challengepost/sponsors/logos/000/036/208/highres/StickerGiant-Retina-Logo2x.png",
        "keywords": [
            "Beginner Friendly",
            "Social Good",
            "Low/No Code",
            "Databases",
            "DevOps",
            "Machine Learning/AI",
            "Education",
            "Open Ended",
            "Productivity",
            "AR/VR",
            "Web"
        ],
        "locations": [
            "Online",
            "Concordia University John Molson School of Business Building"
        ]
    }
```
- Keywords and locations specify the types of hackathons the sponsor has been involved with
- hackathon_num specifies the number of hackathons the sponsor has been involved with
- The participant number is the sum of all the participants for all hackathons, so that we can get the average
