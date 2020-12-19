# Gridrunner by Jeff Minter



This is the disassembled and commented source code for Gridrunner by Jeff Minter.

## Requirements

* [64tass][64tass], tested with v1.54, r1900
* [VICE][vice]

[64tass]: http://tass64.sourceforge.net/
[vice]: http://vice-emu.sourceforge.net/

To compile and run it do:

```sh
$ make
```

# Disassembling the Game

The game circulates in many forms since it's original release in 1982. This disassembled version is derived from the version made available by Jeff Minter in Llamasoft1.d64.

The first step is to extract the game's binary from Llamasoft1.d64. We do this using a tool called c1451 distributed with the popular Commodore 74 emulator Vice.

```sh
c1451 Llamasoft1.prg
dir
read gridrunner gridrunner.prg
```



