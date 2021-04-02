; This is the reverse-engineered source code for the game 'Gridrunner' written by
; Jeff Minter in 1982.
;
; The code in this file was created by disassembling a binary of the game
; released into the public domain by Jeff Minter in 2019.
;
; The original code from which this source is derived is the copyright of Jeff
; Minter.
;
; The original home of this file is at: https://github.com/mwenge/gridrunner
;
; To the extent to which any copyright may apply to the act of disassembling and
; reconstructing the code from its binary, the author disclaims copyright to
; this source code.  In place of a legal notice, here is a blessing:
;
;    May you do good and not evil.
;    May you find forgiveness for yourself and forgive others.
;    May you share freely, never taking more than you give.
;
screenRamLoPtr                  = $00
screenRamHiPtr                  = $01
joystickInput                   = $02
currentYPos                     = $03
currentXPos                     = $04
currentCharacter                = $05
currentColor                    = $06
oldYPos                         = $07
oldXPos                         = $08
frameRateCounter                = $09
bulletActive                    = $0B
bulletScreenRamLoPtr            = $0C
bulletScreenRamHiPtr            = $0D
podUpdateInterval               = $0E
zapperMovementInterval          = $10
yZapperYPos                     = $11
xZapperXPos                     = $12
currentYLaserYPos               = $13
oldXZapperXPos                  = $14
podDecayInterval                = $15
currentXLaserCharacter          = $16
currentLaserYPos                = $17
currentYLaserXPos               = $18
explosionSoundInterval          = $1B
droidsLeftCurrentLevel          = $21
noOfDroidSquadsCurrentLevel     = $22
sizeOfDroidSquadForCurrentLevel = $23
droidAnimationInterval          = $24
currentDroidCharacter           = $25
nextDroidPositionOffset         = $26
droidsLeftToKill                = $28
unusedVariable                  = $29
bombsLeft                       = $2C
currentNoOfDroids               = $2D
bombScreenHiPtr                 = $2E
aA2                             = $A2
livesLeft                       = $F0
currentLevel                    = $F1
unusedVariable2                 = $FF
OFFSET_TO_COLOR_RAM = $78

bombScreenPtrArrayLo         = $0030
bombScreenPtrArrayHi         = $0031
SCREEN_RAM                   = $1E00
COLOR_RAM                    = $9600
VIC_SWITCH_CASE              = $0291

VICCR5                          = $9005
VICCRA                          = $900A
VICCRB                          = $900B
VICCRC                          = $900C
VICCRD                          = $900D
VICCRE                          = $900E
VICCRF                          = $900F
VIA1IER                         = $911E
VIA1PA2                         = $911F
VIA2PB                          = $9120
VIA2DDRB                        = $9122
ROM_ISCNTC                      = $FFE1

BLACK                           = $00
WHITE                           = $01
RED                             = $02
CYAN                            = $03
PURPLE                          = $04
GREEN                           = $05
BLUE                            = $06
YELLOW                          = $07

GRID                            = $00
LEFT_ZAPPER                     = $01
BOTTOM_ZAPPER                   = $02
HORIZ_LASER1                    = $03
HORIZ_LASER2                    = $04
VERTICAL_LASER1                 = $05
VERTICAL_LASER2                 = $06
SHIP                            = $07
BULLET_UP1                      = $08
BULLET_UP2                      = $09
BOMB_DOWN                       = $0A
BOMB_RIGHT                      = $0B
BOMB_LEFT                       = $0C
POD1                            = $0D
POD2                            = $0E
POD3                            = $0F
POD4                            = $10
POD5                            = $11
POD6                            = $12
DROID1                          = $13
DROID2                          = $14
DROID3                          = $15
EXPLOSION1                      = $16
EXPLOSION2                      = $17
EXPLOSION3                      = $18
SCORE_LEFT                      = $19
SCORE_RIGHT                     = $1A
MEN_LEFT                        = $1B
MEN_RIGHT                       = $1C
HI_SCORE1                       = $1D
HI_SCORE2                       = $1E
RIGHT_ARROW                     = $1F
SPACE                           = $20

nextDroidScreenLineLoPtr     = $0FFD
nextDroidScreenLineHiPtr     = $0FFE
nextDroidDirectionBitmap     = $0FFF
droidScreenLineLoPtr         = $1000
droidScreenLineHiPtr         = $1001
droidDirectionBitMap         = $1002
previousDroidScreenLineLoPtr = $1003
previousDroidScreenLineHiPtr = $1004
previousDroidDirectionBitmap = $1005

* = $1001
;-----------------------------------------------------------------------------------
; SYS 7076 (DrawTitleScreen)
; This launches the program from address $1BA4, i.e. DrawTitleScreen.
;----------------------------------------------------------------------------------
; $9E = SYS
        .BYTE $0B,$12,$0A,$00,$9E,$37,$30,$37
        .BYTE $36,$00,$00,$00

; Memory from $1000 is used for storing the position of droids.
; The values below are in an unitialized state.
; 
        .BYTE $32,$38,$34,$C4,$CE,$4D,$CE,$C8
        .BYTE $EC,$80,$AC,$CC,$9C,$CD,$D6,$CC
        .BYTE $CC,$CC,$EC,$D4,$56,$C1,$C1,$81
        .BYTE $E1,$C5,$80,$9C,$6E,$EC,$C4,$CA
        .BYTE $50,$E8,$8C,$30,$10,$35,$1D,$12
        .BYTE $30,$C9,$19,$33,$B0,$3E,$D9,$38
        .BYTE $12,$3B,$3E,$3F,$3E,$2E,$38,$BD
        .BYTE $7B,$3B,$39,$30,$74,$34,$0E,$B2
        .BYTE $34,$17,$6D,$84,$4D,$CC,$C8,$CD
        .BYTE $CC,$C9,$48,$8C,$CC,$CD,$C0,$CC
        .BYTE $8C,$8C,$E8,$CD,$C8,$C4,$CE,$C9
        .BYTE $CF,$84,$E8,$C5,$CD,$8C,$E2,$CC
        .BYTE $CE,$C4,$CC,$37,$1A,$3F,$BA,$34
        .BYTE $7D,$33,$21,$33,$4F,$11,$10,$71
        .BYTE $BF,$BB,$F6,$24,$B7,$3E,$9C,$7C
        .BYTE $78,$BD,$34,$38,$9C,$3D,$4C,$34
        .BYTE $F6,$76,$FC,$CC,$CF,$CC,$54,$DE
        .BYTE $C8,$48,$84,$65,$C8,$CC,$CD,$8C
        .BYTE $4F,$E0,$84,$EE,$E3,$C6,$F7,$CC
        .BYTE $F9,$CF,$91,$C4,$DF,$EA,$C0,$CC
        .BYTE $C8,$44,$A9,$03,$DE,$93,$68,$B6
        .BYTE $92,$7B,$F8,$79,$34,$27,$7C,$9F
        .BYTE $73,$32,$D9,$BD,$E5,$7B,$1E,$2D
        .BYTE $28,$3C,$DD,$2D,$B8,$3C,$FC,$2D
        .BYTE $8C,$3D,$1C
;---------------------------------------------------------------------------------
; CheckCurrentScoreAgainstHighScore   
;---------------------------------------------------------------------------------
CheckCurrentScoreAgainstHighScore   
        BNE b10D6
        INY 
        JMP UpdateHiScore

b10D6   BMI b10DB
        JMP DrawHiScoreAndWaitForFire

b10DB   JMP SaveHiScore

        .BYTE $01,$60
;-------------------------------------------------------------------------
; InitializeScreenAndBorder
;-------------------------------------------------------------------------
InitializeScreenAndBorder
        LDA #$FF
        STA VICCR5   ;$9005 - screen map & character map address
        LDA #$08
        STA VICCRF   ;$900F - screen colors: background, border & inverse
        JMP DrawBannerTopOfScreen

             .BYTE $C5,$CE
