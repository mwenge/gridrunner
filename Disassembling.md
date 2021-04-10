# Disassembling the Game (C64 Version)

## Introduction
A quick glance at the [disassembled source] will tell you that I haven't untangled everything in there yet. Maybe I will get bored and stop chipping away at it, however the bones of the disasssembled code are well defined and it is possible to follow the high-level game flow. So before I lose interest in it and move onto the next thing I'm writing up the disassembly process while it is still fresh in my mind.

[disassembled source]:https://github.com/mwenge/gridrunner/blob/master/src/gridrunner.asm

I came here because I tried to disassemble one of Minter's other games, Iridis Alpha, with no knowledge of 6502 assembly or the Commodore 64 architecture, and quickly realized I need to try something smaller (and presumably less complex) first.

Two previous disassembly efforts of two different C64 games greatly assisted me in understanding how C64 binaries work. Ricardo Quesada's disassembly of [Commando], from which I adapted the Makefile and build process, was extremely informative. A disassembly of [Attack of the Mutant Camels] by 'C64 Mark' was extremely helpful in understanding what to look for in a Minter game.

Other than that, outright step-by-step documentation of how to disassemble a C64 game is thin on ground. This while there is an enormous literature on 6502 assembly, C64 internals, and other miscellanea. So the purpose of this write-up is to give someone a the HOWTO that either didn't exist or I failed to find.

[Commando]:https://gitlab.com/ricardoquesada/c64-commando-2084
[Attack of the Mutant Camels]: https://github.com/C64-Mark/Attack-of-the-Mutant-Camels

## History of Gridrunner
The game circulates in many forms since it's original release on the VIC 20 in 1982. This disassembled version is derived from the version made available by Jeff Minter in `Llamasoft1.d64`. Presumably Minter ported it himself, and presumably it was a largely copy and paste job. Obviously, the disassembled code will only superficially resemble the 'real' source code, if such a thing still exists. This is 'obvious', because the disassembly will include lots of artefacts to do with loading the game and moving memory around to cope with the fact that is going to be loaded from a cartridge (as we will see later). In the main though, it does seem to be possible to reverse engineer the code enough to get a sense of the coding style. The game was coded by a 20 year old Minter in a single week: "the best week of work I've ever done" according to [this interview with Beta].

Gridrunner went on to become something of a Llamasoft franchise. Minter reimagined the game on multiple platforms including the ATari ST, the Amiga, Windows (Gridrunner++ and Gridrunner Revolution). So given its distinguished subsequent history it seems worthwhile to dig up the source of the C64/VIC20 version and see what it looks like. Of course, if I was doing this again I would disassemble the actual VIC20 version rather than the C64 port, but that would have required knowledge and forethought.

[this interview with Beta]: https://b3ta.com/interview/jeffminter/
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

As the comment says, I later guessed that this section must have something to do with the cartridge the game was distributed on. Poking around the [C64 wiki] I found that Cartridge ROM lives at `$8000`, so a previous section in the disassembled code started to make sense:

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

It's reasonable to ask what I mean by 'at `$8000`'. The remarkable thing about the C64 is its simplicity. When programs run they have access to the 64K (65,532 bytes) of memory. This entire memory map 'lives' in the address space `$0000` to `$FFFF`. So `$0001` is the second byte in the memory bank (`$0000` is the first), while `$0010` is the 17th byte in the memory bank. Each address stores a single byte. Throughout the disassembly process and while attempting to rewrite the `gridrunner.prg` binary we are going to get very used to thinking of everything in hexadecimal so you just have to imagine that at each of the 65,532 locations a single byte can stored and retrieved. 

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

That `0108` is the little-endian (lo-hi, wrong-way round) expression for `$0801`. Telling the C64 to load all the data that follows in the prg from `$0801` onwards in its memory map.

The ASCII rendering of the first few bytes gives us a clue that some of it is 'text'. The '2061' is another clue. It turns out that in order to execute the program first few instructions are a BASIC instruction: '10 SYS 2061'. 2061 is decimal for `$080D`. So what this instruction means is: execute the code at address `$080D`.

