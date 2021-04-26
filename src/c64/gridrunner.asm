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
currentXPosition              = $02
currentYPosition              = $03
currentCharacter              = $04
colorForCurrentCharacter      = $05
screenLineLoPtr               = $06
screenLineHiPtr               = $07
randomValue                   = $08
currentExplosionCharacter     = $09
materializeShipOffset         = $0A
previousXPosition             = $0B
previousYPosition             = $0C
shipAnimationFrameRate        = $0D
joystickInput                 = $0E
bulletAndLaserFrameRate       = $0F
currentBulletXPosition        = $10
currentBulletYPosition        = $11
currentBulletCharacter        = $12
bulletSoundControl            = $13
zapperFrameRate               = $14
leftZapperYPosition           = $15
bottomZapperXPosition         = $16
laserAndPodInterval           = $17
laserShootInterval            = $18
laserCurrentCharacter         = $19
leftLaserYPosition            = $1A
leftLaserXPosition            = $1B
bottomLaserXPosition          = $1C
bottomLaserYPosition          = $1D
podUpdateRate                 = $21
backgroundSoundParm1          = $22
backgroundSoundParm2          = $23
noOfDroidSquadsCurrentLevel   = $24
droidFrameRate                = $25
currentDroidCharacter         = $26
currentDroidIndex             = $27
a28                           = $28
a29                           = $29
droidsLeftToKill              = $2A
sizeOfDroidSquadForLevel      = $2B
currentShipExplosionCharacter = $2D
cyclesToWasteCounter          = $30
collisionSoundControl         = $33
laserFrameRate                = $34
selectedLevel                 = $35
soundEffectControl            = $36
lastKeyPressed                = $C5

;
; **** FIELDS **** 
;
screenLinesLoPtrArray         = $0340
screenLinesHiPtrArray         = $0360
SCREEN_RAM                    = $0400
podLoPtrArray                 = $0FFF
podHiPtrArray                 = $101F
droidXPositionArray           = $10FF
droidYPositionArray           = $11FF
droidStatusArray              = $12FF
explosionXPosArray            = $1500
explosionYPosArray            = $1600
charSetLocation               = $2000
COLOR_RAM                     = $D800
;
; **** ABSOLUTE ADRESSES **** 
;
a0002                         = $0002
a0003                         = $0003
;
; **** POINTERS **** 
;
;
; **** PREDEFINED LABELS **** 
;
ROM_RESTORj                   = $FD15
ROM_RAMTASj                   = $FD50
ROM_IOINITj                   = $FDA3
ROM_CHROUT                    = $FFD2

GRID                          = $00
LEFT_ZAPPER                   = $01
BOTTOM_ZAPPER                 = $02
SHIP                          = $07
BULLET_UP1                    = $08
BOMB_DOWN                     = $0A
POD3                          = $0F
POD6                          = $12
DROID1                        = $13
EXPLOSION1                    = $16
SPACE                         = $20
VERTICAL_LINE                 = $3F

WHITE                         = $01
RED                           = $02
CYAN                          = $03
GREEN                         = $05
YELLOW                        = $07
ORANGE                        = $08
LTGREEN                       = $0D

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
        ; Jumps to routine InitializeData
        JMP (initializeDataJumpAddress)

* = $8000
; This is the address of InitializeData
initializeDataJumpAddress   .BYTE $C1,$83 ; InitializeData

        ;Data Not Reached
        .BYTE $E2,$83,$00,$00,$00,$00
        .BYTE $00,$00,$8F,$9D,$00,$21,$CA,$D0
        .BYTE $F1
        JMP InitializeGame

        NOP 
;---------------------------------------------------------------------------------
; MaybeContinueCheckingScreen   
;---------------------------------------------------------------------------------
MaybeContinueCheckingScreen   
        INX 
        CPX #$07
        BNE CheckScreen
        JMP DisplayTitleScreen

        .BYTE $EA,$EA,$EA
;-------------------------------------------------------------------------
; CheckCurrentCharacterForShip
;-------------------------------------------------------------------------
CheckCurrentCharacterForShip
        JSR GetCharacterAtCurrentXYPos
        CMP #$07
        BEQ b8028
        RTS 

b8028   JMP JumpToDrawGridCharAtOldPosAndCheckCollisions

        .BYTE $EA,$EA,$EA,$EA,$EA
;---------------------------------------------------------------------------------
; CheckIfHasReachedBorder   
;---------------------------------------------------------------------------------
CheckIfHasReachedBorder   
        AND #$1F
        CMP #$18
        BPL b803A
j8036   STA explosionYPosArray,X
        RTS 

b803A   LDA previousYPosition
        JMP j8036

        NOP 
;-------------------------------------------------------------------------
; UpdateExplosionXPosArray
;-------------------------------------------------------------------------
UpdateExplosionXPosArray
        DEC explosionXPosArray,X
        LDA explosionXPosArray,X
        AND #$3F
        CMP #$27
        BPL b8050
        STA explosionXPosArray,X
        RTS 

b8050   LDA previousXPosition
        STA explosionXPosArray,X
        RTS 

;-------------------------------------------------------------------------
; UpdateExplosionYPosArray
;-------------------------------------------------------------------------
UpdateExplosionYPosArray
        DEC explosionYPosArray,X
        LDA explosionYPosArray,X
        JMP CheckIfHasReachedBorder

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
        JMP MaybeContinueCheckingScreen

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
vicRegisterLoPtr = $02
vicRegisterYPtr = $03
;---------------------------------------------------------------------------------
; InitializeGame   
;---------------------------------------------------------------------------------
InitializeGame   
        LDA #$D0
        STA vicRegisterYPtr
        LDA #$00
        STA vicRegisterLoPtr
        LDY #$18
        TYA 
        STA (vicRegisterLoPtr),Y
        LDY #$20
        LDA #$00
        STA (vicRegisterLoPtr),Y
        INY 
        STA (vicRegisterLoPtr),Y
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
        LDA #$00
        STA currentXPosition
        LDA #$04
        STA currentYPosition