txtCopyRight .BYTE $02,$A8,$83,$A9,$B1,$B9,$B8,$B2 ; (c) 1982
             .BYTE $8A,$83,$8D,$BD,$39,$3B,$BC,$76 ; JCM
             .BYTE $6A
;---------------------------------------------------------------------------------
; LaunchGame   
;---------------------------------------------------------------------------------
LaunchGame   
        LDA #$08
        STA VICCRF   ;$900F - screen colors: background, border & inverse
        LDA #$0F
        STA VICCRE   ;$900E - sound volume
        LDA #$FF
        STA VICCR5   ;$9005 - screen map & character map address
        LDA #$80
        STA VIC_SWITCH_CASE ; Disable switching character case
        JSR ClearScreen
        JSR DrawBannerTopOfScreen
        JSR DrawGrid
        JMP LoadFirstLevel

;-------------------------------------------------------------------------
; ClearScreen
;-------------------------------------------------------------------------
ClearScreen
        LDY #$00
        LDA #$20
b1124   STA SCREEN_RAM + $0000,Y
        STA SCREEN_RAM + $0100,Y
        INY 
        BNE b1124
        RTS 

;---------------------------------------------------------------------------------
; DrawBannerTopOfScreen   
;---------------------------------------------------------------------------------
DrawBannerTopOfScreen   
        LDY #$16
b1130   LDA topLineText,Y
        STA SCREEN_RAM - $0001,Y
        LDA topLineTextColors,Y
        STA COLOR_RAM - $0001,Y
        DEY 
        BNE b1130
        RTS

topLineText =*-$01
        .BYTE $20,$21,$22,$24,$25,$22,$23
        .BYTE $26,$26,$27,$22,$20,$19,$1A,$20
        .BYTE $B0,$B0,$B0,$B0,$B0,$B0,$B0
topLineTextColors =*-$01 
        .BYTE $00,$03,$03,$03,$03,$04,$04
        .BYTE $04,$04,$04,$04,$00,$07,$07,$00
        .BYTE $01,$01,$01,$01,$01,$01,$01,$01

SCREEN_LINE_WIDTH = $16
;-------------------------------------------------------------------------
; DrawGrid
;-------------------------------------------------------------------------
DrawGrid
        LDA #>SCREEN_RAM + $002C
        STA screenRamHiPtr
        LDA #<SCREEN_RAM + $002C
        STA screenRamLoPtr

        LDX #$12
b1177   LDY #$15
b1179   LDA #GRID
        STA (screenRamLoPtr),Y

        LDA screenRamHiPtr
        PHA 
        ; Move the Hi pointer to COLOR RAM
        CLC 
        ADC #OFFSET_TO_COLOR_RAM
        STA screenRamHiPtr

        ; Draw the color
        LDA #RED
        STA (screenRamLoPtr),Y

        PLA 
        STA screenRamHiPtr
        DEY 
        BNE b1179

        LDA screenRamLoPtr
        CLC 
        ADC #SCREEN_LINE_WIDTH
        STA screenRamLoPtr
        LDA screenRamHiPtr
        ADC #$00
        STA screenRamHiPtr
        DEX 
        BNE b1177
        RTS 

;---------------------------------------------------------------------------------
; ResetVariablesAndRestartLevel   
;---------------------------------------------------------------------------------
ResetVariablesAndRestartLevel   
        LDA #$13
        STA oldYPos
        LDA #$0A
        STA oldXPos
        LDA #$00
        STA bulletActive
        STA currentYLaserYPos
        STA oldXZapperXPos
        LDA #$10
        STA podUpdateInterval
        LDA #$0B
        STA podDecayInterval
        LDA #$03
        STA yZapperYPos
        LDA #$01
        STA xZapperXPos
        LDA #$04
        STA zapperMovementInterval
        JSR ClearTheBombArrays
        LDA #$04
        STA bombsLeft
        NOP 
        NOP 
        JMP MainGameLoop

;-------------------------------------------------------------------------
; GetJoystickInput
;-------------------------------------------------------------------------
GetJoystickInput
        SEI 
        LDX #$7F
        STX VIA2DDRB ;$9122 - data direction register for port b
b11D6   LDY VIA2PB   ;$9120 - port b I/O register
        CPY VIA2PB   ;$9120 - port b I/O register
        BNE b11D6
        LDX #$FF
        STX VIA2DDRB ;$9122 - data direction register for port b
        LDX #$F7
        STX VIA2PB   ;$9120 - port b I/O register
        CLI 
b11E9   LDA VIA1PA2  ;$911F - mirror of VIA1PA1 (CA1 & CA2 unaffected)
        CMP VIA1PA2  ;$911F - mirror of VIA1PA1 (CA1 & CA2 unaffected)
        BNE b11E9
        PHA 
        AND #$1C
        LSR 
        CPY #$80
        BCC b11FB
        ORA #$10
b11FB   TAY 
        PLA 
        AND #$20
        CMP #$20
        TYA 
        ROR 
        EOR #$8F
        STA joystickInput
        RTS 

;---------------------------------------------------------------------------------
; MainGameLoop   
;---------------------------------------------------------------------------------
MainGameLoop   
        JSR MaybeUpdateShipPosition
        JSR FireBullets
        JSR UpdateXYZappersPosition
        JSR UpdatePods
        JSR MaybePlaySomeSounds
        JSR UpdatePodDecayState
        JSR MaybeDrawFallingBombs
        JSR DrawDroids
        JSR CheckLevelComplete
        JMP MainGameLoop

;---------------------------------------------------------------------------------
; RestartLevel   
;---------------------------------------------------------------------------------
RestartLevel   
        LDA #DROID1
        STA currentDroidCharacter
        JMP ResetVariablesAndRestartLevel

        .BYTE $EA,$EA,$EA
        JSR ROM_ISCNTC ;$FFE1 - check stop key
        BNE MainGameLoop
        RTS 

;-------------------------------------------------------------------------
; GetScreenPointerForCurrentXYPos
;-------------------------------------------------------------------------
GetScreenPointerForCurrentXYPos
        LDA #>SCREEN_RAM
        STA screenRamHiPtr
        LDA #<SCREEN_RAM
        STA screenRamLoPtr

        LDX currentYPos
b1240   LDA screenRamLoPtr
        CLC 
        ADC #SCREEN_LINE_WIDTH
        STA screenRamLoPtr
        LDA screenRamHiPtr
        ADC #$00
        STA screenRamHiPtr
        DEX 
        BNE b1240

        LDY currentXPos
        RTS 

;-------------------------------------------------------------------------
; DrawCurrentCharacterToScreen
;-------------------------------------------------------------------------
DrawCurrentCharacterToScreen
        TXA 
        PHA 
        TYA 
        PHA 
        JSR GetScreenPointerForCurrentXYPos
        LDA currentCharacter
        STA (screenRamLoPtr),Y

        ; Shift the hi pointer to color ram so we can draw the color.
        LDA screenRamHiPtr
        CLC 
        ADC #OFFSET_TO_COLOR_RAM
        STA screenRamHiPtr
        LDA currentColor
        STA (screenRamLoPtr),Y
        PLA 
        TAY 
        PLA 
        TAX 
        RTS 

;---------------------------------------------------------------------------------
; UpdateShipPosition   
;---------------------------------------------------------------------------------
UpdateShipPosition   
        JSR GetJoystickInput

        LDA oldYPos
        STA currentYPos

        LDA oldXPos
        STA currentXPos

        JSR GetScreenPointerForCurrentXYPos

        LDA (screenRamLoPtr),Y
        CMP #$07
        BEQ b1289
        CMP #$00
        BEQ b1289
        JSR CheckIfBumpingAgainstSomething
b1289   LDA #GRID
        STA currentCharacter
        LDA #RED
        STA currentColor
        JSR DrawCurrentCharacterToScreen

        LDA joystickInput
        AND #$01
        BEQ b12A6
        DEC currentYPos
        LDA currentYPos
        CMP #$0C
        BNE b12A6
        LDA #$0D
        STA currentYPos
