; This is the reverse-engineered source code for the game 'Matrix' written by Jeff Minter in 1983.
;
; The code in this file was created by disassembling a binary of the game released into
; the public domain by Jeff Minter in 2019.
;
; The original code from which this source is derived is the copyright of Jeff Minter.
;
; The original home of this file is at: https://github.com/mwenge/matrix
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
; **** ZP ABSOLUTE ADRESSES **** 
;
currentXPosition = $02
currentYPosition = $03
currentCharacter = $04
colorForCurrentCharacter = $05
screenLineLoPtr = $06
screenLineHiPtr = $07
a08 = $08
a09 = $09
a0A = $0A
previousXPosition = $0B
previousYPosition = $0C
a0D = $0D
joystickInput = $0E
a0F = $0F
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
a30 = $30
a33 = $33
a34 = $34
selectedLevel = $35
a36 = $36
lastKeyPressed = $C5
aFC = $FC
aFD = $FD
aFE = $FE
aFF = $FF
;
; **** ZP POINTERS **** 
;
p02 = $02
p1F = $1F
p83 = $83
pCA = $CA
pFC = $FC
pFE = $FE
;
sE518 = $E518
;
; **** FIELDS **** 
;
screenLinesLoPtrArray = $0340
screenLinesHiPtrArray = $0360
SCREEN_RAM = $0400
f0FFF = $0FFF
f101F = $101F
f10FE = $10FE
f10FF = $10FF
f1100 = $1100
f11FE = $11FE
f11FF = $11FF
f1200 = $1200
f12FE = $12FE
f12FF = $12FF
f1300 = $1300
f1500 = $1500
f1600 = $1600
charSetLocation = $2000
f2100 = $2100
COLOR_RAM = $D800
;
; **** ABSOLUTE ADRESSES **** 
;
a0002 = $0002
a0003 = $0003
a0F0E = $0F0E
aDC11 = $DC11
;
; **** POINTERS **** 
;
p0101 = $0101
p0102 = $0102
p0116 = $0116
p0313 = $0313
p03F0 = $03F0
p083F = $083F
p0D07 = $0D07
p0E02 = $0E02
p1514 = $1514
p4008 = $4008
pD000 = $D000
;
; **** PREDEFINED LABELS **** 
;
ROM_RESTORj = $FD15
ROM_RAMTASj = $FD50
ROM_IOINITj = $FDA3
ROM_CHROUT = $FFD2

* = $0800

;-----------------------------------------------------------------------------------------------------
; SYS 2061 (PrepareGame)
; This launches the program from address $080d, i.e. PrepareGame.
;-----------------------------------------------------------------------------------------------------
; $9E = SYS
; $32,$30,$36,$31,$00,$00 = 2071 ($080D in hex)
p0800   .BYTE $00,$0B,$08,$0A,$00,$9E,$32,$30,$36,$31,$00,$00,$00

;---------------------------------------------------------------------------------
; PrepareGame   
;---------------------------------------------------------------------------------
PrepareGame   
        SEI 
        JMP (LaunchGame)

* = $8000
;---------------------------------------------------------------------------------
; LaunchGame   
;---------------------------------------------------------------------------------
LaunchGame   
        CMP (p83,X)
b8002   .BYTE $E2,$83 ;NOP #$83
        BRK #$00
        BRK #$00
        BRK #$00
        .BYTE $8F,$9D,$00 ;SAX $009D
        AND (pCA,X)
        BNE b8002
        JMP InitializeGame

        NOP 
j8015   INX 
        CPX #$07
        BNE CheckScreen
        JMP DisplayTitleScreen

        NOP 
        NOP 
        NOP 
;-------------------------------------------------------------------------
; CheckCurrentCharacterForShip
;-------------------------------------------------------------------------
CheckCurrentCharacterForShip
        JSR GetCharacterAtCurrentXYPos
        CMP #$07
        BEQ b8028
        RTS 

b8028   JMP JumpToDrawGridCharAtOldPosAndCheckCollisions

        NOP 
        NOP 
        NOP 
        NOP 
        NOP 
;---------------------------------------------------------------------------------
; j8030   
;---------------------------------------------------------------------------------
j8030   
        AND #$1F
        CMP #$18
        BPL b803A
j8036   STA f1600,X
        RTS 

b803A   LDA previousYPosition
        JMP j8036

        NOP 
;-------------------------------------------------------------------------
; s8040
;-------------------------------------------------------------------------
s8040
        DEC f1500,X
        LDA f1500,X
        AND #$3F
        CMP #$27
        BPL b8050
        STA f1500,X
        RTS 

b8050   LDA previousXPosition
        STA f1500,X
        RTS 

;-------------------------------------------------------------------------
; s8056
;-------------------------------------------------------------------------
s8056
        DEC f1600,X
        LDA f1600,X
        JMP j8030

        NOP 
;---------------------------------------------------------------------------------
; WaitForScreen   
;---------------------------------------------------------------------------------
WaitForScreen   
        LDX #$00

CheckScreen
        LDA SCREEN_RAM + $000F,X
        CMP SCREEN_RAM + $001B,X
        BNE b8070
        JMP j8015

b806D   JMP DisplayTitleScreen

b8070   BMI b806D
b8072   LDA SCREEN_RAM + $000F,X
        STA SCREEN_RAM + $001B,X
        INX 
        CPX #$07
        BNE b8072
        JMP DisplayTitleScreen

CopyrightLine   =*-$01
        .BYTE $3C,$3D,$20,$31,$39,$38,$32,$20 ; (c) 1982
        .BYTE $2B,$27,$2F,$20,$20,$2E,$22,$27 ; HES  PRE
        .BYTE $2F,$2F,$20,$2A,$24,$22,$27,$20 ; SS FIRE 
        .BYTE $3A,$30,$20,$29,$27,$21,$24,$26 ; TO BEGIN
;-------------------------------------------------------------------------
; IncrementSelectedLevel
;-------------------------------------------------------------------------
IncrementSelectedLevel
        LDA selectedLevel
        CMP #$20
        BNE b80AA
        LDA #$01
        STA selectedLevel
b80AA   LDA #$30
        STA SCREEN_RAM + $0157
        STA SCREEN_RAM + $0158
        LDX selectedLevel
b80B4   INC SCREEN_RAM + $0158
        LDA SCREEN_RAM + $0158
        CMP #$3A
        BNE b80C6
        LDA #$30
        STA SCREEN_RAM + $0158
        INC SCREEN_RAM + $0157
b80C6   DEX 
        BNE b80B4
        LDX #$30
b80CB   JSR WasteSomeCycles
        DEX 
        BNE b80CB
        RTS 

;---------------------------------------------------------------------------------
; WriteCopyrightLine   
;---------------------------------------------------------------------------------
WriteCopyrightLine   
        LDX #$20
b80D4   LDA CopyrightLine,X
        STA SCREEN_RAM + $0192,X
        LDA #$07
        STA COLOR_RAM + $0192,X
        DEX 
        BNE b80D4
        JMP j8DC0