b8138   LDA currentXPosition
        STA screenLinesLoPtrArray,X
        LDA currentYPosition
        STA screenLinesHiPtrArray,X
        LDY #$00
        LDA #$20
b8146   STA (currentXPosition),Y
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

gridXPos = $08
gridYPos = $09
;-------------------------------------------------------------------------
; DrawGrid
;-------------------------------------------------------------------------
DrawGrid
        LDA #$02
        STA gridXPos
        LDA #ORANGE
        STA colorForCurrentCharacter
        LDA #VERTICAL_LINE
        STA currentCharacter

        ; Draw the horizontal lines of the grid
DrawHorizontalLineLoop   
        LDA #$00
        STA $D412    ;Voice 3: Control Register
        LDA #$00
        STA $D412    ;Voice 3: Control Register

        LDA #$02
        STA gridYPos
b81BC   LDA gridYPos
        STA currentYPosition
        LDA gridXPos
        STA currentXPosition
        JSR WriteCurrentCharacterToCurrentXYPos
        JSR PlaySomeSound
        INC gridYPos
        LDA gridYPos
        CMP #$16
        BNE b81BC

        LDX #$01
b81D4   JSR JumpToPlayAnotherSound
        DEY 
        BNE b81DA
b81DA   DEX 
        BNE b81D4
        INC gridXPos
        LDA gridXPos
        CMP #$27
        BNE DrawHorizontalLineLoop

        ; Draw the full grid
        LDA #$02
        STA gridXPos
        LDA #GRID
        STA currentCharacter

DrawGridLoop
        LDA #$01
        STA gridYPos
b81F1   LDA gridYPos
        STA currentXPosition
        LDA gridXPos
        STA currentYPosition
        JSR WriteCurrentCharacterToCurrentXYPos
        JSR PlaySomeSound
        INC gridYPos
        LDA gridYPos
        CMP #$27
        BNE b81F1

        LDX #$01
b8209   JSR JumpToPlayAnotherSound
        DEY 
        BNE b820F
b820F   DEX 
        BNE b8209

        INC gridXPos
        LDA gridXPos
        CMP #$16
        BNE DrawGridLoop

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
; JumpToPlayAnotherSound
;-------------------------------------------------------------------------
JumpToPlayAnotherSound
        JMP PlayAnotherSound

;---------------------------------------------------------------------------------
; PlayAnotherSound   
;---------------------------------------------------------------------------------
PlayAnotherSound   
        LDA #$04
        STA materializeShipOffset
j8237   INC materializeShipOffset
        LDA materializeShipOffset
        CMP #$04
        BNE b8240
        RTS 

b8240   LDA randomValue
        STA $D401    ;Voice 1: Frequency Control - High-Byte
        LDA randomValue
        ADC #$01
        STA $D408    ;Voice 2: Frequency Control - High-Byte
        JMP j8237

;-------------------------------------------------------------------------
; MaterializeShip
;-------------------------------------------------------------------------
MaterializeShip
        LDA #$0F
        STA materializeShipOffset
        LDA #$02
        STA $D408    ;Voice 2: Frequency Control - High-Byte
        LDA #$00
        STA $D404    ;Voice 1: Control Register
        STA $D40B    ;Voice 2: Control Register
        LDA #EXPLOSION1
        STA currentCharacter
MaterializeShipLoop
        LDA #WHITE
        STA colorForCurrentCharacter
        LDA #$00
        STA $D40B    ;Voice 2: Control Register
        LDA #$81
        STA $D40B    ;Voice 2: Control Register
        LDA #$15
        STA currentYPosition
        LDA #$14
        CLC 
        SBC materializeShipOffset
        STA currentXPosition
        JSR WriteCurrentCharacterToCurrentXYPos
        LDA #$14
        CLC 
        ADC materializeShipOffset
        STA currentXPosition
        JSR WriteCurrentCharacterToCurrentXYPos
        LDA currentYPosition
        CLC 
        SBC materializeShipOffset
        STA currentYPosition
        JSR WriteCurrentCharacterToCurrentXYPos
        LDA #$14
        STA currentXPosition
        JSR WriteCurrentCharacterToCurrentXYPos
        LDA #$14
        SBC materializeShipOffset
        STA currentXPosition
        JSR WriteCurrentCharacterToCurrentXYPos
        INC currentCharacter
        LDA currentCharacter
        CMP #$19
        BNE b82AE
        LDA #EXPLOSION1
b82AE   STA currentExplosionCharacter
        LDX materializeShipOffset
b82B2   JSR MaybeWasteSomeCycles
        DEX 
        BNE b82B2
        LDA #GRID
        STA currentCharacter
        LDA #ORANGE
        STA colorForCurrentCharacter
        LDA #$14
        STA currentXPosition
        JSR WriteCurrentCharacterToCurrentXYPos
        LDA #$14
        CLC 
        SBC materializeShipOffset
        STA currentXPosition
        JSR WriteCurrentCharacterToCurrentXYPos
        LDA #$14
        CLC 
        ADC materializeShipOffset
        STA currentXPosition
        JSR WriteCurrentCharacterToCurrentXYPos
        LDA #$15
        STA currentYPosition
        JSR WriteCurrentCharacterToCurrentXYPos
        LDA #$14
        CLC 
        SBC materializeShipOffset
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
        LDA #$14
        STA previousXPosition
        LDA #$15
        STA previousYPosition
        LDA #$FF
        STA currentBulletYPosition
        LDA #$01
        STA bottomZapperXPosition
        LDA #$02
        STA leftZapperYPosition
        LDA #$04
        STA zapperFrameRate
        LDA #$0A
        STA laserAndPodInterval
        STA $D413    ;Voice 3: Attack / Decay Cycle Control
        STA laserShootInterval
        JSR ClearPodArray
        LDA #$00
        STA backgroundSoundParm1
        STA backgroundSoundParm2
        STA noOfDroidSquadsCurrentLevel
        LDA #DROID1
        STA currentDroidCharacter
        LDA #$20
        STA a28
        LDA sizeOfDroidSquadForLevel
        STA sizeOfDroidSquadForLevel
        STA sizeOfDroidSquadForLevel
        LDA droidsLeftToKill
        STA droidsLeftToKill
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
        LDA $DC11
        EOR #$FF
        STA joystickInput
        RTS 

        .BYTE $EA,$EA,$EA,$EA,$EA
