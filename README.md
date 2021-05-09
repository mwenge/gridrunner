# Gridrunner (1982) by Jeff Minter

<img src="https://www.mobygames.com/images/covers/l/34991-gridrunner-commodore-64-front-cover.jpg" height=300><img src="https://user-images.githubusercontent.com/58846/103443482-9fb16180-4c57-11eb-9403-4968bd16287f.gif" height=300>

[<img src="https://img.shields.io/badge/Download%20Gridrunner%202x%20Speed-Windows-blue.svg">](https://github.com/mwenge/gridrunner/releases/download/v0.1/gridrunner2x.exe)
[<img src="https://img.shields.io/badge/Download%20Gridrunner%202x%20Speed-C64-green.svg">](https://github.com/mwenge/gridrunner/releases/download/v0.1/gridrunner2x.exe)
[<img src="https://img.shields.io/badge/Play%20Gridrunner-Online-purple.svg">](https://mwenge.github.io/gridrunner/c64/)


This is the reverse-engineered and [commented source code] for all known versions of Gridrunner by Jeff Minter. It is part of the [llamasource project](https://mwenge.github.io/llamaSource/).

I wrote up my first attempt at reverse-engineering [the C64 version of the game here](Disassembling.md)

If you want to read more about the Gridrunner internals, take a look at [Gridrunner; The Little Black Book](https://github.com/mwenge/llamaSource/blob/main/GridrunnerTheLittleBlackBook.md) where I try to unpack the workings and design of the various versions of Gridrunner Minter wrote.


<!-- vim-markdown-toc GFM -->

* [Play in your Browser](#play-in-your-browser)
* [Building the C64 Source Code](#building-the-c64-source-code)
  * [Requirements](#requirements)
  * [Setup](#setup)
  * [Compiling](#compiling)
* [Building the Vic20 Source Code](#building-the-vic20-source-code)
  * [Requirements](#requirements-1)
  * [Compiling](#compiling-1)
* [Building the Atari-8 bit Source Code](#building-the-atari-8-bit-source-code)
  * [Requirements](#requirements-2)
  * [Compiling](#compiling-2)
* [Building the Atari ST Source Code](#building-the-atari-st-source-code)
  * [Requirements](#requirements-3)
  * [Setup](#setup-1)
  * [Compiling](#compiling-3)

<!-- vim-markdown-toc -->

## Play in your Browser
[C64:](https://mwenge.github.io/gridrunner/c64/) (Ctrl key is 'Fire', Arrow Keys to move.)

[Vic20:](https://mwenge.github.io/gridrunner/vic20/) (Ctrl key is 'Fire', Arrow Keys to move.)

[Atari800:](https://mwenge.github.io/gridrunner/atari800/?disk_filename=gridrunner.atr) (Alt key is 'Fire', Arrow Keys to move.)

[Atari ST:](https://mwenge.github.io/gridrunner/atarist/) (Mouse to fire and move.)

## Building the C64 Source Code
<img src="https://www.mobygames.com/images/covers/l/34991-gridrunner-commodore-64-front-cover.jpg" height=300><img src="https://user-images.githubusercontent.com/58846/103443482-9fb16180-4c57-11eb-9403-4968bd16287f.gif" height=300>
### Requirements
* [VICE][vice] - The most popular C64 emulator
* [64tass][64tass] - An assembler for 6502 source code.

### Setup
On Ubuntu you can install [VICE] as follows:
```
sudo apt install vice
```

### Compiling
To compile and run:

```sh
$ make
```

To just compile the game and get a binary (`gridrunner.prg`) do:

```sh
$ make gridrunner.prg
```

## Building the Vic20 Source Code
<img src="https://user-images.githubusercontent.com/58846/114267974-adb11400-99f6-11eb-8797-036554e1a1f5.png" height=300><img src="https://user-images.githubusercontent.com/58846/114268079-27e19880-99f7-11eb-9e1a-87995309b96b.gif" height=300>
### Requirements
* [VICE][vice] - The most popular C64/Vic20 emulator
* [64tass][64tass] - An assembler for 6502 source code.

### Compiling
To compile and run:

```sh
$ make runvic
```

To just compile the game and get a binary (`gridrunner-vic20.prg`) do:

```sh
$ make gridrunner-vic20.prg
```

## Building the Atari-8 bit Source Code
<img src="https://user-images.githubusercontent.com/58846/114267907-6591f180-99f6-11eb-87b0-65387139ccd7.png" height=300><img src="https://user-images.githubusercontent.com/58846/114267944-7d697580-99f6-11eb-9208-159c76d5c7c5.gif" height=300>
### Requirements
* [Atari800 Emulator][atari800] - An Atari 400/8000 emulator
* [64tass][64tass] - An assembler for 6502 source code.

### Compiling
To compile and run:

```sh
$ make runatari
```

To just compile the game and get a binary (`gridrunner.xex`) do:

```sh
$ make gridrunner.xex
```

## Building the Atari ST Source Code
<img src="https://user-images.githubusercontent.com/58846/114268282-367c7f80-99f8-11eb-8869-43ea4e64968d.gif" height=300>

This unfinished and unpublished gem was written as a challenge by Minter to see what he could fit into 3.5k on the Atari ST. It's a basic gameplay demo with no sound or levels, but is very enjoyable and addictive to play.

"There was one more version of Gridrunner on the Atari ST
which I shall mention for completeness - in truth I haven't seen it for
years and I'm not sure if it's in the archive anywhere. I can't remember
why I was asked - for a coverdisk or for a demo I guess - but I was
asked to do a game in 4K. Since the dear old unexpanded Vic had been
3.5K I thought it would be natural to choose Gridrunner as the subject
of the demo and so I made a little version that fit in 4K on the ST. It
was super primitive but it was just about fully functional."
 
### Requirements
* [Hatari][hatari] - A popular Atari ST emulator
* [vasm][vasm] - An assembler for Motorola 68000 source code

### Setup
On Ubuntu you can install [Hatari] as follows:
```
sudo apt install hatari
```

You will need to download the source of [vasm] and compile it as follows:
```
make CPU=m68k SYNTAX=mot
```

### Compiling
To compile and run:

```sh
$ make runatarist
```

To just compile the game and get a binary (`gridrunner-st.prg`) do:

```sh
$ make gridrunner-st.prg
```
[64tass]: http://tass64.sourceforge.net/
[vice]: http://vice-emu.sourceforge.net/
[atari800]: https://atari800.github.io/
[hatari]: https://hatari.tuxfamily.org/download.html
[vasm]: http://sun.hasenbraten.de/vasm/index.php?view=relsrc
[https://gridrunner.xyz]: https://mwenge.github.io/gridrunner.xyz
[commented source code]:https://github.com/mwenge/gridrunner/blob/master/src/