b12A6   LDA joystickInput
        AND #$02
        BEQ b12AE
        INC currentYPos
b12AE   LDA joystickInput
        AND #$04
        BEQ b12B6
        DEC currentXPos
b12B6   LDA joystickInput
        AND #$08
        BEQ b12BE
        INC currentXPos
b12BE   JSR GetScreenPointerForCurrentXYPos
        LDA (screenRamLoPtr),Y
        CMP #$00
        BEQ b12E1
        CMP #$01
        BNE b12D6
b12CB   LDA oldYPos
        STA currentYPos
        LDA oldXPos
        STA currentXPos
        JMP j12E9

b12D6   CMP #$02
        BEQ b12CB
        CMP #$20
        BEQ b12CB
        JSR CheckIfBumpingAgainstSomething
b12E1   LDA currentYPos
        STA oldYPos
        LDA currentXPos
        STA oldXPos
j12E9   LDA #SHIP
        STA currentCharacter
        LDA #GREEN
        STA currentColor
        JMP DrawCurrentCharacterToScreen

;-------------------------------------------------------------------------
; MaybeUpdateShipPosition
;-------------------------------------------------------------------------
MaybeUpdateShipPosition
        DEC frameRateCounter
        BEQ b12F9
        RTS 

b12F9   JMP UpdateShipPosition

;---------------------------------------------------------------------------------
; MaybeFireBullet   
;---------------------------------------------------------------------------------
MaybeFireBullet   
        LDA bulletActive
        BNE b1331
        JSR GetJoystickInput
        LDA joystickInput
        AND #$80
        BNE b130A
        RTS 

b130A   LDA #$01
        STA bulletActive
        LDA oldYPos
        STA currentYPos
        DEC currentYPos
        LDA oldXPos
        STA currentXPos
        JSR GetScreenPointerForCurrentXYPos
b131B   INC screenRamLoPtr
        BNE b1321
        INC screenRamHiPtr
b1321   DEY 
        BNE b131B
        LDA screenRamLoPtr
        STA bulletScreenRamLoPtr
        LDA screenRamHiPtr
        STA bulletScreenRamHiPtr
        LDA #$F0
        STA VICCRD   ;$900D - frequency of sound osc.4 (noise)
b1331   LDY #$00
        LDA (bulletScreenRamLoPtr),Y
        CMP #$00
        BEQ b1375
        CMP #$08
        BNE b1342
        LDA #BULLET_UP2
        STA (bulletScreenRamLoPtr),Y
        RTS 

b1342   JSR CheckBulletCollisionWithPod
        LDA #GRID
        STA (bulletScreenRamLoPtr),Y
        LDA bulletScreenRamHiPtr
        PHA 
        CLC 
        ADC #OFFSET_TO_COLOR_RAM
        STA bulletScreenRamHiPtr
        LDA #BOTTOM_ZAPPER
        STA (bulletScreenRamLoPtr),Y
        PLA 
        STA bulletScreenRamHiPtr
        LDY #$16
b135A   DEC bulletScreenRamLoPtr
        JMP UpdateBulletPositionAndDraw

        .BYTE $0D
;---------------------------------------------------------------------------------
; DrawBullet   
;---------------------------------------------------------------------------------
DrawBullet   
        DEY 
        BNE b135A
        LDA (bulletScreenRamLoPtr),Y
        CMP #GRID
        BEQ b1375
        CMP #SPACE
        BNE b1372
        LDA #$00
        STA bulletActive
        RTS 

b1372   JSR CheckBulletCollisionWithPod
b1375   LDA #BULLET_UP1
        STA (bulletScreenRamLoPtr),Y
        LDA bulletScreenRamHiPtr
        PHA 
        CLC 
        ADC #OFFSET_TO_COLOR_RAM
        STA bulletScreenRamHiPtr
        LDA #LEFT_ZAPPER
        STA (bulletScreenRamLoPtr),Y
        PLA 
        STA bulletScreenRamHiPtr
        RTS 

;-------------------------------------------------------------------------
; FireBullets
;-------------------------------------------------------------------------
FireBullets
        LDA frameRateCounter
        AND #$01
        BEQ b139D
        RTS 

j1390   LDA VICCRD   ;$900D - frequency of sound osc.4 (noise)
        AND #$80
        BEQ b139A
        DEC VICCRD   ;$900D - frequency of sound osc.4 (noise)
b139A   JMP MaybeFireBullet

b139D   DEC podUpdateInterval
        BEQ b13A2
        RTS 

b13A2   LDA #$22
        STA podUpdateInterval
        JMP j1390

;---------------------------------------------------------------------------------
; UpdateBulletPositionAndDraw   
;---------------------------------------------------------------------------------
UpdateBulletPositionAndDraw   
        LDA bulletScreenRamLoPtr
        CMP #$FF
        BNE DrawBullet
        DEC bulletScreenRamHiPtr
        JMP DrawBullet

;-------------------------------------------------------------------------
; UpdateXYZappersPosition
;-------------------------------------------------------------------------
UpdateXYZappersPosition
        LDA frameRateCounter
        CMP #$01
        BEQ b13BB
        RTS 

b13BB   DEC zapperMovementInterval
        BEQ b13C0
        RTS 

b13C0   LDA #$04
        STA zapperMovementInterval
        LDA yZapperYPos
        STA currentYPos
        LDA #$00
        STA currentXPos
        LDA #SPACE
        STA currentCharacter
        JSR DrawCurrentCharacterToScreen
        INC yZapperYPos
        LDA yZapperYPos
        CMP #$14
        BNE b13DF
        LDA #$02
        STA yZapperYPos
b13DF   LDA #$14
        STA currentYPos
        LDA xZapperXPos
        STA currentXPos
        JSR DrawCurrentCharacterToScreen
        INC xZapperXPos
        LDA xZapperXPos
        CMP #$16
        BNE b13F6
        LDA #$01
        STA xZapperXPos
b13F6   LDA xZapperXPos
        STA currentXPos
        LDA #BOTTOM_ZAPPER
        STA currentCharacter
        LDA #WHITE
        STA currentColor
        JSR DrawCurrentCharacterToScreen
        LDA yZapperYPos
        STA currentYPos
        LDA #$00
        STA currentXPos
        LDA #LEFT_ZAPPER
        STA currentCharacter
        JSR DrawCurrentCharacterToScreen
        DEC podDecayInterval
        BEQ b1419
        RTS 

b1419   LDA #$0B
        STA podDecayInterval
        LDA currentYLaserYPos
        BEQ b1422
        RTS 

b1422   LDA yZapperYPos
        STA currentYLaserYPos
        LDA xZapperXPos
        STA oldXZapperXPos
        LDA #$87
        STA VICCRB   ;$900B - frequency of sound osc.2 (alto)
        LDA #$C2
        STA VICCRA   ;$900A - frequency of sound osc.1 (bass)
        LDA #$01
        STA currentYLaserXPos
        RTS 

;---------------------------------------------------------------------------------
; MaybeFireBulletsAndLasers   
;---------------------------------------------------------------------------------
MaybeFireBulletsAndLasers   
        JSR MaybeFireBullet
        JMP DrawLasers

        .BYTE $EA,$EA,$EA,$EA,$EA,$EA

;---------------------------------------------------------------------------------
; DrawLasers   
;---------------------------------------------------------------------------------
DrawLasers   
        LDA oldXZapperXPos
        STA currentXPos
        LDA #$13
        STA currentYPos
        JSR GetScreenPointerForCurrentXYPos
        LDA #VERTICAL_LASER1
        STA currentXLaserCharacter
        LDA (screenRamLoPtr),Y
        CMP currentXLaserCharacter
        BNE b145E

        LDA #VERTICAL_LASER2
        STA currentXLaserCharacter

b145E   LDA #$13
        STA currentLaserYPos
