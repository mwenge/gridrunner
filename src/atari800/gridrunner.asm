; This is the reverse-engineered source code for the game 'Gridrunner' written by Jeff Minter in 1983.
;
; The code in this file was created by disassembling a binary of the game released into
; the public domain by Jeff Minter in 2019.
;
; The original code from which this source is derived is the copyright of Jeff Minter.
;
; The original home of this file is at: https://github.com/mwenge/gridrunner
;
; To the extent to which any copyright may apply to the act of disassembling and reconstructing
; the code from its binary, the author disclaims copyright to this source code.  In place of
; a legal notice, here is a blessing:
;
;    May you do good and not evil.
;    May you find forgiveness for yourself and forgive others.
;    May you share freely, never taking more than you give.
;
; (Note: I ripped this part from the SQLite licence! :) )
;
;
; **** ZP ABSOLUTE ADRESSES **** 
;
CASINI = $02
a03 = $03
BOOT = $09
DOSINI = $0C
a0D = $0D
ATRACT = $4D
a81 = $81
a82 = $82
a83 = $83
a84 = $84
a85 = $85
a86 = $86
a87 = $87
a88 = $88
a89 = $89
a8A = $8A
a8B = $8B
a8C = $8C
laserFrameRate = $8D
a8E = $8E
a8F = $8F
a90 = $90
a91 = $91
a92 = $92
a93 = $93
a94 = $94
a9A = $9A
a9B = $9B
a9C = $9C
a9D = $9D
a9E = $9E
screenLineLoPtr = $A0
screenLineHiPtr = $A1
aA2 = $A2
currentYPosition = $A3
currentXPosition = $A4
currentCharacter = $A5
aA8 = $A8
sizeOfDroidSquadForLevel = $A9
aAA = $AA
aAB = $AB
droidsLeftToKill = $AC
aAD = $AD
aD0 = $D0
aD1 = $D1
currentLevel = $D8
screenLinesLoPtrArray = $0600
screenLinesHiPtrArray = $0620
f0680 = $0680
f06C0 = $06C0
f07FF = $07FF
f0800 = $0800
f0801 = $0801
f08FF = $08FF
f0900 = $0900
f0901 = $0901
f09FF = $09FF
f0A00 = $0A00
f0A01 = $0A01
f0B00 = $0B00
f0B20 = $0B20
f0FFF = $0FFF
SCREEN_RAM = $1000
;
; **** ABSOLUTE ADRESSES **** 
;
a0086 = $0086
a02E0 = $02E0
a02E1 = $02E1
a1400 = $1400
a1401 = $1401
a1402 = $1402
a1403 = $1403
a1404 = $1404
a1405 = $1405
a1408 = $1408
a140B = $140B
a140F = $140F
a1411 = $1411
a1414 = $1414
a141B = $141B
a141C = $141C
a141D = $141D
;
; **** POINTERS **** 
;
p00 = $0000
p0102 = $0102
p2020 = $2020
p5633 = $5633
p7004 = $7004
pA777 = $A777
pFF01 = $FF01
;
; **** PREDEFINED LABELS **** 
;
SDLSTL = $0230
SDLSTH = $0231
COLDST = $0244
STICK0 = $0278
STRIG0 = $0284
COLOR0 = $02C4
COLOR1 = $02C5
COLOR2 = $02C6
COLOR3 = $02C7
COLOR4 = $02C8
CHBAS = $02F4
CH = $02FC
SETBV = $E45C


* = $2FE7
;---------------------------------------------------------------------------------
; LaunchGame   
;---------------------------------------------------------------------------------
        LDA a02E0    ;RUNAD   DOS run address
        STA DOSINI   ;DOSINI  
        STA CASINI   ;CASINI  cassette initialization vector
        LDA a02E1
        STA a0D
        STA a03
        LDA #$02
        STA BOOT     ;BOOT?   boot flag; 0 if none, 1 for disk, 2 for cassette
        LDA #$00
        STA COLDST   ;COLDST  cold start flag
        JMP (DOSINI) ;DOSINI  

f3001
.include "charset.asm"

        .BYTE $40,$00,$01,$00,$10,$00,$00
;---------------------------------------------------------------------------------
; InitializeGame   
;---------------------------------------------------------------------------------
InitializeGame   
        LDA #$70
        STA a1400
        STA a1401
        STA a1402
        LDA #$42
        STA a1403
        LDA #$00
        STA a1404
        LDA #$10
        STA a1405
        LDA #$04
        LDX #$16
b321E   STA a1405,X
        DEX 
        BNE b321E
        LDA #<a1400
        STA SDLSTL   ;SDLSTL  shadow for DLISTL ($D402)
        LDA #>a1400
        STA SDLSTH   ;SDLSTH  shadow for DLISTH ($D403)

        ; Clear the screen
        LDX #$00
        LDA #$00
b3232   STA SCREEN_RAM + $0000,X
        STA SCREEN_RAM + $0100,X
        STA SCREEN_RAM + $0200,X
        STA SCREEN_RAM + $0300,X
        INX 
        BNE b3232

        LDA #$41
        STA a141B
        LDA #$00
        STA a141C
        LDA #$14
        STA a141D

        LDA #<SCREEN_RAM
        STA screenLineLoPtr
        LDA #>SCREEN_RAM
        STA screenLineHiPtr

        ; Initialize the screen buffer.
        LDX #$00
b325A   LDA screenLineLoPtr
        STA screenLinesLoPtrArray,X
        LDA screenLineHiPtr
        STA screenLinesHiPtrArray,X
        LDA screenLineLoPtr
        CLC 
        ADC #$28
        STA screenLineLoPtr
        LDA screenLineHiPtr
        ADC #$00
        STA screenLineHiPtr
        INX 
        CPX #$18
        BNE b325A

        LDA #<pA777
        STA COLOR0   ;COLOR0  shadow for COLPF0 ($D016)
        LDA #>pA777
        STA COLOR1   ;COLOR1  shadow for COLPF1 ($D017)
        LDA #<p5633
        STA COLOR2   ;COLOR2  shadow for COLPF2 ($D018)
        LDA #>p5633
        STA COLOR3   ;COLOR3  shadow for COLPF3 ($D019)
        LDA #$00
        STA COLOR4   ;COLOR4  shadow for COLBK ($D01A)

        ; Write the strapline directly to the screen
        LDX #$28
b3291   LDA txtBanner,X
        CLC 
        SBC #$1F
        STA SCREEN_RAM - $01,X
        DEX 
        BNE b3291

        LDA #$30
        STA CHBAS    ;CHBAS   shadow for CHBASE ($D409)
;-------------------------------------------------------------------------
; JumpToPopulateTitleScreen
;-------------------------------------------------------------------------
JumpToPopulateTitleScreen
        JMP PopulateTitleScreen

