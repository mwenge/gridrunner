# Gridrunner by Jeff Minter

This is the disassembled and commented source code for the 1982 Commodore 64 port of Gridrunner by Jeff Minter. 
A version of the game you can play in your browser can be found at [gridrunner.xyz].

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
A guiding principle in the disassembly effort is to ensure the disaseembled and commented source we create can be complied to a byte-for-byte copy of the original `gridrunner.prg` binary in the `orig` folder. So when we compile it we always ensure that the md5sums of the compiled binary and the original match. Doing this greatly simplifies the disassembly process, ensuring any false steps in the disassembly process are found quickly!

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
```

The first step is to extract the game's binary from `Llamasoft1.d64`. (I now can't seem to find where I sourced this file!)
[Llamasoft1.d64]:https://github.com/mwenge/gridrunner/blob/master/orig/Llamasoft1.d64

We do this using a tool called c1451 distributed with the popular Commodore 74 emulator Vice.

```sh
c1451 Llamasoft1.prg
dir
read gridrunner gridrunner.prg
```
There is a wealth of 6502 disassembly tools out there, many of them geared for C64 binaries and most of them available only on Windows. The two I ended up using were [Regenerator] and [Infiltrator].

When you skip straight to loading the `gridrunner.prg` file into [Regenerator], as I did, you are confronted with lots of lines like:

```asm
$0801: 0B 08               .BYTE $0B,$08 ;ANC #$08  
$0803: 0A                  ASL                      
$0804: 00 9E               BRK #$9E                 
$0806: 32                  .BYTE $32    ;JAM        
$0807: 30 36               BMI b083F                
$0809: 31 00               AND (p00),Y              
$080B: 00 00               BRK #$00                 
$080D: A0 00               LDY #$00                 
$080F: A9 09               LDA #$09                 
$0811: 85 FD               STA aiFD                 
$0813: A9 80               LDA #$80                 
$0815: 85 FF               STA aiFF                 
$0817: 84 FC               STY aiFC                 
$0819: 84 FE               STY aiFE                 
$081B: B1 FC       b081B   LDA (pFC),Y              
$081D: 91 FE               STA (pFE),Y              
$081F: C8                  INY                      
$0820: D0 F9               BNE b081B                
$0822: E6 FD               INC aiFD                 
$0824: E6 FF               INC aiFF                 
$0826: A9 A0               LDA #$A0                 
$0828: C5 FF               CMP aiFF                 
$082A: D0 EF               BNE b081B                
$082C: 78                  SEI                      
$082D: 6C 00 80            JMP (p8000)              
```
As I later learned, this is what a reasonably successful disassembly looks like. Garbage on the other hand looks something like this:

```asm
$0830: 20 20 20            JSR s2020                             
$0833: 20 20 20            JSR s2020                             
$0836: 20 20 50            JSR e5020                             
$0839: 52                  .BYTE $52    ;JAM                     
$083A: 47 20               .BYTE $47,$20 ;SRE ai20               
$083C: 20 20 00            JSR e0020                             
$083F: 5F 08 0F    b083F   .BYTE $5F,$08,$0F ;SRE $0F08,X        
$0842: 00 20               BRK #$20                              
$0844: 20 22 43            JSR e4322                             
$0847: 2D 36 34            AND ai3436                            
$084A: 20 42 41            JSR e4142                             
$084D: 43 4B               .BYTE $43,$4B ;SRE ($4B,X)            
$084F: 55 50               EOR f50,X                             
$0851: 2E 42 41            ROL e4142                             
$0854: 4E 4B 22            LSR ai224B                            
$0857: 20 50 52            JSR e5250                             
$085A: 47 20               .BYTE $47,$20 ;SRE ai20               
$085C: 20 20 00            JSR e0020                             
$085F: 7F 08 09            .BYTE $7F,$08,$09 ;RRA $0908,X        
$0862: 00 20               BRK #$20                              
$0864: 20 20 22            JSR s2220                             
$0867: 4C 4F 50            JMP e504F                             
```

The clue here is the frequent occurence of '.BYTE' sequences in the disassembly on the right-hand column: the disassembler can't come up with plausible sequences of assembly op-codes. Once I realized that '20' was hex for 'space' and that the 5X values are ASCII values, it seemed likely that this section contained some sort of text data. I later disassembled it, and the garbage that comes after it, to the following:

```asm
------------------------------------------------------------------------------------ 
 Cartridge File System (?)                                                           
 This must be something to do with the cartridge rom.                                
