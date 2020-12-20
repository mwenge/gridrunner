;Input
JOY_UP                          = $01
JOY_DOWN                        = $02
JOY_LEFT                        = $04
JOY_RIGHT                       = $08
JOY_LEFTRIGHT                   = 12
JOY_FIRE                        = 16
JOY1_FIRE                       = 239
JOY1_UP                         = 254
KEY_F1                          = 4
KEY_F3                          = 5
KEY_F5                          = 6
KEY_NONE                        = 64

;
; **** ZP FIELDS **** 
;
fC9 = $C9
;
; **** ZP ABSOLUTE ADRESSES **** 
;
ShipXPosition = $02
ShipYPosition = $03
charToPlot = $04
colourToPlot = $05
zpLo3 = $06
zpHi3 = $07
a08 = $08
a09 = $09
a0A = $0A
a0B = $0B
a0C = $0C
SomeCounter = $0D
InputJoy = $0E
GameTimer = $0F
a10 = $10
a11 = $11
a12 = $12
a13 = $13
a14 = $14
a15 = $15
a16 = $16
a17 = $17
a18 = $18
a19 = $19
a1A = $1A
a1B = $1B
a1C = $1C
a1D = $1D
a1F = $1F
a20 = $20
a21 = $21
a22 = $22
a23 = $23
a24 = $24
a25 = $25
a26 = $26
a27 = $27
a28 = $28
a29 = $29
a2A = $2A
a2B = $2B
a2D = $2D
a33 = $33
a34 = $34
SelectedLevel = $35
aA5 = $A5
SysKeyCode_C5 = $C5
aFC = $FC
aFD = $FD
aFE = $FE
aFF = $FF
;
; **** ZP POINTERS **** 
;
p01 = $01
p1F = $1F
p24 = $24
p83 = $83
pCA = $CA
pFC = $FC
pFE = $FE
;
; **** FIELDS **** 
;
SCREEN_PTR_LO = $0340
SCREEN_PTR_HI = $0360
SCREENRAM = $0400
COLOURRAM = $D800

;Colours
BLACK                   = 0
WHITE                   = 1
RED                     = 2
CYAN                    = 3
PURPLE                  = 4
BLUE                    = 6
YELLOW                  = 7
ORANGE                  = 8
BROWN                   = 9
PINK                    = 10
GREY1                   = 11
LGREEN                  = 13
LBLUE                   = 14
LGREY                   = 15

CopyrightLine = $807F
f871F = $871F
ScreenHeaderText = $881F
ScreenHeaderColors = $8847
f8BC0 = $8BC0
f8BC8 = $8BC8
BattleStations = $8C50
EnterGridArea = $8C62
f8CB4 = $8CB4
f8CD4 = $8CD4
f8CF4 = $8CF4
ByJeffMinter = $8DE0
EnterLevelText = $8DF0
CharSet1 = $8E00
CharSet2 = $8F00

;
; **** ABSOLUTE ADRESSES **** 
;
a0002 = $0002
a0003 = $0003
LivesDisplay = $0427
a0557 = $0557
a0558 = $0558
LevelDisplayByte1 = $055E
LevelDisplayByte2 = $055F
JOY1 = $DC11
;
; **** POINTERS **** 
;
p0101 = $0101
p0102 = $0102
p0116 = $0116
p0313 = $0313
p03F0 = $03F0
p0450 = $0450
p05FF = $05FF
p070F = $070F
p0800 = $0800
p4008 = $4008
InitializeDataAndGame = $8000
pD000 = $D000
;
; **** EXTERNAL JUMPS **** 
;
e3030 = $3030
UpdateRestOfScore = $8015
e8020 = $8020
e8030 = $8030
e8036 = $8036
e8040 = $8040
e8056 = $8056
ClearScore = $8060
IncrementSelectedLevel = $80A0
e8028 = $8028
WriteCopyrightLine = $80D2
StartLevel = $80E5
CheckInputAgain = $80F7
InitializeGame = $8100
Screen_GetPointer = $8163
Screen_Plot = $8172
GetCurrentChar = $818B
PlaySomeSound = $8191
DrawGrid = $81A2
CheckPause = $821B
e8230 = $8230
e8233 = $8233
e8237 = $8237
MaterializeShip = $824F
MaterializeShipLoop = $8264
LoadCharSetData = $82EC
DrawNewLevelScreen = $8300
CheckJoy = $8373
SpinForCyclesIn0A = $8380
SpinFor255Cycles = $8386
DecrementAccumToZero = $8388
Main_GameLoop = $8393
JumpToMainGameLoop = $83A0
GameLoopBody = $83A3
StartWaitLoop = $83E8
DrawMaterializeShip = $8400
e8450 = $8450
UpdateShipPosition = $8470
Game_DecrementTimer = $84F8
MaybePlayPulse = $8573
UpdateShipPosition2 = $859B
e85F8 = $85F8
e85FD = $85FD
e862F = $862F
UpdateScreen = $8635
e86D0 = $86D0
e86D7 = $86D7
e86EE = $86EE
e8728 = $8728
e8748 = $8748
e8753 = $8753
e876C = $876C
e87CB = $87CB
e8801 = $8801
Menu_DisplayHeader = $8806
SetUpMenu = $8818
IncrementPlayerScore = $8870
e888A = $888A
e889A = $889A
e88C9 = $88C9
e8924 = $8924
e896A = $896A
e8995 = $8995
MaybeResetSomeCounter = $89A0
e89AB = $89AB
e89C1 = $89C1
e8A11 = $8A11
e8A53 = $8A53
e8A99 = $8A99
e8AA4 = $8AA4
e8AC1 = $8AC1
e8AC8 = $8AC8
e8ADE = $8ADE
e8AE9 = $8AE9
e8AF8 = $8AF8
e8B24 = $8B24
e8B60 = $8B60
e8BB1 = $8BB1
e8BBB = $8BBB
e8BD2 = $8BD2
e8BEC = $8BEC
ClearScreen = $8BFC
e8C17 = $8C17
DisplayNewLevelInterstitial = $8C2D
IncrementLives = $8C75
PlayNewLevelMusic = $8D16
JumpToDisplayTitleScreen = $8D57
UpdateLivesAndStartNewLevel = $8D5E
SetSoundVolumeToMax = $8D70
e8D78 = $8D78
DisplayTitleScreen = $8D8E
e8DC0 = $8DC0
Start_Game = $8DC6
eE518 = $E518
;
; **** PREDEFINED LABELS **** 
;
ROM_RESTORj = $FD15
ROM_RAMTASj = $FD50
ROM_IOINITj = $FDA3
ROM_CHROUT = $FFD2

* = $0801

;------------------------------------------------------------------------------------
; 10 SYS 2061
; Used to execute the code at address $080d (2061).
;------------------------------------------------------------------------------------
        .BYTE $0B,$08 ;ANC #$08
        .BYTE $0A,$00,$9E,$32,$30,$36,$31,$00 ; SYS 2061
        .BYTE $00,$00
;------------------------------------------------------------------------------------
; Copies the game code from $0900 to $8000 and starts executing code
; at $8000.
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

        .TEXT "        PRG   ", $00
; This is later loaded to $04 in the zero-page address space.
Progs
        .TEXT $5F, $08, $0F, $00, "  ", $22,"C-64 BACKUP.BANK",$22," PRG   ", $00
        .TEXT $7F, $08, $09, $00, "   ",$22,"LOPAGE $4 $48",$22,"    PRG  ", $00
        .TEXT $9F, $08, $11, $00, "  ", $22,"WEDGE",$22,"            PRG   ", $00
        .TEXT $BF, $08, $02, $00, "   ",$22,"SYSTEM SET",$22,"       PRG  ", $00
        .TEXT $DF, $08, $05, $00, "   ",$22,"UNSCRATCH",$22,"        PRG  ", $00
        .TEXT $FF, $08, $07, $00, "   ",$22,"LODATA",$22,"           PRG  "
        BRK #$1F

;------------------------------------------------------------------------------------
; InitializeDataAndGame
; Copies more data to $2100. This is the site of some duplicated code and game data.
; Not sure what's going on here.
;------------------------------------------------------------------------------------
        CMP (p83,X)
b0902   .byte $E2,$83,$00,$00,$00,$00,$00,$00,$8F
        STA $2100,X 
        DEX 
        BNE b0902
        JMP InitializeGame
        NOP 

; UpdateRestOfScore
        INX 
        CPX #$07                ; The score is 7 characters long
        BNE UpdateScore
        JMP DisplayTitleScreen
        NOP 
        NOP 
        NOP 

; e8020
        JSR GetCurrentChar
        CMP #$07
        .BYTE $F0,$01 ;BEQ e8028
        RTS 

;e8028
        JMP e8ADE
        NOP 
        NOP 
        NOP 
        NOP 
        NOP 
;e8030
        AND #$1F
        CMP #$18
        BPL b093A
;e8035
        STA f1600,X
        RTS 

b093A   LDA a0C
        JMP e8036
        NOP 
;e8040
        DEC f1500,X
        LDA f1500,X
        AND #$3F
        CMP #$27
        BPL b0950
        STA f1500,X
        RTS 

b0950   LDA a0B
        STA f1500,X
        RTS 

;e8056
        DEC f1600,X
        LDA f1600,X
        JMP e8030
        NOP 

SCREEN_PL1_SCORE = SCREENRAM+15
SCREEN_PL1_HISCORE = SCREENRAM+27

;ClearScore
        LDX #$00
UpdateScore
        LDA SCREEN_PL1_SCORE,X
        CMP SCREEN_PL1_HISCORE,X
        BNE UpdateHiScore
        JMP UpdateRestOfScore

b096D   JMP DisplayTitleScreen

UpdateHiScore
        BMI b096D
b0972   LDA SCREEN_PL1_SCORE,X
        STA SCREEN_PL1_HISCORE,X
        INX 
        CPX #$07
        BNE b0972
        JMP DisplayTitleScreen

;CopyrightLine
        .BYTE $3C,$3D,$20,$31,$39,$38,$32,$20 ; (c) 1982
        .BYTE $2B,$27,$2F,$20,$20,$2E,$22,$27 ; HES  PRE
        .BYTE $2F,$2F,$20,$2A,$24,$22,$27,$20 ; SS FIRE 
        .BYTE $3A,$30,$20,$29,$27,$21,$24,$26 ; TO BEGIN