;---------------------------------------------------------------------------------
; StartLevel   
;---------------------------------------------------------------------------------
StartLevel   
        LDA #$34
        STA SCREEN_RAM + $0027
        LDX #$07
        LDA #$30
b80EE   STA SCREEN_RAM + $000E,X
        DEX 
        BNE b80EE
        JMP DisplayNewLevelInterstitial

;---------------------------------------------------------------------------------
; WaitForKeyToBeReleased   
;---------------------------------------------------------------------------------
WaitForKeyToBeReleased   
        LDA lastKeyPressed
        CMP #$29
        BEQ WaitForKeyToBeReleased
        RTS 

        NOP 
        NOP 
;---------------------------------------------------------------------------------
; InitializeGame   
;---------------------------------------------------------------------------------
InitializeGame   
        LDA #>pD000
        STA currentYPosition
        LDA #<pD000
        STA currentXPosition
        LDY #$18
        TYA 
        STA (p02),Y
        LDY #$20
        LDA #$00
        STA (p02),Y
        INY 
        STA (p02),Y
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
        LDA #<SCREEN_RAM + $0000
        STA currentXPosition
        LDA #>SCREEN_RAM + $0000
        STA currentYPosition
b8138   LDA currentXPosition
        STA screenLinesLoPtrArray,X
        LDA currentYPosition
        STA screenLinesHiPtrArray,X
        LDY #$00
        LDA #$20
b8146   STA (p02),Y
        INY 
        CPY #$28
        BNE b8146
        LDA currentXPosition
        CLC 
        ADC #$28
        STA currentXPosition
        LDA currentYPosition
        ADC #$00
        STA currentYPosition
        INX 
        CPX #$18
        BNE b8138

        JMP j8818

        RTS 

;-------------------------------------------------------------------------
; GetLinePtrForCurrentYPosition
;-------------------------------------------------------------------------
GetLinePtrForCurrentYPosition
        LDX currentYPosition
        LDY currentXPosition
        LDA screenLinesLoPtrArray,X
        STA screenLineLoPtr
        LDA screenLinesHiPtrArray,X
        STA screenLineHiPtr
        RTS 

;-------------------------------------------------------------------------
; WriteCurrentCharacterToCurrentXYPos
;-------------------------------------------------------------------------
WriteCurrentCharacterToCurrentXYPos
        JSR GetLinePtrForCurrentYPosition
        LDA currentCharacter
        STA (screenLineLoPtr),Y
        LDA screenLineHiPtr
        CLC 
        ADC #$D4
        STA screenLineHiPtr
        LDA screenLineHiPtr
        LDA screenLineHiPtr
        STA screenLineHiPtr
        LDA colorForCurrentCharacter
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
; PlaySomeSound
;-------------------------------------------------------------------------
PlaySomeSound
        LDA #$00
        STA $D404    ;Voice 1: Control Register
        STA $D40B    ;Voice 2: Control Register
        LDA #$81
        STA $D404    ;Voice 1: Control Register
        STA $D40B    ;Voice 2: Control Register
        RTS 

;-------------------------------------------------------------------------
; DrawGrid
;-------------------------------------------------------------------------
DrawGrid
        LDA #$02
        STA a08
        LDA #>p083F
        STA colorForCurrentCharacter
        LDA #<p083F
        STA currentCharacter
b81AE   LDA #$00
        STA $D412    ;Voice 3: Control Register
        LDA #$00
        STA $D412    ;Voice 3: Control Register
        LDA #$02
        STA a09
b81BC   LDA a09
        STA currentYPosition
        LDA a08
        STA currentXPosition
        JSR WriteCurrentCharacterToCurrentXYPos
        JSR PlaySomeSound
        INC a09
        LDA a09
        CMP #$16
        BNE b81BC
        LDX #$01
b81D4   JSR s8230
        DEY 
        BNE b81DA
b81DA   DEX 
        BNE b81D4
        INC a08
        LDA a08
        CMP #$27
        BNE b81AE
        LDA #$02
        STA a08
        LDA #$00
        STA currentCharacter
b81ED   LDA #$01
        STA a09
b81F1   LDA a09
        STA currentXPosition
        LDA a08
        STA currentYPosition
        JSR WriteCurrentCharacterToCurrentXYPos
        JSR PlaySomeSound
        INC a09
        LDA a09
        CMP #$27
        BNE b81F1
        LDX #$01
b8209   JSR s8230
        DEY 
        BNE b820F
b820F   DEX 
        BNE b8209
        INC a08
        LDA a08
        CMP #$16
        BNE b81ED
b821A   RTS 

;-------------------------------------------------------------------------
; CheckForPausePressed
;-------------------------------------------------------------------------
CheckForPausePressed
        LDA lastKeyPressed
        CMP #$29
        BNE b821A
b8221   LDA lastKeyPressed
        CMP #$29
        BEQ b8221
b8227   LDA lastKeyPressed
        CMP #$29
        BNE b8227
        JMP WaitForKeyToBeReleased
        ;Returns

;-------------------------------------------------------------------------
; s8230
;-------------------------------------------------------------------------
s8230
        JMP PlayAnotherSound

;---------------------------------------------------------------------------------
; PlayAnotherSound   
;---------------------------------------------------------------------------------
PlayAnotherSound   
        LDA #$04
        STA a0A
j8237   INC a0A
        LDA a0A
        CMP #$04
        BNE b8240
        RTS 

b8240   LDA a08
        STA $D401    ;Voice 1: Frequency Control - High-Byte
        LDA a08
        ADC #$01
        STA $D408    ;Voice 2: Frequency Control - High-Byte
        JMP j8237

;-------------------------------------------------------------------------
; MaterializeShip
;-------------------------------------------------------------------------
MaterializeShip
        LDA #$0F
        STA a0A
        LDA #$02
        STA $D408    ;Voice 2: Frequency Control - High-Byte
        LDA #$00
        STA $D404    ;Voice 1: Control Register
        STA $D40B    ;Voice 2: Control Register
        LDA #<p0116
        STA currentCharacter
MaterializeShipLoop
        LDA #>p0116
        STA colorForCurrentCharacter
        LDA #$00
        STA $D40B    ;Voice 2: Control Register
        LDA #$81
        STA $D40B    ;Voice 2: Control Register
        LDA #$15
        STA currentYPosition
        LDA #$14
        CLC 
        SBC a0A
        STA currentXPosition
        JSR WriteCurrentCharacterToCurrentXYPos
        LDA #$14
        CLC 
        ADC a0A
        STA currentXPosition
        JSR WriteCurrentCharacterToCurrentXYPos
        LDA currentYPosition
        CLC 
        SBC a0A
        STA currentYPosition
        JSR WriteCurrentCharacterToCurrentXYPos
        LDA #$14
        STA currentXPosition
        JSR WriteCurrentCharacterToCurrentXYPos
        LDA #$14
        SBC a0A
        STA currentXPosition
        JSR WriteCurrentCharacterToCurrentXYPos
        INC currentCharacter
        LDA currentCharacter
        CMP #$19
        BNE b82AE
        LDA #$16