txtBanner   =*-$01
        .TEXT "GRIDRUNNER  /@ 0000000  HI: 0000000  Z 0"
;-------------------------------------------------------------------------
; PopulateTitleScreen
;-------------------------------------------------------------------------
PopulateTitleScreen
        ; Set initial lives to 4
        LDA #$14
        STA SCREEN_RAM + $0027

        LDA #$01
        STA aA2
        LDY #$00
        LDX #$3F
        LDA #$07
        JSR SETBV    ;$E45C (jmp) SETBV
        JSR DrawTitleScreenText
        ; Comes back here when the user clicks fire.
        JSR ResetCurrentScore

;-------------------------------------------------------------------------
; j32E5
;-------------------------------------------------------------------------
j32E5
        JSR ClearScreenIncrementLifeAndLevel
        LDA #$02
        STA aA2
        LDA #$01
        STA $D208    ;AUDCTL
        LDA #$FC
        STA $D200    ;POT0
        LDA #$FF
        STA $D202    ;POT2
        LDA #$AA
        STA $D201    ;POT1
        STA $D203    ;POT3
        JMP j3357

;-------------------------------------------------------------------------
; GetLinePtrForCurrentYPosition
;-------------------------------------------------------------------------
GetLinePtrForCurrentYPosition
        LDX currentYPosition
        LDA screenLinesLoPtrArray,X
        STA screenLineLoPtr
        LDA screenLinesHiPtrArray,X
        STA screenLineHiPtr
        LDY currentXPosition
        RTS 

;-------------------------------------------------------------------------
; WriteCurrentCharacterToCurrentXYPos
;-------------------------------------------------------------------------
WriteCurrentCharacterToCurrentXYPos
        JSR GetLinePtrForCurrentYPosition
        LDA currentCharacter
        STA (screenLineLoPtr),Y
        RTS 

;-------------------------------------------------------------------------
; GetCharacterAtCurrentXYPos
;-------------------------------------------------------------------------
GetCharacterAtCurrentXYPos
        JSR GetLinePtrForCurrentYPosition
        LDA (screenLineLoPtr),Y
        RTS 

;-------------------------------------------------------------------------
; ClearGameScreen
;-------------------------------------------------------------------------
ClearGameScreen
        LDX #$00
        LDA #$00
b3327   STA SCREEN_RAM + $0028,X
        STA SCREEN_RAM + $0100,X
        STA SCREEN_RAM + $0200,X
        STA SCREEN_RAM + $0300,X
        DEX 
        BNE b3327
        RTS 

;-------------------------------------------------------------------------
; DrawGrid
;-------------------------------------------------------------------------
DrawGrid
        LDA #$02
        STA currentYPosition
b333B   LDA #$01
        STA currentXPosition
b333F   LDA #$01
        STA currentCharacter
        JSR WriteCurrentCharacterToCurrentXYPos
        INC currentXPosition
        LDA currentXPosition
        CMP #$27
        BNE b333F
        INC currentYPosition
        LDA currentYPosition
        CMP #$15
        BNE b333B
        RTS 

;-------------------------------------------------------------------------
; j3357
;-------------------------------------------------------------------------
j3357
        JSR ClearGameScreen
        JSR DrawGrid
        JSR MaterializeShip
        JMP SetUpGameAndEnterMainLoop

;-------------------------------------------------------------------------
; WasteAFewCycles
;-------------------------------------------------------------------------
WasteAFewCycles
        LDA #$20
        STA screenLineLoPtr
b3367   LDA #$20
        STA screenLineHiPtr
b336B   DEC screenLineHiPtr
        BNE b336B
        DEC screenLineLoPtr
        BNE b3367
        RTS 

;-------------------------------------------------------------------------
; MaterializeShip
;-------------------------------------------------------------------------
MaterializeShip
        LDY #$F0
b3376   JSR WasteAFewCycles
        JSR WasteAFewCycles
        DEY 
        BNE b3376

        LDX #$0F
        LDA #$00
        STA $D201    ;POT1
        STA $D203    ;POT3
        LDA #$10
        STA $D200    ;POT0

b338E   TXA 
        STA a81
        LDA #$0F
        SBC a81
        STA $D201    ;POT1
        LDA #$01
        STA currentCharacter
        JSR DrawFrameOfMaterializeShip
        DEC a81
        LDA #$3F
        STA currentCharacter
        JSR DrawFrameOfMaterializeShip
        TXA 
        TAY 
b33AA   JSR WasteAFewCycles
        DEY 
        BNE b33AA
        DEX 
        BNE b338E
        RTS 

;-------------------------------------------------------------------------
; DrawFrameOfMaterializeShip
;-------------------------------------------------------------------------
DrawFrameOfMaterializeShip
        TXA 
        PHA 
        LDA #$14
        STA currentYPosition
        LDA #$14
        CLC 
        SBC a81
        STA currentXPosition
        JSR WriteCurrentCharacterToCurrentXYPos
        LDX currentLevel
        LDA currentYPosition
        CLC 
        SBC a81
        STA currentYPosition
        JSR WriteCurrentCharacterToCurrentXYPos
        LDA #$14
        STA currentXPosition
        JSR WriteCurrentCharacterToCurrentXYPos
        LDA currentXPosition
        CLC 
        ADC a81
        STA currentXPosition
        JSR WriteCurrentCharacterToCurrentXYPos
        LDA #$14
        STA currentYPosition
        JSR WriteCurrentCharacterToCurrentXYPos
        PLA 
        TAX 
        RTS 

;---------------------------------------------------------------------------------
; b33EB   
;---------------------------------------------------------------------------------
b33EB   
        LDX #$02
b33ED   LDY #$F0
b33EF   DEY 
        BNE b33EF
        DEX 
        BNE b33ED
        LDA screenLineLoPtr
        STA $D200    ;POT0
        INC screenLineLoPtr
        LDA screenLineLoPtr
        CMP #$80
        BNE b33EB
        RTS 

;-------------------------------------------------------------------------
; SetUpGameAndEnterMainLoop
;-------------------------------------------------------------------------
SetUpGameAndEnterMainLoop
        JSR DrawGrid
        LDA #$14
        STA a82
        STA a81
        STA currentYPosition
        STA currentXPosition
        LDA #$03
        STA currentCharacter
        JSR WriteCurrentCharacterToCurrentXYPos
        LDA #$01
        STA aA2
        LDA #$33
        STA COLOR2   ;COLOR2  shadow for COLPF2 ($D018)
        LDA #$00
        STA $D207    ;POT7
        STA $D203    ;POT3
        LDA #$AF
        STA $D201    ;POT1
        LDA #$01
        STA screenLineLoPtr
        JSR b33EB
        LDA #$A8
        STA $D201    ;POT1
        LDA #$01
        STA screenLineLoPtr
        JSR b33EB
        LDA #$A3
        STA $D201    ;POT1
        LDA #$01
        STA screenLineLoPtr
        JSR b33EB
        LDA #$00
        STA $D201    ;POT1
        LDA #$00
        STA $D208    ;AUDCTL
        STA a93
        STA a9C
        STA a9B
        STA a91
        STA @wa0086
        LDA #$02
        STA aAD
        STA a8A
        LDA #$02
        STA a8B
        STA a9A

        LDX #$20
        LDA #$00