;-----------------------------------------------------------
;IncrementSelectedLevel
;-----------------------------------------------------------
        LDA SelectedLevel
        CMP #$20
        BNE b09AA
        LDA #$01
        STA SelectedLevel
b09AA   LDA #$30 ; "0"
        STA a0557
        STA a0558
        LDX SelectedLevel
b09B4   INC a0558
        LDA a0558
b09BB   =*+$01
        CMP #$3A
        BNE b09C6
        LDA #$30 ; "0"
        STA a0558
        INC a0557
b09C6   DEX 
        BNE b09B4
        LDX #$30
b09CB   JSR SpinFor255Cycles
        DEX 
        BNE b09CB
        RTS 

;-----------------------------------------------------------
;WriteCopyrightLine
;-----------------------------------------------------------
        LDX #$20
CopyrightLineLoop
        LDA CopyrightLine,X
        STA SCREENRAM + $0192,X
        LDA #YELLOW
        STA COLOURRAM + $0192,X
        DEX 
        BNE CopyrightLineLoop
        JMP e8DC0

;--------------------------------------------------------------
;StartLevel
;--------------------------------------------------------------
        LDA #$34 ; '4' is the inital number of lives
        STA LivesDisplay
        LDX #$07 ; The score is 7 digits long
        LDA #$30 ; "0"
ILS_LOOP
        STA SCREEN_PL1_SCORE-1,X
        DEX 
        BNE ILS_LOOP
        JMP DisplayNewLevelInterstitial

;--------------------------------------------------------------
;CheckInputAgain
;--------------------------------------------------------------
b09F7   LDA SysKeyCode_C5
        CMP #$29
        BEQ b09F7
        RTS 

        NOP 
        NOP 

;--------------------------------------------------------------
;InitializeGame
;--------------------------------------------------------------
        LDA #>pD000
        STA ShipYPosition
        LDA #<pD000
        STA ShipXPosition
        LDY #$18
        TYA 
        STA (ShipXPosition),Y
        LDY #$20
        LDA #$00
        STA (ShipXPosition),Y
        INY 
        STA (ShipXPosition),Y
        LDA #$0A
        STA $D401    ;Voice 1: Frequency Control - High-Byte
        STA $D405    ;Voice 1: Attack / Decay Cycle Control
        STA $D40C    ;Voice 2: Attack / Decay Cycle Control
        LDA #$00
        STA $D406    ;Voice 1: Sustain / Release Cycle Control
        STA $D40D    ;Voice 2: Sustain / Release Cycle Control
        LDA #$05
        STA $D408    ;Voice 2: Frequency Control - High-Byte
        LDX #$00
        LDA #<SCREENRAM
        STA ShipXPosition
        LDA #>SCREENRAM
        STA ShipYPosition
SetScreenPointersLoop
        LDA ShipXPosition
        STA SCREEN_PTR_LO,X
        LDA ShipYPosition
        STA SCREEN_PTR_HI,X
        LDY #$00
        LDA #$20
NextRow
        STA (ShipXPosition),Y
        INY 
        CPY #$28
        BNE NextRow
        LDA ShipXPosition
        CLC 
        ADC #$28
        STA ShipXPosition
        LDA ShipYPosition
        ADC #$00
        STA ShipYPosition
        INX 
        CPX #$18
        BNE SetScreenPointersLoop
        JMP SetUpMenu
        RTS 

;-------------------------------------------------------------------------------
; Screen_GetPointer
; Uses the screen pointer array to fetch screen address based on an X and Y 
; value stored in ShipYPosition and ShipXPosition before the routine is called
;-------------------------------------------------------------------------------
        LDX ShipYPosition
        LDY ShipXPosition
        LDA SCREEN_PTR_LO,X
        STA zpLo3
        LDA SCREEN_PTR_HI,X
        STA zpHi3
        RTS 

;-------------------------------------------------------------------------------
; Screen_Plot
; Plots a char to the screen and sets its colour. Char is stored in charToPlot
; and colour in colourToPlot before routine is called.
;-------------------------------------------------------------------------------
        JSR Screen_GetPointer
        LDA charToPlot
        STA (zpLo3),Y
        LDA zpHi3
        CLC 
        ADC #$D4
        STA zpHi3
        LDA zpHi3
        LDA zpHi3
        STA zpHi3
        LDA colourToPlot
        STA (zpLo3),Y
        RTS 

;GetCurrentChar
        JSR Screen_GetPointer
        LDA (zpLo3),Y
        RTS 

;PlaySomeSound
        LDA #$00
        STA $D404    ;Voice 1: Control Register
        STA $D40B    ;Voice 2: Control Register
        LDA #$81
        STA $D404    ;Voice 1: Control Register
        STA $D40B    ;Voice 2: Control Register
        RTS 

;-------------------------------------------------------------
; DrawGrid
;-------------------------------------------------------------
        LDA #$02
        STA a08
        LDA #>Progs
        STA colourToPlot
        LDA #<Progs
        STA charToPlot
b0AAE   LDA #$00
        STA $D412    ;Voice 3: Control Register
        LDA #$00
        STA $D412    ;Voice 3: Control Register
        LDA #$02
        STA a09
b0ABC   LDA a09
        STA ShipYPosition
        LDA a08
        STA ShipXPosition
        JSR Screen_Plot
        JSR PlaySomeSound
        INC a09
        LDA a09
        CMP #$16
        BNE b0ABC
        LDX #$01
b0AD4   JSR e8230
        DEY 
        BNE b0ADA
b0ADA   DEX 
        BNE b0AD4
        INC a08
        LDA a08
        CMP #$27
        BNE b0AAE
        LDA #$02
        STA a08
        LDA #$00
        STA charToPlot
b0AED   LDA #$01
        STA a09
b0AF1   LDA a09
        STA ShipXPosition
        LDA a08
        STA ShipYPosition
        JSR Screen_Plot
        JSR PlaySomeSound
        INC a09
        LDA a09
        CMP #$27
        BNE b0AF1
        LDX #$01
b0B09   JSR e8230
        DEY 
        BNE b0B0F
b0B0F   DEX 
        BNE b0B09
        INC a08
        LDA a08
        CMP #$16
        BNE b0AED
b0B1A   RTS 

;-------------------------------------------------------------------------------
;CheckPause
;-------------------------------------------------------------------------------
        LDA SysKeyCode_C5
        CMP #$29
        BNE b0B1A
b0B21   LDA SysKeyCode_C5
        CMP #$29
        BEQ b0B21
b0B27   LDA SysKeyCode_C5
        CMP #$29
        BNE b0B27
        JMP CheckInputAgain
        ;RTS

;e8230
        JMP e8233
;e8233
        LDA #$04
        STA a0A
;e8237
        INC a0A
        LDA a0A
        CMP #$04
        BNE b0B40
        RTS 

b0B40   LDA a08
        STA $D401    ;Voice 1: Frequency Control - High-Byte
        LDA a08
        ADC #$01
        STA $D408    ;Voice 2: Frequency Control - High-Byte
        JMP e8237

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
        STA $D40B    ;Voice 2: Control Register
        LDA #$81
        STA $D40B    ;Voice 2: Control Register
        LDA #$15
        STA ShipYPosition
        LDA #$14
        CLC 
        SBC a0A
        STA ShipXPosition
        JSR Screen_Plot
        LDA #$14
        CLC 
        ADC a0A
        STA ShipXPosition
        JSR Screen_Plot
        LDA ShipYPosition
        CLC 
        SBC a0A
        STA ShipYPosition
        JSR Screen_Plot
        LDA #$14
        STA ShipXPosition
        JSR Screen_Plot
        LDA #$14
        SBC a0A
        STA ShipXPosition
        JSR Screen_Plot
        INC charToPlot
        LDA charToPlot
        CMP #$19
        BNE b0BAE
        LDA #$16
b0BAE   STA a09
        LDX a0A
b0BB2   JSR SpinForCyclesIn0A
        DEX 
        BNE b0BB2
        LDA #<p0800
        STA charToPlot
        LDA #>p0800
        STA colourToPlot
        LDA #$14
        STA ShipXPosition
        JSR Screen_Plot
        LDA #$14
        CLC 
        SBC a0A
        STA ShipXPosition
        JSR Screen_Plot
        LDA #$14
        CLC 
        ADC a0A
        STA ShipXPosition
        JSR Screen_Plot
        LDA #$15
        STA ShipYPosition
        JSR Screen_Plot
        LDA #$14
        CLC 
        SBC a0A
        STA ShipXPosition
        JMP DrawMaterializeShip ; Jumps to MaterializeShipLoop
        ; This will eventually RTS from DrawMaterializeShip

;-----------------------------------------------------------
; LoadCharSetData
;-----------------------------------------------------------
        LDX #$00
LCS_LOOP
        LDA CharSet1,X
        STA f2000,X
        LDA CharSet2,X
        STA f2100,X
        DEX 
        BNE LCS_LOOP
        JMP InitializeGame

;-----------------------------------------------------------
; DrawNewLevelScreen
;-----------------------------------------------------------
        LDA #$0F
        STA $D418    ;Select Filter Mode and Volume
        LDA #$A0
        STA $D40F    ;Voice 3: Frequency Control - High-Byte
        LDA #$04
        STA $D413    ;Voice 3: Attack / Decay Cycle Control
        LDA #$00
        STA $D414    ;Voice 3: Sustain / Release Cycle Control

        JSR DrawGrid
        JSR MaterializeShip

        LDA #<p1514
        STA a0B
        LDA #>p1514
        STA a0C
        LDA #$FF
        STA a11
        LDA #>p0102
        STA a16
        LDA #<p0102
        STA a15
        LDA #$04
        STA a14
        LDA #$0A
        STA a17
        STA $D413    ;Voice 3: Attack / Decay Cycle Control
        STA a18
        JSR e8748
        LDA #$00
        STA a22
        STA a23
        STA a24
        LDA #$13
        STA a26
        LDA #$20
        STA a28
        LDA a2B
        STA a2B
        STA a2B
        LDA a2A
        STA a2A
        LDA #$00
        STA a29
        LDA #$0F
        STA $D418    ;Select Filter Mode and Volume
        NOP 
        NOP 
        NOP 
        NOP 
        NOP 
        NOP 
        NOP 
        NOP 
        NOP 
        NOP 
        NOP 
        NOP 
        NOP 
        NOP 
        NOP 
        JMP JumpToMainGameLoop