b82AE   STA a09
        LDX a0A
b82B2   JSR MaybeWasteSomeCycles
        DEX 
        BNE b82B2
        LDA #<p0800
        STA currentCharacter
        LDA #>p0800
        STA colorForCurrentCharacter
        LDA #$14
        STA currentXPosition
        JSR WriteCurrentCharacterToCurrentXYPos
        LDA #$14
        CLC 
        SBC a0A
        STA currentXPosition
        JSR WriteCurrentCharacterToCurrentXYPos
        LDA #$14
        CLC 
        ADC a0A
        STA currentXPosition
        JSR WriteCurrentCharacterToCurrentXYPos
        LDA #$15
        STA currentYPosition
        JSR WriteCurrentCharacterToCurrentXYPos
        LDA #$14
        CLC 
        SBC a0A
        STA currentXPosition
        JMP DrawMaterializeShip

;---------------------------------------------------------------------------------
; LoadCharacterSetData   
;---------------------------------------------------------------------------------
LoadCharacterSetData   
        LDX #$00
b82EE   LDA f8E00,X
        STA charSetLocation,X
        LDA f8F00,X
        STA charSetLocation + $100,X
        DEX 
        BNE b82EE
        JMP InitializeGame

;---------------------------------------------------------------------------------
; DrawNewLevelScreen   
;---------------------------------------------------------------------------------
DrawNewLevelScreen   
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
        STA previousXPosition
        LDA #>p1514
        STA previousYPosition
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
        JSR s8748
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
        .BYTE $EA,$EA,$EA,$EA,$EA,$EA,$EA,$EA
        .BYTE $EA,$EA,$EA,$EA,$EA,$EA,$EA
        JMP EnterMainGameLoop

;-------------------------------------------------------------------------
; GetJoystickInput
;-------------------------------------------------------------------------
GetJoystickInput
        LDA aDC11
        EOR #$FF
        STA joystickInput
        RTS 

        .BYTE $EA,$EA,$EA,$EA,$EA
;-------------------------------------------------------------------------
; MaybeWasteSomeCycles
;-------------------------------------------------------------------------
MaybeWasteSomeCycles
        LDA a0A
        CMP #$00
        BEQ b8392

;-------------------------------------------------------------------------
; WasteSomeCycles
;-------------------------------------------------------------------------
WasteSomeCycles
        LDA #$00
;---------------------------------------------------------------------------------
; j8388   
;---------------------------------------------------------------------------------
j8388   
        STA a30
b838A   DEC a30
        BNE b838A
b838E   DEC a30
        BNE b838E
b8392   RTS 

;---------------------------------------------------------------------------------
; MainGameLoop   
;---------------------------------------------------------------------------------
MainGameLoop   
        JSR UpdateShipPosition
        JSR CheckForPausePressed
        JMP MainLoop

        NOP 
        NOP 
        NOP 
        NOP 
;---------------------------------------------------------------------------------
; EnterMainGameLoop   
;---------------------------------------------------------------------------------
EnterMainGameLoop   
        JMP MainGameLoop

MainLoop
        JSR DecrementTimer
        JSR UpdateZappersPosition
        JSR UpdateScreen
        JSR UpdatePods
        JSR DrawUpdatedPods
        JSR PlayBackgroundSounds
        JSR DrawDroids
        JSR MaybeResetSomeCounter
        JSR s8AC8
        JMP WasteYetMoreCycles

;---------------------------------------------------------------------------------
; UnusedRoutine   
;---------------------------------------------------------------------------------
UnusedRoutine   
        SEI 
        CLD 
        LDA #$05
        STA $D016    ;VIC Control Register 2
        JSR ROM_IOINITj ;$FDA3 (jmp) - initialize CIA & IRQ             
        JSR ROM_RAMTASj ;$FD50 (jmp) - RAM test & search RAM end        
        JSR ROM_RESTORj ;$FD15 (jmp) - restore default I/O vectors      
        JSR sE518
        CLI 
        LDA #$08
        JSR ROM_CHROUT ;$FFD2 - output character                 
        NOP 
        NOP 
        NOP 
        NOP 
        NOP 
        JMP LoadCharacterSetData

        PLA 
        TAY 
        PLA 
        TAX 
        PLA 
        RTI 

;---------------------------------------------------------------------------------
; WasteYetMoreCycles   
;---------------------------------------------------------------------------------
WasteYetMoreCycles   
        LDX #$15
b83EA   DEX 
        BNE b83EA
        JMP EnterMainGameLoop

        .BYTE $EA,$EA,$EA,$EA,$EA,$EA,$EA,$EA,$EA,$EA
        JMP EnterMainGameLoop

        NOP 
        NOP 
        NOP 
;---------------------------------------------------------------------------------
; DrawMaterializeShip   
;---------------------------------------------------------------------------------
DrawMaterializeShip   
        JSR WriteCurrentCharacterToCurrentXYPos
        LDA a09
        STA currentCharacter
        DEC a0A
        LDA a0A
        CMP #$FF
        BEQ b841A
        LDA #$0F
        CLC 
        SBC a0A
        STA $D418    ;Select Filter Mode and Volume
        JMP MaterializeShipLoop

b841A   LDA #<p0D07
        STA currentCharacter
        LDA #>p0D07
        STA colorForCurrentCharacter
        LDA #>p1514
        STA currentYPosition
        LDA #<p1514
        STA currentXPosition
        JSR WriteCurrentCharacterToCurrentXYPos
        LDA #$0F
        STA $D418    ;Select Filter Mode and Volume
        JSR PlayMaterializeShipSoundEffects
        LDA #$08
        STA $D418    ;Select Filter Mode and Volume
        JSR PlayMaterializeShipSoundEffects
        LDA #$02
        STA $D418    ;Select Filter Mode and Volume
        JSR PlayMaterializeShipSoundEffects
        LDA #$00
        STA $D40B    ;Voice 2: Control Register
        LDA #$0F
        STA $D418    ;Select Filter Mode and Volume
        RTS 

;-------------------------------------------------------------------------
; PlayMaterializeShipSoundEffects
;-------------------------------------------------------------------------
PlayMaterializeShipSoundEffects
        LDA #$18
        STA a0A
b8454   LDA a0A
        STA $D408    ;Voice 2: Frequency Control - High-Byte
        LDA #$00
        STA $D40B    ;Voice 2: Control Register
        LDA #$11
        STA $D40B    ;Voice 2: Control Register
        LDX #$02
b8465   JSR MaybeWasteSomeCycles
        DEX 
        BNE b8465
        DEC a0A
        BNE b8454
        RTS 

;-------------------------------------------------------------------------
; UpdateShipPosition
;-------------------------------------------------------------------------
UpdateShipPosition
        DEC a0D
        BEQ b8475
        RTS 

