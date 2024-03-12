# Project Title
MoodMemory

## Overview

MoodMemory is a mood tracking (and eventually, memory logging) application that allows users to log & view mood patterns with ease. 
MoodMemory provides users a platform to manage their memory and mood with clarity in a painless way.

It is available in all screen sizes with responsive design.

### Problem

Mood tracking is a challenging chore to maintain 
- It is most popularly used by people with mood disorders, such as Bipolar Disorder, to take note of durations of manic states and depressive states. Mood tracking is also used to see patterns of what kind of external circumstances urge either state to halt or spring up, for each indivdual, from what may seem to be coming out of nowhere if tracking was not involved.
- Mood tracking keeps us informed about ourselves especially if our mood has been affecting our daily life and means to function, especially when it negatively impacts our ability to take care of our basic needs. 
- Mood tracking is also highly beneficial for those who menstruate whose symptoms are debilitating their physical and mental mobility.

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
- People with memory problems / declining mind flexibility
    - needing to remember important life events.
    - looking to stay reminded of their individuality.

### Features

- I want to consistently log my mood with necessary information without having to think about what to write. (Prompts, Required Input)
- I want to be able to retroactively add notes to previous entries (Insight Commenter)
- I want the ability look at my moods, my sleep, and more and easily assess patterns (Maps / Graphs - currently for mood & sleep)
- I want an easy, succinct way to explain how I feel. ('"Emoji-Emotion Display" Choices' Array)
- I want a place where I can peruse through all of my past moods, and be able to sort & search through them. (Mood Logs Page. Search function. Sort function)
- I want the ability to look back through years of my logs since I began logging, and see my patterns.  (Toggle Mood Map Controls - Yr, Mo, Wk, Day)
- *in development* I want to have the option to track my consumptions - food, medication, etc; and be able to track symptoms from my menses (extended log)

## Implementation

### Tech Stack

- React
- Node.js
- Client libraries: 
    - react
    - react-router
    - axios
    - sass
    - chart.js

- Server libraries:
    - firebase
    - google Oauth
    - cloud firestore
    - nodemon
    - uuid
    - cors

### APIs

<!-- List any external sources of data that will be used in your app. -->

### Sitemap

- Welcome Page
- Mood Home Page / New Log - mood
- Mood Logs
- Mood Maps

### Mockups
**note** the blocks with ***yellow*** background colors were not meant to be functional for the prototype demo but are now fully functional in deployment!

#### Welcome Page
![](welcome.png)

#### Mood Home Page / Log a Mood
![](moodhome.png)

#### Mood Logs Page
![](moodlogs.png)

#### Mood Maps Page
![](moodmaps.png)

### Endpoints

**GET /moodlogs <etc>**

- Get a logged mood by index for mood library viewing when compressed & extended.

Parameters:
- id: logged mood id as number assigned automatically via uuid
- timestamp: date will be in us;en
- state: mood state 
- level: ("Mild", "Moderate", "Severe")
- irr: numerical value 0 - 3 in 1 increments.
- anx: numerical value 0 - 3 in 1 increments.
- hours: numerical value 0 - 24 in 1 increments indicating hours slept.

Response:
```
{
    "id": 1,
    "timestamp": "1234567890",
    "emoji": "motivated" _string_
    "emotion": "motivated"
    "state": "Elevated",
    "level": "Moderate",
    "irritability": 1,
    "graphValue": 3, // corresponds to a mood state and level combo
    "anxiety": 1,
    "hours": 4,
    "quality": "okay"
    "title": "optional",
    "notes": "-",
    "comments": "-"
}
```
<!-- updated later -->

### Auth

- Firebase auth. Google Sign In.
    - User must log in to a valid google account in order to utilize the app and save logs.
    - Add states for logged in showing different UI where the user's name is displayed.

## Roadmap

<!-- Scope your project as a sprint. Break down the tasks that will need to be completed and map out timeframes for implementation. Think about what you can reasonably complete before the due date. The more detail you provide, the easier it will be to build. -->

- Create client
    - react project with routes, boilerplate pages, and CSS animations

- Create server
    - express project with routing
    - may be extracted out of the plan and use firebase instead if i am not able to make it work within the timeframe

- Feature: Login
    - Firebase

- Feature: Home page
    - Form submits to database
    - Create POST /mood endpoint   

- Feature: View Logged moods
    - Create GET /mood endpoint
    - Create GET /moods
    - Implement view logs previews
    - Implement view logs expanded which shows all the input of from that log

- Redirect Pages
    - Successful Upload
    - Page not found
    - Loading animation

- Components
    - mood map
    - Search bar
    - Comment from hindsite
 
- Page: Maps

- Feature: Add hindsight comment to log
    - Form must submit data to my server & post the new comment. 
    - Create POST /comment endpoint   
    - Create DELETE /comment endpoint

- Feature: Create account
    - Implement new user page if new Gmail signs in. 
    - Create POST /register endpoint

- Bug fixes

- Deploy client (and server) projects

## Coming Soon
- memory rooms page: space to organize memories into user specified compartments. + ability to view them via a "room carousel"
- memory features.
- Sleep Map
- place to store & manage mood patterns.
- combine the moodmap with the memory timeline in a joint line graph with adjustable date scopes. This feature is great for people with PTSD, or even PTSD from multiple events, especially when some expereinces may have been mentally blocked from a survival coping mechanism while the resulting fight/flight/fawn/freeze behaviors are still actively affecting the person.
- mood chart in table form in the all moods page
- visual graph of memory timeline