b3471   STA f0680,X
        STA f06C0,X
        DEX 
        BNE b3471

b347A   STA f0800,X
        STA f0900,X
        STA f0A00,X
        DEY 
        BNE b347A

        LDX currentLevel
        LDA noOfDroidSquadsForLevel,X
        STA droidsLeftToKill
        LDA sizeOfDroidSquadsForLevels,X
        STA sizeOfDroidSquadForLevel
        STA aAA

        LDA #$10
        STA aA8
        STA aAB

        LDA laserFrameRateForLevel,X
        STA laserFrameRate
        STA a8C
        JMP MainGameLoop

;-------------------------------------------------------------------------
; DrawBullet
;-------------------------------------------------------------------------
DrawBullet
        DEC a83
        LDA a83
        CMP #$70
        BEQ b34AD
        RTS 

b34AD   LDA #$00
        STA a83
        LDA STICK0   ;STICK0  shadow for PORTA lo ($D300)
        EOR #$FF
        STA a84
        LDA a81
        STA currentXPosition
        LDA a82
        STA currentYPosition
        JSR GetCharacterAtCurrentXYPos
        CMP #$01
        BEQ b34CE
        CMP #$03
        BEQ b34CE
        JSR s3B23
b34CE   LDA a81
        STA currentXPosition
        LDA a82
        STA currentYPosition
        LDA #$01
        STA currentCharacter
        JSR WriteCurrentCharacterToCurrentXYPos
        LDA a84
        AND #$01
        BEQ b34EF
        DEC currentYPosition
        LDA currentYPosition
        CMP #$0C
        BNE b34EF
        LDA #$0D
        STA currentYPosition
b34EF   LDA a84
        AND #$02
        BEQ b34FF
        INC currentYPosition
        LDA currentYPosition
        CMP #$15
        BNE b34FF
        DEC currentYPosition
b34FF   LDA a84
        AND #$04
        BEQ b350F
        DEC currentXPosition
        LDA currentXPosition
        CMP #$00
        BNE b350F
        INC currentXPosition
b350F   LDA a84
        AND #$08
        BEQ b351F
        INC currentXPosition
        LDA currentXPosition
        CMP #$27
        BNE b351F
        DEC currentXPosition
b351F   JSR GetCharacterAtCurrentXYPos
        CMP #$01
        BEQ b352C
        JSR s3B23
        JMP j3534

b352C   LDA currentXPosition
        STA a81
        LDA currentYPosition
        STA a82
;-------------------------------------------------------------------------
; j3534
;-------------------------------------------------------------------------
j3534
        LDA a82
        STA currentYPosition
        LDA a81
        STA currentXPosition
        LDA #$03
        STA currentCharacter
        JMP WriteCurrentCharacterToCurrentXYPos

;-------------------------------------------------------------------------
; MainGameLoop
;-------------------------------------------------------------------------
MainGameLoop
        LDA #$02
        STA ATRACT   ;ATRACT  screen attract counter
        JSR DrawBullet
        JSR Waste20Cycles
        JSR DrawLaser
        JSR UpdateZappersPosition
        JSR s3674
        JSR s37AF
        JSR s3816
        JSR s3875
        JSR s3DAC
        JMP MainGameLoop

;-------------------------------------------------------------------------
; Waste20Cycles
;-------------------------------------------------------------------------
Waste20Cycles
        LDY #$20
b3567   DEY 
        BNE b3567
        RTS 

;-------------------------------------------------------------------------
; DrawLaser
;-------------------------------------------------------------------------
DrawLaser
        DEC a85
        BEQ b3570
        RTS 

b3570   LDA #$20
        STA a85
        LDA a89
        CMP #$70
        BEQ b3584
        INC a89
        LDA a89
        STA $D200    ;POT0
        JMP j3589

b3584   LDA #$00
        STA $D201    ;POT1
;-------------------------------------------------------------------------
; j3589
;-------------------------------------------------------------------------
j3589
        LDA a86
        CMP #$FF
        BNE b3592
        JMP j35AE

b3592   LDA STRIG0   ;STRIG0  shadow for TRIG0 ($D001)
        BEQ b3598
        RTS 

b3598   LDA a81
        STA a87
        LDA a82
        STA a88
        LDA #$FF
        STA a86
        LDA #$4A
        STA $D201    ;POT1
        LDA #$10
        STA a89
        RTS 

;-------------------------------------------------------------------------
; j35AE
;-------------------------------------------------------------------------
j35AE
        LDA a87
        STA currentXPosition
        LDA a88
        STA currentYPosition
        JSR GetCharacterAtCurrentXYPos
        CMP #$0A
        BEQ b35CB
        CMP #$09
        BEQ b35C4
        JSR s35F2
b35C4   LDA #$0A
        STA currentCharacter
        JMP j35EF

b35CB   LDA #$01
        STA currentCharacter
        JSR WriteCurrentCharacterToCurrentXYPos
        LDA #$09
        STA currentCharacter
        DEC a88
        LDA a88
        CMP #$02
        BNE b35E3
        LDA #$00
        STA a86
        RTS 

b35E3   STA currentYPosition
        JSR GetCharacterAtCurrentXYPos
        CMP #$01
        BEQ j35EF
        JSR s35F2
;-------------------------------------------------------------------------
; j35EF
;-------------------------------------------------------------------------
j35EF
        JMP WriteCurrentCharacterToCurrentXYPos

;-------------------------------------------------------------------------
; s35F2
;-------------------------------------------------------------------------
s35F2
        JSR s371B
        JSR s3A18
        RTS 

;-------------------------------------------------------------------------
; UpdateZappersPosition
;-------------------------------------------------------------------------
UpdateZappersPosition
        LDA a83
        CMP #$F0
        BEQ b3600
        RTS 

b3600   DEC aAD
        BEQ b3605
        RTS 

b3605   LDA #$02
        STA aAD
        LDA a8A
        STA currentXPosition
        LDA #$15
        STA currentYPosition
        LDA #$00
        STA currentCharacter
        JSR WriteCurrentCharacterToCurrentXYPos
        INC a8A
        LDA a8A
        CMP #$27
        BNE b3624
        LDA #$02
        STA a8A
b3624   STA currentXPosition
        LDA #$04
        STA currentCharacter
        JSR WriteCurrentCharacterToCurrentXYPos
        LDA a8B
        STA currentYPosition
        LDA #<p00
        STA currentXPosition
        LDA #>p00
        STA currentCharacter
        JSR WriteCurrentCharacterToCurrentXYPos
        INC a8B
        LDA a8B
        CMP #$14
        BNE b3648
        LDA #$02
        STA a8B