b8475   JSR GetJoystickInput
        LDA previousXPosition
        STA currentXPosition
        LDA previousYPosition
        STA currentYPosition
        JSR GetCharacterAtCurrentXYPos
        CMP #$07
        BEQ b848A
        JSR s8BEC
b848A   LDA #<p0800
        STA currentCharacter
        LDA #>p0800
        STA colorForCurrentCharacter
        JSR WriteCurrentCharacterToCurrentXYPos
        LDA joystickInput
        AND #$01
        BEQ b84A7
        DEC currentYPosition
        LDA currentYPosition
        CMP #$0E
        BNE b84A7
        LDA #$0F
        STA currentYPosition
b84A7   LDA joystickInput
        AND #$02
        BEQ b84B9
        INC currentYPosition
        LDA currentYPosition
        CMP #$16
        BNE b84B9
        LDA #$15
        STA currentYPosition
b84B9   LDA joystickInput
        AND #$04
        BEQ b84CB
        DEC currentXPosition
        LDA currentXPosition
        CMP #$00
        BNE b84CB
        LDA #$01
        STA currentXPosition
b84CB   LDA joystickInput
        AND #$08
        BEQ b84DD
        INC currentXPosition
        LDA currentXPosition
        CMP #$27
        BNE b84DD
        LDA #$26
        STA currentXPosition
b84DD   JSR GetCharacterAtCurrentXYPos
        BEQ b84E5
        JSR CheckIfBlockedByPod
b84E5   LDA currentXPosition
        STA previousXPosition
        LDA currentYPosition
        STA previousYPosition
        LDA #>p0D07
        STA colorForCurrentCharacter
        LDA #<p0D07
        STA currentCharacter
        JMP WriteCurrentCharacterToCurrentXYPos

;-------------------------------------------------------------------------
; DecrementTimer
;-------------------------------------------------------------------------
DecrementTimer
        DEC a0F
        BEQ b84FD
b84FC   RTS 

b84FD   LDA #$18
        STA a0F
        JSR MaybePlaySomeSounds
        LDA a11
        CMP #$FF
        BNE b8522
        LDA joystickInput
        AND #$10
        BEQ b84FC
        LDA previousXPosition
        STA a10
        LDA previousYPosition
        STA a11
        DEC a11
        LDA #<p4008
        STA a12
        LDA #>p4008
        STA a13
b8522   LDA a10
        STA currentXPosition
        LDA a11
        STA currentYPosition
        JSR GetCharacterAtCurrentXYPos
        CMP a12
        BEQ b8538
        CMP #$00
        BEQ b8538
        JSR s87CB
b8538   LDA #>p0800
        STA colorForCurrentCharacter
        LDA #<p0800
        STA currentCharacter
        JSR WriteCurrentCharacterToCurrentXYPos
        INC a12
        LDA a12
        CMP #$0A
        BNE b855C
        DEC a11
        LDA a11
        CMP #$02
        BNE b8558
        LDA #$FF
        STA a11
        RTS 

b8558   LDA #$08
        STA a12
b855C   LDA a11
        STA currentYPosition
        JSR GetCharacterAtCurrentXYPos
        BEQ b8568
        JSR s87CB
b8568   LDA a12
        STA currentCharacter
        LDA #$01
        STA colorForCurrentCharacter
        JMP WriteCurrentCharacterToCurrentXYPos

;-------------------------------------------------------------------------
; MaybePlaySomeSounds
;-------------------------------------------------------------------------
MaybePlaySomeSounds
        LDA a13
        BNE b8578
        RTS 

b8578   DEC a13
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

;-------------------------------------------------------------------------
; UpdateZappersPosition
;-------------------------------------------------------------------------
UpdateZappersPosition
        LDA a0D
        CMP #$01
        BEQ b85A2
b85A1   RTS 

b85A2   DEC a14
        BNE b85A1
        LDA #$02
        STA a14
        LDA #$00
        STA currentXPosition
        LDA a15
        STA currentYPosition
        LDA #$20
        STA currentCharacter
        JSR WriteCurrentCharacterToCurrentXYPos
        INC a15
        LDA a15
        CMP #$16
        BNE b85C5
        LDA #$03
        STA a15
b85C5   LDA a15
        STA currentYPosition
        LDA #>p0101
        STA colorForCurrentCharacter
        LDA #<p0101
        STA currentCharacter
        JSR WriteCurrentCharacterToCurrentXYPos
        LDA #$16
        STA currentYPosition
        LDA a16
        STA currentXPosition
        LDA #$20
        JSR s85F8
        INC a16
        LDA a16
        CMP #$27
        BNE b85ED
        LDA #$01
        STA a16
b85ED   LDA a16
        STA currentXPosition
        LDA #$02
        STA currentCharacter
        JMP j85FD

;-------------------------------------------------------------------------
; s85F8
;-------------------------------------------------------------------------
s85F8
        STA currentCharacter
        JMP WriteCurrentCharacterToCurrentXYPos

j85FD   JSR WriteCurrentCharacterToCurrentXYPos
        DEC a17
        BEQ b8605
        RTS 

b8605   LDA a34
        STA a17
        JSR s862F
        LDA #$00
        STA $D412    ;Voice 3: Control Register
        LDA #$21
        STA $D412    ;Voice 3: Control Register
        LDA #<SCREEN_RAM + $01FF
        STA a18
        LDA #>SCREEN_RAM + $01FF
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

;-------------------------------------------------------------------------
; s862F
;-------------------------------------------------------------------------
s862F
        LDA #$03
        STA $D40F    ;Voice 3: Frequency Control - High-Byte
        RTS 

;-------------------------------------------------------------------------
; UpdateScreen
;-------------------------------------------------------------------------
UpdateScreen
        LDA a0F
        CMP #$05
        BEQ b863C
b863B   RTS 

b863C   LDA a18
        CMP #$FF
        BNE b863B
        JSR s86D0
        NOP 
        CMP #$07
        BNE b864E
        LDA #$05
        STA a19
b864E   LDA #$01
        STA colorForCurrentCharacter
        LDA a19
        STA currentCharacter
        LDA #$15
        STA a1D
b865A   LDA a1D
        STA currentYPosition
        LDA a1C
        STA currentXPosition
        JSR WriteCurrentCharacterToCurrentXYPos
        DEC a1D
        LDA a1D
        CMP #$02
        BNE b865A
        LDA a1A
        STA currentYPosition
        LDA a1B
        STA currentXPosition
        JSR GetCharacterAtCurrentXYPos
        CMP a19
        BEQ b86A2
        LDA #<p0800
        STA currentCharacter
        LDA #>p0800
        STA colorForCurrentCharacter
        JSR WriteCurrentCharacterToCurrentXYPos
        INC a1B
        LDA a1B
        STA currentXPosition
        JSR CheckCurrentCharacterForShip
        CMP a19
        BEQ b86A2
        LDA #$01
        STA colorForCurrentCharacter
        LDA a19
        CLC 
        SBC #$01
        STA currentCharacter
        JMP WriteCurrentCharacterToCurrentXYPos

