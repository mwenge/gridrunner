# Gridrunner (1982) by Jeff Minter

<img src="https://www.mobygames.com/images/covers/l/34991-gridrunner-commodore-64-front-cover.jpg" height=300><img src="https://user-images.githubusercontent.com/58846/103443482-9fb16180-4c57-11eb-9403-4968bd16287f.gif" height=300>


This is the reverse-engineered and [commented source code] for all known versions of Gridrunner by Jeff Minter. It is part of the [llamasource project](https://mwenge.github.io/llamaSource/).

I wrote up my first attempt at reverse-engineering [the C64 version of the game here](Disassembling.md)

If you want to read more about the Gridrunner internals, take a look at [Gridrunner; The Little Black Book](https://github.com/mwenge/llamaSource/blob/main/GridrunnerTheLittleBlackBook.md) where I try to unpack the workings and design of the various versions of Gridrunner Minter wrote.


<!-- vim-markdown-toc GFM -->

* [Playing the Games](#playing-the-games)
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

## Playing the Games
C64: [https://gridrunner.xyz]. (Ctrl key is 'Fire', Arrow Keys to move.)
Vic20: [https://gridrunner.xyz]. (Ctrl key is 'Fire', Arrow Keys to move.)

## Building the C64 Source Code
### Requirements
* [VICE][vice]
* [64tass][64tass], tested with v1.54, r1900

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
### Requirements
* [VICE][vice]
* [64tass][64tass], tested with v1.54, r1900

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
### Requirements
* [Atari800 Emulator][atari800]
* [64tass][64tass], tested with v1.54, r1900

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
### Requirements
* [Hatari][hatari]
* [vasm][vasm]

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

```



