# Gridrunner by Jeff Minter

This is the disassembled and commented source code for the 1982 Commodore 64 port of Gridrunner by Jeff Minter. 
A playable version of the game can be found at [gridrunner.xyz].

## Requirements

* [64tass][64tass], tested with v1.54, r1900
* [VICE][vice]

[64tass]: http://tass64.sourceforge.net/
[vice]: http://vice-emu.sourceforge.net/
[gridrunner.xyz]: https://mwenge.github.io/gridrunner.xyz

To compile and run it do:

```sh
$ make
```
The compiled game is written to the `bin` folder. 

To just compile the game and get a binary (`gridrunner.prg`) do:

```sh
$ make gridrunner
```


# Disassembling the Game

## Introduction
A quick glance at the disassembled source will tell you that I haven't untangled everything in there yet. Maybe I will get bored and stop chipping away at it, however the bones of the disasssembled code are well defined and it is possible to follow the high-level game flow. So before I lose interest in it and move onto the next thing I'm writing up the disassembly process while it is still fresh in my mind.

I came here because I tried to disassemble one of Minter's other games, Iridis Alpha, with no knowledge of 6502 assembly or the Commodore 64 architecture, and quickly realized I need to try something smaller (and presumably less complex) first.

Two previous disassembly efforts of two different C64 games greatly assisted me in understanding how C64 binaries work. Ricardo Quesada's disassembly of [Commando], from which I adapted the Makefile and build process, was extremely informative. A disassembly of [Attack of the Mutant Camels] by 'C64 Mark' was extremely helpful in understanding what to look for in a Minter game.

Other than that, outright step-by-step documentation of how to disassemble a C64 game is thin on ground. This while there is an enormous literature on 6502 assembly, C64 internals, and other miscellanea. So the purpose of this write-up is to give someone a the HOWTO that either didn't exist or I failed to find.

[Commando]:https://gitlab.com/ricardoquesada/c64-commando-2084
[Attack of the Mutant Camels]: https://github.com/C64-Mark/Attack-of-the-Mutant-Camels

## History of Gridrunner
The game circulates in many forms since it's original release in 1982. This disassembled version is derived from the version made available by Jeff Minter in `Llamasoft1.d64`.

## Starting the Disassembly
A guiding principle in the disassembly effort is to ensure the disaseembled and commented source we create can be complied to a byte-for-byte copy of the original `gridrunner.prg` binary in the `orig` folder. So when we compile it we always ensure that the md5sums of thec ompiled binary and the original match. Doing this greatly simplifies the disassembly process, ensuring false moves are found quickly!

```sh
robert@mwenge-desktop gridrunner (master)]$ make gridrunner.prg 
64tass -Wall --cbm-prg -o bin/gridrunner.prg -L bin/list-co1.txt -l bin/labels.txt src/gridrunner.asm
64tass Turbo Assembler Macro V1.55.2262
64TASS comes with ABSOLUTELY NO WARRANTY; This is free software, and you
are welcome to redistribute it under certain conditions; See LICENSE!

Assembling file:   src/gridrunner.asm
Assembling file:   src/padding.asm
Error messages:    None
Warning messages:  None
Passes:            3
Memory range:      $0801-$28ff   $20ff
md5sum bin/gridrunner.prg orig/gridrunner.prg
0f521290988e44454d7d478268042d4e  bin/gridrunner.prg
0f521290988e44454d7d478268042d4e  orig/gridrunner.prg
[robert@mwenge-desktop gridrunner (master)]$ 
```

The first step is to extract the game's binary from `[Llamasoft1.d64]`. (I now can't seem to find where I sourced this file!)
[Llamasoft1.d64]:https://github.com/mwenge/gridrunner/blob/master/orig/Llamasoft1.d64

We do this using a tool called c1451 distributed with the popular Commodore 74 emulator Vice.

```sh
c1451 Llamasoft1.prg
dir
read gridrunner gridrunner.prg
```


[Regenerator]:https://www.c64brain.com/tools/commodore-64-regenerator-1-7/