b86A2   LDA #$15
        STA currentYPosition
        LDA a1C
        STA currentXPosition
        LDA #>p0800
        STA colorForCurrentCharacter
        LDA #<p0800
        STA currentCharacter
b86B2   JSR WriteCurrentCharacterToCurrentXYPos
        DEC currentYPosition
        LDA currentYPosition
        CMP #$02
        BNE b86B2
        LDA a1A
        STA currentYPosition
        LDA #>SCREEN_RAM + $030F
        STA colorForCurrentCharacter
        LDA #<SCREEN_RAM + $030F
        STA currentCharacter
        LDA #$00
        STA a18
        JMP WriteCurrentCharacterToCurrentXYPos

;-------------------------------------------------------------------------
; s86D0
;-------------------------------------------------------------------------
s86D0
        DEC a0F
        INC a19
        LDA a19
        RTS 

;-------------------------------------------------------------------------
; UpdatePods
;-------------------------------------------------------------------------
UpdatePods
        LDA a17
        CMP #$05
        BEQ b86DE
        RTS 

b86DE   DEC a17
        LDA #>SCREEN_RAM + $0050
        STA a20
        LDA #<SCREEN_RAM + $0050
        STA a1F
        LDY #$00
b86EA   LDA (p1F),Y
        BNE b86FB
b86EE   INC a1F
        BNE b86EA
        INC a20
        LDA a20
        CMP #$08
        BNE b86EA
        RTS 

b86FB   CMP #$20
        BEQ b86EE
        LDX #$07
b8701   CMP PodDecaySequence,X
        BEQ b870C
        DEX 
        BNE b8701
        JMP b86EE

b870C   CPX #$07
        BEQ b8719
        INX 
        LDA PodDecaySequence,X
        STA (p1F),Y
        JMP b86EE

b8719   JSR s8728
        JMP b86EE

; This is the sequence in which the yellow pods decay before exploding.
; Each byte is a char representing a stage of decay, working from left to right.
PodDecaySequence
        .BYTE $EA,$18,$0D,$0E,$0F,$10,$11
        .BYTE $12,$13
;-------------------------------------------------------------------------
; s8728
;-------------------------------------------------------------------------
s8728   LDA #$0A
        STA (p1F),Y
        LDX #$18
b872E   LDA f101F,X
        CMP #$FF
        BEQ b873D
        DEX 
b8737   =*+$01
        BNE b872E
        LDA #$12
        STA (p1F),Y
        RTS 

b873D   LDA a1F
        STA f0FFF,X
        LDA a20
        STA f101F,X
        RTS 

;-------------------------------------------------------------------------
; s8748
;-------------------------------------------------------------------------
s8748
        LDX #$20
        LDA #$FF
b874C   STA f101F,X
        DEX 
        BNE b874C
        RTS 

;-------------------------------------------------------------------------
; DrawUpdatedPods
;-------------------------------------------------------------------------
DrawUpdatedPods
        DEC a21
        BEQ b8758
        RTS 

b8758   LDA #$40
        STA a21
        LDX #$18
b875E   LDA f101F,X
        CMP #$FF
        BEQ b8768
        JSR s876C
b8768   DEX 
        BNE b875E
        RTS 

;-------------------------------------------------------------------------
; s876C
;-------------------------------------------------------------------------
s876C
        LDA f0FFF,X
        STA currentXPosition
        LDA f101F,X
        STA currentYPosition
        LDY #$00
        LDA (p02),Y
        CMP #$07
        BNE b8781
        JMP JumpToDrawGridCharAtOldPosAndCheckCollisions

b8781   LDA #$00
        STA (p02),Y
        LDA currentYPosition
        CLC 
        ADC #$D4
        STA currentYPosition
        LDA #$08
        STA (p02),Y
        LDA f0FFF,X
        CLC 
        ADC #$28
        STA f0FFF,X
        LDA f101F,X
        ADC #$00
        STA f101F,X
        STA currentYPosition
        LDA f0FFF,X
        STA currentXPosition
        LDA (p02),Y
        CMP #$20
        BNE b87B4
        LDA #$FF
        STA f101F,X
        RTS 

b87B4   CMP #$07
        BNE b87BB
        JMP JumpToDrawGridCharAtOldPosAndCheckCollisions

b87BB   LDA #$0A
        STA (p02),Y
        LDA currentYPosition
        CLC 
        ADC #$D4
        STA currentYPosition
        LDA #$01
        STA (p02),Y
        RTS 

;-------------------------------------------------------------------------
; s87CB
;-------------------------------------------------------------------------
s87CB
        LDX #$07
b87CD   CMP PodDecaySequence,X
        BEQ b87D9
        DEX 
        BNE b87CD
        JMP j8A11

        RTS 

b87D9   DEX 
        BEQ b87EC
        LDA PodDecaySequence,X
        STA currentCharacter
        LDA #$07
        STA colorForCurrentCharacter
        LDA #$FF
        STA a11
        JMP j8801

b87EC   LDA #<p0800
        STA currentCharacter
        LDA #>p0800
        STA colorForCurrentCharacter
        LDA #$FF
        STA a11
        JSR WriteCurrentCharacterToCurrentXYPos
        JSR s888A
        PLA 
        PLA 
        RTS 

j8801   PLA 
        PLA 
        JMP WriteCurrentCharacterToCurrentXYPos

;-------------------------------------------------------------------------
; DisplayGameBanner
;-------------------------------------------------------------------------
DisplayGameBanner
        LDX #$28
b8808   LDA screenHeaderText,X
        STA SCREEN_RAM - $01,X
        LDA screenHeaderColors,X
        STA COLOR_RAM - $01,X
        DEX 
        BNE b8808
        RTS 

j8818   JSR DisplayGameBanner
        JMP JumpToDisplayTitleScreen

        NOP 
screenHeaderText   .BYTE $EA,$21,$22,$24,$25,$22,$23,$26
        .BYTE $26,$27,$22,$20,$20,$19,$1A,$20
        .BYTE $30,$30,$30,$30,$30,$30,$30,$20
        .BYTE $20,$1D,$1E,$20,$30,$30,$30,$30
        .BYTE $30,$30,$30,$20,$20,$07,$20,$20
screenHeaderColors   .BYTE $34,$03,$03,$03,$03,$04,$04,$04
        .BYTE $04,$04,$04,$01,$01,$07,$07,$01
        .BYTE $03,$03,$03,$03,$03,$03,$03,$01
        .BYTE $01,$07,$07,$01,$0E,$0E,$0E,$0E
        .BYTE $0E,$0E,$0E,$01,$01,$0D,$01,$01
        .BYTE $04
;---------------------------------------------------------------------------------
; IncrementPlayerScore   
;---------------------------------------------------------------------------------
IncrementPlayerScore   
        TXA 
        PHA 