;-------------------------------------------------------------------------
; MaybeWasteSomeCycles
;-------------------------------------------------------------------------
MaybeWasteSomeCycles
        LDA materializeShipOffset
        CMP #$00
        BEQ b8392

;-------------------------------------------------------------------------
; WasteSomeCycles
;-------------------------------------------------------------------------
WasteSomeCycles
        LDA #$00
;---------------------------------------------------------------------------------
; WasteAFewCycles   
;---------------------------------------------------------------------------------
WasteAFewCycles   
        STA cyclesToWasteCounter
b838A   DEC cyclesToWasteCounter
        BNE b838A
b838E   DEC cyclesToWasteCounter
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
        JSR DrawBullet
        JSR UpdateZappersPosition
        JSR DrawLaser
        JSR UpdatePods
        JSR DrawUpdatedPods
        JSR PlayBackgroundSounds
        JSR DrawDroids
        JSR ResetAnimationFrameRate
        JSR CheckLevelComplete
        JMP ReenterMainGameLoop

;---------------------------------------------------------------------------------
; InitializeData   
;---------------------------------------------------------------------------------
InitializeData   
        SEI 
        CLD 
        LDA #$05
        STA $D016    ;VIC Control Register 2
        JSR ROM_IOINITj ;$FDA3 (jmp) - initialize CIA & IRQ             
        JSR ROM_RAMTASj ;$FD50 (jmp) - RAM test & search RAM end        
        JSR ROM_RESTORj ;$FD15 (jmp) - restore default I/O vectors      
        JSR $E518
        CLI 

        LDA #$08
        JSR ROM_CHROUT ;$FFD2 - output character                 
        NOP 
        NOP 
        NOP 
        NOP 
        NOP 
        JMP LoadCharacterSetData

        ; Not reached
        PLA 
        TAY 
        PLA 
        TAX 
        PLA 
        RTI 

;---------------------------------------------------------------------------------
; ReenterMainGameLoop   
;---------------------------------------------------------------------------------
ReenterMainGameLoop   
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
        LDA currentExplosionCharacter
        STA currentCharacter
        DEC materializeShipOffset
        LDA materializeShipOffset
        CMP #$FF
        BEQ b841A
        LDA #$0F
        CLC 
        SBC materializeShipOffset
        STA $D418    ;Select Filter Mode and Volume
        JMP MaterializeShipLoop

b841A   LDA #SHIP
        STA currentCharacter
        LDA #LTGREEN
        STA colorForCurrentCharacter
        LDA #$15
        STA currentYPosition
        LDA #$14
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
        STA materializeShipOffset
b8454   LDA materializeShipOffset
        STA $D408    ;Voice 2: Frequency Control - High-Byte
        LDA #$00
        STA $D40B    ;Voice 2: Control Register
        LDA #$11
        STA $D40B    ;Voice 2: Control Register
        LDX #$02
b8465   JSR MaybeWasteSomeCycles
        DEX 
        BNE b8465
        DEC materializeShipOffset
        BNE b8454
        RTS 

;-------------------------------------------------------------------------
; UpdateShipPosition
;-------------------------------------------------------------------------
UpdateShipPosition
        DEC shipAnimationFrameRate
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
        JSR CheckOverlapWithBulletOrGrid
b848A   LDA #GRID
        STA currentCharacter
        LDA #ORANGE
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
        LDA #LTGREEN
        STA colorForCurrentCharacter
        LDA #SHIP
        STA currentCharacter
        JMP WriteCurrentCharacterToCurrentXYPos

;-------------------------------------------------------------------------
; DrawBullet
;-------------------------------------------------------------------------
DrawBullet
        DEC bulletAndLaserFrameRate
        BEQ b84FD
b84FC   RTS 

b84FD   LDA #$18
        STA bulletAndLaserFrameRate
        JSR MaybePlayBulletSound
        LDA currentBulletYPosition
        CMP #$FF
        BNE b8522
        LDA joystickInput
        AND #$10
        BEQ b84FC
        LDA previousXPosition
        STA currentBulletXPosition
        LDA previousYPosition
        STA currentBulletYPosition
        DEC currentBulletYPosition
        LDA #BULLET_UP1
        STA currentBulletCharacter
        LDA #$40
        STA bulletSoundControl
b8522   LDA currentBulletXPosition
        STA currentXPosition
        LDA currentBulletYPosition
        STA currentYPosition
        JSR GetCharacterAtCurrentXYPos
        CMP currentBulletCharacter
        BEQ b8538
        CMP #$00
        BEQ b8538
        JSR BulletCollidedWithPod
b8538   LDA #ORANGE
        STA colorForCurrentCharacter
        LDA #GRID
        STA currentCharacter
        JSR WriteCurrentCharacterToCurrentXYPos
        INC currentBulletCharacter
        LDA currentBulletCharacter
        CMP #$0A
        BNE b855C
        DEC currentBulletYPosition
        LDA currentBulletYPosition
        CMP #$02
        BNE b8558
        LDA #$FF
        STA currentBulletYPosition
        RTS 

b8558   LDA #BULLET_UP1
        STA currentBulletCharacter
b855C   LDA currentBulletYPosition
        STA currentYPosition
        JSR GetCharacterAtCurrentXYPos
        BEQ b8568
        JSR BulletCollidedWithPod
b8568   LDA currentBulletCharacter
        STA currentCharacter
        LDA #WHITE
        STA colorForCurrentCharacter
        JMP WriteCurrentCharacterToCurrentXYPos

;-------------------------------------------------------------------------
; MaybePlayBulletSound
;-------------------------------------------------------------------------
MaybePlayBulletSound
        LDA bulletSoundControl
        BNE b8578
        RTS 