;-----------------------------------------------------------
;CheckJoy
;-----------------------------------------------------------
        LDA JOY1
        EOR #$FF
        STA InputJoy
        RTS 

        .BYTE $EA,$EA,$EA,$EA,$EA ; Bunch No-Ops

;-----------------------------------------------------------
;SpinForCyclesIn0A
;-----------------------------------------------------------
        LDA a0A
        CMP #$00
        BEQ SC_RETURN

;SpinFor255Cycles
        LDA #$00
        ; Fall through to DecrementAccumToZero

a30 = $30
;DecrementAccumToZero
        STA a30
b0C8A   DEC a30
        BNE b0C8A
b0C8E   DEC a30
        BNE b0C8E
SC_RETURN
        RTS 

;-------------------------------------------------------------------------------
;Main_GameLoop
;-------------------------------------------------------------------------------
        JSR UpdateShipPosition
        JSR CheckPause
        JMP GameLoopBody

        .BYTE $EA, $EA, $EA, $EA ; NOPs

;JumpToMainGameLoop
        JMP Main_GameLoop

;GameLoopBody
        JSR Game_DecrementTimer
        JSR UpdateShipPosition2
        JSR UpdateScreen
        JSR e86D7
        JSR e8753
        JSR e889A
        JSR e88C9
        JSR MaybeResetSomeCounter
        JSR e8AC8
        JMP StartWaitLoop

        SEI                                                            ; Never Reached
        CLD                                                            ; Never Reached
        LDA #$05                                                       ; Never Reached
        STA $D016    ;VIC Control Register 2                           ; Never Reached
        JSR ROM_IOINITj ;$FDA3 (jmp) - initialize CIA & IRQ            ; Never Reached
        JSR ROM_RAMTASj ;$FD50 (jmp) - RAM test & search RAM end       ; Never Reached
        JSR ROM_RESTORj ;$FD15 (jmp) - restore default I/O vectors     ; Never Reached
        JSR eE518                                                      ; Never Reached
        CLI                                                            ; Never Reached
        LDA #$08                                                       ; Never Reached
        JSR ROM_CHROUT ;$FFD2 - output character                       ; Never Reached
        NOP                               ; Never Reached
        NOP                               ; Never Reached
        NOP                               ; Never Reached
        NOP                               ; Never Reached
        NOP                               ; Never Reached
        JMP LoadCharSetData                         ; Never Reached
        PLA                               ; Never Reached
        TAY                               ; Never Reached
        PLA                               ; Never Reached
        TAX                               ; Never Reached
        PLA                               ; Never Reached
        RTI                               ; Never Reached

; StartWaitLoop
        LDX #$15
WaitLoop
        DEX 
        BNE WaitLoop
        JMP JumpToMainGameLoop

        .BYTE $EA,$EA,$EA,$EA,$EA,$EA,$EA,$EA,$EA,$EA ; NOPs
        JMP JumpToMainGameLoop            
        NOP                               
        NOP                               
        NOP                               

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
        STA ShipYPosition
        LDA #<p1514
        STA ShipXPosition
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

;--------------------------------------------------------------
;e8450
;--------------------------------------------------------------
        LDA #$18
        STA a0A
b0D54   LDA a0A
        STA $D408    ;Voice 2: Frequency Control - High-Byte
        LDA #$00
        STA $D40B    ;Voice 2: Control Register
        LDA #$11
        STA $D40B    ;Voice 2: Control Register
        LDX #$02
b0D65   JSR SpinForCyclesIn0A
        DEX 
        BNE b0D65
        DEC a0A
        BNE b0D54
        RTS 

;--------------------------------------------------------------
; UpdateShipPosition
;--------------------------------------------------------------
        DEC SomeCounter
        BEQ b0D75
        RTS 

b0D75   JSR CheckJoy
        LDA a0B
        STA ShipXPosition
        LDA a0C
        STA ShipYPosition
        JSR GetCurrentChar
        CMP #$07
        BEQ b0D8A
        JSR e8BEC
b0D8A   LDA #<p0800
        STA charToPlot
        LDA #>p0800
        STA colourToPlot
        JSR Screen_Plot
        LDA InputJoy
        AND #JOY_UP
        BEQ CheckJoyDown
        DEC ShipYPosition
        LDA ShipYPosition
        CMP #$0E
        BNE CheckJoyDown
        LDA #$0F
        STA ShipYPosition
CheckJoyDown
        LDA InputJoy
        AND #JOY_DOWN
        BEQ CheckJoyLeft
        INC ShipYPosition
        LDA ShipYPosition
        CMP #$16
        BNE CheckJoyLeft
        LDA #$15
        STA ShipYPosition
CheckJoyLeft
         LDA InputJoy
        AND #JOY_LEFT
        BEQ CheckJoyRight
        DEC ShipXPosition
        LDA ShipXPosition
        CMP #$00
        BNE CheckJoyRight
        LDA #$01
        STA ShipXPosition
CheckJoyRight
        LDA InputJoy
        AND #JOY_RIGHT
        BEQ b0DDD
        INC ShipXPosition
        LDA ShipXPosition
        CMP #$27
        BNE b0DDD
        LDA #$26
        STA ShipXPosition
b0DDD   JSR GetCurrentChar
        BEQ b0DE5
        JSR e89AB
b0DE5   LDA ShipXPosition
        STA a0B
        LDA ShipYPosition
        STA a0C
        LDA #>p0D07
        STA colourToPlot
        LDA #<p0D07
        STA charToPlot
        JMP Screen_Plot

;-------------------------------------------------------------------------------
;Game_DecrementTimer
;-------------------------------------------------------------------------------
        DEC GameTimer
        BEQ ResetGameTimer
b0DFC   RTS 

ResetGameTimer
        LDA #$18
        STA GameTimer

p0E02   =*+$01
        JSR MaybePlayPulse
        LDA a11
        CMP #$FF
        BNE b0E22
        LDA InputJoy
        AND #$10
        BEQ b0DFC
        LDA a0B
        STA a10
        LDA a0C
        STA a11
        DEC a11
        LDA #<p4008
        STA a12
        LDA #>p4008
        STA a13
b0E22   LDA a10
        STA ShipXPosition
        LDA a11
        STA ShipYPosition
        JSR GetCurrentChar
        CMP a12
        BEQ b0E38
        CMP #$00
        BEQ b0E38
        JSR e87CB
b0E38   LDA #>p0800
        STA colourToPlot
        LDA #<p0800
        STA charToPlot
        JSR Screen_Plot
        INC a12
        LDA a12
        CMP #$0A
        BNE b0E5C
        DEC a11
        LDA a11
        CMP #$02
        BNE b0E58
        LDA #$FF
        STA a11
        RTS 

b0E58   LDA #$08
        STA a12
b0E5C   LDA a11
        STA ShipYPosition
        JSR GetCurrentChar
        BEQ b0E68
        JSR e87CB
b0E68   LDA a12
        STA charToPlot
        LDA #$01
        STA colourToPlot
        JMP Screen_Plot

;MaybePlayPulse
        LDA a13
        BNE PlayPulse
        RTS 

PlayPulse
        DEC a13
        LDA a13
        ADC #$00
        STA $D401    ;Voice 1: Frequency Control - High-Byte
        LDA #$00
        STA $D404    ;Voice 1: Control Register
        LDA #$81
        STA $D404    ;Voice 1: Control Register
        LDA a13
        STA $D408    ;Voice 2: Frequency Control - High-Byte
        LDA #$00
        STA $D40B    ;Voice 2: Control Register
        LDA #$81
        STA $D40B    ;Voice 2: Control Register
        RTS 

;-------------------------------------------------------------------------------
; UpdateShipPosition2
;-------------------------------------------------------------------------------
        LDA SomeCounter
        CMP #$01
        BEQ b0EA2
b0EA1   RTS 

b0EA2   DEC a14
        BNE b0EA1
        LDA #$02
        STA a14
        LDA #$00
        STA ShipXPosition
        LDA a15
        STA ShipYPosition
        LDA #$20
        STA charToPlot
        JSR Screen_Plot
        INC a15
        LDA a15
        CMP #$16
        BNE b0EC5
        LDA #$03
        STA a15
b0EC5   LDA a15
        STA ShipYPosition
        LDA #>p0101
        STA colourToPlot
        LDA #<p0101
        STA charToPlot
        JSR Screen_Plot
        LDA #$16
        STA ShipYPosition
        LDA a16
        STA ShipXPosition
        LDA #$20
        JSR e85F8
        INC a16
        LDA a16
        CMP #$27
        BNE b0EED
        LDA #$01
        STA a16
b0EED   LDA a16
        STA ShipXPosition
        LDA #$02
        STA charToPlot
        JMP e85FD
;e85F8
        STA charToPlot
        JMP Screen_Plot
;e85FD
        JSR Screen_Plot
        DEC a17
        BEQ b0F05
        RTS 

b0F05   LDA a34
        STA a17
        JSR e862F
        LDA #$00
a0F0E   STA $D412    ;Voice 3: Control Register
        LDA #$21
        STA $D412    ;Voice 3: Control Register
        LDA #<p05FF
        STA a18
        LDA #>p05FF
        STA a19
        LDA a15
        STA a1A
        LDA #$01
        STA a1B
        LDA #$15
        STA a1D
        LDA a16
        STA a1C
        RTS 
;e862F
        LDA #$03
        STA $D40F    ;Voice 3: Frequency Control - High-Byte
        RTS 

;------------------------------------------------------------
; UpdateScreen
;------------------------------------------------------------
        LDA GameTimer
        CMP #$05
        BEQ b0F3C
b0F3B   RTS 

b0F3C   LDA a18
        CMP #$FF
        BNE b0F3B
        JSR e86D0
        NOP 
        CMP #$07
        BNE b0F4E
        LDA #$05
        STA a19