b8872   INC SCREEN_RAM + $000F,X
        LDA SCREEN_RAM + $000F,X
        CMP #$3A
        BNE b8884
        LDA #$30
        STA SCREEN_RAM + $000F,X
        DEX 
        BNE b8872
b8884   PLA 
        TAX 
        DEY 
        BNE IncrementPlayerScore
        RTS 

;-------------------------------------------------------------------------
; s888A
;-------------------------------------------------------------------------
s888A
        LDX #$06
        LDY #$0A
        JSR IncrementPlayerScore
        LDA #<p03F0
        STA a22
        LDA #>p03F0
        STA a23
b8899   RTS 

;-------------------------------------------------------------------------
; PlayBackgroundSounds
;-------------------------------------------------------------------------
PlayBackgroundSounds
        LDA a0D
        AND #$01
        BEQ b8899
        LDA a22
        AND #$C0
        BEQ b88B8
        DEC a22
        LDA a22
        STA $D40F    ;Voice 3: Frequency Control - High-Byte
        LDA #$00
        STA $D412    ;Voice 3: Control Register
        LDA #$21
        STA $D412    ;Voice 3: Control Register
        RTS 

b88B8   LDA a23
        BEQ b88C3
        DEC a23
        LDA #$F0
        STA a22
        RTS 

b88C3   LDA #$04
        STA $D40F    ;Voice 3: Frequency Control - High-Byte
        RTS 

;-------------------------------------------------------------------------
; DrawDroids
;-------------------------------------------------------------------------
DrawDroids
        DEC a25
        BEQ b88CE
b88CD   RTS 

b88CE   LDA #$80
        STA a25
        JSR s89C1
        LDA a24
        BEQ b88CD
        TAX 
        INC a26
        LDA a26
        CMP #$16
        BNE b88E6
        LDA #$13
        STA a26
b88E6   STX a27
        LDA f10FF,X
        STA currentXPosition
        LDA f11FF,X
        STA currentYPosition
        LDA #<p0800
        STA currentCharacter
        LDA #>p0800
        STA colorForCurrentCharacter
        JSR s8995
        LDX a27
        LDA f12FF,X
        AND #$40
        BNE b892A
        LDA f10FE,X
        STA f10FF,X
        LDA f11FE,X
        STA f11FF,X
        STA currentYPosition
        LDA f10FF,X
        STA currentXPosition
        LDA #>p0313
        STA colorForCurrentCharacter
        LDA #<p0313
        STA currentCharacter
        JSR WriteCurrentCharacterToCurrentXYPos
j8924   LDX a27
        DEX 
        BNE b88E6
        RTS 

b892A   LDA f12FF,X
        AND #$02
        BNE b8935
        INC currentXPosition
        INC currentXPosition
b8935   DEC currentXPosition
        JSR GetCharacterAtCurrentXYPos
        BEQ b8990
        LDX a27
        JSR CheckForShipCollision
        STA currentXPosition
        INC currentYPosition
        LDA currentYPosition
        CMP #$16
        BNE b8962
        LDA f12FF,X
        ORA #$01
        AND #$FD
        STA f12FF,X
        LDA #>p0E02
        STA @wa0003
        LDA #<p0E02
        STA @wa0002
        JMP j896A

b8962   LDA f12FF,X
        EOR #$03
        STA f12FF,X
j896A   LDA currentXPosition
        STA f10FF,X
        LDA currentYPosition
        STA f11FF,X
        LDA #$03
        STA colorForCurrentCharacter
        LDA a26
        STA currentCharacter
        JSR WriteCurrentCharacterToCurrentXYPos
        LDX a27
        JMP j8924

        LDX #$01
        INC a26
        RTS 

        LDX a27
        INX 
        CPX a24
        RTS 

        NOP 
b8990   LDX a27
        JMP j896A

;-------------------------------------------------------------------------
; s8995
;-------------------------------------------------------------------------
s8995
        LDA f12FF,X
        AND #$80
        BEQ b899F
        JMP WriteCurrentCharacterToCurrentXYPos

b899F   RTS 

;-------------------------------------------------------------------------
; MaybeResetSomeCounter
;-------------------------------------------------------------------------
MaybeResetSomeCounter
        LDA a0D
        CMP #$FF
        BNE b899F
        LDA #$80
        STA a0D
        RTS 

;-------------------------------------------------------------------------
; CheckIfBlockedByPod
;-------------------------------------------------------------------------
CheckIfBlockedByPod
        LDX #$07
b89AD   CMP PodDecaySequence,X
        BEQ b89B8
        DEX 
        BNE b89AD
        JMP s8BEC

b89B8   LDA previousXPosition
        STA currentXPosition
        LDA previousYPosition
        STA currentYPosition
        RTS 

;-------------------------------------------------------------------------
; s89C1
;-------------------------------------------------------------------------
s89C1
        LDA a29
        BNE b89E6
        DEC a28
        BEQ b8A0C
        RTS 

b89CA   LDA #$20
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

b89E6   INC a24
        LDX a24
        LDA #$00
        STA f12FF,X
        LDA #$02
        STA f11FF,X
        LDA #$0A
        STA f10FF,X
        DEC a29
        LDA a29
        CMP #$01
        BEQ b8A02
        RTS 

b8A02   DEC a29
        DEC a2A
        LDA #$80
        STA f12FF,X
        RTS 

b8A0C   LDA a2A
        BNE b89CA
        RTS 

j8A11   CMP #$13
        BEQ b8A28
        CMP #$14
        BEQ b8A21
        CMP #$15
        BEQ b8A21
        NOP 
        NOP 
        NOP 
        RTS 

b8A21   LDX #$04
        LDY #$03
        JSR IncrementPlayerScore
b8A28   LDX #$04
        LDY #$01
        JSR s8A99
        LDA #$FF
        STA a11
        PLA 
        PLA 
        LDX a24
b8A37   LDA f10FF,X
        CMP currentXPosition
        BEQ b8A42
b8A3E   DEX 
        BNE b8A37
        RTS 

b8A42   LDA f11FF,X
        CMP currentYPosition
        BNE b8A3E
        LDA f12FF,X
        AND #$C0
        BNE b8A7A
        JSR s8AA4
j8A53   LDA f1200,X
        STA f11FF,X
        LDA f1100,X
        STA f10FF,X
        LDA f1300,X
        STA f12FF,X
        CPX a24
        BEQ b8A6D
        INX 
        JMP j8A53

b8A6D   LDA #>SCREEN_RAM + $030F
        STA colorForCurrentCharacter
        LDA #<SCREEN_RAM + $030F
        STA currentCharacter
        DEC a24
        JMP WriteCurrentCharacterToCurrentXYPos

b8A7A   CMP #$C0
        BEQ j8A53
        CMP #$40
        BEQ b8A8D
        LDA f12FE,X
        ORA #$80
        STA f12FE,X
        JMP j8A53

b8A8D   LDA f1300,X
        ORA f12FF,X
        STA f1300,X
        JMP j8A53