```asm
* = $0801                                                                             
                                                                                     
;------------------------------------------------------------------------------------ 
; 10 SYS 2061                                                                         
; Used to execute the code at address $080d (2061 in hex).                            
;------------------------------------------------------------------------------------ 
        .BYTE $0B,$08 ;ANC #$08                                                       
        .BYTE $0A,$00,$9E,$32,$30,$36,$31,$00 ; 10 SYS 2061                           
        .BYTE $00,$00                                                                 
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
I was now at the point where I needed to get a basic handle on what the different assembly instructions mean. This [6502 tutorial] and this reference at [6502 opcodes] were perfectly adequate for getting the hang of things. 

At this point I started to try unpicking some routines in the program, with not very rapid results. 

One potential avenue in to the game, is to look for the game's main loop. This should be a sequence of JSR (Jump to Subroutine) instructions. Basically a series of functions called over and over again. Sure enough, scrolling through the raw disassembly you find this:

```asm
$0CA3: 20 F8 84            JSR e84F8  
$0CA6: 20 9B 85            JSR e859B  
$0CA9: 20 35 86            JSR e8635  
$0CAC: 20 D7 86            JSR e86D7  
$0CAF: 20 53 87            JSR e8753  
$0CB2: 20 9A 88            JSR e889A  
$0CB5: 20 C9 88            JSR e88C9  
$0CB8: 20 A0 89            JSR e89A0  
$0CBB: 20 C8 8A            JSR e8AC8  
$0CBE: 4C E8 83            JMP e83E8  
```

My current reading of this is:

```asm
-------------------------------------------------------------------------------    
Main_GameLoop                                                                      
-------------------------------------------------------------------------------    
       JSR UpdateShipPosition                                                      
       JSR CheckPause                                                              
       JMP GameLoopBody                                                            
                                                                                   
       .BYTE $EA, $EA, $EA, $EA ; NOPs                                             
                                                                                   
JumpToMainGameLoop                                                                 
       JMP Main_GameLoop                                                           
                                                                                   
GameLoopBody                                                                       
       JSR Game_DecrementTimer                                                     
       JSR UpdateXYZappers                                                         
       JSR UpdateScreen                                                            
       JSR UpdatePods                                                              
       JSR DrawUpdatedPods                                                         
       JSR PlayBackgroundSounds                                                    
       JSR DrawSnake                                                               
       JSR MaybeResetSomeCounter                                                   
       JSR e8AC8                                                                   
       JMP StartWaitLoop                                                           
```

The loop is much longer and jumps around a bit in the code before circling back to 'Main_GameLoop', but you get the idea and can see how this would be a useful method of picking your outwards into the rest of the program.

## Identifying the Game's Data

What I would have done next though, had I known how to do it, is identify the game's character set data. For a game like Gridrunner, which doesn't have any sprites, this character set data unlocks a lot of the games mechanics once you have extracted it and know what to look for elsewhere in the program. For example, once you know that the Gridrunner itself (i.e. the player's ship) is stored at index $07 in the character set you can look for lines in the disassembly where it is referenced and see if this is where the ship is being moved.

The way to go about identifying where the character set data is in the disassembly is to look for lines that set the address at `$D018` to point to the place where the character set has been loaded. If a program has a custom character set, `$D018` must contain the address where that set was loaded to memory. In the case of Gridrunner we see that the address where the character set was loaded is `$2000`:

```asm
 Init_Chars                                                       
 $D018 must be set to point to the address of the custom character
 set that we loaded to $2000. So do that.                         
       LDA #$D0                                                   
       STA zpHi2                                                  
       LDA #$00                                                   
       STA zpLo2                                                  
       LDY #$18        ; bits 1-3 == %100 -> char set @ $2000; bits 4-7 == %0001 -> screen mem @$0400 (default)                                                 
       TYA                                                        
       STA (zpLo2),Y   ; store $18 to $d018                                           
       LDY #$20                                                
       LDA #$00        ; black                                                 
       STA (zpLo2),Y   ; $d020 (border color)                                           
       INY                                                        
       STA (zpLo2),Y   ; $d021 (background color)                                           