b8578   DEC bulletSoundControl
        LDA bulletSoundControl
        ADC #$00
        STA $D401    ;Voice 1: Frequency Control - High-Byte
        LDA #$00
        STA $D404    ;Voice 1: Control Register
        LDA #$81
        STA $D404    ;Voice 1: Control Register
        LDA bulletSoundControl
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
        LDA shipAnimationFrameRate
        CMP #$01
        BEQ b85A2
b85A1   RTS 

b85A2   DEC zapperFrameRate
        BNE b85A1
        LDA #$02
        STA zapperFrameRate
        LDA #$00
        STA currentXPosition
        LDA leftZapperYPosition
        STA currentYPosition
        LDA #SPACE
        STA currentCharacter
        JSR WriteCurrentCharacterToCurrentXYPos
        INC leftZapperYPosition
        LDA leftZapperYPosition
        CMP #$16
        BNE b85C5

        LDA #$03
        STA leftZapperYPosition
b85C5   LDA leftZapperYPosition
        STA currentYPosition
        LDA #WHITE
        STA colorForCurrentCharacter
        LDA #LEFT_ZAPPER
        STA currentCharacter
        JSR WriteCurrentCharacterToCurrentXYPos

        LDA #$16
        STA currentYPosition
        LDA bottomZapperXPosition
        STA currentXPosition
        LDA #$20
        JSR WriteAccumulatorToXYPos
        INC bottomZapperXPosition
        LDA bottomZapperXPosition
        CMP #$27
        BNE b85ED

        LDA #$01
        STA bottomZapperXPosition
b85ED   LDA bottomZapperXPosition
        STA currentXPosition
        LDA #BOTTOM_ZAPPER
        STA currentCharacter
        JMP DrawBottomZapperAndResetIfNecessary

;-------------------------------------------------------------------------
; WriteAccumulatorToXYPos
;-------------------------------------------------------------------------
WriteAccumulatorToXYPos
        STA currentCharacter
        JMP WriteCurrentCharacterToCurrentXYPos
        ;Returns

;---------------------------------------------------------------------------------
; DrawBottomZapperAndResetIfNecessary   
;---------------------------------------------------------------------------------
DrawBottomZapperAndResetIfNecessary   
        JSR WriteCurrentCharacterToCurrentXYPos
        DEC laserAndPodInterval
        BEQ b8605
        RTS 

b8605   LDA laserFrameRate
        STA laserAndPodInterval
        JSR PlayZapperSound
        LDA #$00
        STA $D412    ;Voice 3: Control Register
        LDA #$21
        STA $D412    ;Voice 3: Control Register
        LDA #$FF
        STA laserShootInterval
        LDA #$05
        STA laserCurrentCharacter
        LDA leftZapperYPosition
        STA leftLaserYPosition
        LDA #$01
        STA leftLaserXPosition
        LDA #$15
        STA bottomLaserYPosition
        LDA bottomZapperXPosition
        STA bottomLaserXPosition
        RTS 

;-------------------------------------------------------------------------
; PlayZapperSound
;-------------------------------------------------------------------------
PlayZapperSound
        LDA #$03
        STA $D40F    ;Voice 3: Frequency Control - High-Byte
        RTS 

;-------------------------------------------------------------------------
; DrawLaser
;-------------------------------------------------------------------------
DrawLaser
        LDA bulletAndLaserFrameRate
        CMP #$05
        BEQ b863C
b863B   RTS 

b863C   LDA laserShootInterval
        CMP #$FF
        BNE b863B
        JSR UpdateLaserCharacter
        NOP 
        CMP #$07
        BNE b864E
        LDA #$05
        STA laserCurrentCharacter
b864E   LDA #WHITE
        STA colorForCurrentCharacter
        LDA laserCurrentCharacter
        STA currentCharacter
        LDA #$15
        STA bottomLaserYPosition
b865A   LDA bottomLaserYPosition
        STA currentYPosition
        LDA bottomLaserXPosition
        STA currentXPosition
        JSR WriteCurrentCharacterToCurrentXYPos
        DEC bottomLaserYPosition
        LDA bottomLaserYPosition
        CMP #$02
        BNE b865A
        LDA leftLaserYPosition
        STA currentYPosition
        LDA leftLaserXPosition
        STA currentXPosition
        JSR GetCharacterAtCurrentXYPos
        CMP laserCurrentCharacter
        BEQ b86A2
        LDA #GRID
        STA currentCharacter
        LDA #ORANGE
        STA colorForCurrentCharacter
        JSR WriteCurrentCharacterToCurrentXYPos
        INC leftLaserXPosition
        LDA leftLaserXPosition
        STA currentXPosition
        JSR CheckCurrentCharacterForShip
        CMP laserCurrentCharacter
        BEQ b86A2
        LDA #WHITE
        STA colorForCurrentCharacter
        LDA laserCurrentCharacter
        CLC 
        SBC #$01
        STA currentCharacter
        JMP WriteCurrentCharacterToCurrentXYPos

b86A2   LDA #$15
        STA currentYPosition
        LDA bottomLaserXPosition
        STA currentXPosition
        LDA #ORANGE
        STA colorForCurrentCharacter
        LDA #GRID
        STA currentCharacter
b86B2   JSR WriteCurrentCharacterToCurrentXYPos
        DEC currentYPosition
        LDA currentYPosition
        CMP #$02
        BNE b86B2
        LDA leftLaserYPosition
        STA currentYPosition
        LDA #YELLOW
        STA colorForCurrentCharacter
        LDA #POD3
        STA currentCharacter
        LDA #$00
        STA laserShootInterval
        JMP WriteCurrentCharacterToCurrentXYPos

;-------------------------------------------------------------------------
; UpdateLaserCharacter
;-------------------------------------------------------------------------
UpdateLaserCharacter
        DEC bulletAndLaserFrameRate
        INC laserCurrentCharacter
        LDA laserCurrentCharacter
        RTS 