b1462   LDA currentLaserYPos
        STA currentYPos
        LDA currentXLaserCharacter
        STA currentCharacter
        LDA #YELLOW
        STA currentColor
        JSR DrawCurrentCharacterToScreen
        DEC currentLaserYPos
        LDA currentLaserYPos
        CMP #$02
        BNE b1462

        LDA currentYLaserYPos
        STA currentYPos
        LDA currentYLaserXPos
        STA currentXPos
        JSR GetScreenPointerForCurrentXYPos
        LDA #HORIZ_LASER1
        STA currentXLaserCharacter
        LDA (screenRamLoPtr),Y
        CMP currentXLaserCharacter
        BNE b1492
        LDA #HORIZ_LASER2
        STA currentXLaserCharacter
b1492   LDA #GRID
        STA currentCharacter
        LDA #RED
        STA currentColor
        JSR DrawCurrentCharacterToScreen
        INC currentYLaserXPos
        LDA currentYLaserXPos
        STA currentXPos
        JSR GetScreenPointerForCurrentXYPos
        LDA (screenRamLoPtr),Y
        CMP #VERTICAL_LASER1
        BEQ b14BB
        CMP #VERTICAL_LASER2
        BEQ b14BB
        LDA currentXLaserCharacter
        STA currentCharacter
        LDA #YELLOW
        STA currentColor
        JMP DrawCurrentCharacterToScreen

b14BB   LDA oldXZapperXPos
        STA currentXPos
        LDA #GRID
        STA currentCharacter
        LDA #RED
        STA currentColor
        LDA #$13
        STA currentLaserYPos
b14CB   LDA currentLaserYPos
        STA currentYPos
        JSR DrawCurrentCharacterToScreen
        DEC currentLaserYPos
        LDA currentLaserYPos
        CMP #$02
        BNE b14CB

        LDA currentYLaserYPos
        STA currentYPos
        LDA currentYLaserXPos
        STA currentXPos
        LDA #POD3
        STA currentCharacter
        LDA #YELLOW
        STA currentColor
        JSR DrawCurrentCharacterToScreen

        NOP 
        NOP 
        NOP 

        LDA #$0B
        STA podDecayInterval
        LDA #$00
        STA currentYLaserYPos
        STA oldXZapperXPos
        STA VICCRA   ;$900A - frequency of sound osc.1 (bass)
        STA VICCRB   ;$900B - frequency of sound osc.2 (alto)
        RTS 

;-------------------------------------------------------------------------
; UpdatePods
;-------------------------------------------------------------------------
UpdatePods
        LDA podUpdateInterval
        CMP #$01
        BEQ b1508
        RTS 

b1508   LDA oldXZapperXPos
        BNE b150D
        RTS 

b150D   JMP MaybeFireBulletsAndLasers

;---------------------------------------------------------------------------------
; BulletCollidedWithPod   
;---------------------------------------------------------------------------------
BulletCollidedWithPod   
        LDX #$06
b1512   CMP podDecaySequence,X
        BEQ b151E
        DEX 
        BNE b1512
        JMP CheckIfBulletCollidedWithDroid

        RTS 

b151E   CMP #$0D
        BEQ b152F
        DEX 
        LDA podDecaySequence,X
        STA (bulletScreenRamLoPtr),Y
ResetBulletAndReturn
        LDA #$00
        STA bulletActive
        PLA 
        PLA 
        RTS 

b152F   LDA #GRID
        STA (bulletScreenRamLoPtr),Y
        LDA bulletScreenRamHiPtr
        CLC 
        ADC #OFFSET_TO_COLOR_RAM
        STA bulletScreenRamHiPtr
        LDA #BOTTOM_ZAPPER
        STA (bulletScreenRamLoPtr),Y
        JSR PlayExplosion
        JSR IncreaseScoreBy10000
        JMP ResetBulletAndReturn

;-------------------------------------------------------------------------
; CheckBulletCollisionWithPod
;-------------------------------------------------------------------------
CheckBulletCollisionWithPod
        CMP #$00
        BNE BulletCollidedWithPod
        RTS 

podDecaySequence =*-$01 
        .BYTE POD1,POD2,POD3,POD4,POD5,POD6
;-------------------------------------------------------------------------
; PlayExplosion
;-------------------------------------------------------------------------
PlayExplosion
        LDA #$F0
        STA VICCRC   ;$900C - frequency of sound osc.3 (soprano)
        LDA #$03
        STA explosionSoundInterval
        RTS 

;---------------------------------------------------------------------------------
; PlaySomeSounds   
;---------------------------------------------------------------------------------
PlaySomeSounds   
        LDA VICCRC   ;$900C - frequency of sound osc.3 (soprano)
        AND #$80
        BNE b1564
        RTS 

b1564   DEC VICCRC   ;$900C - frequency of sound osc.3 (soprano)
        LDA VICCRC   ;$900C - frequency of sound osc.3 (soprano)
        CMP #$E0
        BEQ b156F
        RTS 

b156F   DEC explosionSoundInterval
        BNE b1579
        LDA #$00
        STA VICCRC   ;$900C - frequency of sound osc.3 (soprano)
        RTS 

b1579   LDA #$F0
        STA VICCRC   ;$900C - frequency of sound osc.3 (soprano)
        RTS 

;-------------------------------------------------------------------------
; MaybePlaySomeSounds
;-------------------------------------------------------------------------
MaybePlaySomeSounds
        LDA podUpdateInterval
        CMP #$01
        BEQ PlaySomeSounds
        RTS 

;---------------------------------------------------------------------------------
; IncreaseScore   
;---------------------------------------------------------------------------------
IncreaseScore   
        TXA 
        PHA 
b1588   INC SCREEN_RAM + $000E,X
        LDA SCREEN_RAM + $000E,X
        CMP #$BA
        BNE b159A
        LDA #$B0
        STA SCREEN_RAM + $000E,X
        DEX 
        BNE b1588
b159A   PLA 
        TAX 
        DEY 
        BNE IncreaseScore
        RTS 

;-------------------------------------------------------------------------
; IncreaseScoreBy10000
;------------------------------------------------------------------------
IncreaseScoreBy10000
        LDX #$06
        LDY #$01
        JMP IncreaseScore

;-------------------------------------------------------------------------
; UpdatePodDecayState
;-------------------------------------------------------------------------
UpdatePodDecayState
        LDA podDecayInterval
        CMP #$02
        BEQ b15AE
        RTS 

b15AE   LDA #$01
        STA podDecayInterval

        LDY #$00
b15B4   LDA SCREEN_RAM + $002C,Y
        BEQ b15BF
        JSR CheckPodDecayState
        STA SCREEN_RAM + $002C,Y
b15BF   INY 
        BNE b15B4

b15C2   LDA SCREEN_RAM + $012C,Y
        BEQ b15CD
        JSR CheckPodDecayState
        STA SCREEN_RAM + $012C,Y
b15CD   INY 
        CPY #$8A
        BNE b15C2

        RTS 

;-------------------------------------------------------------------------
; CheckPodDecayState
;-------------------------------------------------------------------------
CheckPodDecayState
        STX currentXLaserCharacter
        LDX #$06
b15D7   CMP podDecaySequence,X
        BEQ b15E2
        DEX 
        BNE b15D7
        LDX currentXLaserCharacter
        RTS 

b15E2   CMP #$12
        BEQ b15ED
        INX 
        LDA podDecaySequence,X
        LDX currentXLaserCharacter
        RTS 

b15ED   LDX #$0E
b15EF   LDA @wbombScreenPtrArrayHi,X
        BEQ b15FB
        DEX 
        DEX 
        BNE b15EF
        LDA #$12
        RTS 

b15FB   LDA #$1E
        STA @wbombScreenPtrArrayHi,X
        LDA SCREEN_RAM + $002C,Y
        CMP #$12
        BEQ b160C
        LDA #$1F
        STA @wbombScreenPtrArrayHi,X
b160C   LDA #$2C
        STA @wbombScreenPtrArrayLo,X
        TYA 
        PHA 