b3648   STA currentYPosition
        LDA #$02
        STA currentCharacter
        JSR WriteCurrentCharacterToCurrentXYPos
        DEC a8C
        BNE b3673
        LDA laserFrameRate
        STA a8C
        LDA a8A
        STA a8E
        LDA a8B
        STA a8F
        LDA #<pFF01
        STA a90
        LDA #>pFF01
        STA a91
        LDA #$FF
        STA $D202    ;POT2
        LDA #$AF
        STA $D203    ;POT3
b3673   RTS 

;-------------------------------------------------------------------------
; s3674
;-------------------------------------------------------------------------
s3674
        DEC a92
        BEQ b3679
        RTS 

b3679   JSR s3766
        LDA #$20
        STA a92
        LDA a91
        CMP #$FF
        BEQ b3687
        RTS 

b3687   LDA #$07
        STA currentCharacter
        LDA #$FF
        SBC a90
        STA $D202    ;POT2
        LDA #$14
        STA currentYPosition
        LDA a8E
        STA currentXPosition
        JSR GetCharacterAtCurrentXYPos
        CMP #$07
        BNE b36A5
        LDA #$08
        STA currentCharacter
b36A5   LDA #$14
        STA currentYPosition
b36A9   JSR WriteCurrentCharacterToCurrentXYPos
        DEC currentYPosition
        LDA currentYPosition
        CMP #$01
        BNE b36A9
        LDA #$05
        STA currentCharacter
        LDA a90
        STA currentXPosition
        LDA a8F
        STA currentYPosition
        JSR GetCharacterAtCurrentXYPos
        CMP #$05
        BNE b36CB
        LDA #$06
        STA currentCharacter
b36CB   LDA #$01
        STA (screenLineLoPtr),Y
        INC a90
        LDA a90
        STA currentXPosition
        JSR GetCharacterAtCurrentXYPos
        CMP #$07
        BEQ b36E3
        CMP #$08
        BEQ b36E3
        JMP WriteCurrentCharacterToCurrentXYPos

b36E3   LDA #$01
        STA currentCharacter
        LDA #$14
        STA currentYPosition
        LDA a8E
        STA currentXPosition
b36EF   JSR WriteCurrentCharacterToCurrentXYPos
        DEC currentYPosition
        LDA currentYPosition
        CMP #$01
        BNE b36EF
        LDA #$00
        STA a91
        LDA #$00
        STA $D203    ;POT3
        LDA a90
        STA currentXPosition
        LDA a8F
        STA currentYPosition
        LDA #$0E
        STA currentCharacter
f3711   =*+$02
        JMP WriteCurrentCharacterToCurrentXYPos

f3712   .BYTE $01
f3713   .BYTE $0C,$0D,$0E,$1B,$1C,$1D,$1E,$0B
;-------------------------------------------------------------------------
; s371B
;-------------------------------------------------------------------------
s371B
        LDX #$07
b371D   CMP f3712,X
        BEQ b3726
        DEX 
        BNE b371D
        RTS 

b3726   LDA f3711,X
        STA currentCharacter
        CMP #$01
        BNE b3739
        LDX #$06
        LDY #$01
        JSR IncrementPlayerScore
        JSR s375D
b3739   JSR WriteCurrentCharacterToCurrentXYPos
        LDA #$00
        STA a86
        PLA 
        PLA 
        RTS 

;-------------------------------------------------------------------------
; IncrementPlayerScore
;-------------------------------------------------------------------------
IncrementPlayerScore
        TXA 
        PHA 
b3745   INC SCREEN_RAM + $000E,X
        LDA SCREEN_RAM + $000E,X
        CMP #$1A
        BNE b3757
        LDA #$10
        STA SCREEN_RAM + $000E,X
        DEX 
        BNE b3745
b3757   PLA 
        TAX 
        DEY 
        BNE IncrementPlayerScore
        RTS 

;-------------------------------------------------------------------------
; s375D
;-------------------------------------------------------------------------
s375D
        LDA #<p7004
        STA a93
        LDA #>p7004
        STA a94
        RTS 

;-------------------------------------------------------------------------
; s3766
;-------------------------------------------------------------------------
s3766
        LDA a93
        CMP #$FF
        BNE b376D
        RTS 

b376D   LDA a94
        CMP #$70
        BEQ b377D
        INC a94
        INC a94
        LDA a94
        STA $D202    ;POT2
        RTS 

b377D   DEC a93
        LDA a93
        CMP #$03
        BNE b378D
        LDA #$AF
        STA $D203    ;POT3
        JMP j37AA

b378D   CMP #$02
        BNE b3799
        LDA #$AA
        STA $D203    ;POT3
        JMP j37AA

b3799   CMP #$01
        BNE b37A5
        LDA #$A7
        STA $D203    ;POT3
        JMP j37AA

b37A5   LDA #$00
        STA $D203    ;POT3
;-------------------------------------------------------------------------
; j37AA
;-------------------------------------------------------------------------
j37AA
        LDA #$50
        STA a94
        RTS 

;-------------------------------------------------------------------------
; s37AF
;-------------------------------------------------------------------------
s37AF
        LDA a8C
        CMP #$03
        BEQ b37B6
        RTS 

b37B6   DEC a8C
        LDA #<SCREEN_RAM + $0028
        STA screenLineLoPtr
        LDA #>SCREEN_RAM + $0028
        STA screenLineHiPtr
        LDY #$00
b37C2   LDA (screenLineLoPtr),Y
        CMP #$01
        BEQ b37CB
        JSR s37D8
b37CB   INC screenLineLoPtr
        BNE b37C2
        INC screenLineHiPtr
        LDA screenLineHiPtr
        CMP #$14
        BNE b37C2
        RTS 

;-------------------------------------------------------------------------
; s37D8
;-------------------------------------------------------------------------
s37D8
        CMP #$00
        BNE b37DD
        RTS 

b37DD   LDX #$07
b37DF   CMP f3712,X
        BEQ b37E8
        DEX 
        BNE b37DF
        RTS 

b37E8   LDA f3713,X
        STA (screenLineLoPtr),Y
        CPX #$07
        BNE b37F4
        JSR s37F5
b37F4   RTS 

;-------------------------------------------------------------------------
; s37F5
;-------------------------------------------------------------------------
s37F5
        TXA 
        PHA 
        LDX #$20
b37F9   LDA f06C0,X
        BEQ b3809
        DEX 
        BNE b37F9
        PLA 
        TAX 
        LDA f3711,X
        STA (screenLineLoPtr),Y
        RTS 

b3809   LDA screenLineLoPtr
        STA f0680,X
        LDA screenLineHiPtr
        STA f06C0,X
        PLA 
        TAX 
        RTS 