;-------------------------------------------------------------------------
; s8A99
;-------------------------------------------------------------------------
s8A99
        LDA #<p03F0
        STA a22
        LDA #>p03F0
        STA a23
        JMP IncrementPlayerScore

;-------------------------------------------------------------------------
; s8AA4
;-------------------------------------------------------------------------
s8AA4
        STX a27
b8AA6   DEX 
        LDA f12FF,X
        AND #$40
        BEQ b8AA6
        LDA f12FF,X
        NOP 
        NOP 
        LDX a27
        JSR s8AC1
        LDA f12FE,X
        ORA #$80
        STA f12FE,X
        RTS 

;-------------------------------------------------------------------------
; s8AC1
;-------------------------------------------------------------------------
s8AC1
        ORA f1300,X
        STA f1300,X
        RTS 

;-------------------------------------------------------------------------
; s8AC8
;-------------------------------------------------------------------------
s8AC8
        LDA a2A
        BEQ b8ACD
b8ACC   RTS 

b8ACD   LDA a24
        BNE b8ACC
        JMP DisplayNewLevelInterstitial

        JSR GetCharacterAtCurrentXYPos
        CMP #$07
        BEQ JumpToDrawGridCharAtOldPosAndCheckCollisions
        JMP WriteCurrentCharacterToCurrentXYPos

;---------------------------------------------------------------------------------
; JumpToDrawGridCharAtOldPosAndCheckCollisions   
;---------------------------------------------------------------------------------
JumpToDrawGridCharAtOldPosAndCheckCollisions   
        LDX #$F6
        TXS 
        NOP 
        NOP 
        NOP 
        JMP DrawGridCharAtOldPosAndCheckCollisions

        RTS 

        NOP 
;-------------------------------------------------------------------------
; CheckForShipCollision
;-------------------------------------------------------------------------
CheckForShipCollision
        CMP #$07
        BEQ JumpToDrawGridCharAtOldPosAndCheckCollisions
        LDA f10FF,X
b8AF0   RTS 

        CMP #$20
        BEQ b8AF0
        JMP JumpToDrawGridCharAtOldPosAndCheckCollisions

;---------------------------------------------------------------------------------
; CheckForCollisions   
;---------------------------------------------------------------------------------
CheckForCollisions   
        LDA #$0F
        STA a33
        LDA previousXPosition
        LDX #$08
b8B00   STA f1500,X
        DEX 
        BNE b8B00
        LDA previousYPosition
        LDX #$08
b8B0A   STA f1600,X
        DEX 
        BNE b8B0A
        LDA #$00
        STA $D404    ;Voice 1: Control Register
        STA $D40B    ;Voice 2: Control Register
        STA $D412    ;Voice 3: Control Register
        LDA #$03
        STA $D401    ;Voice 1: Frequency Control - High-Byte
        LDA #$16
        STA a2D
j8B24   LDA #$00
        STA $D404    ;Voice 1: Control Register
        LDA #$81
        STA $D404    ;Voice 1: Control Register
        LDA a33
        STA $D418    ;Select Filter Mode and Volume
        LDX #$08
        LDA #>p0800
        STA colorForCurrentCharacter
        LDA #<p0800
        STA currentCharacter
b8B3D   LDA f1500,X
        STA currentXPosition
        LDA f1600,X
        STA currentYPosition
        STX a27
        JSR GetCharacterAtCurrentXYPos
        CMP a2D
        BNE b8B53
        JSR WriteCurrentCharacterToCurrentXYPos
b8B53   LDX a27
        DEX 
        BNE b8B3D
        LDA #$14
b8B5A   JMP j8B60

        DEX 
        BNE b8B5A

;---------------------------------------------------------------------------------
; j8B60   
;---------------------------------------------------------------------------------
j8B60   
        INC a2D
        LDA a2D
        CMP #$19
        BNE b8B6C
        LDA #$16
        STA a2D
b8B6C   LDX #$08
b8B6E   LDA f8BC0,X
        CMP #$80
        BEQ b8B7F
        CMP #$00
        BEQ b8B7C
        INC f1500,X
b8B7C   INC f1500,X
b8B7F   JSR s8040
        LDA f8BC8,X
        BEQ b8B8E
        CMP #$80
        BEQ b8B91
        INC f1600,X
b8B8E   INC f1600,X
b8B91   JSR s8056
        LDA f1500,X
        STA currentXPosition
        LDA f1600,X
        STA currentYPosition
        LDA #$01
        STA colorForCurrentCharacter
        LDA a2D
        STA currentCharacter
        JSR s8BBB
        BNE b8BAE
        JSR WriteCurrentCharacterToCurrentXYPos
b8BAE   JMP j8BD2

;---------------------------------------------------------------------------------
; PlayExplosionAndStartNewLevel   
;---------------------------------------------------------------------------------
PlayExplosionAndStartNewLevel   
        DEC a33
        BMI b8BB8
        JMP j8B24

b8BB8   JMP ClearScreenAndRestartLevel

;-------------------------------------------------------------------------
; s8BBB
;-------------------------------------------------------------------------
s8BBB
        STX a27
        JMP GetCharacterAtCurrentXYPos

f8BC0   .BYTE $EA,$00,$01,$01,$01,$00,$80,$80
f8BC8   .BYTE $80,$80,$80,$00,$01,$01,$01,$00
        .BYTE $80
        NOP 
;---------------------------------------------------------------------------------
; j8BD2   
;---------------------------------------------------------------------------------
j8BD2   
        LDX a27
        DEX 
        BNE b8B6E
        LDX #$10
b8BD9   JSR WasteSomeCycles
        DEX 
        BNE b8BD9
        LDA #$00
        STA $D404    ;Voice 1: Control Register
        LDA #$81
        STA $D404    ;Voice 1: Control Register
        JMP PlayExplosionAndStartNewLevel

;-------------------------------------------------------------------------
; s8BEC
;-------------------------------------------------------------------------
s8BEC
        CMP #$08
        BEQ b8BFB
        CMP #$09
        BEQ b8BFB
        CMP #$00
        BEQ b8BFB
        JMP JumpToDrawGridCharAtOldPosAndCheckCollisions

b8BFB   RTS 

;-------------------------------------------------------------------------
; ClearScreen
;-------------------------------------------------------------------------
ClearScreen
        LDA #<SCREEN_RAM + $0050
        STA screenLineHiPtr
        LDA #>SCREEN_RAM + $0050
        STA a08
        LDY #$00
b8C06   LDA #$20
b8C08   STA (screenLineHiPtr),Y
        INC screenLineHiPtr
        BNE b8C08
        INC a08
        LDA a08
        CMP #$08
        BNE b8C06
        RTS 

;---------------------------------------------------------------------------------
; ClearScreenAndRestartLevel   
;---------------------------------------------------------------------------------
ClearScreenAndRestartLevel   
        JSR ClearScreen
        NOP 
        NOP 
        NOP 
        DEC SCREEN_RAM + $0027
        LDA SCREEN_RAM + $0027
        CMP #$30
        BEQ b8C2A
        JMP UpdateLivesAndRestartLevel