b1613   INC @wbombScreenPtrArrayLo,X
        BNE b161B
        INC @wbombScreenPtrArrayHi,X
b161B   DEY 
        BNE b1613
        PLA 
        TAY 
        LDA #$0A
        RTS 

;-------------------------------------------------------------------------
; ClearTheBombArrays
;-------------------------------------------------------------------------
ClearTheBombArrays
        LDX #$0F
        LDA #$00
b1627   STA @wbombScreenPtrArrayLo,X
        DEX 
        BNE b1627
        RTS 

;-------------------------------------------------------------------------
; MaybeDrawFallingBombs
;-------------------------------------------------------------------------
MaybeDrawFallingBombs
        LDA podUpdateInterval
        CMP #$02
        BEQ b16A3
        RTS 

bombScreenLoPtr = $2D
;---------------------------------------------------------------------------------
; DrawFallingBombs   
;---------------------------------------------------------------------------------
DrawFallingBombs   
        LDX #$0F
b1637   LDA @wbombScreenPtrArrayHi - $01,X
        BEQ b1689
        STA bombScreenHiPtr
        LDA @wbombScreenPtrArrayLo - $01,X
        STA bombScreenLoPtr

        ; Clear the bomb at its old position
        LDA #$00
        LDY #$00
        STA (bombScreenLoPtr),Y

        ; Draw the grid color at the old posotion
        LDA bombScreenHiPtr
        CLC 
        ADC #OFFSET_TO_COLOR_RAM
        STA bombScreenHiPtr
        LDA #BOTTOM_ZAPPER
        STA (bombScreenLoPtr),Y

        ; Move the bomb's position down a line
        LDA @wbombScreenPtrArrayLo - $01,X
        CLC 
        ADC #$16
        STA @wbombScreenPtrArrayLo - $01,X

        LDA @wbombScreenPtrArrayHi - $01,X
        ADC #$00
        STA @wbombScreenPtrArrayHi - $01,X
        STA bombScreenHiPtr

        LDA @wbombScreenPtrArrayLo - $01,X
        STA bombScreenLoPtr

        ; Check if the bomb has hit something
        LDA (bombScreenLoPtr),Y
        CMP #$20 ; ignore the grid
        BEQ b1691
        CMP #BOTTOM_ZAPPER ; ignore the X Zapper
        BEQ b1691
        CMP #SHIP ; Did it hit the ship?
        BEQ BombHitTheShip

        ; Draw the bomb at its new position
        LDA #BOMB_DOWN
        STA (bombScreenLoPtr),Y
        LDA bombScreenHiPtr
        CLC 
        ADC #OFFSET_TO_COLOR_RAM
        STA bombScreenHiPtr
        LDA #LEFT_ZAPPER
        STA (bombScreenLoPtr),Y

b1689   JMP j169C

        TAX 
        RTS 

BombHitTheShip
        JMP JumpToExplodeShip

b1691   LDA #$00
        STA @wbombScreenPtrArrayHi - $01,X
        STA @wbombScreenPtrArrayLo - $01,X
        JMP b1689

j169C   DEX 
        DEX 
        CPX #$FF
        BNE b1637
        RTS 

b16A3   DEC bombsLeft
        BEQ b16A8
        RTS 

b16A8   LDA #$03
        STA bombsLeft
        JMP DrawFallingBombs

;-------------------------------------------------------------------------
; DrawDroids
;-------------------------------------------------------------------------
DrawDroids
        LDA frameRateCounter
        AND #$01
        BEQ b16B6
        RTS 

b16B6   DEC droidAnimationInterval
        JMP AnimateDroids

;---------------------------------------------------------------------------------
; DrawMovementofDroids   
;---------------------------------------------------------------------------------
DrawMovementofDroids   
        LDA #$A0
        STA droidAnimationInterval
        INC currentDroidCharacter
        LDA currentDroidCharacter
        CMP #EXPLOSION1
        BNE b16CB
        LDA #DROID1
        STA currentDroidCharacter
b16CB   LDA droidsLeftToKill
        BNE b16D0
        RTS 

b16D0   CLC 
        ASL 
        CLC 
        ADC droidsLeftToKill
        TAX 

        ; With X as the number of droids, move each droid in a squad
        ; forward by one position.
DrawDroidLoop
        LDA droidScreenLineLoPtr,X
        STA screenRamLoPtr
        LDA droidScreenLineHiPtr,X
        STA screenRamHiPtr
        LDY #$00
        LDA (screenRamLoPtr),Y
        CMP #VERTICAL_LASER1
        BEQ b16F6
        CMP #VERTICAL_LASER2
        BEQ b16F6
        CMP #VERTICAL_LASER1
        BEQ b16F6
        CMP #VERTICAL_LASER2
        BEQ b16F6
        BNE b16F9
b16F6   JMP CheckIfBulletHitsDroid

b16F9   LDA droidDirectionBitMap,X
        AND #$80
        BEQ b170F
        
        ; Draw the grid on the droid's current position.
        LDA #GRID
        STA (screenRamLoPtr),Y
        LDA screenRamHiPtr
        CLC 
        ADC #OFFSET_TO_COLOR_RAM
        STA screenRamHiPtr
        LDA #RED
        STA (screenRamLoPtr),Y

b170F   LDA droidDirectionBitMap,X
        AND #$40
        BNE b173B

        ;Draw the droid at its new position.
        LDA nextDroidScreenLineLoPtr,X
        STA droidScreenLineLoPtr,X
        STA screenRamLoPtr
        LDA nextDroidScreenLineHiPtr,X
        STA screenRamHiPtr
        STA droidScreenLineHiPtr,X
        LDA #DROID1
        STA (screenRamLoPtr),Y
        LDA screenRamHiPtr
        CLC 
        ADC #OFFSET_TO_COLOR_RAM
        STA screenRamHiPtr
        LDA #CYAN
        STA (screenRamLoPtr),Y

        ; Move the next droid.
GoToNextDroid
        DEX 
        DEX 
        DEX 
        BNE DrawDroidLoop
        RTS 

        ; This section deals with various cases like reaching the end
        ; of a line, moving to the next one and so on.
b173B   LDA droidScreenLineLoPtr,X
        STA screenRamLoPtr
        LDA droidScreenLineHiPtr,X
        STA screenRamHiPtr
        LDA #$01
        STA nextDroidPositionOffset
        LDA droidDirectionBitMap,X
        AND #$07
        CMP #$01
        BEQ b177B
        CMP #$00
        BEQ GetScreenRamPtrForNewPosition
        CMP #$03
        BNE b1761
        LDA #$17
        STA nextDroidPositionOffset
        JMP GetScreenRamPtrForNewPosition

b1761   CMP #$02
        BNE b176C
        LDA #$15
        STA nextDroidPositionOffset
        JMP GetScreenRamPtrForNewPosition

b176C   CMP #$04
        BNE b1777
        LDA #$15
        STA nextDroidPositionOffset
        JMP b177B

b1777   LDA #$17
        STA nextDroidPositionOffset
b177B   LDA screenRamLoPtr
        CLC 
        ADC nextDroidPositionOffset
        STA screenRamLoPtr
        LDA screenRamHiPtr
        ADC #$00
        STA screenRamHiPtr
        JMP j179A

;---------------------------------------------------------------------------------
; GetScreenRamPtrForNewPosition 
;---------------------------------------------------------------------------------
GetScreenRamPtrForNewPosition 
        LDY nextDroidPositionOffset
b178D   DEC screenRamLoPtr
        LDA screenRamLoPtr
        CMP #$FF
        BNE b1797
        DEC screenRamHiPtr
b1797   DEY 
        BNE b178D

j179A   JSR CheckForCollisionWithShip
        NOP 
        BEQ DrawDroidAtPosition
        CMP #$20
        BEQ b17C6
        CMP #$02
        BEQ b17C6
j17A8   LDA droidDirectionBitMap,X
        AND #$01
        BNE b17B5
        INC droidDirectionBitMap,X
        JMP j17B8