```

Searching the raw disassembly we find where it was loaded to `$2000` from:

```asm
1BEC: A2 00               LDX #$00      
1BEE: BD 00 8E    b1BEE   LDA f8E00,X   
1BF1: 9D 00 20            STA f2000,X   
1BF4: BD 00 8F            LDA f8F00,X   
1BF7: 9D 00 21            STA f2100,X   
1BFA: CA                  DEX           
1BFB: D0 F1               BNE b1BEE     
1BFD: 4C 00 81            JMP e8100     
```

So `$8E00` and `$8F00`. Now, given that the program was copied from `$0900` to `$8000` when the game was loaded we have to apply an offset to find the appropriate spot in the raw disassmbly of `gridrunner.prg`. This offset in the raw disassembly is `$1700`:

```asm
$16FF: 20 18 18            JSR s1818                          
$1702: 18                  CLC                                
$1703: 18                  CLC                                
$1704: FF 18 18            .BYTE $FF,$18,$18 ;ISC s1818,X     
$1707: 18                  CLC                                
$1708: F0 20               BEQ b172A                          
$170A: 10 1F               BPL b172B                          
$170C: 1F 10 20            .BYTE $1F,$10,$20 ;SLO $2010,X     
$170F: F0 18               BEQ b1729                          
$1711: 18                  CLC                                
$1712: 18                  CLC                                
$1713: 18                  CLC                                
$1714: BD C3 81            LDA f81C3,X                        
$1717: 81 00               STA (p00,X)                        
$1719: 20 60 A3            JSR eA360                          
$171C: 2C 30 00            BIT ai0030                         
$171F: 00 00               BRK #$00                           
```

The jumble of opcodes and bytes tell us that this is probably the place. What we want to do now is extract this data as a series of byte statements, one line for each character in the character set, like so:

```asm
.BYTE $18,$18,$18,$18,$FF,$18,$18,$18 ; CHARACTER 0           
.BYTE $F0,$20,$10,$1F,$1F,$10,$20,$F0 ; CHARACTER 1           
.BYTE $18,$18,$18,$18,$BD,$C3,$81,$81 ; CHARACTER 2           
.BYTE $00,$20,$60,$A3,$2C,$30,$00,$00 ; CHARACTER 3           
.BYTE $00,$02,$05,$C8,$30,$00,$00,$00 ; CHARACTER 4           
.BYTE $08,$04,$3E,$20,$10,$10,$08,$08 ; CHARACTER 5           
```
You can achieve this in [Regenerator]. (While working this out what I actually did was use [Infiltrator] to export the range of bytes to a raw binary file. I then used [CBM Prg Studio] to import the file and view the character sets. This started to give me an idea of what each character was.)

Once I had a list of byte statements I read up on how the character set values are constructed in [C64 CharSet]. They are simply bitmaps. Each byte is taken as a string of 1s and 0s, where a 1 represents a pixel. So for example we can visualize 'Character 0' above as:

```asm
.BYTE $18,$18,$18,$18,$FF,$18,$18,$18 ; CHARACTER 0            
                                        ; $00                  
                                        ; 00011000      **     
                                        ; 00011000      **     
                                        ; 00011000      **     
                                        ; 00011000      **     
                                        ; 11111111   ********  
                                        ; 00011000      **     
                                        ; 00011000      **     
                                        ; 00011000      **     
```

And here's the iconic Gridrunner ship:

```asm
.BYTE $18,$3C,$66,$18,$7E,$FF,$E7,$C3 ; CHARACTER 7           
                                        ; $07                 
                                        ; 00011000      **    
                                        ; 00111100     ****   
                                        ; 01100110    **  **  
                                        ; 00011000      **    
                                        ; 01111110    ******  
                                        ; 11111111   ******** 
                                        ; 11100111   ***  *** 
                                        ; 11000011   **    ** 
```
I used a simple [Python script] to create this commented version of each character.

## Identifying other Data

With the character sets identified, it became much easier to pick through the disassembly and identify other game data.

For example, the text on the title menu:

```asm
;CopyrightLine                                            
        .BYTE $3C,$3D,$20,$31,$39,$38,$32,$20 ; (c) 1982  
        .BYTE $2B,$27,$2F,$20,$20,$2E,$22,$27 ; HES  PRE  
        .BYTE $2F,$2F,$20,$2A,$24,$22,$27,$20 ; SS FIRE   
        .BYTE $3A,$30,$20,$29,$27,$21,$24,$26 ; TO BEGIN  
ByJeffMinter                                                                                 
       .BYTE $29,$1B,$20,$2C,$27,$2A,$2A,$20,$2D,$24,$26,$3A,$27,$22,$20 ; "BY JEFF MINTER " 
       NOP                                                                                   
EnterLevelText                                                                               
       .BYTE $27,$26,$3A,$27,$22,$20,$3E,$27,$3B,$27,$3E,$20,$30,$30,$20 ; "ENTER LEVEL 00 " 