b0F4E   LDA #$01
        STA colourToPlot
        LDA a19
        STA charToPlot
        LDA #$15
        STA a1D
b0F5A   LDA a1D
        STA ShipYPosition
        LDA a1C
        STA ShipXPosition
        JSR Screen_Plot
        DEC a1D
        LDA a1D
        CMP #$02
        BNE b0F5A
        LDA a1A
        STA ShipYPosition
        LDA a1B
        STA ShipXPosition
        JSR GetCurrentChar
        CMP a19
        BEQ b0FA2
        LDA #<p0800
        STA charToPlot
        LDA #>p0800
        STA colourToPlot
        JSR Screen_Plot
        INC a1B
        LDA a1B
        STA ShipXPosition
        JSR e8020
        CMP a19
        BEQ b0FA2
        LDA #$01
        STA colourToPlot
        LDA a19
        CLC 
        SBC #$01
        STA charToPlot
        JMP Screen_Plot

b0FA2   LDA #$15
        STA ShipYPosition
        LDA a1C
        STA ShipXPosition
        LDA #>p0800
        STA colourToPlot
        LDA #<p0800
        STA charToPlot
b0FB2   JSR Screen_Plot
        DEC ShipYPosition
        LDA ShipYPosition
        CMP #$02
        BNE b0FB2
        LDA a1A
        STA ShipYPosition
        LDA #>p070F
        STA colourToPlot
        LDA #<p070F
        STA charToPlot
        LDA #$00
        STA a18
        JMP Screen_Plot
;e86D0
        DEC GameTimer
        INC a19
        LDA a19
        RTS 

;------------------------------------------------------------
;e86D7
;------------------------------------------------------------
        LDA a17
        CMP #$05
        BEQ b0FDE
        RTS 

b0FDE   DEC a17
        LDA #>p0450
        STA a20
        LDA #<p0450
        STA a1F
        LDY #$00
b0FEA   LDA (p1F),Y
        BNE b0FFB

;e86EE
b0FEE   INC a1F
        BNE b0FEA
        INC a20
        LDA a20
        CMP #$08
        BNE b0FEA
        RTS 

b0FFB   CMP #$20
        BEQ b0FEE
f0FFF   LDX #$07
b1001   CMP f871F,X
        BEQ b100C
        DEX 
        BNE b1001
        JMP e86EE

b100C   CPX #$07
        BEQ b1019
        INX 
        LDA f871F,X
        STA (p1F),Y
        JMP e86EE

b1019   JSR e8728
        JMP e86EE

f101F   NOP 
        CLC 
        ORA a0F0E
        BPL b1037
        .BYTE $12,$13
;e8728
        LDA #$0A
        STA (p1F),Y
        LDX #$18
b102E   LDA f101F,X
        CMP #$FF
        BEQ b103D
        DEX 
b1037   =*+$01
        BNE b102E
        LDA #$12
        STA (p1F),Y
        RTS 

b103D   LDA a1F
        STA f0FFF,X
        LDA a20
        STA f101F,X
        RTS 

;--------------------------------------------------------------
;e8748
;--------------------------------------------------------------
        LDX #$20
        LDA #$FF
b104C   STA f101F,X
        DEX 
        BNE b104C
        RTS 

;--------------------------------------------------------------
;e8753
;--------------------------------------------------------------
        DEC a21
        BEQ b1058
        RTS 
b1058   LDA #$40
        STA a21
        LDX #$18
b105E   LDA f101F,X
        CMP #$FF
        BEQ b1068
        JSR e876C
b1068   DEX 
        BNE b105E
        RTS 

;e876C
        LDA f0FFF,X
        STA ShipXPosition
        LDA f101F,X
        STA ShipYPosition
        LDY #$00
        LDA (ShipXPosition),Y
        CMP #$07
        BNE b1081
        JMP e8ADE

b1081   LDA #$00
        STA (ShipXPosition),Y
        LDA ShipYPosition
        CLC 
        ADC #$D4
        STA ShipYPosition
        LDA #$08
        STA (ShipXPosition),Y
        LDA f0FFF,X
        CLC 
        ADC #$28
        STA f0FFF,X
        LDA f101F,X
        ADC #$00
        STA f101F,X
        STA ShipYPosition
        LDA f0FFF,X
        STA ShipXPosition
        LDA (ShipXPosition),Y
        CMP #$20
        BNE b10B4
        LDA #$FF
        STA f101F,X
        RTS 

b10B4   CMP #$07
        BNE b10BB
        JMP e8ADE

b10BB   LDA #$0A
        STA (ShipXPosition),Y
        LDA ShipYPosition
        CLC 
        ADC #$D4
        STA ShipYPosition
        LDA #$01
        STA (ShipXPosition),Y
        RTS 
;e87CB
        LDX #$07
b10CD   CMP f871F,X
        BEQ b10D9
        DEX 
        BNE b10CD
        JMP e8A11
        RTS 

b10D9   DEX 
        BEQ b10EC
        LDA f871F,X
        STA charToPlot
        LDA #$07
        STA colourToPlot
        LDA #$FF
        STA a11
        JMP e8801

b10EC   LDA #<p0800
        STA charToPlot
        LDA #>p0800
        STA colourToPlot
        LDA #$FF
        STA a11
        JSR Screen_Plot
        JSR e888A
f10FE   PLA 
f10FF   PLA 
f1100   RTS 

;e8801
        PLA 
        PLA 
        JMP Screen_Plot
;---------------------------------------------------------------
; Menu_DisplayHeader
; Writes the text for the top of the title screen to the screen.
;---------------------------------------------------------------
        LDX #$28
DisplayHeaderLoop
        LDA ScreenHeaderText,X
        STA SCREENRAM-1,X
        LDA ScreenHeaderColors,X
        STA COLOURRAM-1,X
        DEX 
        BNE DisplayHeaderLoop
        RTS 
;SetUpMenu
        JSR Menu_DisplayHeader
        JMP JumpToDisplayTitleScreen

        NOP
        NOP

;ScreenHeaderText
        .BYTE $21,$22,$24,$25,$22,$23          ; GRIDRU
        .BYTE $26,$26,$27,$22,$20,$20,$19,$1A  ; NNER  PL 1
        .BYTE $20,$30,$30,$30,$30,$30,$30,$30  ;  0000000
        .BYTE $20,$20,$1D,$1E,$20,$30,$30,$30  ;  HI: 000
        .BYTE $30,$30,$30,$30,$20,$20,$07,$20  ; 0000  * 
        .BYTE $20,$34                          ; 4
;ScreenHeaderColors
        .BYTE $03,$03,$03,$03,$04,$04  ;  
        .BYTE $04,$04,$04,$04,$01,$01,$07,$07 
        .BYTE $01,$03,$03,$03,$03,$03,$03,$03
        .BYTE $01,$01,$07,$07,$01,$0E,$0E,$0E
        .BYTE $0E,$0E,$0E,$0E,$01,$01,$0D,$01,$01
        .BYTE $04

;-------------------------------------------------------------------
;IncrementPlayerScore
;-------------------------------------------------------------------
b1170   TXA
        PHA 
b1172   INC SCREEN_PL1_SCORE,X
        LDA SCREEN_PL1_SCORE,X
        CMP #$3A
        BNE b1184
        LDA #$30 ; "0"
        STA SCREEN_PL1_SCORE,X
        DEX 
        BNE b1172
b1184   PLA 
        TAX 
        DEY 
        BNE b1170
        RTS 

;e888A
        LDX #$06
        LDY #$0A
        JSR IncrementPlayerScore
        LDA #<p03F0
        STA a22
        LDA #>p03F0
        STA a23
b1199   RTS 

;--------------------------------------------------------------
;e889A
;--------------------------------------------------------------
        LDA SomeCounter
        AND #$01
        BEQ b1199
        LDA a22
        AND #$C0
        BEQ b11B8
        DEC a22
        LDA a22
        STA $D40F    ;Voice 3: Frequency Control - High-Byte
        LDA #$00
        STA $D412    ;Voice 3: Control Register
        LDA #$21
        STA $D412    ;Voice 3: Control Register
        RTS 

b11B8   LDA a23
        BEQ b11C3
        DEC a23
        LDA #$F0
        STA a22
        RTS 

b11C3   LDA #$04
        STA $D40F    ;Voice 3: Frequency Control - High-Byte
        RTS 

;--------------------------------------------------------------
;e88C9
;--------------------------------------------------------------
        DEC a25
        BEQ b11CE
b11CD   RTS 

b11CE   LDA #$80
        STA a25
        JSR e89C1
        LDA a24
        BEQ b11CD
        TAX 
        INC a26
        LDA a26
        CMP #$16
        BNE b11E6
        LDA #$13
        STA a26
b11E6   STX a27
        LDA f10FF,X
        STA ShipXPosition
        LDA f11FF,X
        STA ShipYPosition
        LDA #<p0800
        STA charToPlot
        LDA #>p0800
        STA colourToPlot
        JSR e8995
f11FE   =*+$01
        LDX a27
f1200   =*+$01
f11FF   LDA f12FF,X
        AND #$40
        BNE b122A
        LDA f10FE,X
        STA f10FF,X
        LDA f11FE,X
        STA f11FF,X
        STA ShipYPosition
        LDA f10FF,X
        STA ShipXPosition
        LDA #>p0313
        STA colourToPlot
        LDA #<p0313
        STA charToPlot
        JSR Screen_Plot
;e8924
        LDX a27
        DEX 
        BNE b11E6
        RTS 

b122A   LDA f12FF,X
        AND #$02
        BNE b1235
        INC ShipXPosition
        INC ShipXPosition
b1235   DEC ShipXPosition
        JSR GetCurrentChar
        BEQ b1290
        LDX a27
        JSR e8AE9
        STA ShipXPosition
        INC ShipYPosition
        LDA ShipYPosition
        CMP #$16
        BNE b1262
        LDA f12FF,X
        ORA #$01
        AND #$FD
        STA f12FF,X
        LDA #>p0E02
        .BYTE $8D,$03,$00 ;STA a0003
        LDA #<p0E02
        .BYTE $8D,$02,$00 ;STA a0002
        JMP e896A

b1262   LDA f12FF,X
        EOR #$03
        STA f12FF,X
