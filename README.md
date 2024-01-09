# Project Title
MoodMemory

## Overview

MoodMemory is a place to log, track, and view your moods & mood patterns with ease. 
MoodMemory will also allow users to keep a log of memories, new and old. MoodMemory provides users a platform to manage their memory and mood with clarity in a painless way.

It is for mobile use in this submission, but *nice to have*: it will be available with responsive design to tablet and  desktop sizes

### Problem

Mood tracking is a challenging chore to maintain 
- It is most popularly used by people with mood disorders, such as Bipolar Disorder, to take note of durations of manic states and depressive states. Mood tracking is also used to see patterns of what kind of external circumstances urge either state to halt or spring up, for each indivdual, from what may seem to be coming out of nowhere if tracking was not involved.
- When in certain states -manic or depressive or a "hypo" sort- it is difficult for persons with mood disorders to make good decisions or to see a bigger picture. The severity can vary from lack of self awareness noticed in speaking volume for example, to no longer seeing other viable options to manage strong emotions other than to unalive one's self.
- Mood tracking keeps us informed about ourselves especially if our mood has been affecting our daily life and means to function, especially when it negatively impacts our ability to take care of our basic needs. 
- Mood tracking is also highly beneficial for those who menstruate whose symptoms are debilitating their physical and mental mobility.

- Memory logging is the missing tool for persons with dimishing mind flexibility, such as early onset dementia, where saving new memories are no longer easy, and older ones start to get lost.
- Memory logging is important in this technological age as our capacities to store memories are yielding lower, as technology evolves.

### User Profile

- People with Seasonal Affective Disorder (SAD) / People affected by cold or gray weather and shorter days
    - to assure it is purely seasonal and not related to longer term depression
- People with Mood Disorders
    - needing to find their mood state patterns.
    - needing to find their external instigators.
    - wanting to see when they feel most stable in order to sustain those environments longterm.
- People about to take or are taking new medication 
    - to see if there are any side effects from their new medication affecting mood and energy.
- People who menstruate and have mood related symptoms
- People with PTSD
    - looking to track their triggers.
    - tracking the effectiveness of their therapy
- People in therapy 
    - looking to trac their progress.
- People with memory problems / declining mind flexibility
    - needing to remember important life events.
    - looking to stay reminded of their individuality.

### Features

- I want to log my mood without having to think about what to write. (AddMood Prompts)
- I want to log if my medications are effective and how it affects my mood. (Medication Log)
- I want to log my mood with consisent necessary information. (Required Add Inputs)
- I want to have the options to extend my logs on days I have more time and energy. (Extended AddMood Prompts)
- I want the ability look at my moods and easily assess patterns. (Mood Maps)
- I want an easy, succinct way to explain how I feel. ('"Emoji-Emotion Display" Choices' Array)
- I want a place where I can peruse through all of my past moods. (Mood Logs Tab)
- I want clarity on what events cause certain moods for me. (Impactful Event Input and Trigger Input)
- I want to factor in my menstruation cycle into my mood tracking  (Menses Input)
- I want the ability to look back through years of my logs and see patterns (Scrollable Mood Maps feature)
- *display only for this submission* I want to store new and old memories that are becoming fleeting. (Memory Add)
- *nice to have* I want the ability to scroll through all the memories I've logged (Memories Library)

## Implementation

### Tech Stack

- React
- Client libraries: 
    - react
    - react-router-dom
    - axios
    - sass
    - @mui/x-charts/LineChart

<!-- more will be added -->

### APIs

<!-- List any external sources of data that will be used in your app. -->

### Sitemap

- Welcome Page
- Mood Home Page / Log a Mood
- Mood Logs
- Mood Maps
- *this will be for display purpose only for the submission* Memory Home Page / Log a Memory
- *this is a nice to have display feature for the submission* Memory Library

### Mockups
**note** the blocks with ***yellow*** background colors are *not* meant to be functional or fully so for this project submission completion. These components are there for display of what's to come soon after bootcamp.
**note** the blocks with ***black*** background colors are *nice to haves*. They are *not* project submission completion goals but may be implemented soon or will be implemented in the near future.
*these reminders will be noted by a legend within the mockups as well*

#### Welcome Page
![](welcome.pdf)

#### Mood Home Page / Log a Mood
![](moodhome.pdf)

#### Mood Logs Page
![](moodlogs.pdf)

#### Mood Maps Page
![](moodmaps.pdf)

#### Memory Home Page
*nice to have*. 
if able to display for the sprint: it is still a "nice to have" non-functional feature. full functionality beyond display are not part of my guidelines for submssion completion but it is possible it will be accomplished, time-permitting.
![](extras.pdf)

#### Memory Library Page
*nice to have* feature. not part of my guidelines for submssion completion. may possibly be accomplished, time permitting.
![](extras.pdf)

#### BONUS "Nice To Have" Memory Rooms Carousel Page
*nice to have* feature. not*part of my guidelines for submssion completion.
![](extras.pdf)

### Data

<!-- Describe your data and the relationships between them. You can show this visually using diagrams, or write it out. 
![](sql-diagram.png) -->

### Endpoints

**GET /moods /<etc>**