```
You can see that each of the byte values corresponds to the character's index in the character set. So this isn't ASCII text being used to display the title screen text, it's character set bytes.

Now I could start to identify sections of the code relating to recognizable sequences in the game play, such as the interstitial displayed between levels:

```asm
;--------------------------------------------------------------                                                       
; DisplayNewLevelInterstitial                                                                                         
;--------------------------------------------------------------                                                       
        LDX #$F6                                                                                                      
        TXS                                                                                                           
        JSR ClearScreen                                                                                               
        LDX #$12                                                                                                      
                                                                                                                      
CopyLevelTextLoop                                                                                                     
        LDA BattleStations,X                                                                                          
        STA SCREENRAM + $FD,X                                                                                         
        LDA #$0E                                                                                                      
        STA COLOURRAM + $FD,X                                                                                         
        LDA EnterGridArea,X                                                                                           
        STA SCREENRAM + $014D,X                                                                                       
        LDA #$01                                                                                                      
        STA COLOURRAM + $014D,X                                                                                       
        DEX                                                                                                           
        BNE CopyLevelTextLoop                                                                                         
        JMP IncrementLives                                                                                            
                                                                                                                      
;BattleStations                                                                                                       
        .BYTE $20,$29,$28,$3A,$3A,$3E,$27,$20,$20,$2F,$3A,$28,$3A,$24,$30,$26,$2F ; "BATTLE  STATIONS"                
;EnterGridArea                                                                                                        
        .BYTE $20,$27,$26,$3A,$27,$22,$20,$21,$22,$24,$25,$20,$28,$22,$27,$28,$20,$30,$30 ; "ENTER GRID AREA 00"      
                                                                                                                      
;IncrementLives                                                                                                       
        INC LivesDisplay                                                                                              
        LDA LivesDisplay                                                                                              
        CMP #$3A                                                                                                      
        BNE b1582                                                                                                     
        DEC LivesDisplay                                                                                              
b1582   INC SelectedLevel                                                                                             
        LDA SelectedLevel                                                                                             
        CMP #$20             ; There are only 31 levels.                                                              
        BNE LoadNextLevel                                                                                             
        DEC SelectedLevel                                                                                             
LoadNextLevel                                                                                                         
        LDX SelectedLevel                                                                                             
        LDA LevelData1,X                                                                                              
        STA a2A                                                                                                       
        LDA LevelData2,X                                                                                              
        STA a2B                                                                                                       
        LDA LevelData3,X                                                                                              
        STA a34                                                                                                       
                                                                                                                      
; Increment the level displayed in 'ENTER GRID AREA XX'                                                               
IncrementLevel                                                                                                        
        INC LevelDisplayByte2                                                                                         
        LDA LevelDisplayByte2                                                                                         
        CMP #$3A  ; Has the byte overflowed from 9 to 0? If so increment to '10'.                                     
        BNE IL_ADJUST                                                                                                 
        LDA #$30 ; "0"                                                                                                

