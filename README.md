# steam_profile_changer

Easily manage you steam avatar and persona on a by game basis!

Manually change your profile with a single click!

## How to use


You need to leave this running while you play games on steam so it can detect when you start and stop playing games.

Program controls are on the top left section.  
The first button forces the app to redetect your installed programs.  Great for when you've installed new games.
The second button uses the currently selected apps avatars and personas to manually update your profile.

A list of your currently installed apps is shown on the left.  The "Default" app is where you specify what personas
and avatars you want to use when leaving games.

Click an app in the list and specify avatars or personas you want the program to randomly pick from when you start that app.

You can always use the manual program control in the top left to force the program to re pick an avatar and persona from the currently selected app.

You may omit specifying avatars or personas.  The program will simply not update whichever setting you omit.


Don't send too many manual submissions in a short time.  Steam will stop letting you switch your avatar and persona for a short while.  This will not effect your ability to play games or use other steam features.


## Known bugs or workarounds

If you tried this previously and it "didn't work" and you gave up, try again!  It wasn't properly handling the first time run case on some platforms.  The program should have asked you to enter the steam code to verify a new computer but it didn't so you likely just gave up.

If your steam friends list says no one is online, use the steam friend list to set yourself to "offline" and then immediately "log in" through the steam friend list.

Deleting the text of a persona box and inserting new text doesn't work as intended.  Instead you need to delete the persona box you don't want anymore and add a new blank one and write the name you want in there.  If you overwrite a persona and get unexpected results, click off the current app and click back onto it and you'll see the old personas, simply delete them.

## Download Links

Pick your platform, download, extract, open the electron program.

[Downloads](https://my.cloudme.com/#agentd00nut/steam_profile_changer_binaries)

## Instructions to build from source

Right now you need node and electron, you won't need those soon.

1. Install node + npm... [CLI method](https://nodejs.org/en/download/package-manager/) or [Easier Method](https://nodejs.org/en/download/).
2. Run these commands.`git clone https://github.com/agentd00nut/steam_profile_changer.git` `cd steam_profile_changer/src/app/` `npm install`
3. Run `electron main.js`.  If that doesn't work run `npm install -g electron` and try again.
4. On the first launch steam might detect the app as a "new computer" and your steam email address will receive one of the verification emails, enter that code at the prompt. You won't have to do this again.


## Contribute
Here are some things that would be helpful.

Clean up the gui and making it work well at large and small window sizes.

Trying it out!

## TODO 
1. Support linux.  
2. Make actual bins for double click goodness.
3. Prompt for and store username and passwords securly or avoid storing them all together.
4. See if we can use steam sentry files already on disk during first launch.
5. Read a book on how to use node.
6. Complete coming features ( the interesting stuff )

## Coming Features
1. Improved looks.
2. Options for avatar and persona per app including % chance they get picked, if picking is random, and interval picking.
3. Automatically populate default profile on first launch.
4. A settings menu to change steam install direction and other things.
5. Skins / Themes.
6. Game specific features... Show K/D or Win or Lose streak next to chosen avatar.

## Bugs
1. Window doesn't properly scroll if there are too many avatars or personas.
2. Editing the text box of a persona simply adds the new text as a new persona instead of removing the old one first.
3. ???

## Contact
Twitter: [@abrothers656](https://twitter.com/abrothers656)