;-------------------------------------------------------------------------
; s3816
;-------------------------------------------------------------------------
s3816
        LDA a92
        CMP #$03
        BEQ b381D
        RTS 

b381D   DEC a9A
        BEQ b3822
        RTS 

b3822   LDA #$02
        STA a9A
        LDX #$20
b3828   LDA f06C0,X
        BEQ b3871
        LDA f0680,X
        STA screenLineLoPtr
        LDA f06C0,X
        STA screenLineHiPtr
        LDY #$00
        LDA #$01
        STA (screenLineLoPtr),Y
        LDA screenLineLoPtr
        CLC 
        ADC #$28
        STA screenLineLoPtr
        LDA screenLineHiPtr
        ADC #$00
        STA screenLineHiPtr
        LDA (screenLineLoPtr),Y
        CMP #$03
        BNE b3853
        JMP j3A48

b3853   CMP #$00
        BEQ b386C
        CMP #$04
        BEQ b386C
        LDA screenLineLoPtr
        STA f0680,X
        LDA screenLineHiPtr
        STA f06C0,X
        LDA #$0B
        STA (screenLineLoPtr),Y
        JMP b3871

b386C   LDA #$00
        STA f06C0,X
b3871   DEX 
        BNE b3828
        RTS 

;-------------------------------------------------------------------------
; s3875
;-------------------------------------------------------------------------
s3875
        DEC a9D
        BEQ b387A
        RTS 

b387A   INC a9C
        LDA a9C
        CMP #$03
        BNE b3886
        LDA #$00
        STA a9C
b3886   JSR s3938
        LDA #$A0
        STA a9D
        LDX a9B
;-------------------------------------------------------------------------
; j388F
;-------------------------------------------------------------------------
j388F
        LDA f0800,X
        STA currentXPosition
        LDA f0900,X
        STA currentYPosition
        LDA #$01
        STA currentCharacter
        STX a9E
        LDA f0A00,X
        AND #$80
        BEQ b38A9
        JSR WriteCurrentCharacterToCurrentXYPos
b38A9   LDX a9E
        LDA f0A00,X
        AND #$40
        BEQ b3915
;-------------------------------------------------------------------------
; j38B2
;-------------------------------------------------------------------------
j38B2
        LDA f0A00,X
        AND #$01
        BEQ b38BD
        INC currentXPosition
        INC currentXPosition
b38BD   DEC currentXPosition
        JSR GetCharacterAtCurrentXYPos
        CMP #$03
        BNE b38C9
        JMP j3A48

b38C9   LDX a9E
        CMP #$01
        BEQ b3908
        INC currentYPosition
        LDA currentYPosition
        CMP #$15
        BNE b38FD
        LDA #$01
        STA f0800,X
        STA currentXPosition
        LDA #$0D
        STA f0900,X
        STA currentYPosition
        LDA f0A00,X
        AND #$F0
        ORA #$01
        STA f0A00,X
;-------------------------------------------------------------------------
; j38EF
;-------------------------------------------------------------------------
j38EF
        TXA 
        PHA 
        LDX a9C
        LDA f3935,X
        STA currentCharacter
        PLA 
        TAX 
        JMP j3929

b38FD   LDA f0A00,X
        EOR #$03
        STA f0A00,X
        JMP j38B2

b3908   LDA currentXPosition
        STA f0800,X
        LDA currentYPosition
        STA f0900,X
        JMP j38EF

b3915   LDA f07FF,X
        STA f0800,X
        STA currentXPosition
        LDA f08FF,X
        STA f0900,X
        STA currentYPosition
        LDA #$1F
        STA currentCharacter
;-------------------------------------------------------------------------
; j3929
;-------------------------------------------------------------------------
j3929
        JSR WriteCurrentCharacterToCurrentXYPos
        LDX a9E
        DEX 
        BEQ b3934
        JMP j388F

b3934   RTS 

f3935   .BYTE $1F,$3B,$3C
;-------------------------------------------------------------------------
; s3938
;-------------------------------------------------------------------------
s3938
        LDA aAB
        BEQ b3941
        DEC aAB
        JMP j3945

b3941   LDA droidsLeftToKill
        BNE b394C
;-------------------------------------------------------------------------
; j3945
;-------------------------------------------------------------------------
j3945
        LDA a9B
        BNE b394B
        PLA 
        PLA 
b394B   RTS 

b394C   INC a9B
        LDX a9B
        LDA aAA
        CMP sizeOfDroidSquadForLevel
        BNE b3968
        LDA #$41
;-------------------------------------------------------------------------
; j3958
;-------------------------------------------------------------------------
j3958
        STA f0A00,X
        LDA #$0A
        STA f0800,X
        LDA #$02
        STA f0900,X
        JMP j396D

b3968   LDA #$00
        JMP j3958

;-------------------------------------------------------------------------
; j396D
;-------------------------------------------------------------------------
j396D
        DEC aAA
        BNE j3945
        LDA #$80
        STA f0A00,X
        DEC droidsLeftToKill
        LDA sizeOfDroidSquadForLevel
        STA aAA
        LDA aA8
        STA aAB
        JMP j3945

;-------------------------------------------------------------------------
; j3983
;-------------------------------------------------------------------------
j3983
        LDX a9B
b3985   LDA f0800,X
        CMP currentXPosition
        BEQ b3990
b398C   DEX 
        BNE b3985
        RTS 

b3990   LDA f0900,X
        CMP currentYPosition
        BNE b398C
        LDA f0A00,X
        AND #$40
        BEQ b39FC
        LDA f0A00,X
        AND #$7F
        STA aD0
        TXA 
        PHA 
        LDX #$05
        LDY #$03
        JSR IncrementPlayerScore
        PLA 
        TAX 
        LDA aD0
        AND #$80
        BEQ b39BA
        LDA #$00
        STA aD0
b39BA   STX a9E
b39BC   LDA f0801,X
        STA f0800,X
        LDA f0901,X
        STA f0900,X
        LDA f0A01,X
        STA f0A00,X
        INX 
        CPX a9B
        BMI b39BC
        DEC a9B
        LDX a9E
        LDA f0A00,X
        ORA aD0
        STA f0A00,X
        LDA #$0D
        STA currentCharacter
        LDA #$00
        STA a86
        JSR WriteCurrentCharacterToCurrentXYPos
        PLA 
        PLA 
        PLA 
        PLA 
        LDX #$05
        LDY #$01
        JSR IncrementPlayerScore
        JSR s375D
        JSR s3D05
        RTS 

b39FC   LDA f0A00,X
        AND #$80
        BNE b3A09
        JSR s3A29
        JMP b39BA

b3A09   LDA f09FF,X
        ORA #$80
        STA f09FF,X
        LDA #$00
        STA aD0
        JMP b39BA

;-------------------------------------------------------------------------
; s3A18
;-------------------------------------------------------------------------
s3A18
        JSR GetCharacterAtCurrentXYPos
        LDX #$03