podScreenLoPtr = $1F
podScreenHiPtr = $20
;-------------------------------------------------------------------------
; UpdatePods
;-------------------------------------------------------------------------
UpdatePods
        LDA laserAndPodInterval
        CMP #$05
        BEQ b86DE
        RTS 

b86DE   DEC laserAndPodInterval
        LDA #>SCREEN_RAM + $0050
        STA podScreenHiPtr
        LDA #<SCREEN_RAM + $0050
        STA podScreenLoPtr
        LDY #$00
b86EA   LDA (podScreenLoPtr),Y
        BNE b86FB
b86EE   INC podScreenLoPtr
        BNE b86EA
        INC podScreenHiPtr
        LDA podScreenHiPtr
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
        STA (podScreenLoPtr),Y
        JMP b86EE

b8719   JSR DrawBomb
        JMP b86EE

; This is the sequence in which the yellow pods decay before exploding.
; Each byte is a char representing a stage of decay, working from left to right.
PodDecaySequence
        .BYTE $EA,$18,$0D,$0E,$0F,$10,$11
        .BYTE $12,$13
;-------------------------------------------------------------------------
; DrawBomb
;-------------------------------------------------------------------------
DrawBomb
        LDA #BOMB_DOWN
        STA (podScreenLoPtr),Y
        LDX #$18
b872E   LDA podHiPtrArray,X
        CMP #$FF
        BEQ b873D
        DEX 
b8737   =*+$01
        BNE b872E
        LDA #POD6
        STA (podScreenLoPtr),Y
        RTS 

b873D   LDA podScreenLoPtr
        STA podLoPtrArray,X
        LDA podScreenHiPtr
        STA podHiPtrArray,X
        RTS 

;-------------------------------------------------------------------------
; ClearPodArray
;-------------------------------------------------------------------------
ClearPodArray
        LDX #$20
        LDA #$FF
b874C   STA podHiPtrArray,X
        DEX 
        BNE b874C
        RTS 

;-------------------------------------------------------------------------
; DrawUpdatedPods
;-------------------------------------------------------------------------
DrawUpdatedPods
        DEC podUpdateRate
        BEQ b8758
        RTS 

b8758   LDA #$40
        STA podUpdateRate
        LDX #$18
b875E   LDA podHiPtrArray,X
        CMP #$FF
        BEQ b8768
        JSR DrawPods
b8768   DEX 
        BNE b875E
        RTS 

podLoPtr = currentXPosition
podHiPtr = currentYPosition
;-------------------------------------------------------------------------
; DrawPods
;-------------------------------------------------------------------------
DrawPods
        LDA podLoPtrArray,X
        STA podLoPtr
        LDA podHiPtrArray,X
        STA podHiPtr
        LDY #$00
        LDA (podLoPtr),Y
        CMP #SHIP
        BNE b8781
        JMP JumpToDrawGridCharAtOldPosAndCheckCollisions

b8781   LDA #$00
        STA (podLoPtr),Y
        LDA podHiPtr
        CLC 
        ADC #$D4
        STA podHiPtr
        LDA #$08
        STA (podLoPtr),Y
        LDA podLoPtrArray,X
        CLC 
        ADC #$28
        STA podLoPtrArray,X
        LDA podHiPtrArray,X
        ADC #$00
        STA podHiPtrArray,X
        STA podHiPtr
        LDA podLoPtrArray,X
        STA podLoPtr
        LDA (podLoPtr),Y
        CMP #$20
        BNE b87B4
        LDA #$FF
        STA podHiPtrArray,X
        RTS 

b87B4   CMP #SHIP
        BNE b87BB
        JMP JumpToDrawGridCharAtOldPosAndCheckCollisions

b87BB   LDA #$0A
        STA (podLoPtr),Y
        LDA podHiPtr
        CLC 
        ADC #$D4
        STA podHiPtr
        LDA #$01
        STA (podLoPtr),Y
        RTS 

;-------------------------------------------------------------------------
; BulletCollidedWithPod
;-------------------------------------------------------------------------
BulletCollidedWithPod
        LDX #$07
b87CD   CMP PodDecaySequence,X
        BEQ b87D9
        DEX 
        BNE b87CD
        JMP CheckIfBulletCollidedWithDroid

        RTS 

b87D9   DEX 
        BEQ b87EC
        LDA PodDecaySequence,X
        STA currentCharacter
        LDA #YELLOW
        STA colorForCurrentCharacter
        LDA #$FF
        STA currentBulletYPosition
        JMP j8801

b87EC   LDA #GRID
        STA currentCharacter
        LDA #ORANGE
        STA colorForCurrentCharacter
        LDA #$FF
        STA currentBulletYPosition
        JSR WriteCurrentCharacterToCurrentXYPos
        JSR IncreaseScoreBy10Points
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
; IncreaseScoreBy10Points
;-------------------------------------------------------------------------
IncreaseScoreBy10Points
        LDX #$06
        LDY #$0A
        JSR IncrementPlayerScore
        LDA #$F0
        STA backgroundSoundParm1
        LDA #$03
        STA backgroundSoundParm2
b8899   RTS 

;-------------------------------------------------------------------------
; PlayBackgroundSounds
;-------------------------------------------------------------------------
PlayBackgroundSounds
        LDA shipAnimationFrameRate
        AND #$01
        BEQ b8899
        LDA backgroundSoundParm1
        AND #$C0
        BEQ b88B8
        DEC backgroundSoundParm1
        LDA backgroundSoundParm1
        STA $D40F    ;Voice 3: Frequency Control - High-Byte
        LDA #$00
        STA $D412    ;Voice 3: Control Register
        LDA #$21
        STA $D412    ;Voice 3: Control Register
        RTS 

b88B8   LDA backgroundSoundParm2
        BEQ b88C3
        DEC backgroundSoundParm2
        LDA #$F0
        STA backgroundSoundParm1
        RTS 

b88C3   LDA #$04
        STA $D40F    ;Voice 3: Frequency Control - High-Byte
        RTS 

;-------------------------------------------------------------------------
; DrawDroids
;-------------------------------------------------------------------------
DrawDroids
        DEC droidFrameRate
        BEQ b88CE