- Get logged moods for mood library previews. 

Parameters:
- id: logged mood id as number
- date: us:en data type date
- time: time showing hour and minute in us;en standard with lowercase am and pm with no periods
- state: mood state ("Low", "WNL", "Elevated") + ":" + severity level ("Mild", "Moderate", "Severe")
- irr: numerical value 0 - 3 in 1 increments.
- anx: numerical value 0 - 3 in 1 increments.
- hours: numerical value 0 - 24 in 1 increments indicating hours slept.

Response:
```
{
    "id": 1,
    "date": "12/22/23"
    "time": "11:50pm"
    "state": "Low:Mild",
    "irritability": 3,
    "anxiety": 0,
    "hours": 4,
    "title": "Fight Response",
        <!-- or " " for empty, -->
    "symptoms": "Feeling indifferent about most things. Annoyed at every illogical phrase I hear from anyone. Keeping isolated to avoid conflict from my temper.", 
        <!-- or " " for empty, -->
    "medication": [
        {
            "id": 1,
            "name": "Lamotrigine",
            "dosage": "100mg",
            "recurrent": 1,
            "taken": false
        }
    ],
    "appointment": [
        {
            "type": "CT Scan",
            "doctor": "Karina Farina",
            "attended": true
        }
        {
            "type": "Therapy",
            "doctor": "Gloria Chavez",
            "attended": true
        }
    ],
    "impact": "Zinzanni",
    "mensesDay": 1,
    "flowLvl": "low",
    "painLvl": "none",
    "mensesNotes": " ",
}
```

**GET /moods/:id/ <etc>**

- Get a logged mood by id for the expanded view of a selected mood.

Parameters:
- id: logged mood id as number
- date: us:en data type date
- time: time showing hour and minute in us;en standard with lowercase am and pm with no periods
- state: mood state ("Low", "WNL", "Elevated") + ":" + severity level ("Mild", "Moderate", "Severe")
- irr: numerical value 0 - 3 in 1 increments.
- anx: numerical value 0 - 3 in 1 increments.
- hours: numerical value 0 - 24 in 1 increments indicating hours slept.
- title: user input title string
- symp: user input detail string
- medId: logged medication as number
- medName: medicine name
- medDose: string type number data plus unit typically mg
- medX: number value of times medicine is taken.
- medTake: boolean if medicine was take "true" or not "false"
- appId: logged appointment as number
- appType: appointment type name
- appDr: doctor name
- appAtt: boolean if attended appointment or not
- impact: user input string value. impactful event of the day
- mensesDay: number value in 1 increments indicating series number of days of menstruation
- flow: low/med/high
- pain: non/low/med/high
- mensesNotes: user input string value of menses details

Response:
```
{
    "id": 1,
    "mood": "Low:Mild",
    "irritability": 3,
    "anxiety": 0,
    "hours": 4,
    "title": "Fight Response",
        <!-- or " " for empty, -->
    "symptoms": "Feeling indifferent about most things. Annoyed at every illogical phrase I hear from anyone. Keeping isolated to avoid conflict from my temper.", 
        <!-- or " " for empty, -->
    "medication": [
        {
            "id": 1,
            "name": "Lamotrigine",
            "dosage": "100mg",
            "recurrent": 1,
            "taken": false
        }
    ],
    "appointment": [
        {
            "id": 1,
            "type": "CT Scan",
            "doctor": "Karina Farina",
            "attended": true
        }
        {
            "id": 2,
            "type": "Therapy",
            "doctor": "Gloria Chavez",
            "attended": true
        }
    ],
    "impact": "Zinzanni",
    "mensesDay": 1,
    "flowLvl": "low",
    "painLvl": "none",
    "mensesNotes": " ",
}
```
<!-- more added later -->

### Auth

## Roadmap

<!-- Scope your project as a sprint. Break down the tasks that will need to be completed and map out timeframes for implementation. Think about what you can reasonably complete before the due date. The more detail you provide, the easier it will be to build. -->

- Create client
    - react project with routes and boilerplate pages

- Create server
    - express project with routing

- 
<!-- more added later -->

## Nice-to-haves

POSSIBLY
- tablet & desktop responsive design
- contact me footer
- dynamic memory counter & dynamic mood counter in the user toggle side nav bar.
- unsaved log warning window
- display the chosen emoji-emotion from the form just submitted into the "log successful" pop up.
- search bar displays all moods in mood library with the typed keyword
- search bar display all memories in the memory library with the typed keyword.
- loading animation with memory poetry.

PROBABLY NOT SOON
- memory rooms page: space to organize memories into user specified compartments. + ability to view them via a "room carousel"
- log in, create new user, forgot password.

DEFINITELY NOT DURING THE BOOTCAMP
- memory features are functional
- place to store & manage mood patterns.
- combine the moodmap with the memory timeline in a joint line graph with adjustable date scopes. This feature is great for people with PTSD, or even PTSD from multiple events, especially when some expereinces may have been mentally blocked from a survival coping mechanism while the resulting fight/flight/fawn/freeze behaviors are still actively affecting the person.
- mood chart in table form in the all moods page
- visual graph of memory timeline