```

![image](https://user-images.githubusercontent.com/58846/102816326-c0f78f80-43c5-11eb-9574-6776343b95b7.png)


## Starting to Understand the Code

A common pattern, which can be easy to pick out, is the assembler equivalent of a 'for' loop. Here is the raw disassembly of an example, produced by [Regenerator]. The loop happens between the label `b1535` and the instruction `BNE b1535`. In there, values are repeatedly loaded into the 'A' register and then passed from there to two memory locations `$04FD` and `$054D`:

```asm
$1533: A2 12               LDX #$12     ; Set X to 18
$1535: BD 50 8C    b1535   LDA f8C50,X  ; Start of Loop, load byte at $8C50 + X to A
$1538: 9D FD 04            STA f04FD,X  ; Load byte to $04FD + X
$153B: A9 0E               LDA #$0E     
$153D: 9D FD D8            STA fD8FD,X  
$1540: BD 62 8C            LDA f8C62,X  
$1543: 9D 4D 05            STA f054D,X  
$1546: A9 01               LDA #$01     
$1548: 9D 4D D9            STA fD94D,X  
$154B: CA                  DEX          <-- Decrement X
$154C: D0 E7               BNE b1535    <-- Keep looping (i.e. go back to b1535 above) as long as X is not zero
$154E: 4C 75 8C            JMP e8C75    
```
What this loop is doing is writing two sets of 18 bytes from one memory location to another. So what are these values at `$8C50` and `$8C62`? Well remember that one of the first things the program did was to copy itself to `$8000`, so really this is a reference to whatever is at `$1550`. Instead of doing this mental arithmetic every time though, I found it useful to save a snapshot of the running game in [Vice], load that into [Infiltrator], disassemble it and save it as a separate file. That gave me a full disassembly of everything from `$0000` to `$FFFF`, including the code that hat been copied to `$8000`. So looking up these reference to the `$8000` address space became a simple matter of searching for the offset in that file, e.g.:

```asm
$8C51  20 29 28  JSR L_JSR_($2829)_($8C51) OK 
$8C54            .byte $3A,$3A                
$8C56  3E 27 20  ROL $2027,X                  
$8C59  20 2F 3A  JSR L_JSR_($3A2F)_($8C59) JAM
$8C5C  28        PLP                          
$8C5D            .byte $3A                    
$8C5E  24 30     BIT $30                      
$8C60  26 2F     ROL $2F                      
$8C62  20 27 26  JSR L_JSR_($2627)_($8C62) OK 
$8C65            .byte $3A,$27,$22            
$8C68  20 21 22  JSR L_JSR_($2221)_($8C68) OK 
$8C6B  24 25     BIT $25                      
$8C6D  20 28 22  JSR L_JSR_($2228)_($8C6D) BAD
$8C70            .byte $27                    
$8C71  28        PLP                          
$8C72  20 30 30  JSR L_JSR_($3030)_($8C72) JAM
```

It turns out this data at `$8C50` and `$8C62` looks like a bunch of text:

```asm
;BattleStations                                                                                                   
        .BYTE $20,$29,$28,$3A,$3A,$3E,$27,$20,$20,$2F,$3A,$28,$3A,$24,$30,$26,$2F ; "BATTLE  STATIONS"            
;EnterGridArea                                                                                                    
        .BYTE $20,$27,$26,$3A,$27,$22,$20,$21,$22,$24,$25,$20,$28,$22,$27,$28,$20,$30,$30 ; "ENTER GRID AREA 00"  
```
So what our loop is doing is copying the first 18 bytes of each text segment to somewhere that will cause it to be displayed. And if we look up [C64 memory map] we do indeed find that 'Screen RAM' starts at `$0400`: the text is being copied to `$04FD` and `$054D`, i.e. offsets with the 'Screen Ram'.

Conveniently, Minter has made both lines of text the same length so he is only copying the first 18 bytes of both. In the second one he is leaving out the '00' and updating that later.

### Labelling

Now that we know what a loop looks like and have enough information to be able to interpret jumps to the `$8000` address space as offsets within the programs original `$0800` address space we can start giving the labels in the disassembly more meaningful names. In practice this means transforming the loop above into something more readable like:

```asm
CopyLevelTextLoop                                                                                                 
        LDA BattleStations,X                                                                                      
        STA SCREENRAM + $FD,X                                                                                     
        LDA #$0E                                                                                                  
        STA COLOURRAM + $FD,X                                                                                     
        LDA EnterGridArea,X                                                                                       
        STA SCREENRAM + $014D,X                                                                                   
        LDA #$01                                                                                                  
        STA COLOURRAM + $014D,X                                                                                   
        DEX                                                                                                       
        BNE CopyLevelTextLoop                                                                                     
        JMP IncrementLives                                                                                        
                                                                                                                  
;BattleStations                                                                                                   
        .BYTE $20,$29,$28,$3A,$3A,$3E,$27,$20,$20,$2F,$3A,$28,$3A,$24,$30,$26,$2F ; "BATTLE  STATIONS"            
;EnterGridArea                                                                                                    
        .BYTE $20,$27,$26,$3A,$27,$22,$20,$21,$22,$24,$25,$20,$28,$22,$27,$28,$20,$30,$30 ; "ENTER GRID AREA 00"  
```

The rest of the disassembly process is simply a matter of applying these steps iteratively throughout the code. This is 'simple' but painstaking and requires slowly building up an understanding of the language patterns in 6502 assembler. 

The `LDA`/`STA` pattern is a common one: take a value from one place in memory and store it another. Since there are three registers: A, X, and Y, you will see this patternw with all three. If a value needs to be manipulated it will have to be stored in one of them so that it can be incremented (e.g. INX) or decremented (DECX).

'Routines' serve as functions. To execute a routine you call it with a `JSR` instruction and when the routine wants to 'return' it executes an `RTS` call.
```asm
JSR PlaySomeSound

