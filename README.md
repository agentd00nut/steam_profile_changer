# steam_profile_changer

Easily manage you steam avatar and persona on a by game basis!

Manually change your profile with a single click.

Currently in alpha.

## Where to Get

Pick your platform, download, extract, open the electron program.

[OSx](https://my.cloudme.com/#agentd00nut/steam_profile_changer-darwin-x64.tar)
[Windows 32](https://my.cloudme.com/#agentd00nut/steam_profile_changer-win32-ia32.tar)
[Windows 64](https://my.cloudme.com/#agentd00nut/steam_profile_changer-win32-x64.tar)

## How to Build

Right now you need node and electron, you won't need those soon.

1. Install node + npm... [CLI method](https://nodejs.org/en/download/package-manager/) or [Easier Method](https://nodejs.org/en/download/).
2. Run these commands.`git clone https://github.com/agentd00nut/steam_profile_changer.git` `cd steam_profile_changer/src/app/` `npm install`
3. Run `electron main.js`.  If that doesn't work run `npm install -g electron` and try again.
4. On the first launch steam might detect the app as a "new computer" and your steam email address will receive one of the verification emails, enter that code at the prompt. You won't have to do this again.


## How to use

Default is the pool the program picks from when returning from a game.  This pool will be used to "reset" your profile when you leave games.

You need to leave this running while you play games on steam so it can detect when you start and stop playing games.
Also you'll need to manually setup the default app with what you want your profile to be when you come out of games.

If you install new apps then the program needs you to click the refresh symbol at the top left to tell it to go check for new apps!

If you want to manually update your profile select the app you want to use as your pool and click the second option at the top left, the upload icon.

You can omit either avatars or personas from an app pool.  You'll keep whatever you have and only update what you have selected for that app.

## Issues

If you have issues either tweet me or use the issue reporter for this repo.  

## Contribute
Here are some things that would be helpful.

Clean up the gui and making it work well at large and small window sizes.

Using steam sentry files located in the steam directory if they are present would simplify the login experience on first launch.

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