b17B5   DEC droidDirectionBitMap,X
j17B8   JSR CalculateDroidPosition
        NOP 
        LDA droidDirectionBitMap,X
        AND #$02
        BNE GetScreenRamPtrForNewPosition
        JMP b177B

b17C6   INY 
        LDA (screenRamLoPtr),Y
        CMP #$20
        BEQ b17D8
        CMP #$02
        BEQ b17D8
        CMP #$01
        BEQ b17E0
        JMP j17A8

b17D8   LDA droidDirectionBitMap,X
        AND #$04
        BNE b17EC
b17E0   =*+$01
        JMP ResetDroidPosition

        AND #$C1
        ORA #$04
        STA droidDirectionBitMap,X
        JMP ResetDroidPosition

b17EC   LDA droidDirectionBitMap,X
        AND #$C1
        ORA #$02
        STA droidDirectionBitMap,X
        JMP ResetDroidPosition

;---------------------------------------------------------------------------------
; DrawDroidAtPosition   
;---------------------------------------------------------------------------------
DrawDroidAtPosition   
        LDA currentDroidCharacter
        LDY #$00
        STA (screenRamLoPtr),Y
        LDA screenRamHiPtr
        STA droidScreenLineHiPtr,X
        CLC 
        ADC #OFFSET_TO_COLOR_RAM
        STA screenRamHiPtr
        LDA #HORIZ_LASER1
        STA (screenRamLoPtr),Y
        LDA screenRamLoPtr
        STA droidScreenLineLoPtr,X
        JMP GoToNextDroid

;-------------------------------------------------------------------------
; CalculateDroidPosition
;-------------------------------------------------------------------------
CalculateDroidPosition
        LDA droidDirectionBitMap,X
        AND #$01
        BEQ b1827
        INC screenRamLoPtr
        BNE b1822
        INC screenRamHiPtr
b1822   LDA #$16
        STA nextDroidPositionOffset
        RTS 

b1827   DEC screenRamLoPtr
        LDA screenRamLoPtr
        CMP #$FF
        BNE b1822
        DEC screenRamHiPtr
        JMP b1822

;---------------------------------------------------------------------------------
; ResetDroidPosition   
;---------------------------------------------------------------------------------
ResetDroidPosition   
        LDA #$1F
        STA droidScreenLineHiPtr,X
        LDA #$0A
        STA droidScreenLineLoPtr,X
        LDA droidDirectionBitMap,X
        AND #$01
        BNE b184D
        LDA droidDirectionBitMap,X
        ORA #$01
        STA droidDirectionBitMap,X
b184D   LDA droidScreenLineHiPtr,X
        STA screenRamHiPtr
        LDA droidScreenLineLoPtr,X
        STA screenRamLoPtr
        JMP DrawDroidAtPosition

;---------------------------------------------------------------------------------
; AnimateDroids   
;---------------------------------------------------------------------------------
AnimateDroids   
        LDA droidAnimationInterval
        BEQ b185F
        RTS 

b185F   DEC droidsLeftCurrentLevel
        BNE b186B
        LDA #$20
        ASL 
        STA droidsLeftCurrentLevel
        JMP j18BF

b186B   LDA droidsLeftCurrentLevel
        CMP sizeOfDroidSquadForCurrentLevel
        BMI b1876
        BEQ b1876
        JMP DrawMovementofDroids

b1876   LDA noOfDroidSquadsCurrentLevel
        BNE b187D
        JMP DrawMovementofDroids

b187D   INC droidsLeftToKill
        NOP 
        NOP 
        NOP 
        LDA droidsLeftToKill
        CLC 
        ASL 
        CLC 
        ADC droidsLeftToKill
        TAX 
        LDA #$1E
        STA droidScreenLineHiPtr,X
        LDA #$32
        STA droidScreenLineLoPtr,X
        LDA droidsLeftCurrentLevel
        CMP sizeOfDroidSquadForCurrentLevel
        BNE b18AF
        LDA #$C0
        STA droidDirectionBitMap,X
        LDA aA2
        AND #$01
        BEQ b18AA
        LDA #$C1
        STA droidDirectionBitMap,X
b18AA   DEC unusedVariable2
        JMP DrawMovementofDroids

b18AF   LDA nextDroidDirectionBitmap,X
        AND #$4F
        STA nextDroidDirectionBitmap,X
        LDA #$80
        STA droidDirectionBitMap,X
        JMP DrawMovementofDroids

j18BF   DEC noOfDroidSquadsCurrentLevel
        JMP j18C4

j18C4   LDA noOfDroidSquadsCurrentLevel
        CMP #$FF
        BNE b18CE
        LDA #$00
        STA noOfDroidSquadsCurrentLevel
b18CE   JMP DrawMovementofDroids

;---------------------------------------------------------------------------------
; CheckIfBulletHitsDroid   
;---------------------------------------------------------------------------------
CheckIfBulletHitsDroid   
        DEC unusedVariable
        LDA droidsLeftToKill
        CMP #$01
        BNE b190D
        LDA droidDirectionBitMap,X
        AND #$C0
        BEQ DroidHit
        LDA sizeOfDroidSquadForCurrentLevel
        CMP #$01
        BNE DroidHit
        NOP 
        NOP 
        NOP 
        RTS 

DroidHit
        ; Draw a pod where the droid was hit and increment the score.
        DEC droidsLeftToKill

        ;Draw the pod
        LDA #$0F
        LDY #$00
        STA (screenRamLoPtr),Y

        ; Draw the color of the pod.
        LDA screenRamHiPtr
        CLC 
        ADC #OFFSET_TO_COLOR_RAM
        STA screenRamHiPtr
        LDA #SHIP
        STA (screenRamLoPtr),Y

        LDY #$01
        LDX #$05
        LDA #$F0
        STA VICCRC   ;$900C - frequency of sound osc.3 (soprano)
        LDA #$03
        STA explosionSoundInterval
        JMP IncreaseScore

b190D   JMP CheckForBullets

;---------------------------------------------------------------------------------
; RefillDroidsIfNecessary   
;---------------------------------------------------------------------------------
RefillDroidsIfNecessary   
        LDA droidsLeftToKill
        CLC 
        ASL 
        CLC 
        ADC droidsLeftToKill
        STA currentNoOfDroids
j1919   LDA previousDroidScreenLineLoPtr,X
        STA droidScreenLineLoPtr,X
        LDA previousDroidScreenLineHiPtr,X
        STA droidScreenLineHiPtr,X
        LDA previousDroidDirectionBitmap,X
        STA droidDirectionBitMap,X
        CPX currentNoOfDroids
        BEQ DroidHit
        INX 
        INX 
        INX 
        JMP j1919

b1935   LDA droidDirectionBitMap,X
        AND #$40
        BNE b1945
        JSR s19D8
        STA nextDroidDirectionBitmap,X
        JMP RefillDroidsIfNecessary

b1945   JSR s1B67
        STA previousDroidDirectionBitmap,X
        TXA 
        PHA 

        LDY #$03
        LDX #$05
        JSR IncreaseScore

        PLA 
        TAX 
        JMP RefillDroidsIfNecessary

;---------------------------------------------------------------------------------
; CheckIfBulletCollidedWithDroid   
;---------------------------------------------------------------------------------
CheckIfBulletCollidedWithDroid   
        LDA (bulletScreenRamLoPtr),Y
        CMP #$13
        BEQ BulletCollidedWithDroid
        CMP #$14
        BEQ BulletCollidedWithDroid
        CMP #$15
        BEQ BulletCollidedWithDroid
        RTS 

BulletCollidedWithDroid
       JMP j1993

        .BYTE $0B,$68,$68
        JMP j1993

;---------------------------------------------------------------------------------
; CheckForBullets   
;---------------------------------------------------------------------------------
CheckForBullets   
        LDA droidDirectionBitMap,X
        AND #$C0
        BNE b1935
        TXA 
        PHA 