;PlaySomeSound                                   
; This plays a sound using the Sound device managed at $D400
        LDA #$00                                 
        STA $D404    ;Voice 1: Control Register  
        STA $D40B    ;Voice 2: Control Register  
        LDA #$81                                 
        STA $D404    ;Voice 1: Control Register  
        STA $D40B    ;Voice 2: Control Register  
        RTS                                      
```

`JMP` acts like a `GOTO` and moves execution to an arbitary address in memory. Unlike `JSR` there's no concept of returning in a `JMP`, execution just proceeds a the provide address. This practice can make execution difficult to follow - very often you find that a 'function' (one that has been entered with a `JSR` moves all around the code listing and it can be hard to figure out at what point it ends up returning - which won't happen until it eventually hits an `RTS`. For example, here is the routine that draws the ship materializing at the start of each level:

```asm
;-------------------------------------------------------------------------------
;MaterializeShip
;-------------------------------------------------------------------------------
        LDA #$0F
        STA a0A
        LDA #$02
        STA $D408    ;Voice 2: Frequency Control - High-Byte
        LDA #$00
        STA $D404    ;Voice 1: Control Register
        STA $D40B    ;Voice 2: Control Register
        LDA #$16
        STA charToPlot
;MaterializeShipLoop
        LDA #>p0116
        STA colourToPlot
        LDA #$00
        .... ; Code omitted for brevity
        LDA #$14
        CLC 
        SBC a0A
        STA zpLo2
        JMP DrawMaterializeShip ; Jumps to MaterializeShipLoop
        ; This will eventually RTS from DrawMaterializeShip
```
The code jumps to the address labelled `DrawMaterializeShip` (`$8400`). There it jumps into `MaterializeShipLoop`, finishes it and eventually hits an `RTS`. This returns it from the `MaterializeShip` sub-routine and not just the `DrawMaterializeShip` segment (which if you are used to reading functions in other languages, is where you would be inclined to think you are returning from).

```asm
;--------------------------------------------------------------
; DrawMaterializeShip                                          
;--------------------------------------------------------------
        JSR Screen_Plot                                        
        LDA a09                                                
        STA charToPlot                                         
p0D07   DEC a0A                                                
        LDA a0A                                                
        CMP #$FF                                               
        BEQ b0D1A                                              
        LDA #$0F                                               
        CLC                                                    
        SBC a0A                                                
        STA $D418    ;Select Filter Mode and Volume            
        JMP MaterializeShipLoop                                
                                                               
b0D1A   LDA #<p0D07                                            
        STA charToPlot                                         
        LDA #>p0D07                                            
        STA colourToPlot                                       
        LDA #>p1514                                            
        STA zpHi2                                              
        LDA #<p1514                                            
        STA zpLo2                                              
        JSR Screen_Plot                                        
        LDA #$0F                                               
        STA $D418    ;Select Filter Mode and Volume            
        JSR e8450                                              
        LDA #$08                                               
        STA $D418    ;Select Filter Mode and Volume            
        JSR e8450                                              
        LDA #$02                                               
        STA $D418    ;Select Filter Mode and Volume            
        JSR e8450                                              
        LDA #$00                                               
        STA $D40B    ;Voice 2: Control Register                
        LDA #$0F                                               
        STA $D418    ;Select Filter Mode and Volume            
        RTS                                                                                                                
```

There's more to add as I figure it out, but hopefully what I have so far serves as a useful primer for anyone considering disassembling a C64 game!

[Python script]:https://github.com/mwenge/gridrunner/blob/master/ConvertCharSetToBinary.py
[C64 CharSet]:https://www.c64-wiki.com/wiki/Character_set
[CBM Prg Studio]:https://www.ajordison.co.uk/
[6502 tutorial]:https://skilldrick.github.io/easy6502/
[6502 opcodes]:http://www.6502.org/tutorials/6502opcodes.html
[C64 memory map]:https://www.c64-wiki.com/wiki/Memory_Map
[C64 wiki]:https://www.c64-wiki.com/wiki/Memory_Map#Cartridge_ROM
[Infiltrator]:https://csdb.dk/release/?id=100129
[Regenerator]:https://www.c64brain.com/tools/commodore-64-regenerator-1-7/