b8C2A   JMP WaitForScreen

;---------------------------------------------------------------------------------
; DisplayNewLevelInterstitial   
;---------------------------------------------------------------------------------
DisplayNewLevelInterstitial   
        LDX #$F6
        TXS 
        JSR ClearScreen
        LDX #$12
b8C35   LDA txtBattleStations,X
        STA SCREEN_RAM + $00FD,X
        LDA #$0E
        STA COLOR_RAM + $00FD,X
        LDA txtEnterGridArea,X
        STA SCREEN_RAM + $014D,X
        LDA #$01
        STA COLOR_RAM + $014D,X
        DEX 
        BNE b8C35
        JMP IncrementLives

txtBattleStations   =*-$01
        .BYTE $20,$29,$28,$3A,$3A,$3E,$27,$20
        .BYTE $20,$2F,$3A,$28,$3A,$24,$30,$26
        .BYTE $2F,$20
txtEnterGridArea =*-$01
        .BYTE $27,$26,$3A,$27,$22,$20,$21
        .BYTE $22,$24,$25,$20,$28,$22,$27,$28
        .BYTE $20,$30,$30
;---------------------------------------------------------------------------------
; IncrementLives   
;---------------------------------------------------------------------------------
IncrementLives   
        INC SCREEN_RAM + $0027
        LDA SCREEN_RAM + $0027
        CMP #$3A
        BNE b8C82
        DEC SCREEN_RAM + $0027
b8C82   INC selectedLevel
        LDA selectedLevel
        CMP #$20
        BNE b8C8C
        DEC selectedLevel
b8C8C   LDX selectedLevel
        LDA f8CB4,X
        STA a2A
        LDA f8CD4,X
        STA a2B
        LDA f8CF4,X
        STA a34
IncrementLeve
        INC SCREEN_RAM + $015F
        LDA SCREEN_RAM + $015F
        CMP #$3A
        BNE b8CAF
        LDA #$30
        STA SCREEN_RAM + $015F
        INC SCREEN_RAM + $015E
b8CAF   DEX 
        BNE IncrementLeve
        JMP SetVolumeAndPlaySounds

f8CB4   =*-$01
        .BYTE $01,$02,$02,$03,$03,$03,$04,$04
        .BYTE $04,$04,$05,$05,$10,$06,$06,$06
        .BYTE $06,$06,$06,$06,$06,$06,$06,$06
        .BYTE $06,$06,$07,$07,$07,$07,$07,$07
f8CD4    =*-$01
        .BYTE $06,$06,$06,$07,$07,$08,$08
        .BYTE $09,$0C,$0C,$0A,$0A,$03,$0F,$10
        .BYTE $10,$11,$12,$13,$14,$14,$14,$15
        .BYTE $15,$16,$16,$16,$17,$03,$18,$18,$19
f8CF4    =*-$01
        .BYTE $10,$10,$10,$0F,$0E,$0D,$0C
        .BYTE $0B,$0A,$09,$09,$09,$09,$09,$09
        .BYTE $09,$08,$08,$08,$08,$07,$07,$07
        .BYTE $07,$07,$07,$07,$07,$07,$06,$06
        .BYTE $05
        NOP 
;---------------------------------------------------------------------------------
; PlayNewLevelSounds   
;---------------------------------------------------------------------------------
PlayNewLevelSounds   
        LDA #$30
        STA a36
b8D1A   LDA a36
        STA COLOR_RAM + $015F
        STA COLOR_RAM + $015E
        LDX a36
b8D24   JSR s8D52
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
        BNE b8D24
        DEC a36
        BNE b8D1A
        JMP DrawNewLevelScreen

;-------------------------------------------------------------------------
; s8D52
;-------------------------------------------------------------------------
s8D52
        LDA #$20
        JMP j8388

;---------------------------------------------------------------------------------
; JumpToDisplayTitleScreen   
;---------------------------------------------------------------------------------
JumpToDisplayTitleScreen   
        LDA selectedLevel
b8D5A   =*+$01
        STA selectedLevel
        JMP DisplayTitleScreen

;---------------------------------------------------------------------------------
; UpdateLivesAndRestartLevel   
;---------------------------------------------------------------------------------
UpdateLivesAndRestartLevel   
        DEC SCREEN_RAM + $0027
        DEC selectedLevel
        JMP DisplayNewLevelInterstitial

;-------------------------------------------------------------------------
; SoundEffect
;-------------------------------------------------------------------------
SoundEffect
        STX a27
        LDA #$40
        SBC a27
        STA $D401    ;Voice 1: Frequency Control - High-Byte
        RTS 

;---------------------------------------------------------------------------------
; SetVolumeAndPlaySounds   
;---------------------------------------------------------------------------------
SetVolumeAndPlaySounds   
        LDA #$0F
        STA $D418    ;Select Filter Mode and Volume
        JMP PlayNewLevelSounds

DrawGridCharAtOldPosAndCheckCollisions
        LDA #<p0800
        STA currentCharacter
        LDA #>p0800
        STA colorForCurrentCharacter
        LDA previousXPosition
        STA currentXPosition
        LDA previousYPosition
        STA currentYPosition
        JSR WriteCurrentCharacterToCurrentXYPos
        JMP CheckForCollisions

;---------------------------------------------------------------------------------
; DisplayTitleScreen   
;---------------------------------------------------------------------------------
DisplayTitleScreen   
        LDA #$01
        STA selectedLevel
        LDX #$0E
b8D94   LDA txtByJeffMinter,X
        STA SCREEN_RAM + $00FA,X
        LDA #$03
        STA COLOR_RAM + $00FA,X
        LDA txtEnterLevel,X
        STA SCREEN_RAM + $014A,X
        LDA #$01
        STA COLOR_RAM + $014A,X
        DEX 
        BNE b8D94
        JMP WriteCopyrightLine

b8DB0   LDA aDC11
        CMP #$EF
        BNE b8DBA
        JMP j8DC6

b8DBA   CMP #$FE
        BNE b8DB0
        INC selectedLevel
j8DC0   JSR IncrementSelectedLevel
        JMP b8DB0

j8DC6   DEC selectedLevel
        JMP StartLevel

        BCS b8D5A
        .BYTE $EA,$EA,$EA,$EA,$EA,$EA,$EA,$EA
        .BYTE $EA,$EA,$EA,$EA,$EA,$EA,$EA,$EA
        .BYTE $EA,$EA,$EA,$EA

txtByJeffMinter  =*-$01 
        .BYTE $29,$1B,$20,$2C,$27,$2A,$2A
        .BYTE $20,$2D,$24,$26,$3A,$27,$22,$20
        .BYTE $EA
txtEnterLevel  =*-$01 
        .BYTE $27,$26,$3A,$27,$22,$20,$3E
        .BYTE $27,$3B,$27,$3E,$20,$30,$30,$20
.include "charset.asm"
        .BYTE $30,$00


