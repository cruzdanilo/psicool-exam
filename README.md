This test requires you to use the tools that are used to create games in the Psicool platform, including git, Cocos2D and the Psicool SDK. This document explains how to install those components and use them to get your exam template.

# Prerequisites
Before installing Psicool SDK the following components must be installed and accessible from the command line. All of them are cross-platform and are available on Windows, Mac and Linux.

* [Git](https://git-scm.com/): The source code of all new games must be tracked on git. Git is also used to download and update the SDK tools and libraries.
* [node.js](https://nodejs.org/): The build tool is written in JavaScript and needs the node VM in order to execute.
* [TexturePacker](https://www.codeandweb.com/texturepacker): Used to create and manage sprite atlases. Scans a directory (`resSource_x2`) containing individual sprite images and generates a single image file with all the individual sprites in `res/atlas_x2.png` plus a metadata file (`res/atlas_x2.plist`) with the boundaries of each sprite within the new image. The free version is enough for the development of the games.
* [poedit](https://poedit.net/): Used to create the translation files.

**Please test the above tools are accessible from the command line before continuing.** In order to do that, launch a Bash command line window (Terminal in OS X and Linux, or Git Bash in Windows) and run the following commands:

*Git Bash is strongly recommended in Windows instead of cmd.exe, but both should work fine as long as you have a basic understanding on how they work.*

* `git`
* `node` and `npm` (Node.js)

If any of the above fails (i.e. shows an error telling the command is not found) you must check the component is installed and the directory where its executables (e.g. `node.exe`) has been added to your `PATH` environment variable.

## Updating the PATH environment variable
The PATH environment variable tells programs (especially command line applications) where to find other applications they may need or the user may request them to execute.

How this is variable is updated varies between operating systems.

* Windows: http://www.computerhope.com/issues/ch000549.htm
* Mac: http://stackoverflow.com/a/20681160/1777162
* Linux: http://unix.stackexchange.com/a/26059/39407

On Windows you will need to close and reopen all your command line windows for the changes to take effect. On other systems you may need to reboot for changes to take effect permanently, but executing `source ~/.bash_profile` (or any other file where you update the `PATH` variable) will make them take effect instantly for that single command line window.

# Install the build tool
Once you have met all the requirements met you can use the command line to install the Psicool SDK build tool.

You can install it anywhere you want as long as you know the full path. It's recommended to use something simple memorable, e.g. `/opt/psicool-build-tool` in Mac and Linux and `C:\psicool-build-tool` in Windows. 

```
# Switch to the directory where you want install it, in this 
# case C:\ (which is written as /c in Bash).
cd /c
# Clone the repository in a new directory called psicool-build-tool.
# You will be required your git.mcontigo.com email and password to proceed.
git clone https://git.mcontigo.com/tools/psicool-build-tool.git psicool-build-tool
# Switch into the new directory
cd psicool-build-tool
# Install node.js dependencies
npm install
# Running this must show a version number
./psicool --version
```

Then you should add this directory to the PATH to be able to use the build tool just by writing `psicool` in the command line. See the *Updating the PATH environment variable* section for more information in that regard. Otherwise you will need to write `/c/psicool-build-tool/psicool` instead each time you want to run it.

# Download and run the exam template project

Clone the `psicool-exam` repository anywhere.

```
# In this case we're cloning it in our HOME directory 
# (e.g. /c/Users/<your name> on modern Windows systems)
cd ~/
git clone https://git.mcontigo.com/games/psicool-exam
cd psicool-exam
```

Then, use the `serve` command from the build tool to launch the development server.

```
psicool serve
```

The terminal should show *Listening on port 8002* among other log output. Access to http://localhost:8002/

If everything is OK, you should see something like this:

![](https://i.imgur.com/964lZkh.png)

Click *Play*. Don't worry if nothing happens for a few seconds, it's still loading. After a few moments the game should appear. If not, open the developer console (right click anywhere, *inspect element* and select the *console* tab).

After the game has loaded you should see something like this:

![](https://i.imgur.com/UGQBsGh.png)

# The test

Congratulations on getting the environment running! 

Now head to `GameLayer.js` to read your assignment. Complete it and upload your work to your personal git repo.