b3A1D   CMP b3934,X
        BEQ b3A26
        DEX 
        BNE b3A1D
        RTS 

b3A26   JMP j3983

;-------------------------------------------------------------------------
; s3A29
;-------------------------------------------------------------------------
s3A29
        LDA f09FF,X
        ORA #$80
        STA f09FF,X
        TXA 
        PHA 
;-------------------------------------------------------------------------
; j3A33
;-------------------------------------------------------------------------
j3A33
        DEX 
        LDA f0A00,X
        AND #$40
        BNE b3A3E
        JMP j3A33

b3A3E   LDA f0A00,X
        AND #$7F
        STA aD0
        PLA 
        TAX 
        RTS 

;-------------------------------------------------------------------------
; j3A48
;-------------------------------------------------------------------------
j3A48
        LDX #$F6
        TXS 
        LDA a81
        STA currentXPosition
        LDA a82
        STA currentYPosition
        LDA #$01
        STA currentCharacter
        JSR WriteCurrentCharacterToCurrentXYPos
        LDA #$00
        STA $D201    ;POT1
        STA $D203    ;POT3
        STA $D207    ;POT7
        LDA #$80
        STA $D200    ;POT0
        JSR s3A96
        LDX #$00
b3A6F   STX aD0
        LDA #$0F
        SBC aD0
        STA $D201    ;POT1
        LDA #$01
        STA currentCharacter
        JSR s3AA6
        LDX aD0
        INX 
        LDA #$3E
        STA currentCharacter
        JSR s3AAD
        JSR WasteMoreCycles
        LDX aD0
        INX 
        CPX #$10
        BNE b3A6F
        JMP j3CEB

;-------------------------------------------------------------------------
; s3A96
;-------------------------------------------------------------------------
s3A96
        LDX #$08
b3A98   LDA a81
        STA f0B00,X
        LDA a82
        STA f0B20,X
        DEX 
        BNE b3A98
        RTS 

;-------------------------------------------------------------------------
; s3AA6
;-------------------------------------------------------------------------
s3AA6
        LDA #$3E
        STA aD1
        JMP j3AB1

;-------------------------------------------------------------------------
; s3AAD
;-------------------------------------------------------------------------
s3AAD
        LDA #$01
        STA aD1
;-------------------------------------------------------------------------
; j3AB1
;-------------------------------------------------------------------------
j3AB1
        LDX #$08
b3AB3   LDA aD1
        CMP #$3E
        BEQ b3ADD
        LDA f3B13,X
        BEQ b3AC5
        CMP #$01
        BNE b3AC8
        INC f0B00,X
b3AC5   INC f0B00,X
b3AC8   DEC f0B00,X
        LDA f3B1B,X
        BEQ b3AD7
        CMP #$01
        BNE b3ADA
        INC f0B20,X
b3AD7   INC f0B20,X
b3ADA   DEC f0B20,X
b3ADD   LDA f0B00,X
        STA currentXPosition
        LDA f0B20,X
        STA currentYPosition
        STX a90
        JSR GetCharacterAtCurrentXYPos
        CMP aD1
        BNE b3AF9
        JSR WriteCurrentCharacterToCurrentXYPos
;-------------------------------------------------------------------------
; j3AF3
;-------------------------------------------------------------------------
j3AF3
        LDX a90
        DEX 
        BNE b3AB3
        RTS 

b3AF9   LDX a90
        LDA a81
        STA f0B00,X
        LDA a82
        STA f0B20,X
        JMP j3AF3

;-------------------------------------------------------------------------
; WasteMoreCycles
;-------------------------------------------------------------------------
WasteMoreCycles
        LDX #$00
b3B0A   LDY #$40
b3B0C   DEY 
        BNE b3B0C
        DEX 
        BNE b3B0A
        RTS 

f3B13   .BYTE $00,$00,$01,$01,$01,$FF,$FF,$FF
f3B1B   .BYTE $01,$FF,$00,$01,$FF,$00,$01,$FF
;-------------------------------------------------------------------------
; s3B23
;-------------------------------------------------------------------------
s3B23
        LDX #$08
b3B25   CMP f3B30,X
        BEQ b3B2E
        DEX 
        BNE b3B25
        RTS 

f3B30   =*+$02
b3B2E   JMP j3A48

        .BYTE $05,$06,$07,$08,$1F,$3B,$3C,$0B
;-------------------------------------------------------------------------
; ClearScreenIncrementLifeAndLevel
;-------------------------------------------------------------------------
ClearScreenIncrementLifeAndLevel
        JSR ClearGameScreen

        ; Increment one life.
        INC SCREEN_RAM + $0027
        LDA SCREEN_RAM + $0027
        CMP #$1A
        BNE b3B49
        DEC SCREEN_RAM + $0027

        ; Increment current level
b3B49   LDA #$00
        STA $D208    ;AUDCTL
        INC currentLevel
        LDA currentLevel
        CMP #$20
        BNE b3B5A
        LDA #$1F
        STA currentLevel

b3B5A   JSR DrawEnterGridAreaRubric
        LDA #$FC
        STA $D200    ;POT0
        LDA #$FF
        STA $D202    ;POT2
        LDA #$AA
        STA $D201    ;POT1
        STA $D203    ;POT3
        LDX #$00
        STX $D207    ;POT7
b3B74   JSR WasteAFewCycles
        DEX 
        BNE b3B74
        LDA #$04
        STA a140F
        RTS 

;-------------------------------------------------------------------------
; DrawEnterGridAreaRubric
;-------------------------------------------------------------------------
DrawEnterGridAreaRubric
        LDA #$06
        STA a140F

        LDX #$13
b3B87   LDA titleTextLine1,X
        CLC 
        SBC #$1F
        STA SCREEN_RAM + $0190,X
        DEX 
        BNE b3B87

        LDX currentLevel
b3B95   INC SCREEN_RAM + $01A2
        LDA SCREEN_RAM + $01A2
        CMP #$1A
        BNE b3BA7
        LDA #$10
        STA SCREEN_RAM + $01A2
        INC SCREEN_RAM + $01A1
b3BA7   DEX 
        BNE b3B95
        RTS 

titleTextLine1  =*-$01 
                 .TEXT "ENTER GRID AREA 0"
titleTextLine2   .TEXT "0 DESIGNED AND PROGRAMMED BY JEFF MINTER"
titleTextLine3   .TEXT "   COPYRIGHT 1983 BY LLAMASOFT SOFTWARE "
titleTextLine4   .TEXT "   PRESS FIRE TO BEGIN OR UP FOR LEVELS "
titleTextLine5   .TEXT "  MAY THE POWER OF THE GRID PRESERVE YOU "

