# LIVE Freeroam
### Bully Multiplayer - Freeroam Gamemode

* [Official Multiplayer Site](https://bully-mp.com) (But have problems)
* [Unofficial Multiplayer Site](https://bully-mp.ru)

At the moment this multiplayer is more die than alive.

Official server-browser is dead and "official" client cant show available servers. But you still can join to servers by IP adress in game. Also you can try find alive servers IP in [Bully Multiplayer Discord](https://discord.gg/wbTaep5) or you can check servers running with "Unofficial" server-browser [in this page](https://bully-mp.ru/serverlist). Or you can download "Unofficial" pached version Bully Multiplayer from "Unofficial" site, for see those servers.

### Note and Warning!

First version of this code was wrotten in ~2018 year, before public release "v0.1-preview1" (25.02.2018), and before upload to GitHub. Later it been adapted for compatible with version "v0.1-preview2", while it was in private-beta stage. 

Quality of this code is sucks. It have a problems with "kludge-colshapes", and if server will have too much colshapes or online - performance will die. It have a "eval" in code. It have other bad JS practices. And it was not lint'ed. 🤷‍♀️

### How to use?
Just copy folder "live_freeroam" from this repository to your server packages folder.

**!** Package have a dependency from default "chat" package.<br>
**!** Package "chat" also have a dependency from default "command-manager" package.<br>
**!** And of course, it incompatible with default "freeroam" package. 🤔