b88CD   RTS 

b88CE   LDA #$80
        STA droidFrameRate
        JSR UpdateDroidsRemaining
        LDA noOfDroidSquadsCurrentLevel
        BEQ b88CD
        TAX 
        INC currentDroidCharacter
        LDA currentDroidCharacter
        CMP #$16
        BNE DrawDroidsLoop

        LDA #DROID1
        STA currentDroidCharacter
DrawDroidsLoop
        STX currentDroidIndex

        ; Draw grid over the old position of the droid
        LDA droidXPositionArray,X
        STA currentXPosition
        LDA droidYPositionArray,X
        STA currentYPosition
        LDA #GRID
        STA currentCharacter
        LDA #ORANGE
        STA colorForCurrentCharacter
        JSR DrawDroidSegment

        LDX currentDroidIndex
        LDA droidStatusArray,X
        AND #$40
        BNE b892A

        ; Draw the droid segment at its new position.
        LDA droidXPositionArray - $01,X
        STA droidXPositionArray,X
        LDA droidYPositionArray - $01,X
        STA droidYPositionArray,X
        STA currentYPosition
        LDA droidXPositionArray,X
        STA currentXPosition
        LDA #CYAN
        STA colorForCurrentCharacter
        LDA #DROID1
        STA currentCharacter
        JSR WriteCurrentCharacterToCurrentXYPos

ResumeDrawingDroids
        LDX currentDroidIndex
        DEX 
        BNE DrawDroidsLoop
        RTS 

b892A   LDA droidStatusArray,X
        AND #$02
        BNE b8935
        INC currentXPosition
        INC currentXPosition
b8935   DEC currentXPosition
        JSR GetCharacterAtCurrentXYPos
        BEQ b8990
        LDX currentDroidIndex
        JSR CheckForShipCollision
        STA currentXPosition
        INC currentYPosition
        LDA currentYPosition
        CMP #$16
        BNE b8962
        LDA droidStatusArray,X
        ORA #$01
        AND #$FD
        STA droidStatusArray,X
        LDA #$0E
        STA @wa0003
        LDA #$02
        STA @wa0002
        JMP j896A

b8962   LDA droidStatusArray,X
        EOR #$03
        STA droidStatusArray,X

        ; Draw the droid segment
j896A   LDA currentXPosition
        STA droidXPositionArray,X
        LDA currentYPosition
        STA droidYPositionArray,X
        LDA #CYAN
        STA colorForCurrentCharacter
        LDA currentDroidCharacter
        STA currentCharacter
        JSR WriteCurrentCharacterToCurrentXYPos
        LDX currentDroidIndex
        JMP ResumeDrawingDroids

        LDX #$01
        INC currentDroidCharacter
        RTS 

        LDX currentDroidIndex
        INX 
        CPX noOfDroidSquadsCurrentLevel
        RTS 

        NOP 
b8990   LDX currentDroidIndex
        JMP j896A

;-------------------------------------------------------------------------
; DrawDroidSegment
;-------------------------------------------------------------------------
DrawDroidSegment
        LDA droidStatusArray,X
        AND #$80
        BEQ b899F
        JMP WriteCurrentCharacterToCurrentXYPos

b899F   RTS 

;-------------------------------------------------------------------------
; ResetAnimationFrameRate
;-------------------------------------------------------------------------
ResetAnimationFrameRate
        LDA shipAnimationFrameRate
        CMP #$FF
        BNE b899F
        LDA #$80
        STA shipAnimationFrameRate
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
        JMP CheckOverlapWithBulletOrGrid

b89B8   LDA previousXPosition
        STA currentXPosition
        LDA previousYPosition
        STA currentYPosition
        RTS 

;-------------------------------------------------------------------------
; UpdateDroidsRemaining
;-------------------------------------------------------------------------
UpdateDroidsRemaining
        LDA a29
        BNE b89E6
        DEC a28
        BEQ b8A0C
        RTS 

b89CA   LDA #$20
        STA a28
        LDA sizeOfDroidSquadForLevel
        STA a29
        INC noOfDroidSquadsCurrentLevel
        LDX noOfDroidSquadsCurrentLevel
        LDA #$0A
        STA droidXPositionArray,X
        LDA #$02
        STA droidYPositionArray,X
        LDA #$41
        STA droidStatusArray,X
        RTS 

b89E6   INC noOfDroidSquadsCurrentLevel
        LDX noOfDroidSquadsCurrentLevel
        LDA #$00
        STA droidStatusArray,X
        LDA #$02
        STA droidYPositionArray,X
        LDA #$0A
        STA droidXPositionArray,X
        DEC a29
        LDA a29
        CMP #$01
        BEQ b8A02
        RTS 

b8A02   DEC a29
        DEC droidsLeftToKill
        LDA #$80
        STA droidStatusArray,X
        RTS 

b8A0C   LDA droidsLeftToKill
        BNE b89CA
        RTS 

;---------------------------------------------------------------------------------
; CheckIfBulletCollidedWithDroid   
;---------------------------------------------------------------------------------
CheckIfBulletCollidedWithDroid   
        CMP #$13
        BEQ BulletColidedWithDroneDroid
        CMP #$14
        BEQ BulletCollidedWithLeadDroid
        CMP #$15
        BEQ BulletCollidedWithLeadDroid
        NOP 
        NOP 
        NOP 
        RTS 

BulletCollidedWithLeadDroid
        ; Increment score by 300 points
        LDX #$04
        LDY #$03
        JSR IncrementPlayerScore
        ;Returns

        
BulletColidedWithDroneDroid   
        ; Increment Score by 100 points
        LDX #$04
        LDY #$01
        JSR RegisterHit

        ; Figure out which drone droid the bullet hit.
        LDA #$FF
        STA currentBulletYPosition
        PLA 
        PLA 
        LDX noOfDroidSquadsCurrentLevel
b8A37   LDA droidXPositionArray,X
        CMP currentXPosition
        BEQ b8A42
b8A3E   DEX 
        BNE b8A37
        RTS 

