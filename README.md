# steam_profile_changer
Electron interface to automatically change avatar and persona when playing steam apps.

You can pick multiple avatars ( profile image ) and personas ( your name ) for the steam apps you currently have installed.

This app is in alpha... really its pre-alpha but I want to be able to work on it anywhere.  
Currently only works on mac as it isn't configured to know where the default steam path is on the other systems.
Currently only works if you have steam in its default path.

## How To Use
Right now you'll need electron (thus node).  Then follow these steps.

1. Install node + npm... https://nodejs.org/en/download/package-manager/ or https://nodejs.org/en/download/ if thats easier for you.
2. `npm install`
3. Create `data/credentials.txt`. Username on the first line, password on the second...
4. Run `electron main.js`
5. On the first launch steam will detect the app as a "new computer" and your steam email address will receive one of the verification emails, enter that code... You won't have to do this again.
7. The program should auto detect what apps you have installed and display them on the left, the first app is always "default".
8. Click on an app, then add avatars and personas as you see fit for each app.  

Default is the pool the program picks from when returning from a game.  This pool will be used when to "reset" your profile when you leave games.

You need to leave this running while you play games on steam so it can detect when you start and stop playing games.
Also you'll need to manually setup the default app with what you want your profile to be when you come out of games.

If you install new apps then the program needs you to click the refresh symbol at the top left to tell it to go check for new apps!

## TODO 
1. Make work on windows and linux.  
2. Make actual bins instead of forcing people to install npm and electron.
3. Prompt for and store username and passwords securly.
4. See if we can use steam sentry files already on disk during first launch.
5. Rewrite the entire index.js to not be such a mess and make more sense and not be 1000 lines long and use callbacks properly and just oh my god don't look at it.
6. Complete coming features ( the interesting stuff )

## Coming Features
1. Better GUI... My css is shitty.
2. Separate options for avatar and persona per app including % chance they get picked, if picking is random, and interval picking.
3. Game specific features... Show K/D or Win or Lose streak next to chosen avatar.
4. Automatically populate default settings when none are set.

## Bugs
1. Window doesn't properly scroll if there are too many avatars or personas.
2. So so many others.

## Contact
Twitter: @abrothers656