;e896A
        LDA ShipXPosition
        STA f10FF,X
        LDA ShipYPosition
        STA f11FF,X
        LDA #$03
        STA colourToPlot
        LDA a26
        STA charToPlot
        JSR Screen_Plot
        LDX a27
        JMP e8924

        LDX #$01
        INC a26
        RTS 
        LDX a27
        INX 
        CPX a24
        RTS 
        NOP 

b1290   LDX a27
        JMP e896A
;$8995
        LDA f12FF,X
        AND #$80
        BEQ b129F
        JMP Screen_Plot

b129F   RTS 

;-------------------------------------------------------------------------------
;MaybeResetSomeCounter
;-------------------------------------------------------------------------------
        LDA SomeCounter
        CMP #$FF
        BNE b129F
        LDA #$80
        STA SomeCounter
        RTS 

;-------------------------------------------------------------------------------
;e89AB
;-------------------------------------------------------------------------------
        LDX #$07
b12AD   CMP f871F,X
        BEQ b12B8
        DEX 
        BNE b12AD
        JMP e8BEC

b12B8   LDA a0B
        STA ShipXPosition
        LDA a0C
        STA ShipYPosition
        RTS 

;-------------------------------------------------------------------------------
;e89C1
;-------------------------------------------------------------------------------
        LDA a29
        BNE b12E6
        DEC a28
        BEQ b130C
        RTS 

b12CA   LDA #$20
        STA a28
        LDA a2B
        STA a29
        INC a24
        LDX a24
        LDA #$0A
        STA f10FF,X
        LDA #$02
        STA f11FF,X
        LDA #$41
        STA f12FF,X
        RTS 

b12E6   INC a24
        LDX a24
        LDA #$00
        STA f12FF,X
        LDA #$02
        STA f11FF,X
        LDA #$0A
        STA f10FF,X
        DEC a29
        LDA a29
f12FE   =*+$01
        CMP #$01
f1300   =*+$01
f12FF   BEQ b1302
        RTS 

b1302   DEC a29
        DEC a2A
        LDA #$80
        STA f12FF,X
        RTS 

b130C   LDA a2A
        BNE b12CA
        RTS 
;e8A11
        CMP #$13
        BEQ b1328
        CMP #$14
        BEQ b1321
        CMP #$15
        BEQ b1321
        NOP 
        NOP 
        NOP 
        RTS 

b1321   LDX #$04
        LDY #$03
        JSR IncrementPlayerScore
b1328   LDX #$04
        LDY #$01
        JSR e8A99
        LDA #$FF
        STA a11
        PLA 
        PLA 
        LDX a24
b1337   LDA f10FF,X
        CMP ShipXPosition
        BEQ b1342
b133E   DEX 
        BNE b1337
        RTS 

b1342   LDA f11FF,X
        CMP ShipYPosition
        BNE b133E
        LDA f12FF,X
        AND #$C0
        BNE b137A
        JSR e8AA4
;e8A53
b1353   LDA f1200,X
        STA f11FF,X
        LDA f1100,X
        STA f10FF,X
        LDA f1300,X
        STA f12FF,X
        CPX a24
        BEQ b136D
        INX 
        JMP e8A53

b136D   LDA #>p070F
        STA colourToPlot
        LDA #<p070F
        STA charToPlot
        DEC a24
        JMP Screen_Plot

b137A   CMP #$C0
        BEQ b1353
        CMP #$40
        BEQ b138D
        LDA f12FE,X
        ORA #$80
        STA f12FE,X
        JMP e8A53

b138D   LDA f1300,X
        ORA f12FF,X
        STA f1300,X
        JMP e8A53
;e8A99
        LDA #<p03F0
        STA a22
        LDA #>p03F0
        STA a23
        JMP IncrementPlayerScore

;e8A44
        STX a27
b13A6   DEX 
        LDA f12FF,X
        AND #$40
        BEQ b13A6
        LDA f12FF,X
        NOP 
        NOP 
        LDX a27
        JSR e8AC1
        LDA f12FE,X
        ORA #$80
        STA f12FE,X
        RTS 

;MaybeResetSomeCounter
        ORA f1300,X
        STA f1300,X
        RTS 

;--------------------------------------------------------------
;e8AC8
;--------------------------------------------------------------
        LDA a2A
        BEQ b13CD
b13CC   RTS 

b13CD   LDA a24
        BNE b13CC
        JMP DisplayNewLevelInterstitial
        JSR GetCurrentChar
        CMP #$07
        BEQ b13DE
        JMP Screen_Plot

;e8ADE
b13DE   LDX #$F6
        TXS 
        NOP 
        NOP 
        NOP 
        JMP e8D78
        RTS 

        NOP 

;--------------------------------------------------------------
;e8AE9
;--------------------------------------------------------------
        CMP #$07
        BEQ b13DE
        LDA f10FF,X
b13F0   RTS 

        CMP #$20
        BEQ b13F0
        JMP e8ADE

;e8AF8
        LDA #$0F
        STA a33
        LDA a0B
        LDX #$08
b1400   STA f1500,X
        DEX 
        BNE b1400
        LDA a0C
        LDX #$08
b140A   STA f1600,X
        DEX 
        BNE b140A
        LDA #$00
        STA $D404    ;Voice 1: Control Register
        STA $D40B    ;Voice 2: Control Register
        STA $D412    ;Voice 3: Control Register
        LDA #$03
        STA $D401    ;Voice 1: Frequency Control - High-Byte
        LDA #$16
        STA a2D
;e8B24
        LDA #$00
        STA $D404    ;Voice 1: Control Register
        LDA #$81
        STA $D404    ;Voice 1: Control Register
        LDA a33
        STA $D418    ;Select Filter Mode and Volume
        LDX #$08
        LDA #>p0800
        STA colourToPlot
        LDA #<p0800
        STA charToPlot
b143D   LDA f1500,X
        STA ShipXPosition
        LDA f1600,X
        STA ShipYPosition
        STX a27
        JSR GetCurrentChar
        CMP a2D
        BNE b1453
        JSR Screen_Plot
b1453   LDX a27
        DEX 
        BNE b143D
        LDA #$14
b145A   JMP e8B60
        DEX 
        BNE b145A

;e8B60
        INC a2D
        LDA a2D
        CMP #$19
        BNE b146C
        LDA #$16
        STA a2D
b146C   LDX #$08
b146E   LDA f8BC0,X
        CMP #$80
        BEQ b147F
        CMP #$00
        BEQ b147C
        INC f1500,X
b147C   INC f1500,X
b147F   JSR e8040
        LDA f8BC8,X
        BEQ b148E
        CMP #$80
        BEQ b1491
        INC f1600,X
b148E   INC f1600,X
b1491   JSR e8056
        LDA f1500,X
        STA ShipXPosition
        LDA f1600,X
        STA ShipYPosition
        LDA #$01
        STA colourToPlot
        LDA a2D
        STA charToPlot
        JSR e8BBB
        BNE b14AE
        JSR Screen_Plot
b14AE   JMP e8BD2

;e8BB1
        DEC a33
        BMI b14B8
        JMP e8B24

b14B8   JMP e8C17

;e8BBB
        STX a27
        JMP GetCurrentChar
        NOP 
        BRK #$01
        ORA (p01,X)
        BRK #$80
        .BYTE $80,$80 ;NOP #$80
        .BYTE $80,$80 ;NOP #$80
        BRK #$01
        ORA (p01,X)
        BRK #$80
        NOP 

;e8BD2
        LDX a27
        DEX 
        BNE b146E
        LDX #$10
b14D9   JSR SpinFor255Cycles
        DEX 
        BNE b14D9
        LDA #$00
        STA $D404    ;Voice 1: Control Register
        LDA #$81
        STA $D404    ;Voice 1: Control Register
        JMP e8BB1

;e8BEC
        CMP #$08
        BEQ b14FB
        CMP #$09
        BEQ b14FB
        CMP #$00
        BEQ b14FB
        JMP e8ADE

;e8BFB
b14FB   RTS 

;ClearScreen
        LDA #<p0450
        STA zpHi3
f1500   LDA #>p0450
        STA a08
        LDY #$00
b1506   LDA #$20
b1508   STA (zpHi3),Y
        INC zpHi3
        BNE b1508
        INC a08
        LDA a08
        CMP #$08
p1514   BNE b1506
        RTS 

ZERO = $30
;e8C17
        JSR ClearScreen
        NOP 
        NOP 
        NOP 
        DEC LivesDisplay
        LDA LivesDisplay
        CMP #ZERO
        BEQ GameOver
        JMP UpdateLivesAndStartNewLevel

GameOver
        JMP ClearScore

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
        CMP #$20
        BNE b158C
        DEC SelectedLevel
b158C   LDX SelectedLevel
        LDA f8CB4,X
        STA a2A
        LDA f8CD4,X
        STA a2B
        LDA f8CF4,X
        STA a34

; Increment the level displayed in 'ENTER GRID AREA XX'
IncrementLevel
        INC LevelDisplayByte2
        LDA LevelDisplayByte2
        CMP #$3A  ; Has the byte overflowed from 9 to 0? If so increment to '10'.
        BNE IL_ADJUST
        LDA #$30 ; "0"
        STA LevelDisplayByte2
        INC LevelDisplayByte1
IL_ADJUST
        DEX 
        BNE IncrementLevel
        JMP SetSoundVolumeToMax ; Which then jumps below to PlayNewLevelMusic

        ORA (ShipXPosition,X)
        .BYTE $02,$03,$03,$03,$04,$04,$04,$04
        .BYTE $05,$05,$10,$06,$06,$06,$06,$06
        .BYTE $06,$06,$06,$06,$06,$06,$06,$06
        .BYTE $07,$07,$07,$07,$07,$07,$06,$06
        .BYTE $06,$07,$07,$08,$08,$09,$0C,$0C
        .BYTE $0A,$0A,$03,$0F,$10,$10,$11,$12
        .BYTE $13,$14,$14,$14,$15,$15,$16,$16
        .BYTE $16,$17,$03,$18,$18,$19,$10,$10
        .BYTE $10,$0F,$0E,$0D,$0C,$0B,$0A,$09
        .BYTE $09