b8A42   LDA droidYPositionArray,X
        CMP currentYPosition
        BNE b8A3E
        LDA droidStatusArray,X
        AND #$C0
        BNE b8A7A
        JSR UpdateDroidStatus

        ; Update droid arrays now that one has been killed
j8A53   LDA droidYPositionArray + $01,X
        STA droidYPositionArray,X
        LDA droidXPositionArray + $01,X
        STA droidXPositionArray,X
        LDA droidStatusArray + $01,X
        STA droidStatusArray,X
        CPX noOfDroidSquadsCurrentLevel
        BEQ b8A6D
        INX 
        JMP j8A53

b8A6D   LDA #YELLOW
        STA colorForCurrentCharacter
        LDA #POD3
        STA currentCharacter
        DEC noOfDroidSquadsCurrentLevel
        JMP WriteCurrentCharacterToCurrentXYPos

b8A7A   CMP #$C0
        BEQ j8A53
        CMP #$40
        BEQ b8A8D
        LDA droidStatusArray - $01,X
        ORA #$80
        STA droidStatusArray - $01,X
        JMP j8A53

b8A8D   LDA droidStatusArray + $01,X
        ORA droidStatusArray,X
        STA droidStatusArray + $01,X
        JMP j8A53

;-------------------------------------------------------------------------
; RegisterHit
;-------------------------------------------------------------------------
RegisterHit
        LDA #$F0
        STA backgroundSoundParm1
        LDA #$03
        STA backgroundSoundParm2
        JMP IncrementPlayerScore

;-------------------------------------------------------------------------
; UpdateDroidStatus
;-------------------------------------------------------------------------
UpdateDroidStatus
        STX currentDroidIndex
b8AA6   DEX 
        LDA droidStatusArray,X
        AND #$40
        BEQ b8AA6
        LDA droidStatusArray,X
        NOP 
        NOP 
        LDX currentDroidIndex
        JSR s8AC1
        LDA droidStatusArray - $01,X
        ORA #$80
        STA droidStatusArray - $01,X
        RTS 

;-------------------------------------------------------------------------
; s8AC1
;-------------------------------------------------------------------------
s8AC1
        ORA droidStatusArray + $01,X
        STA droidStatusArray + $01,X
        RTS 

;-------------------------------------------------------------------------
; CheckLevelComplete
;-------------------------------------------------------------------------
CheckLevelComplete
        LDA droidsLeftToKill
        BEQ b8ACD
b8ACC   RTS 

b8ACD   LDA noOfDroidSquadsCurrentLevel
        BNE b8ACC
        JMP DisplayNewLevelInterstitial
        ;Returns

;-------------------------------------------------------------------------
; Is this reached?
;-------------------------------------------------------------------------
        JSR GetCharacterAtCurrentXYPos
        CMP #SHIP
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
        LDA droidXPositionArray,X
b8AF0   RTS 

        CMP #$20
        BEQ b8AF0
        JMP JumpToDrawGridCharAtOldPosAndCheckCollisions

;---------------------------------------------------------------------------------
; CheckForCollisions   
;---------------------------------------------------------------------------------
CheckForCollisions   
        LDA #$0F
        STA collisionSoundControl
        LDA previousXPosition
        LDX #$08
b8B00   STA explosionXPosArray,X
        DEX 
        BNE b8B00
        LDA previousYPosition
        LDX #$08
b8B0A   STA explosionYPosArray,X
        DEX 
        BNE b8B0A
        LDA #$00
        STA $D404    ;Voice 1: Control Register
        STA $D40B    ;Voice 2: Control Register
        STA $D412    ;Voice 3: Control Register
        LDA #$03
        STA $D401    ;Voice 1: Frequency Control - High-Byte
        LDA #EXPLOSION1
        STA currentShipExplosionCharacter
        ; Falls through

;---------------------------------------------------------------------------------
; PlayExplosion   
;---------------------------------------------------------------------------------
PlayExplosion   
        LDA #$00
        STA $D404    ;Voice 1: Control Register
        LDA #$81
        STA $D404    ;Voice 1: Control Register
        LDA collisionSoundControl
        STA $D418    ;Select Filter Mode and Volume
        LDX #$08
        LDA #ORANGE
        STA colorForCurrentCharacter
        LDA #GRID
        STA currentCharacter

b8B3D   LDA explosionXPosArray,X
        STA currentXPosition
        LDA explosionYPosArray,X
        STA currentYPosition
        STX currentDroidIndex
        JSR GetCharacterAtCurrentXYPos
        CMP currentShipExplosionCharacter
        BNE b8B53
        JSR WriteCurrentCharacterToCurrentXYPos
b8B53   LDX currentDroidIndex
        DEX 
        BNE b8B3D

        LDA #$14
b8B5A   JMP AnimateShipExplosion
        DEX 
        BNE b8B5A

;---------------------------------------------------------------------------------
; AnimateShipExplosion   
;---------------------------------------------------------------------------------
AnimateShipExplosion   
        INC currentShipExplosionCharacter
        LDA currentShipExplosionCharacter
        CMP #$19
        BNE b8B6C

        LDA #EXPLOSION1
        STA currentShipExplosionCharacter

b8B6C   LDX #$08
b8B6E   LDA explosionYPosArrayControl,X
        CMP #$80
        BEQ b8B7F
        CMP #$00
        BEQ b8B7C
        INC explosionXPosArray,X
b8B7C   INC explosionXPosArray,X
b8B7F   JSR UpdateExplosionXPosArray
        LDA explosionXPosArrayControl,X
        BEQ b8B8E

        CMP #$80
        BEQ b8B91

        INC explosionYPosArray,X
b8B8E   INC explosionYPosArray,X
b8B91   JSR UpdateExplosionYPosArray
        LDA explosionXPosArray,X
        STA currentXPosition
        LDA explosionYPosArray,X
        STA currentYPosition
        LDA #WHITE
        STA colorForCurrentCharacter
        LDA currentShipExplosionCharacter
        STA currentCharacter
        JSR GetCharAtCurrentPosition
        BNE b8BAE
        JSR WriteCurrentCharacterToCurrentXYPos