;-------------------------------------------------------------------------
; DrawTitleScreenText
;-------------------------------------------------------------------------
DrawTitleScreenText
        LDA #$00
        STA COLOR2   ;COLOR2  shadow for COLPF2 ($D018)
        JSR ClearGameScreen

        LDA #$02
        STA a1408
        STA a140B
        STA a1411
        STA a1414

        LDA #$01
        STA currentLevel

        JSR DrawEnterGridAreaRubric

        LDX #$28
b3C7C   LDA titleTextLine2,X
        CLC 
        SBC #$1F
        STA SCREEN_RAM + $0077,X
        LDA titleTextLine3,X
        CLC 
        SBC #$1F
        STA SCREEN_RAM + $00EF,X
        LDA titleTextLine4,X
        CLC 
        SBC #$1F
        STA SCREEN_RAM + $01CB,X
        LDA titleTextLine5,X
        CLC 
        SBC #$1F
        STA SCREEN_RAM + $0243,X
        DEX 
        BNE b3C7C

        ; Loop waiting for joystick input
TitleScreenJoystickLoop   
        LDX #$20
b3CA5   JSR WasteAFewCycles
        LDA STRIG0   ;STRIG0  shadow for TRIG0 ($D001)
        BEQ b3CCB ; Pressed fire?
        DEX 
        BNE b3CA5
        LDA STICK0   ;STICK0  shadow for PORTA lo ($D300)
        EOR #$FF
        AND #$01
        BEQ TitleScreenJoystickLoop ; Pressed up?

        ; Pressed up, increment selected level.
        INC currentLevel
        LDA currentLevel
        CMP #$20
        BNE b3CC5

        ; Loop back to 1 if the user selected up to level 20.
        LDA #$01
        STA currentLevel
b3CC5   JSR DrawEnterGridAreaRubric
        JMP TitleScreenJoystickLoop

        ; Pressed fire, start the game.
b3CCB   LDA #$04
        STA a1408
        STA a140B
        STA a1411
        STA a1414
        STA a140F
        DEC currentLevel
        JSR ClearGameScreen
        LDA #$33
        STA COLOR2   ;COLOR2  shadow for COLPF2 ($D018)
        LDA #$02
        STA aA2
        RTS 

;-------------------------------------------------------------------------
; j3CEB
;-------------------------------------------------------------------------
j3CEB
        DEC SCREEN_RAM + $0027
        DEC currentLevel
        LDA SCREEN_RAM + $0027
        CMP #$10
        BEQ b3D02
        DEC SCREEN_RAM + $0027
        LDA #$00
        STA $D207    ;POT7
        JMP j32E5

b3D02   JMP j3D86

;-------------------------------------------------------------------------
; s3D05
;-------------------------------------------------------------------------
s3D05
        LDA a9B
        BEQ b3D0A
        RTS 

b3D0A   LDA droidsLeftToKill
        BEQ b3D0F
        RTS 

b3D0F   LDX #$F6
        TXS 
        JMP j32E5

noOfDroidSquadsForLevel   .BYTE $01,$01,$01,$02,$02,$02,$03,$03
        .BYTE $03,$04,$04,$04,$05,$05,$05,$06
        .BYTE $06,$06,$06,$06,$06,$06,$06,$06
        .BYTE $06,$06,$06,$06,$06,$06,$06,$06
        .BYTE $06,$06,$06,$06
sizeOfDroidSquadsForLevels   .BYTE $06,$06,$0C,$04,$06,$0C,$04,$06
        .BYTE $08,$04,$06,$0C,$04,$06,$08,$04
        .BYTE $06,$08,$0A,$0C,$0E,$10,$12,$14
        .BYTE $16,$18,$1A,$1C,$1E,$20,$22,$24
        .BYTE $26
laserFrameRateForLevel   .BYTE $14,$12,$10,$0E,$0D,$0C,$0B,$0A
        .BYTE $09,$09,$09,$09,$09,$09,$09,$08
        .BYTE $08,$08,$08,$08,$08,$08,$07,$07
        .BYTE $07,$06,$06,$06,$06,$06,$06,$06
        .BYTE $06
;-------------------------------------------------------------------------
; ResetCurrentScore
;-------------------------------------------------------------------------
ResetCurrentScore
        LDX #$07
        LDA #$10
b3D7F   STA SCREEN_RAM + $000E,X
        DEX 
        BNE b3D7F
        RTS 

;-------------------------------------------------------------------------
; j3D86
;-------------------------------------------------------------------------
j3D86
        LDX #$00
b3D88   LDA SCREEN_RAM + $000F,X
        CMP SCREEN_RAM + $001C,X
        BEQ b3D94
        BPL b3D9C
        BMI b3D99
b3D94   INX 
        CPX #$07
        BNE b3D88
b3D99   JMP JumpToPopulateTitleScreen

b3D9C   LDX #$00
b3D9E   LDA SCREEN_RAM + $000F,X
        STA SCREEN_RAM + $001C,X
        INX 
        CPX #$07
        BNE b3D9E
        JMP JumpToPopulateTitleScreen

;-------------------------------------------------------------------------
; s3DAC
;-------------------------------------------------------------------------
s3DAC
        LDA CH       ;CH      keyboard FIFO byte
        CMP #$FF
        BNE b3DB4
        RTS 

b3DB4   LDA #$FF
        STA CH       ;CH      keyboard FIFO byte
        LDX #$20
b3DBB   JSR WasteAFewCycles
        DEX 
        BNE b3DBB
        LDA CH       ;CH      keyboard FIFO byte
        CMP #$FF
        BNE b3DB4
b3DC8   LDA #$FF
        STA CH       ;CH      keyboard FIFO byte
        LDX #$20
b3DCF   JSR WasteAFewCycles
        DEX 
        BNE b3DCF
        LDA CH       ;CH      keyboard FIFO byte
        CMP #$FF
        BEQ b3DC8
        LDA #$FF
        STA CH       ;CH      keyboard FIFO byte
        RTS 