f1600   .BYTE $09,$09,$09,$09,$09,$08,$08,$08
        .BYTE $08,$07,$07,$07,$07,$07,$07,$07
        .BYTE $07,$07,$06
        ASL colourToPlot
        NOP 

PNL_COUNTER = $36
LevelColor1stByte = $D95E
LevelColor2ndByte = $D95F
SpinFor32Cycles = $8D52
SoundEffect = $8D66

;PlayNewLevelMusic
        LDA #$30 ; Play the loop 30 times
        STA PNL_COUNTER
MainNewLevelSoundLoop
        LDA PNL_COUNTER               ; Flashing effect on the level number
        STA LevelColor2ndByte
        STA LevelColor1stByte
        LDX PNL_COUNTER
NewLevelSoundLoop             ; Play the level sounds
        JSR SpinFor32Cycles
        JSR SoundEffect
        NOP 
        STA $D408    ;Voice 2: Frequency Control - High-Byte
        NOP 
        STA $D40F    ;Voice 3: Frequency Control - High-Byte
        LDA #$00
        STA $D404    ;Voice 1: Control Register
        STA $D40B    ;Voice 2: Control Register
        STA $D412    ;Voice 3: Control Register
        LDA #$25
        STA $D404    ;Voice 1: Control Register
        STA $D40B    ;Voice 2: Control Register
        STA $D412    ;Voice 3: Control Register
        DEX 
        BNE NewLevelSoundLoop
        DEC PNL_COUNTER
        BNE MainNewLevelSoundLoop
        JMP DrawNewLevelScreen ; Which then jumps to JumpToMainGameLoop

;SpinFor32Cycles
        LDA #$20
        JMP DecrementAccumToZero
        ; RTS

;JumpToDisplayTitleScreen
        LDA SelectedLevel
        STA SelectedLevel
        JMP DisplayTitleScreen

;UpdateLivesAndStartNewLevel
        DEC LivesDisplay
        DEC SelectedLevel
        JMP DisplayNewLevelInterstitial

;SoundEffect
        STX a27
        LDA #$40
        SBC a27
        STA $D401    ;Voice 1: Frequency Control - High-Byte
        RTS 

;SetSoundVolumeToMax
        LDA #$0F     ;Set volume to full?
        STA $D418    ;Select Filter Mode and Volume
        JMP PlayNewLevelMusic

;e8D78
        LDA #<p0800
        STA charToPlot
        LDA #>p0800
        STA colourToPlot
        LDA a0B
        STA ShipXPosition
        LDA a0C
        STA ShipYPosition
        JSR Screen_Plot
        JMP e8AF8

;-----------------------------------------------------
; DisplayTitleScreen
; This is the main loop for displaying the title screen. It waits for the player
; to press fire or select a level to start at. 
;-----------------------------------------------------
        LDA #$01
        STA SelectedLevel
        LDX #$0E
DTS_LOOP   
        LDA ByJeffMinter,X
        STA SCREENRAM + $FA,X
        LDA #$03
        STA COLOURRAM + $FA,X
        LDA EnterLevelText,X
        STA SCREENRAM + $014A,X
        LDA #$01
        STA COLOURRAM + $014A,X
        DEX 
        BNE DTS_LOOP
        JMP WriteCopyrightLine

; Loop while waiting for the player to press fire (JOY1_FIRE) or
; increment the starting level by pressing the joystick upwards (JOY1_UP).

LoopWhileWaitingToStartGame = $8DB0
WTS_LOOP
        LDA JOY1
        CMP #JOY1_FIRE
        BNE b16BA
        JMP Start_Game

b16BA   CMP #JOY1_UP
        BNE WTS_LOOP
        INC SelectedLevel
;e8DC0
        JSR IncrementSelectedLevel
        JMP LoopWhileWaitingToStartGame

;Start_Game
        DEC SelectedLevel
        JMP StartLevel

;-----------------------------------------------------
; Game Data
;-----------------------------------------------------

        .BYTE $B0,$8D,$EA,$EA,$EA,$EA,$EA,$EA
        .BYTE $EA,$EA,$EA,$EA,$EA,$EA,$EA,$EA
        .BYTE $EA,$EA,$EA,$EA,$EA,$EA
;ByJeffMinter
        .BYTE $29,$1B,$20,$2C,$27,$2A,$2A,$20,$2D,$24,$26,$3A,$27,$22,$20 ; "BY JEFF MINTER "
        NOP
;EnterLevelText
        .BYTE $27,$26,$3A,$27,$22,$20,$3E,$27,$3B,$27,$3E,$20,$30,$30,$20 ; "ENTER LEVEL 00 "