b197A   DEX 
        DEX 
        DEX 
        LDA droidDirectionBitMap,X
        AND #$40
        BEQ b197A
        LDA droidDirectionBitMap,X
        STA currentNoOfDroids
        PLA 
        TAX 
        LDA currentNoOfDroids
        JSR s19DF
        JMP j19C6

;---------------------------------------------------------------------------------
; j1993   
;---------------------------------------------------------------------------------
j1993   
        PLA 
        PLA 
        LDA #$00
        STA bulletActive
        LDA droidsLeftToKill
        CLC 
        ASL 
        CLC 
        ADC droidsLeftToKill
        TAX 
j19A1   LDA droidScreenLineLoPtr,X
        CMP bulletScreenRamLoPtr
        BEQ b19B2
b19A8   DEX 
        DEX 
        DEX 
        NOP 
        NOP 
        NOP 
        NOP 
        JMP j19A1

b19B2   LDA droidScreenLineHiPtr,X
        CMP bulletScreenRamHiPtr
        BNE b19A8
        LDA bulletScreenRamLoPtr
        STA screenRamLoPtr
        LDA bulletScreenRamHiPtr
        STA screenRamHiPtr
        LDY #$00
        JMP CheckIfBulletHitsDroid

;---------------------------------------------------------------------------------
; j19C6   
;---------------------------------------------------------------------------------
j19C6   
        LDA nextDroidDirectionBitmap,X
        ORA #$80
        STA nextDroidDirectionBitmap,X
        JMP RefillDroidsIfNecessary

;---------------------------------------------------------------------------------
; j19D1   
;---------------------------------------------------------------------------------
j19D1   
        LDA droidDirectionBitMap,X
        ORA previousDroidDirectionBitmap,X
        RTS 

;-------------------------------------------------------------------------
; s19D8
;-------------------------------------------------------------------------
s19D8
        LDA droidDirectionBitMap,X
        ORA nextDroidDirectionBitmap,X
        RTS 

;-------------------------------------------------------------------------
; s19DF
;-------------------------------------------------------------------------
s19DF
        ORA previousDroidDirectionBitmap,X
        STA previousDroidDirectionBitmap,X
        RTS 

;-------------------------------------------------------------------------
; CheckIfBumpingAgainstSomething
;-------------------------------------------------------------------------
CheckIfBumpingAgainstSomething
        CMP #$13
        BEQ b1A08
        CMP #$14
        BEQ b1A08
        CMP #$15
        BEQ b1A08
        CMP #$06
        BEQ b1A08
        CMP #$07
        BEQ b1A08
        CMP #$0A
        BEQ b1A08
        CMP #$07
        BNE b1A03
        RTS 

b1A03   PLA 
        PLA 
        JMP b12CB

b1A08   PLA 
        PLA 

;---------------------------------------------------------------------------------
; JumpToExplodeShip   
;---------------------------------------------------------------------------------
JumpToExplodeShip   
        JMP ExplodeShip

;-------------------------------------------------------------------------
; CheckForCollisionWithShip
;-------------------------------------------------------------------------
CheckForCollisionWithShip
        LDY #$00
        LDA (screenRamLoPtr),Y
        CMP #SHIP
        BEQ b1A08
        LDA (screenRamLoPtr),Y
        RTS 

        LDA #$FF
        STA VICCR5   ;$9005 - screen map & character map address
        JMP DrawBannerTopOfScreen

        .BYTE $EA
explosionYPosArray  =*-$01 
        .BYTE $0D,$1C,$1C,$1C,$0D,$FE,$FE,$FE
explosionXPosArray  =*-$01 
        .BYTE $FB,$FB,$0A,$19,$19,$19,$0A,$FB
explosionYPosArrayControl  =*-$01 
        .BYTE $00,$01,$01,$01,$00,$81,$81,$81
explosionXPosArrayControl  =*-$01 
        .BYTE $81,$81,$00,$01,$01,$01,$00,$81

currentExplosionCharacter = $2D
;---------------------------------------------------------------------------------
; DrawExplosion   
;---------------------------------------------------------------------------------
DrawExplosion   
        PLA 
        PLA 
        LDA oldYPos
        LDY #$08
b1A47   STA explosionYPosArray,Y
        DEY 
        BNE b1A47

        LDA oldXPos
        LDY #$08
b1A51   STA explosionXPosArray,Y
        DEY 
        BNE b1A51

        LDA #EXPLOSION1
        STA currentExplosionCharacter
        LDA #$80
        STA VICCRD   ;$900D - frequency of sound osc.4 (noise)
        JSR PlayASound2

DrawExplosionLoop   
        LDX #$08
b1A65   LDA explosionYPosArray,X
        STA currentYPos
        LDA explosionXPosArray,X
        STA currentXPos
        TXA 
        PHA 
        JSR GetScreenPointerForCurrentXYPos
        LDA (screenRamLoPtr),Y
        CMP currentExplosionCharacter
        BNE b1A85
        LDA #GRID
        STA currentCharacter
        LDA #RED
        STA currentColor
        JSR DrawCurrentCharacterToScreen
b1A85   PLA 
        TAX 
        DEX 
        BNE b1A65

        LDX #$08
b1A8C   INC explosionYPosArray,X
        LDA explosionYPosArrayControl,X
        BEQ b1A9B
        CMP #$81
        BNE b1A9E
        DEC explosionYPosArray,X
b1A9B   DEC explosionYPosArray,X
b1A9E   INC explosionXPosArray,X
        LDA explosionXPosArrayControl,X
        BEQ b1AAD
        CMP #$81
        BNE b1AB0
        DEC explosionXPosArray,X
b1AAD   DEC explosionXPosArray,X
b1AB0   DEX 
        BNE b1A8C
        INC currentExplosionCharacter
        LDA currentExplosionCharacter
        CMP #$19
        BNE b1ABF
        LDA #EXPLOSION1
        STA currentExplosionCharacter
b1ABF   LDX #$08
b1AC1   LDA explosionYPosArray,X
        STA currentYPos
        LDA explosionXPosArray,X
        STA currentXPos
        TXA 
        PHA 
        JSR GetScreenPointerForCurrentXYPos
        LDA (screenRamLoPtr),Y
        BNE b1ADF
        LDA currentExplosionCharacter
        STA currentCharacter
        LDA #WHITE
        STA currentColor
        JSR DrawCurrentCharacterToScreen
b1ADF   PLA 
        TAX 
        DEX 
        BNE b1AC1
b1AE4   LDY #$40
b1AE6   DEY 
        BNE b1AE6
        DEX 
        BNE b1AE4
        NOP 
        NOP 
        NOP 
        NOP 
        DEC VICCRE   ;$900E - sound volume
        BEQ b1AF8
        JMP DrawExplosionLoop

b1AF8   JMP PlayerKilled

;-------------------------------------------------------------------------
; PlayASound2
;-------------------------------------------------------------------------
PlayASound2
        LDA #$00
        STA VICCRA   ;$900A - frequency of sound osc.1 (bass)
        STA VICCRB   ;$900B - frequency of sound osc.2 (alto)
        STA VICCRC   ;$900C - frequency of sound osc.3 (soprano)
        RTS 

;---------------------------------------------------------------------------------
; ExplodeShip   
;---------------------------------------------------------------------------------
ExplodeShip   
        LDA oldYPos
        STA currentYPos
        LDA oldXPos
        STA currentXPos
        LDA #GRID
        STA currentCharacter
        LDA #RED
        STA currentColor
        JSR DrawCurrentCharacterToScreen
        JMP DrawExplosion

;-------------------------------------------------------------------------
; ClearScreenDecrementLives
;-------------------------------------------------------------------------
ClearScreenDecrementLives
        ; Clear Screen
        LDY #$00
        LDA #$20
b1B21   STA SCREEN_RAM + $002C,Y
        STA SCREEN_RAM + $0100,Y
        DEY 
        BNE b1B21