f3DE2
        .BYTE $09,$0B,$0E,$20,$20,$49,$4E,$43
        .BYTE $20,$5A,$41,$50,$58,$9B,$0E,$0B
        .BYTE $0E,$20,$20,$4C,$44,$41,$20,$5A
        .BYTE $41,$50,$58,$9B,$13,$0B,$0E,$20
        .BYTE $20,$43,$4D,$50,$20,$23,$24,$32
        .BYTE $37,$9B,$18,$0B,$0F,$20,$20,$42
        .BYTE $4E,$45,$20,$4E,$4F,$52,$41,$50
        .BYTE $9B,$1D,$0B,$0E,$20,$20,$4C,$44
        .BYTE $41,$20,$23,$24,$30,$32,$9B,$22
        .BYTE $0B,$0E,$20,$20,$53,$54,$41,$20
        .BYTE $5A,$41,$50,$58,$9B,$27,$0B,$11
        .BYTE $20,$4E,$4F,$52,$41,$50,$20,$53
        .BYTE $54,$41,$20,$58,$50,$9B,$2C,$0B
        .BYTE $0E,$20,$20,$4C,$44,$41,$20,$23
        .BYTE $24,$30,$34,$9B,$31,$0B,$0E,$20
        .BYTE $20,$53,$54,$41,$20,$43,$48,$41
        .BYTE $52,$9B,$36,$0B,$0E,$20,$20,$4A
        .BYTE $53,$52,$20,$50,$4C,$4F,$54,$9B
        .BYTE $3B,$0B,$0E,$20,$20,$4C,$44,$41
        .BYTE $20,$5A,$41,$50,$59,$9B,$40,$0B
        .BYTE $0C,$20,$20,$53,$54,$41,$20,$59
        .BYTE $50,$9B,$45,$0B,$0E,$20,$20,$4C
        .BYTE $44,$41,$20,$23,$24,$30,$30,$9B
        .BYTE $4A,$0B,$0C,$20,$20,$53,$54,$41
        .BYTE $20,$58,$50,$9B,$4F,$0B,$0E,$20
        .BYTE $20,$4C,$44,$41,$20,$23,$24,$30
        .BYTE $30,$9B,$54,$0B,$0E,$20,$20,$53
        .BYTE $54,$41,$20,$43,$48,$41,$52,$9B
        .BYTE $59,$0B,$0E,$20,$20,$4A,$53,$52
        .BYTE $20,$50,$4C,$4F,$54,$9B,$5E,$0B
        .BYTE $0E,$20,$20,$49,$4E,$43,$20,$5A
        .BYTE $41,$50,$59,$9B,$63,$0B,$0E,$20
        .BYTE $20,$4C,$44,$41,$20,$5A,$41,$50
        .BYTE $59,$9B,$68,$0B,$0E,$20,$20,$43
        .BYTE $4D,$50,$20,$23,$24,$31,$34,$9B
        .BYTE $6D,$0B,$10,$20,$20,$42,$48,$8A
        .BYTE $48,$A6,$A2,$E0,$FF,$F0,$14,$BD
        .BYTE $C4,$02,$18,$69,$01,$29,$0F,$85
        .BYTE $80,$BD,$C4,$02,$29,$F0,$05,$80
        .BYTE $9D,$C4,$02,$68,$AA,$68,$4C,$62
        .BYTE $E4,$50,$59,$9B,$7C,$0B,$12,$20
        .BYTE $4E,$4F,$52,$41,$50,$32,$20,$53
        .BYTE $54,$41,$20,$59,$50,$9B,$81,$0B
        .BYTE $0E,$20,$20,$4C,$44,$41,$20,$23
        .BYTE $24,$30,$32,$9B,$86,$0B,$0E,$20
        .BYTE $20,$53,$54,$41,$20,$43,$48,$41
        .BYTE $52,$9B,$8B,$0B,$0E,$20,$20,$4A
        .BYTE $53,$52,$20,$50,$4C,$4F,$54,$9B
        .BYTE $90,$0B,$11,$20,$20,$44,$45,$43
        .BYTE $20,$50,$55,$4C,$53,$43,$4E,$54
        .BYTE $9B,$95,$0B,$0D,$20,$20,$42,$4E
        .BYTE $45,$20,$46,$49,$4E,$9B,$9A,$0B
        .BYTE $0F,$20,$20,$4C,$44,$41,$20,$50
        .BYTE $46,$52,$45,$51,$9B,$9F,$0B,$11
        .BYTE $20,$20,$53,$54,$41,$20,$50,$55
        .BYTE $4C,$53,$43,$4E,$54,$9B,$A4,$0B
        .BYTE $0E,$20,$20,$4C,$44,$41,$20,$5A
        .BYTE $41,$50,$58,$9B,$A9,$0B,$0F,$20
        .BYTE $20,$53,$54,$41,$20,$50,$55,$4C
        .BYTE $53,$58,$9B,$AE,$0B,$0E,$20,$20
        .BYTE $4C,$44,$41,$20,$5A,$41,$50,$59
        .BYTE $9B,$B3,$0B,$0F,$20,$20,$53,$54
        .BYTE $41,$20,$50,$55,$4C,$53,$59,$9B
        .BYTE $B8,$0B,$0E,$20,$20,$4C,$44,$41
        .BYTE $20,$23,$24,$30,$31,$9B,$BD,$0B
        .BYTE $10,$20,$20,$53,$54,$41,$20,$50
        .BYTE $55,$4C,$53,$58,$32,$9B,$C2,$0B
        .BYTE $0E,$20,$20,$4C,$44,$41,$00,$00
        .BYTE $00,$00,$00,$00,$00,$00,$00,$00
        .BYTE $00,$00,$00,$00,$00,$00,$00,$00
        .BYTE $00,$00,$00,$00,$00,$00,$00,$00
        .BYTE $00,$00,$00,$00,$00,$00,$00,$00
        .BYTE $00,$00,$00,$00,$00,$00,$00,$00
        .BYTE $00,$00,$00,$00,$00,$00,$00,$00
        .BYTE $00,$00,$00,$00,$00,$00,$00,$00
        .BYTE $00,$00,$00,$00,$00,$00,$00,$00
        .BYTE $00,$00,$00,$00,$00,$00,$00,$00
        .BYTE $00,$00,$00,$00,$00,$00,$00,$00
        .BYTE $00,$00,$00,$00,$00,$00,$00,$00
        .BYTE $00,$00,$00,$00,$00,$00,$00,$00
        .BYTE $00,$00,$00,$00,$00,$00,$00,$00
        .BYTE $00,$00,$00,$00,$00,$00,$00,$00
        .BYTE $00,$00,$00,$00,$00,$00,$00,$00
        .BYTE $00,$00,$00,$00,$00,$00,$00,$00
        .BYTE $00,$00,$00,$00,$00,$00,$00,$00
        .BYTE $00,$00,$00,$00,$00,$00,$00,$00
        .BYTE $00,$00,$00,$00,$00,$00,$00,$00
        .BYTE $00,$00,$00,$00,$00,$00,$00,$00
        .BYTE $00,$00,$00,$00,$00,$00,$00,$00
        .BYTE $00,$00,$00,$00,$00,$00,$00,$00
        .BYTE $00,$00,$00,$00,$00,$00,$00,$00
        .BYTE $00,$00,$00,$00,$00,$00,$00,$00
        .BYTE $00,$00,$00,$00,$00,$00,$00,$00
        .BYTE $00,$00,$00,$00,$00,$00,$00,$00
        .BYTE $00,$00,$00,$00,$00,$00,$00,$00
        .BYTE $00,$00,$00,$00,$00,$00,$00,$00
        .BYTE $00,$00,$00,$00,$00,$E2,$02,$E3,$02
        .BYTE $E7,$2F,$E0,$02,$E1,$02,$00,$32 