b8BAE   JMP MaybeRestartLevel

;---------------------------------------------------------------------------------
; PlayExplosionAndRestartLevel   
;---------------------------------------------------------------------------------
PlayExplosionAndRestartLevel   
        DEC collisionSoundControl
        BMI b8BB8
        JMP PlayExplosion

b8BB8   JMP ClearScreenAndRestartLevel

;-------------------------------------------------------------------------
; GetCharAtCurrentPosition
;-------------------------------------------------------------------------
GetCharAtCurrentPosition
        STX currentDroidIndex
        JMP GetCharacterAtCurrentXYPos

        .BYTE $EA
explosionYPosArrayControl  =*-$01 
        .BYTE $00,$01,$01,$01,$00,$80,$80,$80
explosionXPosArrayControl  =*-$01 
         .BYTE $80,$80,$00,$01,$01,$01,$00,$80
        NOP 
;---------------------------------------------------------------------------------
; MaybeRestartLevel   
;---------------------------------------------------------------------------------
MaybeRestartLevel   
        LDX currentDroidIndex
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
        JMP PlayExplosionAndRestartLevel

;-------------------------------------------------------------------------
; CheckOverlapWithBulletOrGrid
;-------------------------------------------------------------------------
CheckOverlapWithBulletOrGrid
        CMP #$08
        BEQ b8BFB
        CMP #$09
        BEQ b8BFB
        CMP #$00
        BEQ b8BFB
        JMP JumpToDrawGridCharAtOldPosAndCheckCollisions

b8BFB   RTS 

clearScreenLineLoPtr = screenLineHiPtr
clearScreenLineHiPtr = $08
;-------------------------------------------------------------------------
; ClearScreen
;-------------------------------------------------------------------------
ClearScreen
        LDA #<SCREEN_RAM + $0050
        STA clearScreenLineLoPtr
        LDA #>SCREEN_RAM + $0050
        STA clearScreenLineHiPtr
        LDY #$00
b8C06   LDA #SPACE
b8C08   STA (clearScreenLineLoPtr),Y
        INC clearScreenLineLoPtr
        BNE b8C08
        INC clearScreenLineHiPtr
        LDA clearScreenLineHiPtr
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
        JMP PrepareNextLevel

txtBattleStations   =*-$01
        .BYTE $20,$29,$28,$3A,$3A,$3E,$27,$20
        .BYTE $20,$2F,$3A,$28,$3A,$24,$30,$26
        .BYTE $2F,$20
txtEnterGridArea =*-$01
        .BYTE $27,$26,$3A,$27,$22,$20,$21
        .BYTE $22,$24,$25,$20,$28,$22,$27,$28
        .BYTE $20,$30,$30
;---------------------------------------------------------------------------------
; PrepareNextLevel   
;---------------------------------------------------------------------------------
PrepareNextLevel   
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
        LDA noOfDroidSquadsForLevel,X
        STA droidsLeftToKill
        LDA sizeOfDroidSquadsForLevels,X
        STA sizeOfDroidSquadForLevel
        LDA laserFrameRateForLevel,X
        STA laserFrameRate

IncrementLevel
        INC SCREEN_RAM + $015F
        LDA SCREEN_RAM + $015F
        CMP #$3A
        BNE b8CAF
        LDA #$30
        STA SCREEN_RAM + $015F
        INC SCREEN_RAM + $015E
b8CAF   DEX 
        BNE IncrementLevel
        JMP SetVolumeAndPlaySounds

noOfDroidSquadsForLevel   =*-$01
        .BYTE $01,$02,$02,$03,$03,$03,$04,$04
        .BYTE $04,$04,$05,$05,$10,$06,$06,$06
        .BYTE $06,$06,$06,$06,$06,$06,$06,$06
        .BYTE $06,$06,$07,$07,$07,$07,$07,$07
sizeOfDroidSquadsForLevels    =*-$01
        .BYTE $06,$06,$06,$07,$07,$08,$08
        .BYTE $09,$0C,$0C,$0A,$0A,$03,$0F,$10
        .BYTE $10,$11,$12,$13,$14,$14,$14,$15
        .BYTE $15,$16,$16,$16,$17,$03,$18,$18,$19
laserFrameRateForLevel    =*-$01
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
        STA soundEffectControl
b8D1A   LDA soundEffectControl
        STA COLOR_RAM + $015F
        STA COLOR_RAM + $015E
        LDX soundEffectControl
b8D24   JSR Waste20Cycles
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
        DEC soundEffectControl
        BNE b8D1A
        JMP DrawNewLevelScreen

;-------------------------------------------------------------------------
; Waste20Cycles
;-------------------------------------------------------------------------
Waste20Cycles
        LDA #$20
        JMP WasteAFewCycles

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
        STX currentDroidIndex
        LDA #$40
        SBC currentDroidIndex
        STA $D401    ;Voice 1: Frequency Control - High-Byte
        RTS 

;---------------------------------------------------------------------------------
; SetVolumeAndPlaySounds   
;---------------------------------------------------------------------------------
SetVolumeAndPlaySounds   
        LDA #$0F
        STA $D418    ;Select Filter Mode and Volume
        JMP PlayNewLevelSounds

;---------------------------------------------------------------------------------
; DrawGridCharAtOldPosAndCheckCollisions 
;---------------------------------------------------------------------------------
DrawGridCharAtOldPosAndCheckCollisions 
        LDA #GRID
        STA currentCharacter
        LDA #ORANGE
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

        ; Loop around waiting for user input.
JoystickInputLoop
        LDA $DC11 ; Joystick Port 2 input
        CMP #$EF
        BNE b8DBA
        ; User Pressed Fire
        JMP FirePressed

b8DBA   CMP #$FE
        BNE JoystickInputLoop
        ; User pressed up to increment the selected level.
        INC selectedLevel
j8DC0   JSR IncrementSelectedLevel
        JMP JoystickInputLoop

FirePressed   
        DEC selectedLevel
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