------------------------------------------------------------------------------------ 
       .TEXT "        PRG   ", $00                                                   
       .TEXT $5F, $08, $0F, $00, "  ", $22,"C-64 BACKUP.BANK",$22," PRG   ", $00     
       .TEXT $7F, $08, $09, $00, "   ",$22,"LOPAGE $4 $48",$22,"    PRG  ", $00      
       .TEXT $9F, $08, $11, $00, "  ", $22,"WEDGE",$22,"            PRG   ", $00     
       .TEXT $BF, $08, $02, $00, "   ",$22,"SYSTEM SET",$22,"       PRG  ", $00      
       .TEXT $DF, $08, $05, $00, "   ",$22,"UNSCRATCH",$22,"        PRG  ", $00      
       .TEXT $FF, $08, $07, $00, "   ",$22,"LODATA",$22,"           PRG  "           
       BRK #$1F                                                                      
                                                                                    
```

As the comment says, I later guessed that this section must have something to do with the cartridge the game was distributed on. Poking around the [C64 wiki] I found that Cartridge ROM lives at $8000, so a previous section in the disassembled code started to make sense:

```asm
;------------------------------------------------------------------------------------   
; Copies the game code from $0900 to $8000 and starts executing code                    
; at $8000. This is the address of the cartridge ROM and is where the code will         
; be executed when the game is loaded from a cartridge.                                 
;------------------------------------------------------------------------------------   
* = $080d                                                                               
Start                                                                                   
        LDY #$00                                                                        
        LDA #$09                                                                        
        STA aFD                                                                         
        LDA #$80                                                                        
        STA aFF                                                                         
        STY aFC                                                                         
        STY aFE                                                                         
CopyDataLoop                                                                            
        LDA (pFC),Y                                                                     
        STA (pFE),Y                                                                     
        INY                                                                             
        BNE CopyDataLoop                                                                
        INC aFD                                                                         
        INC aFF                                                                         
        LDA #$A0                                                                        
        CMP aFF                                                                         
        BNE CopyDataLoop                                                                
        SEI                                                                             
        JMP (InitializeDataAndGame)                                                     
```                                                                                        

It's reasonable to ask what I mean by 'at $8000'. The remarkable thing about the C64 is its simplicity. When programs run they have access to the 64K (65,532 bytes) of memory. This entire memory map 'lives' in the address space $0000 to $FFFF. So $0001 is the second byte in the memory bank ($0000 is the first), while $0010 is the 17th byte in the memory bank. Each address stores a single byte. Throughout the disassembly process and while attempting to rewrite the `gridrunner.prg` binary we are going to get very used to thinking of everything in hexadecimal so you just have to imagine that at each of the 65,532 locations a single byte can stored and retrieved. 

The first two bytes in `gridrunner.prg` give the address it should be loaded at. You can see this when you load the file in a hex editor:

```sh
00000000: 0108 0b08 0a00 9e32 3036 3100 0000 a000  .......2061.....
00000010: a909 85fd a980 85ff 84fc 84fe b1fc 91fe  ................
00000020: c8d0 f9e6 fde6 ffa9 a0c5 ffd0 ef78 6c00  .............xl.
00000030: 8020 2020 2020 2020 2050 5247 2020 2000  .        PRG   .
00000040: 5f08 0f00 2020 2243 2d36 3420 4241 434b  _...  "C-64 BACK
00000050: 5550 2e42 414e 4b22 2050 5247 2020 2000  UP.BANK" PRG   .
00000060: 7f08 0900 2020 2022 4c4f 5041 4745 2024  ....   "LOPAGE $
00000070: 3420 2434 3822 2020 2020 5052 4720 2000  4 $48"    PRG  .
```

That '0108' is the little-endian expression for $0801. Telling the C64 to load all the data that follows from $0801 onwards.

When a program is loaded it is stored at $0800 and execution starts at $0801. So when we look at the raw disassembly in [Regenerator] for `gridrunner.prg` we see:

```asm

```


[C64 memory map]:https://www.c64-wiki.com/wiki/Memory_Map
[C64 wiki]:https://www.c64-wiki.com/wiki/Memory_Map#Cartridge_ROM
[Infiltrator]:https://csdb.dk/release/?id=100129
[Regenerator]:https://www.c64brain.com/tools/commodore-64-regenerator-1-7/