;-----------------------------------------------------
;CharSet1
;-----------------------------------------------------
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

        .BYTE $F0,$20,$10,$1F,$1F,$10,$20,$F0 ; CHARACTER 1
                                                ; $01
                                                ; 11110000   ****    
                                                ; 00100000     *     
                                                ; 00010000      *    
                                                ; 00011111      *****
                                                ; 00011111      *****
                                                ; 00010000      *    
                                                ; 00100000     *     
                                                ; 11110000   ****    

        .BYTE $18,$18,$18,$18,$BD,$C3,$81,$81 ; CHARACTER 2
                                                ; $02
                                                ; 00011000      **   
                                                ; 00011000      **   
                                                ; 00011000      **   
                                                ; 00011000      **   
                                                ; 10111101   * **** *
                                                ; 11000011   **    **
                                                ; 10000001   *      *
                                                ; 10000001   *      *

        .BYTE $00,$20,$60,$A3,$2C,$30,$00,$00 ; CHARACTER 3
                                                ; $03
                                                ; 00000000           
                                                ; 00100000     *     
                                                ; 01100000    **     
                                                ; 10100011   * *   **
                                                ; 00101100     * **  
                                                ; 00110000     **    
                                                ; 00000000           
                                                ; 00000000           

        .BYTE $00,$02,$05,$C8,$30,$00,$00,$00 ; CHARACTER 4
                                                ; $04
                                                ; 00000000           
                                                ; 00000010         * 
                                                ; 00000101        * *
                                                ; 11001000   **  *   
                                                ; 00110000     **    
                                                ; 00000000           
                                                ; 00000000           
                                                ; 00000000           

        .BYTE $08,$04,$3E,$20,$10,$10,$08,$08 ; CHARACTER 5
                                                ; $05
                                                ; 00001000       *   
                                                ; 00000100        *  
                                                ; 00111110     ***** 
                                                ; 00100000     *     
                                                ; 00010000      *    
                                                ; 00010000      *    
                                                ; 00001000       *   
                                                ; 00001000       *   

        .BYTE $08,$08,$10,$10,$08,$04,$02,$04 ; CHARACTER 6
                                                ; $06
                                                ; 00001000       *   
                                                ; 00001000       *   
                                                ; 00010000      *    
                                                ; 00010000      *    
                                                ; 00001000       *   
                                                ; 00000100        *  
                                                ; 00000010         * 
                                                ; 00000100        *  

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

        .BYTE $18,$18,$18,$3C,$7E,$7E,$7E,$3C ; CHARACTER 8
                                                ; $08
                                                ; 00011000      **   
                                                ; 00011000      **   
                                                ; 00011000      **   
                                                ; 00111100     ****  
                                                ; 01111110    ****** 
                                                ; 01111110    ****** 
                                                ; 01111110    ****** 
                                                ; 00111100     ****  

        .BYTE $3C,$7E,$7E,$7E,$3C,$18,$18,$18 ; CHARACTER 9
                                                ; $09
                                                ; 00111100     ****  
                                                ; 01111110    ****** 
                                                ; 01111110    ****** 
                                                ; 01111110    ****** 
                                                ; 00111100     ****  
                                                ; 00011000      **   
                                                ; 00011000      **   
                                                ; 00011000      **   

        .BYTE $42,$66,$24,$3C,$18,$18,$3C,$18 ; CHARACTER 10
                                                ; $0a
                                                ; 01000010    *    * 
                                                ; 01100110    **  ** 
                                                ; 00100100     *  *  
                                                ; 00111100     ****  
                                                ; 00011000      **   
                                                ; 00011000      **   
                                                ; 00111100     ****  
                                                ; 00011000      **   

        .BYTE $00,$C0,$72,$1F,$1F,$72,$C0,$00 ; CHARACTER 11
                                                ; $0b
                                                ; 00000000           
                                                ; 11000000   **      
                                                ; 01110010    ***  * 
                                                ; 00011111      *****
                                                ; 00011111      *****
                                                ; 01110010    ***  * 
                                                ; 11000000   **      
                                                ; 00000000           

        .BYTE $00,$03,$4E,$F8,$F8,$4E,$03,$00 ; CHARACTER 12
                                                ; $0c
                                                ; 00000000           
                                                ; 00000011         **
                                                ; 01001110    *  *** 
                                                ; 11111000   *****   
                                                ; 11111000   *****   
                                                ; 01001110    *  *** 
                                                ; 00000011         **
                                                ; 00000000           

        .BYTE $00,$00,$00,$18,$18,$00,$00,$00 ; CHARACTER 13
                                                ; $0d
                                                ; 00000000           
                                                ; 00000000           
                                                ; 00000000           
                                                ; 00011000      **   
                                                ; 00011000      **   
                                                ; 00000000           
                                                ; 00000000           
                                                ; 00000000           

        .BYTE $00,$00,$18,$3C,$3C,$18,$00,$00 ; CHARACTER 14
                                                ; $0e
                                                ; 00000000           
                                                ; 00000000           
                                                ; 00011000      **   
                                                ; 00111100     ****  
                                                ; 00111100     ****  
                                                ; 00011000      **   
                                                ; 00000000           
                                                ; 00000000           

        .BYTE $18,$24,$5A,$BD,$BD,$5A,$24,$18 ; CHARACTER 15
                                                ; $0f
                                                ; 00011000      **   
                                                ; 00100100     *  *  
                                                ; 01011010    * ** * 
                                                ; 10111101   * **** *
                                                ; 10111101   * **** *
                                                ; 01011010    * ** * 
                                                ; 00100100     *  *  
                                                ; 00011000      **   

        .BYTE $99,$7E,$5A,$FF,$FF,$5A,$7E,$99 ; CHARACTER 16
                                                ; $10
                                                ; 10011001   *  **  *
                                                ; 01111110    ****** 
                                                ; 01011010    * ** * 
                                                ; 11111111   ********
                                                ; 11111111   ********
                                                ; 01011010    * ** * 
                                                ; 01111110    ****** 
                                                ; 10011001   *  **  *

        .BYTE $66,$99,$BD,$5A,$5A,$BD,$99,$66 ; CHARACTER 17
                                                ; $11
                                                ; 01100110    **  ** 
                                                ; 10011001   *  **  *
                                                ; 10111101   * **** *
                                                ; 01011010    * ** * 
                                                ; 01011010    * ** * 
                                                ; 10111101   * **** *
                                                ; 10011001   *  **  *
                                                ; 01100110    **  ** 

        .BYTE $24,$42,$A5,$00,$00,$A5,$42,$24 ; CHARACTER 18
                                                ; $12
                                                ; 00100100     *  *  
                                                ; 01000010    *    * 
                                                ; 10100101   * *  * *
                                                ; 00000000           
                                                ; 00000000           
                                                ; 10100101   * *  * *
                                                ; 01000010    *    * 
                                                ; 00100100     *  *  

        .BYTE $30,$46,$48,$FF,$FF,$12,$62,$0C ; CHARACTER 19
                                                ; $13
                                                ; 00110000     **    
                                                ; 01000110    *   ** 
                                                ; 01001000    *  *   
                                                ; 11111111   ********
                                                ; 11111111   ********
                                                ; 00010010      *  * 
                                                ; 01100010    **   * 
                                                ; 00001100       **  

        .BYTE $C0,$FC,$72,$F8,$1F,$4E,$3F,$03 ; CHARACTER 20
                                                ; $14
                                                ; 11000000   **      
                                                ; 11111100   ******  
                                                ; 01110010    ***  * 
                                                ; 11111000   *****   
                                                ; 00011111      *****
                                                ; 01001110    *  *** 
                                                ; 00111111     ******
                                                ; 00000011         **

        .BYTE $0B,$2F,$4E,$5E,$7A,$72,$F4,$D0 ; CHARACTER 21
                                                ; $15
                                                ; 00001011       * **
                                                ; 00101111     * ****
                                                ; 01001110    *  *** 
                                                ; 01011110    * **** 
                                                ; 01111010    **** * 
                                                ; 01110010    ***  * 
                                                ; 11110100   **** *  
                                                ; 11010000   ** *    

        .BYTE $00,$46,$28,$80,$16,$08,$20,$42 ; CHARACTER 22
                                                ; $16
                                                ; 00000000           
                                                ; 01000110    *   ** 
                                                ; 00101000     * *   
                                                ; 10000000   *       
                                                ; 00010110      * ** 
                                                ; 00001000       *   
                                                ; 00100000     *     
                                                ; 01000010    *    * 

        .BYTE $40,$21,$06,$00,$00,$60,$82,$01 ; CHARACTER 23
                                                ; $17
                                                ; 01000000    *      
                                                ; 00100001     *    *
                                                ; 00000110        ** 
                                                ; 00000000           
                                                ; 00000000           
                                                ; 01100000    **     
                                                ; 10000010   *     * 
                                                ; 00000001          *

        .BYTE $02,$80,$00,$00,$00,$00,$01,$40 ; CHARACTER 24
                                                ; $18
                                                ; 00000010         * 
                                                ; 10000000   *       
                                                ; 00000000           
                                                ; 00000000           
                                                ; 00000000           
                                                ; 00000000           
                                                ; 00000001          *
                                                ; 01000000    *      

        .BYTE $00,$F3,$DB,$F3,$C3,$C3,$00,$00 ; CHARACTER 25
                                                ; $19
                                                ; 00000000           
                                                ; 11110011   ****  **
                                                ; 11011011   ** ** **
                                                ; 11110011   ****  **
                                                ; 11000011   **    **
                                                ; 11000011   **    **
                                                ; 00000000           
                                                ; 00000000           

        .BYTE $00,$03,$03,$03,$03,$DB,$00,$00 ; CHARACTER 26
                                                ; $1a
                                                ; 00000000           
                                                ; 00000011         **
                                                ; 00000011         **
                                                ; 00000011         **
                                                ; 00000011         **
                                                ; 11011011   ** ** **
                                                ; 00000000           
                                                ; 00000000           

        .BYTE $C6,$C6,$00,$7C,$38,$38,$38,$38 ; CHARACTER 27
                                                ; $1b
                                                ; 11000110   **   ** 
                                                ; 11000110   **   ** 
                                                ; 00000000           
                                                ; 01111100    *****  
                                                ; 00111000     ***   
                                                ; 00111000     ***   
                                                ; 00111000     ***   
                                                ; 00111000     ***   

        .BYTE $C6,$C6,$00,$7C,$38,$38,$38,$38 ; CHARACTER 28
                                                ; $1c
                                                ; 11000110   **   ** 
                                                ; 11000110   **   ** 
                                                ; 00000000           
                                                ; 01111100    *****  
                                                ; 00111000     ***   
                                                ; 00111000     ***   
                                                ; 00111000     ***   
                                                ; 00111000     ***   

        .BYTE $00,$CC,$CC,$FC,$CC,$CC,$00,$00 ; CHARACTER 29
                                                ; $1d
                                                ; 00000000           
                                                ; 11001100   **  **  
                                                ; 11001100   **  **  
                                                ; 11111100   ******  
                                                ; 11001100   **  **  
                                                ; 11001100   **  **  
                                                ; 00000000           
                                                ; 00000000           

        .BYTE $00,$F0,$66,$60,$66,$F0,$00,$00 ; CHARACTER 30
                                                ; $1e
                                                ; 00000000           
                                                ; 11110000   ****    
                                                ; 01100110    **  ** 
                                                ; 01100000    **     
                                                ; 01100110    **  ** 
                                                ; 11110000   ****    
                                                ; 00000000           
                                                ; 00000000           

        .BYTE $00,$10,$08,$7C,$08,$10,$00,$00 ; CHARACTER 31
                                                ; $1f
                                                ; 00000000           
                                                ; 00010000      *    
                                                ; 00001000       *   
                                                ; 01111100    *****  
                                                ; 00001000       *   
                                                ; 00010000      *    
                                                ; 00000000           
                                                ; 00000000           

        .BYTE $00,$00,$00,$00,$00,$00,$00,$00 ; CHARACTER 32
                                                ; $20
                                                ; 00000000           
                                                ; 00000000           
                                                ; 00000000           
                                                ; 00000000           
                                                ; 00000000           
                                                ; 00000000           
                                                ; 00000000           
                                                ; 00000000           

        ;CharSet2
        .BYTE $7C,$FE,$00,$C0,$DE,$C6,$C6,$7C ; CHARACTER 33
                                                ; $21
                                                ; 01111100    *****  
                                                ; 11111110   ******* 
                                                ; 00000000           
                                                ; 11000000   **      
                                                ; 11011110   ** **** 
                                                ; 11000110   **   ** 
                                                ; 11000110   **   ** 
                                                ; 01111100    *****  

        .BYTE $FC,$FE,$00,$C6,$FC,$D0,$C8,$C6 ; CHARACTER 34
                                                ; $22
                                                ; 11111100   ******  
                                                ; 11111110   ******* 
                                                ; 00000000           
                                                ; 11000110   **   ** 
                                                ; 11111100   ******  
                                                ; 11010000   ** *    
                                                ; 11001000   **  *   
                                                ; 11000110   **   ** 

        .BYTE $C6,$C6,$00,$C6,$C6,$C6,$FE,$7C ; CHARACTER 35
                                                ; $23
                                                ; 11000110   **   ** 
                                                ; 11000110   **   ** 
                                                ; 00000000           
                                                ; 11000110   **   ** 
                                                ; 11000110   **   ** 
                                                ; 11000110   **   ** 
                                                ; 11111110   ******* 
                                                ; 01111100    *****  

        .BYTE $FC,$FC,$00,$30,$30,$30,$FC,$FC ; CHARACTER 36
                                                ; $24
                                                ; 11111100   ******  
                                                ; 11111100   ******  
                                                ; 00000000           
                                                ; 00110000     **    
                                                ; 00110000     **    
                                                ; 00110000     **    
                                                ; 11111100   ******  
                                                ; 11111100   ******  

        .BYTE $FC,$FE,$00,$C6,$C6,$C6,$FE,$FC ; CHARACTER 37
                                                ; $25
                                                ; 11111100   ******  
                                                ; 11111110   ******* 
                                                ; 00000000           
                                                ; 11000110   **   ** 
                                                ; 11000110   **   ** 
                                                ; 11000110   **   ** 
                                                ; 11111110   ******* 
                                                ; 11111100   ******  

        .BYTE $C6,$C6,$00,$E6,$F6,$DE,$CE,$C6 ; CHARACTER 38
                                                ; $26
                                                ; 11000110   **   ** 
                                                ; 11000110   **   ** 
                                                ; 00000000           
                                                ; 11100110   ***  ** 
                                                ; 11110110   **** ** 
                                                ; 11011110   ** **** 
                                                ; 11001110   **  *** 
                                                ; 11000110   **   ** 

        .BYTE $FE,$FE,$00,$F0,$F0,$C0,$FE,$FE ; CHARACTER 39
                                                ; $27
                                                ; 11111110   ******* 
                                                ; 11111110   ******* 
                                                ; 00000000           
                                                ; 11110000   ****    
                                                ; 11110000   ****    
                                                ; 11000000   **      
                                                ; 11111110   ******* 
                                                ; 11111110   ******* 

        .BYTE $FE,$FE,$00,$C6,$FE,$C6,$C6,$C6 ; CHARACTER 40
                                                ; $28
                                                ; 11111110   ******* 
                                                ; 11111110   ******* 
                                                ; 00000000           
                                                ; 11000110   **   ** 
                                                ; 11111110   ******* 
                                                ; 11000110   **   ** 
                                                ; 11000110   **   ** 
                                                ; 11000110   **   ** 

        .BYTE $FC,$FE,$00,$C6,$FC,$C6,$C6,$FC ; CHARACTER 41
                                                ; $29
                                                ; 11111100   ******  
                                                ; 11111110   ******* 
                                                ; 00000000           
                                                ; 11000110   **   ** 
                                                ; 11111100   ******  
                                                ; 11000110   **   ** 
                                                ; 11000110   **   ** 
                                                ; 11111100   ******  

        .BYTE $FE,$FE,$00,$F0,$F0,$C0,$C0,$C0 ; CHARACTER 42
                                                ; $2a
                                                ; 11111110   ******* 
                                                ; 11111110   ******* 
                                                ; 00000000           
                                                ; 11110000   ****    
                                                ; 11110000   ****    
                                                ; 11000000   **      
                                                ; 11000000   **      
                                                ; 11000000   **      

        .BYTE $C6,$C6,$00,$C6,$FE,$C6,$C6,$C6 ; CHARACTER 43
                                                ; $2b
                                                ; 11000110   **   ** 
                                                ; 11000110   **   ** 
                                                ; 00000000           
                                                ; 11000110   **   ** 
                                                ; 11111110   ******* 
                                                ; 11000110   **   ** 
                                                ; 11000110   **   ** 
                                                ; 11000110   **   ** 

        .BYTE $06,$06,$00,$06,$06,$C6,$FE,$7C ; CHARACTER 44
                                                ; $2c
                                                ; 00000110        ** 
                                                ; 00000110        ** 
                                                ; 00000000           
                                                ; 00000110        ** 
                                                ; 00000110        ** 
                                                ; 11000110   **   ** 
                                                ; 11111110   ******* 
                                                ; 01111100    *****  

        .BYTE $C6,$EE,$00,$FE,$C6,$C6,$C6,$C6 ; CHARACTER 45
                                                ; $2d
                                                ; 11000110   **   ** 
                                                ; 11101110   *** *** 
                                                ; 00000000           
                                                ; 11111110   ******* 
                                                ; 11000110   **   ** 
                                                ; 11000110   **   ** 
                                                ; 11000110   **   ** 
                                                ; 11000110   **   ** 

        .BYTE $FE,$FE,$00,$C6,$FE,$C0,$C0,$C0 ; CHARACTER 46
                                                ; $2e
                                                ; 11111110   ******* 
                                                ; 11111110   ******* 
                                                ; 00000000           
                                                ; 11000110   **   ** 
                                                ; 11111110   ******* 
                                                ; 11000000   **      
                                                ; 11000000   **      
                                                ; 11000000   **      

        .BYTE $FE,$FE,$00,$C0,$FE,$06,$C6,$FE ; CHARACTER 47
                                                ; $2f
                                                ; 11111110   ******* 
                                                ; 11111110   ******* 
                                                ; 00000000           
                                                ; 11000000   **      
                                                ; 11111110   ******* 
                                                ; 00000110        ** 
                                                ; 11000110   **   ** 
                                                ; 11111110   ******* 

        .BYTE $FE,$FE,$00,$C6,$C6,$C6,$FE,$FE ; CHARACTER 48
                                                ; $30
                                                ; 11111110   ******* 
                                                ; 11111110   ******* 
                                                ; 00000000           
                                                ; 11000110   **   ** 
                                                ; 11000110   **   ** 
                                                ; 11000110   **   ** 
                                                ; 11111110   ******* 
                                                ; 11111110   ******* 

        .BYTE $18,$18,$00,$18,$38,$38,$38,$38 ; CHARACTER 49
                                                ; $31
                                                ; 00011000      **   
                                                ; 00011000      **   
                                                ; 00000000           
                                                ; 00011000      **   
                                                ; 00111000     ***   
                                                ; 00111000     ***   
                                                ; 00111000     ***   
                                                ; 00111000     ***   

        .BYTE $7C,$FE,$00,$06,$0C,$38,$FE,$FE ; CHARACTER 50
                                                ; $32
                                                ; 01111100    *****  
                                                ; 11111110   ******* 
                                                ; 00000000           
                                                ; 00000110        ** 
                                                ; 00001100       **  
                                                ; 00111000     ***   
                                                ; 11111110   ******* 
                                                ; 11111110   ******* 

        .BYTE $7C,$FE,$00,$1E,$1E,$06,$FE,$7C ; CHARACTER 51
                                                ; $33
                                                ; 01111100    *****  
                                                ; 11111110   ******* 
                                                ; 00000000           
                                                ; 00011110      **** 
                                                ; 00011110      **** 
                                                ; 00000110        ** 
                                                ; 11111110   ******* 
                                                ; 01111100    *****  

        .BYTE $60,$60,$00,$EC,$FE,$0C,$0C,$0C ; CHARACTER 52
                                                ; $34
                                                ; 01100000    **     
                                                ; 01100000    **     
                                                ; 00000000           
                                                ; 11101100   *** **  
                                                ; 11111110   ******* 
                                                ; 00001100       **  
                                                ; 00001100       **  
                                                ; 00001100       **  

        .BYTE $FE,$FE,$00,$E0,$7C,$06,$FE,$7C ; CHARACTER 53
                                                ; $35
                                                ; 11111110   ******* 
                                                ; 11111110   ******* 
                                                ; 00000000           
                                                ; 11100000   ***     
                                                ; 01111100    *****  
                                                ; 00000110        ** 
                                                ; 11111110   ******* 
                                                ; 01111100    *****  

        .BYTE $7C,$FE,$00,$C0,$FC,$C6,$C6,$7C ; CHARACTER 54
                                                ; $36
                                                ; 01111100    *****  
                                                ; 11111110   ******* 
                                                ; 00000000           
                                                ; 11000000   **      
                                                ; 11111100   ******  
                                                ; 11000110   **   ** 
                                                ; 11000110   **   ** 
                                                ; 01111100    *****  

        .BYTE $FE,$FE,$00,$0C,$18,$30,$30,$70 ; CHARACTER 55
                                                ; $37
                                                ; 11111110   ******* 
                                                ; 11111110   ******* 
                                                ; 00000000           
                                                ; 00001100       **  
                                                ; 00011000      **   
                                                ; 00110000     **    
                                                ; 00110000     **    
                                                ; 01110000    ***    

        .BYTE $7C,$FE,$00,$C6,$7C,$C6,$C6,$7C ; CHARACTER 56
                                                ; $38
                                                ; 01111100    *****  
                                                ; 11111110   ******* 
                                                ; 00000000           
                                                ; 11000110   **   ** 
                                                ; 01111100    *****  
                                                ; 11000110   **   ** 
                                                ; 11000110   **   ** 
                                                ; 01111100    *****  

        .BYTE $7C,$FE,$00,$C6,$7E,$06,$FE,$7C ; CHARACTER 57
                                                ; $39
                                                ; 01111100    *****  
                                                ; 11111110   ******* 
                                                ; 00000000           
                                                ; 11000110   **   ** 
                                                ; 01111110    ****** 
                                                ; 00000110        ** 
                                                ; 11111110   ******* 
                                                ; 01111100    *****  

        .BYTE $FC,$FC,$00,$30,$30,$30,$30,$30 ; CHARACTER 58
                                                ; $3a
                                                ; 11111100   ******  
                                                ; 11111100   ******  
                                                ; 00000000           
                                                ; 00110000     **    
                                                ; 00110000     **    
                                                ; 00110000     **    
                                                ; 00110000     **    
                                                ; 00110000     **    

        .BYTE $C6,$C6,$00,$C6,$6C,$6C,$38,$38 ; CHARACTER 59
                                                ; $3b
                                                ; 11000110   **   ** 
                                                ; 11000110   **   ** 
                                                ; 00000000           
                                                ; 11000110   **   ** 
                                                ; 01101100    ** **  
                                                ; 01101100    ** **  
                                                ; 00111000     ***   
                                                ; 00111000     ***   

        .BYTE $1F,$30,$67,$CC,$CC,$67,$30,$1F ; CHARACTER 60
                                                ; $3c
                                                ; 00011111      *****
                                                ; 00110000     **    
                                                ; 01100111    **  ***
                                                ; 11001100   **  **  
                                                ; 11001100   **  **  
                                                ; 01100111    **  ***
                                                ; 00110000     **    
                                                ; 00011111      *****

        .BYTE $80,$C0,$60,$30,$30,$60,$C0,$80 ; CHARACTER 61
                                                ; $3d
                                                ; 10000000   *       
                                                ; 11000000   **      
                                                ; 01100000    **     
                                                ; 00110000     **    
                                                ; 00110000     **    
                                                ; 01100000    **     
                                                ; 11000000   **      
                                                ; 10000000   *       

        .BYTE $C0,$C0,$00,$C0,$C0,$C0,$FE,$FE ; CHARACTER 62
                                                ; $3e
                                                ; 11000000   **      
                                                ; 11000000   **      
                                                ; 00000000           
                                                ; 11000000   **      
                                                ; 11000000   **      
                                                ; 11000000   **      
                                                ; 11111110   ******* 
                                                ; 11111110   ******* 

        .BYTE $18,$18,$18,$18,$18,$18,$18,$18 ; CHARACTER 63
                                                ; $3f
                                                ; 00011000      **   
                                                ; 00011000      **   
                                                ; 00011000      **   
                                                ; 00011000      **   
                                                ; 00011000      **   
                                                ; 00011000      **   
                                                ; 00011000      **   
                                                ; 00011000      **   

        .BYTE $C1,$83,$E2,$83,$C3,$C2,$CD,$38 ; CHARACTER 64
                                                ; $40
                                                ; 11000001   **     *
                                                ; 10000011   *     **
                                                ; 11100010   ***   * 
                                                ; 10000011   *     **
                                                ; 11000011   **    **
                                                ; 11000010   **    * 
                                                ; 11001101   **  ** *
                                                ; 00111000     ***   

        .BYTE $30,$00,$8F,$9D,$00,$21,$CA,$D0 ; CHARACTER 65
                                                ; $41
                                                ; 00110000     **    
                                                ; 00000000           
                                                ; 10001111   *   ****
                                                ; 10011101   *  *** *
                                                ; 00000000           
                                                ; 00100001     *    *
                                                ; 11001010   **  * * 
                                                ; 11010000   ** *    

        .BYTE $F1
        JMP InitializeGame
.include "padding.asm"; This appears to be redundant, duplicated data