;---------------------------------------------------------------------------------
; DrawLivesLeftAndEnterNextLevel   
;---------------------------------------------------------------------------------
DrawLivesLeftAndEnterNextLevel   
        LDY #$04
b1B2C   LDA txtLivesLeft,Y
        STA SCREEN_RAM + $004A,Y
        LDA #$01
        STA COLOR_RAM + $004A,Y
        DEY 
        BNE b1B2C

        DEC livesLeft
        BEQ b1B3E
b1B3E   LDA livesLeft
        CLC 
        ADC #$B0
        STA SCREEN_RAM + $004E

        LDA #$10
        STA currentNoOfDroids
b1B4A   DEY 
        BNE b1B4A
        DEX 
        BNE b1B4A
        DEC currentNoOfDroids
        BNE b1B4A

        JSR DrawGrid
        ;Falls through

;-------------------------------------------------------------------------
; LoadDataForLevel
;-------------------------------------------------------------------------
LoadDataForLevel
        LDY currentLevel
        LDA droidSquadsForLevels,Y
        STA noOfDroidSquadsCurrentLevel
        LDA sizeOfDroidSquadsForLevels,Y
        STA sizeOfDroidSquadForCurrentLevel
        ASL ; Droids at any one time is double the droids in a squad
        STA droidsLeftCurrentLevel
        RTS 

;-------------------------------------------------------------------------
; s1B67
;-------------------------------------------------------------------------
s1B67
        LDA droidDirectionBitMap,X
        AND #$80
        JMP j1B75

       .BYTE $EA,$EA 
txtLivesLeft =*-$01
       .BYTE $1B,$1C,$20,$20 ; MEN 00
;---------------------------------------------------------------------------------
; j1B75   
;---------------------------------------------------------------------------------
j1B75   
        BEQ b1B7D
        LDA #$40
        STA droidDirectionBitMap,X
        NOP 
b1B7D   JMP j19D1

;---------------------------------------------------------------------------------
; LoadFirstLevel   
;---------------------------------------------------------------------------------
LoadFirstLevel   
        LDA #$01
        STA currentLevel
        LDA #$05
        STA livesLeft
        JSR LoadDataForLevel
        NOP 
        NOP 
        NOP 
        JMP EnterNewLevel

;---------------------------------------------------------------------------------
; PlayerKilled   
;---------------------------------------------------------------------------------
PlayerKilled   
        JSR ClearScreenDecrementLives
        LDA livesLeft
        BEQ b1BA7

;---------------------------------------------------------------------------------
; EnterNewLevel   
;---------------------------------------------------------------------------------
EnterNewLevel   
        LDA #$00
        STA droidsLeftToKill
        LDA #$0F
        STA VICCRE   ;$900E - sound volume
        JMP RestartLevel

;-------------------------------------------------------------------------
; DrawTitleScreen
;-------------------------------------------------------------------------
DrawTitleScreen
        JSR InitializeScreenAndBorder
b1BA7   LDA #$02
        STA VIA1IER  ;$911E - interrupt enable register (IER)

        ; Clear the screen
        LDY #$00
        LDA #$20
b1BB0   STA SCREEN_RAM + $0016,Y
        STA SCREEN_RAM + $0116,Y
        DEY 
        BNE b1BB0

        LDY #$00
b1BBB   LDA currentHighScore,Y
        CMP SCREEN_RAM + $000F,Y
        JMP CheckCurrentScoreAgainstHighScore

;---------------------------------------------------------------------------------
; UpdateHiScore   
;---------------------------------------------------------------------------------
UpdateHiScore   
        CPY #$07
        BNE b1BBB
        BEQ DrawHiScoreAndWaitForFire

;---------------------------------------------------------------------------------
; SaveHiScore   
;---------------------------------------------------------------------------------
SaveHiScore   
        LDY #$07
b1BCC   LDA SCREEN_RAM + $000E,Y
        STA currentHighScore - $01,Y
        DEY 
        BNE b1BCC

        ; Falls through
;---------------------------------------------------------------------------------
; DrawHiScoreAndWaitForFire   
;---------------------------------------------------------------------------------
DrawHiScoreAndWaitForFire   
        LDY #$0A
b1BD7   LDA highScoreText,Y
        STA SCREEN_RAM + $0048,Y
        LDA txtCopyRight,Y
        STA SCREEN_RAM + $008A,Y
        LDA #$01
        STA COLOR_RAM + $0048,Y
        STA COLOR_RAM + $008A,Y
        DEY 
        BNE b1BD7

        ;Wait for the user to press fire.
b1BEE   JSR GetJoystickInput
        LDA joystickInput
        AND #$80
        BEQ b1BEE

        ;Fire Pressed
        JMP LaunchGame

        .BYTE $EA,$EA,$EA,$EA,$EA,$EA

.include "charset.asm"

                 .BYTE $00,$00
highScoreText    .BYTE $00,$1D,$1E,$1F
currentHighScore .BYTE $B0,$B0,$B0,$B0,$B0,$B0,$B0,$B0
                 .BYTE $B0,$B0,$00
droidSquadsForLevels =*-$01 
                 .BYTE $01,$02,$06,$04,$06,$07,$04
                 .BYTE $05,$0B,$07,$08,$09,$07,$06,$06
                 .BYTE $07,$08,$07,$08,$09,$00,$00
sizeOfDroidSquadsForLevels  =*-$01 
                 .BYTE $07,$07,$05,$07,$06,$06,$09
                 .BYTE $09,$03,$08,$08,$08,$09,$0A,$0B
                 .BYTE $0A,$0A,$0B,$0B,$0B,$00,$00,$00
                 .BYTE $00,$00,$FE,$FE,$00,$82,$82,$82
                 .BYTE $FE,$00,$08,$08,$00,$08
;---------------------------------------------------------------------------------
; IncrementLevel   
;---------------------------------------------------------------------------------
IncrementLevel   
        INC currentLevel
        LDA currentLevel
        CMP #$14
        BNE b1D96
        DEC currentLevel
b1D96   LDY #$00
        LDA #$20
b1D9A   STA SCREEN_RAM + $002C,Y
        JMP LevelCleared

;---------------------------------------------------------------------------------
; DrawLevelInterstitial   
;---------------------------------------------------------------------------------
DrawLevelInterstitial   
        LDY #$0B
b1DA2   LDA txtGridZapped,Y
        STA SCREEN_RAM + $009F,Y
        LDA #$03
        STA COLOR_RAM + $009F,Y
        DEY 
        BNE b1DA2
        INC livesLeft
        JMP DrawLivesLeftAndEnterNextLevel

;-------------------------------------------------------------------------
; CheckLevelComplete
;-------------------------------------------------------------------------
CheckLevelComplete
        LDA droidsLeftToKill
        BEQ b1DBA
        RTS 

b1DBA   LDA noOfDroidSquadsCurrentLevel
        BEQ b1DBF
        RTS 

b1DBF   PLA 
        PLA 
        JSR IncrementLives
        JMP RestartLevel

;---------------------------------------------------------------------------------
; LevelCleared   
;---------------------------------------------------------------------------------
LevelCleared   
        STA SCREEN_RAM + $012C,Y
        DEY 
        BNE b1D9A
        JMP DrawLevelInterstitial

;-------------------------------------------------------------------------
; IncrementLives
;-------------------------------------------------------------------------
IncrementLives
        JSR PlayASound2
        LDA #$00
        STA VICCRD   ;$900D - frequency of sound osc.4 (noise)
        INC livesLeft
        LDA livesLeft
        CMP #$0A
        BEQ b1DE7
        CMP #$0B
        BEQ b1DE7
        JMP IncrementLevel

b1DE7   DEC livesLeft
        JMP IncrementLevel

              .BYTE $00,$00,$00,$00
txtGridZapped .BYTE $00,$87,$92,$89,$84,$20,$9A,$81 ; GRID ZA
              .BYTE $90,$90,$85,$84,$00,$00,$00,$FF ; PPED
