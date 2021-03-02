;
; **** ZP ABSOLUTE ADRESSES **** 
;
screenRamLoPtr = $00
screenRamHiPtr = $01
joystickInput = $02
a03 = $03
a04 = $04
a05 = $05
a06 = $06
a07 = $07
a08 = $08
frameRateCounter = $09
a0B = $0B
bulletScreenRamLoPtr = $0C
bulletScreenRamHiPtr = $0D
a0E = $0E
a10 = $10
a11 = $11
a12 = $12
a13 = $13
a14 = $14
a15 = $15
a16 = $16
a17 = $17
a18 = $18
a1B = $1B
a21 = $21
a22 = $22
a23 = $23
a24 = $24
a25 = $25
a26 = $26
a28 = $28
a29 = $29
a2C = $2C
a2D = $2D
a2E = $2E
aA2 = $A2
aCE = $CE
aF0 = $F0
aF1 = $F1
aFF = $FF
;
; **** ZP POINTERS **** 
;
bulletScreenRamLoPtr = $0C
p2D = $2D
;
; **** FIELDS **** 
;
f002F = $002F
f0030 = $0030
f0031 = $0031
f0FFD = $0FFD
f0FFE = $0FFE
f0FFF = $0FFF
f1000 = $1000
SCREEN_RAM = $1E00
f95FF = $95FF
COLOR_RAM = $9600
;
; **** ABSOLUTE ADRESSES **** 
;
a0291 = $0291
;
; **** POINTERS **** 
;
p0100 = $0100
p0102 = $0102
p0103 = $0103
p0105 = $0105
p0200 = $0200
p0507 = $0507
p070F = $070F
p0A13 = $0A13
p2000 = $2000
;
; **** PREDEFINED LABELS **** 
;
VICCR5 = $9005
VICCRA = $900A
VICCRB = $900B
VICCRC = $900C
VICCRD = $900D
VICCRE = $900E
VICCRF = $900F
VIA1IER = $911E
VIA1PA2 = $911F
VIA2PB = $9120
VIA2DDRB = $9122
ROM_ISCNTC = $FFE1

        * = $1001

;-----------------------------------------------------------------------------------------------------
; SYS 7076 (PrepareGame)
; This launches the program from address $1BA4, i.e. DrawTitleScreen.
;-----------------------------------------------------------------------------------------------------
; $9E = SYS
        .BYTE $0B,$12,$0A,$00,$9E,$37,$30,$37
        .BYTE $36,$00,$00,$00

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
        JMP DrawCurrentHiscore

b10DB   JMP j1BCA

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

        CMP aCE
f10EF   .BYTE $02,$A8,$83,$A9,$B1,$B9,$B8,$B2
        .BYTE $8A,$83,$8D,$BD,$39,$3B,$BC,$76
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
        STA a0291
        JSR ClearScreen
        JSR DrawBannerTopOfScreen
        JSR DrawGrid
        JMP j1B80

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
b1179   LDA #$00
        STA (screenRamLoPtr),Y

        LDA screenRamHiPtr
        PHA 
        ; Move the Hi pointer to COLOR RAM
        CLC 
        ADC #$78
        STA screenRamHiPtr

        ; Draw the color
        LDA #$02
        STA (screenRamLoPtr),Y

        PLA 
        STA screenRamHiPtr
        DEY 
        BNE b1179

        LDA screenRamLoPtr
        CLC 
        ADC #$16
        STA screenRamLoPtr
        LDA screenRamHiPtr
        ADC #$00
        STA screenRamHiPtr
        DEX 
        BNE b1177
        RTS 

;---------------------------------------------------------------------------------
; j11A0   
;---------------------------------------------------------------------------------
j11A0   
        LDA #$13
        STA a07
        LDA #$0A
        STA a08
        LDA #$00
        STA a0B
        STA a13
        STA a14
        LDA #$10
        STA a0E
        LDA #$0B
        STA a15
        LDA #$03
        STA a11
        LDA #$01
        STA a12
        LDA #$04
        STA a10
        JSR s1623
        LDA #$04
        STA a2C
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
        JSR s1389
        JSR s13B4
        JSR s1501
        JSR s157F
        JSR s15A7
        JSR s162E
        JSR s16AF
        JSR s1DB5
        JMP MainGameLoop

;---------------------------------------------------------------------------------
; j1226   
;---------------------------------------------------------------------------------
j1226   
        LDA #$13
        STA a25
        JMP j11A0

        .BYTE $EA,$EA,$EA
        JSR ROM_ISCNTC ;$FFE1 - check stop key
        BNE MainGameLoop
        RTS 

;-------------------------------------------------------------------------
; s1236
;-------------------------------------------------------------------------
s1236
        LDA #>SCREEN_RAM
        STA screenRamHiPtr
        LDA #<SCREEN_RAM
        STA screenRamLoPtr
        LDX a03
b1240   LDA screenRamLoPtr
        CLC 
        ADC #$16
        STA screenRamLoPtr
        LDA screenRamHiPtr
        ADC #$00
        STA screenRamHiPtr
        DEX 
        BNE b1240
        LDY a04
        RTS 

;-------------------------------------------------------------------------
; s1253
;-------------------------------------------------------------------------
s1253
        TXA 
        PHA 
        TYA 
        PHA 
        JSR s1236
        LDA a05
        STA (screenRamLoPtr),Y
        LDA screenRamHiPtr
        CLC 
        ADC #$78
        STA screenRamHiPtr
        LDA a06
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

        LDA a07
        STA a03

        LDA a08
        STA a04

        JSR s1236

        LDA (screenRamLoPtr),Y
        CMP #$07
        BEQ b1289
        CMP #$00
        BEQ b1289
        JSR s19E6
b1289   LDA #<p0200
        STA a05
        LDA #>p0200
        STA a06
        JSR s1253

        LDA joystickInput
        AND #$01
        BEQ b12A6
        DEC a03
        LDA a03
        CMP #$0C
        BNE b12A6
        LDA #$0D
        STA a03
b12A6   LDA joystickInput
        AND #$02
        BEQ b12AE
        INC a03
b12AE   LDA joystickInput
        AND #$04
        BEQ b12B6
        DEC a04
b12B6   LDA joystickInput
        AND #$08
        BEQ b12BE
        INC a04
b12BE   JSR s1236
        LDA (screenRamLoPtr),Y
        CMP #$00
        BEQ b12E1
        CMP #$01
        BNE b12D6
b12CB   LDA a07
        STA a03
        LDA a08
        STA a04
        JMP j12E9

b12D6   CMP #$02
        BEQ b12CB
        CMP #$20
        BEQ b12CB
        JSR s19E6
b12E1   LDA a03
        STA a07
        LDA a04
        STA a08
j12E9   LDA #<p0507
        STA a05
        LDA #>p0507
        STA a06
        JMP s1253

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
        LDA a0B
        BNE b1331
        JSR GetJoystickInput
        LDA joystickInput
        AND #$80
        BNE b130A
        RTS 

b130A   LDA #$01
        STA a0B
        LDA a07
        STA a03
        DEC a03
        LDA a08
        STA a04
        JSR s1236
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
        LDA #$09
        STA (bulletScreenRamLoPtr),Y
        RTS 

b1342   JSR s1547
        LDA #$00
        STA (bulletScreenRamLoPtr),Y
        LDA bulletScreenRamHiPtr
        PHA 
        CLC 
        ADC #$78
        STA bulletScreenRamHiPtr
        LDA #$02
        STA (bulletScreenRamLoPtr),Y
        PLA 
        STA bulletScreenRamHiPtr
        LDY #$16
b135A   DEC bulletScreenRamLoPtr
        JMP j13A9

        .BYTE $0D
b1360   DEY 
        BNE b135A
        LDA (bulletScreenRamLoPtr),Y
        CMP #$00
        BEQ b1375
        CMP #$20
        BNE b1372
        LDA #$00
        STA a0B
        RTS 

b1372   JSR s1547
b1375   LDA #$08
        STA (bulletScreenRamLoPtr),Y
        LDA bulletScreenRamHiPtr
        PHA 
        CLC 
        ADC #$78
        STA bulletScreenRamHiPtr
        LDA #$01
        STA (bulletScreenRamLoPtr),Y
        PLA 
        STA bulletScreenRamHiPtr
        RTS 

;-------------------------------------------------------------------------
; s1389
;-------------------------------------------------------------------------
s1389
        LDA frameRateCounter
        AND #$01
        BEQ b139D
        RTS 

j1390   LDA VICCRD   ;$900D - frequency of sound osc.4 (noise)
        AND #$80
        BEQ b139A
        DEC VICCRD   ;$900D - frequency of sound osc.4 (noise)
b139A   JMP MaybeFireBullet

b139D   DEC a0E
        BEQ b13A2
        RTS 

b13A2   LDA #$22
        STA a0E
        JMP j1390

j13A9   LDA bulletScreenRamLoPtr
        CMP #$FF
        BNE b1360
        DEC bulletScreenRamHiPtr
        JMP b1360

;-------------------------------------------------------------------------
; s13B4
;-------------------------------------------------------------------------
s13B4
        LDA frameRateCounter
        CMP #$01
        BEQ b13BB
        RTS 

b13BB   DEC a10
        BEQ b13C0
        RTS 

b13C0   LDA #$04
        STA a10
        LDA a11
        STA a03
        LDA #<p2000
        STA a04
        LDA #>p2000
        STA a05
        JSR s1253
        INC a11
        LDA a11
        CMP #$14
        BNE b13DF
        LDA #$02
        STA a11
b13DF   LDA #$14
        STA a03
        LDA a12
        STA a04
        JSR s1253
        INC a12
        LDA a12
        CMP #$16
        BNE b13F6
        LDA #$01
        STA a12
b13F6   LDA a12
        STA a04
        LDA #<p0102
        STA a05
        LDA #>p0102
        STA a06
        JSR s1253
        LDA a11
        STA a03
        LDA #<p0100
        STA a04
        LDA #>p0100
        STA a05
        JSR s1253
        DEC a15
        BEQ b1419
        RTS 

b1419   LDA #$0B
        STA a15
        LDA a13
        BEQ b1422
        RTS 

b1422   LDA a11
        STA a13
        LDA a12
        STA a14
        LDA #$87
        STA VICCRB   ;$900B - frequency of sound osc.2 (alto)
        LDA #$C2
        STA VICCRA   ;$900A - frequency of sound osc.1 (bass)
        LDA #$01
        STA a18
        RTS 

;---------------------------------------------------------------------------------
; j1439   
;---------------------------------------------------------------------------------
j1439   
        JSR MaybeFireBullet
        JMP j1445

        .BYTE $EA,$EA,$EA,$EA,$EA,$EA
;---------------------------------------------------------------------------------
; j1445   
;---------------------------------------------------------------------------------
j1445   
        LDA a14
        STA a04
        LDA #$13
        STA a03
        JSR s1236
        LDA #$05
        STA a16
        LDA (screenRamLoPtr),Y
        CMP a16
        BNE b145E
        LDA #$06
        STA a16
b145E   LDA #$13
        STA a17
b1462   LDA a17
        STA a03
        LDA a16
        STA a05
        LDA #$07
        STA a06
        JSR s1253
        DEC a17
        LDA a17
        CMP #$02
        BNE b1462
        LDA a13
        STA a03
        LDA a18
        STA a04
        JSR s1236
        LDA #$03
        STA a16
        LDA (screenRamLoPtr),Y
        CMP a16
        BNE b1492
        LDA #$04
        STA a16
b1492   LDA #<p0200
        STA a05
        LDA #>p0200
        STA a06
        JSR s1253
        INC a18
        LDA a18
        STA a04
        JSR s1236
        LDA (screenRamLoPtr),Y
        CMP #$05
        BEQ b14BB
        CMP #$06
        BEQ b14BB
        LDA a16
        STA a05
        LDA #$07
        STA a06
        JMP s1253

b14BB   LDA a14
        STA a04
        LDA #<p0200
        STA a05
        LDA #>p0200
        STA a06
        LDA #$13
        STA a17
b14CB   LDA a17
        STA a03
        JSR s1253
        DEC a17
        LDA a17
        CMP #$02
        BNE b14CB
        LDA a13
        STA a03
        LDA a18
        STA a04
        LDA #<p070F
        STA a05
        LDA #>p070F
        STA a06
        JSR s1253
        NOP 
        NOP 
        NOP 
        LDA #$0B
        STA a15
        LDA #$00
        STA a13
        STA a14
        STA VICCRA   ;$900A - frequency of sound osc.1 (bass)
        STA VICCRB   ;$900B - frequency of sound osc.2 (alto)
        RTS 

;-------------------------------------------------------------------------
; s1501
;-------------------------------------------------------------------------
s1501
        LDA a0E
        CMP #$01
        BEQ b1508
        RTS 

b1508   LDA a14
        BNE b150D
        RTS 

b150D   JMP j1439

b1510   LDX #$06
b1512   CMP f154B,X
        BEQ b151E
        DEX 
        BNE b1512
        JMP j1959

        RTS 

b151E   CMP #$0D
        BEQ b152F
        DEX 
        LDA f154B,X
        STA (bulletScreenRamLoPtr),Y
j1528   LDA #$00
        STA a0B
        PLA 
        PLA 
        RTS 

b152F   LDA #$00
        STA (bulletScreenRamLoPtr),Y
        LDA bulletScreenRamHiPtr
        CLC 
        ADC #$78
        STA bulletScreenRamHiPtr
        LDA #$02
        STA (bulletScreenRamLoPtr),Y
        JSR s1552
        JSR s15A0
        JMP j1528

;-------------------------------------------------------------------------
; s1547
;-------------------------------------------------------------------------
s1547
        CMP #$00
        BNE b1510
f154B   RTS 

        .BYTE $0D,$0E,$0F,$10,$11,$12
;-------------------------------------------------------------------------
; s1552
;-------------------------------------------------------------------------
s1552
        LDA #$F0
        STA VICCRC   ;$900C - frequency of sound osc.3 (soprano)
        LDA #$03
        STA a1B
        RTS 

b155C   LDA VICCRC   ;$900C - frequency of sound osc.3 (soprano)
        AND #$80
        BNE b1564
        RTS 

b1564   DEC VICCRC   ;$900C - frequency of sound osc.3 (soprano)
        LDA VICCRC   ;$900C - frequency of sound osc.3 (soprano)
        CMP #$E0
        BEQ b156F
        RTS 

b156F   DEC a1B
        BNE b1579
        LDA #$00
        STA VICCRC   ;$900C - frequency of sound osc.3 (soprano)
        RTS 

b1579   LDA #$F0
        STA VICCRC   ;$900C - frequency of sound osc.3 (soprano)
        RTS 

;-------------------------------------------------------------------------
; s157F
;-------------------------------------------------------------------------
s157F
        LDA a0E
        CMP #$01
        BEQ b155C
        RTS 

b1586   TXA 
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
        BNE b1586
        RTS 

;-------------------------------------------------------------------------
; s15A0
;-------------------------------------------------------------------------
s15A0
        LDX #$06
        LDY #$01
        JMP b1586

;-------------------------------------------------------------------------
; s15A7
;-------------------------------------------------------------------------
s15A7
        LDA a15
        CMP #$02
        BEQ b15AE
        RTS 

b15AE   LDA #$01
        STA a15
        LDY #$00
b15B4   LDA SCREEN_RAM + $002C,Y
        BEQ b15BF
        JSR s15D3
        STA SCREEN_RAM + $002C,Y
b15BF   INY 
        BNE b15B4
b15C2   LDA SCREEN_RAM + $012C,Y
        BEQ b15CD
        JSR s15D3
        STA SCREEN_RAM + $012C,Y
b15CD   INY 
        CPY #$8A
        BNE b15C2
        RTS 

;-------------------------------------------------------------------------
; s15D3
;-------------------------------------------------------------------------
s15D3
        STX a16
        LDX #$06
b15D7   CMP f154B,X
        BEQ b15E2
        DEX 
        BNE b15D7
        LDX a16
        RTS 

b15E2   CMP #$12
        BEQ b15ED
        INX 
        LDA f154B,X
        LDX a16
        RTS 

b15ED   LDX #$0E
b15EF   LDA @wf0031,X
        BEQ b15FB
        DEX 
        DEX 
        BNE b15EF
        LDA #$12
        RTS 

b15FB   LDA #$1E
        STA @wf0031,X
        LDA SCREEN_RAM + $002C,Y
        CMP #$12
        BEQ b160C
        LDA #$1F
        STA @wf0031,X
b160C   LDA #$2C
        STA @wf0030,X
        TYA 
        PHA 
b1613   INC @wf0030,X
        BNE b161B
        INC @wf0031,X
b161B   DEY 
        BNE b1613
        PLA 
        TAY 
        LDA #$0A
        RTS 

;-------------------------------------------------------------------------
; s1623
;-------------------------------------------------------------------------
s1623
        LDX #$0F
        LDA #$00
b1627   STA @wf0030,X
        DEX 
        BNE b1627
        RTS 

;-------------------------------------------------------------------------
; s162E
;-------------------------------------------------------------------------
s162E
        LDA a0E
        CMP #$02
        BEQ b16A3
        RTS 

j1635   LDX #$0F
b1637   LDA @wf0030,X
        BEQ b1689
        STA a2E
        LDA @wf002F,X
        STA a2D
        LDA #$00
        LDY #$00
        STA (p2D),Y
        LDA a2E
        CLC 
        ADC #$78
        STA a2E
        LDA #$02
        STA (p2D),Y
        LDA @wf002F,X
        CLC 
        ADC #$16
        STA @wf002F,X
        LDA @wf0030,X
        ADC #$00
        STA @wf0030,X
        STA a2E
        LDA @wf002F,X
        STA a2D
        LDA (p2D),Y
        CMP #$20
        BEQ b1691
        CMP #$02
        BEQ b1691
        CMP #$07
        BEQ b168E
        LDA #$0A
        STA (p2D),Y
        LDA a2E
        CLC 
        ADC #$78
        STA a2E
        LDA #$01
        STA (p2D),Y
b1689   JMP j169C

        TAX 
        RTS 

b168E   JMP j1A0A

b1691   LDA #$00
        STA @wf0030,X
        STA @wf002F,X
        JMP b1689

j169C   DEX 
        DEX 
        CPX #$FF
        BNE b1637
        RTS 

b16A3   DEC a2C
        BEQ b16A8
        RTS 

b16A8   LDA #$03
        STA a2C
        JMP j1635

;-------------------------------------------------------------------------
; s16AF
;-------------------------------------------------------------------------
s16AF
        LDA frameRateCounter
        AND #$01
        BEQ b16B6
        RTS 

b16B6   DEC a24
        JMP j185A

j16BB   LDA #$A0
        STA a24
        INC a25
        LDA a25
        CMP #$16
        BNE b16CB
        LDA #$13
        STA a25
b16CB   LDA a28
        BNE b16D0
        RTS 

b16D0   CLC 
        ASL 
        CLC 
        ADC a28
        TAX 
b16D6   LDA f1000,X
        STA screenRamLoPtr
        LDA $1001,X
        STA screenRamHiPtr
        LDY #$00
        LDA (screenRamLoPtr),Y
        CMP #$05
        BEQ b16F6
        CMP #$06
        BEQ b16F6
        CMP #$05
        BEQ b16F6
        CMP #$06
        BEQ b16F6
        BNE b16F9
b16F6   JMP j18D1

b16F9   LDA $1002,X
        AND #$80
        BEQ b170F
        LDA #$00
        STA (screenRamLoPtr),Y
        LDA screenRamHiPtr
        CLC 
        ADC #$78
        STA screenRamHiPtr
        LDA #$02
        STA (screenRamLoPtr),Y
b170F   LDA $1002,X
        AND #$40
        BNE b173B
        LDA f0FFD,X
        STA f1000,X
        STA screenRamLoPtr
        LDA f0FFE,X
        STA screenRamHiPtr
        STA $1001,X
        LDA #$13
        STA (screenRamLoPtr),Y
        LDA screenRamHiPtr
        CLC 
        ADC #$78
        STA screenRamHiPtr
        LDA #$03
        STA (screenRamLoPtr),Y
j1735   DEX 
        DEX 
        DEX 
        BNE b16D6
        RTS 

b173B   LDA f1000,X
        STA screenRamLoPtr
        LDA $1001,X
        STA screenRamHiPtr
        LDA #$01
        STA a26
        LDA $1002,X
        AND #$07
        CMP #$01
        BEQ b177B
        CMP #$00
        BEQ b178B
        CMP #$03
        BNE b1761
        LDA #$17
        STA a26
        JMP b178B

b1761   CMP #$02
        BNE b176C
        LDA #$15
        STA a26
        JMP b178B

b176C   CMP #$04
        BNE b1777
        LDA #$15
        STA a26
        JMP b177B

b1777   LDA #$17
        STA a26
b177B   LDA screenRamLoPtr
        CLC 
        ADC a26
        STA screenRamLoPtr
        LDA screenRamHiPtr
        ADC #$00
        STA screenRamHiPtr
        JMP j179A

b178B   LDY a26
b178D   DEC screenRamLoPtr
        LDA screenRamLoPtr
        CMP #$FF
        BNE b1797
        DEC screenRamHiPtr
b1797   DEY 
        BNE b178D
j179A   JSR s1A0D
        NOP 
        BEQ b17F9
        CMP #$20
        BEQ b17C6
        CMP #$02
        BEQ b17C6
j17A8   LDA $1002,X
        AND #$01
        BNE b17B5
        INC $1002,X
        JMP j17B8

b17B5   DEC $1002,X
j17B8   JSR s1815
        NOP 
        LDA $1002,X
        AND #$02
        BNE b178B
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

b17D8   LDA $1002,X
        AND #$04
        BNE b17EC
b17E0   =*+$01
        JMP j1834

        AND #$C1
        ORA #$04
        STA $1002,X
        JMP j1834

b17EC   LDA $1002,X
        AND #$C1
        ORA #$02
        STA $1002,X
        JMP j1834

b17F9   LDA a25
        LDY #$00
        STA (screenRamLoPtr),Y
        LDA screenRamHiPtr
        STA $1001,X
        CLC 
        ADC #$78
        STA screenRamHiPtr
        LDA #$03
        STA (screenRamLoPtr),Y
        LDA screenRamLoPtr
        STA f1000,X
        JMP j1735

;-------------------------------------------------------------------------
; s1815
;-------------------------------------------------------------------------
s1815
        LDA $1002,X
        AND #$01
        BEQ b1827
        INC screenRamLoPtr
        BNE b1822
        INC screenRamHiPtr
b1822   LDA #$16
        STA a26
        RTS 

b1827   DEC screenRamLoPtr
        LDA screenRamLoPtr
        CMP #$FF
        BNE b1822
        DEC screenRamHiPtr
        JMP b1822

j1834   LDA #$1F
        STA $1001,X
        LDA #$0A
        STA f1000,X
        LDA $1002,X
        AND #$01
        BNE b184D
        LDA $1002,X
        ORA #$01
        STA $1002,X
b184D   LDA $1001,X
        STA screenRamHiPtr
        LDA f1000,X
        STA screenRamLoPtr
        JMP b17F9

j185A   LDA a24
        BEQ b185F
        RTS 

b185F   DEC a21
        BNE b186B
        LDA #$20
        ASL 
        STA a21
        JMP j18BF

b186B   LDA a21
        CMP a23
        BMI b1876
        BEQ b1876
        JMP j16BB

b1876   LDA a22
        BNE b187D
        JMP j16BB

b187D   INC a28
        NOP 
        NOP 
        NOP 
        LDA a28
        CLC 
        ASL 
        CLC 
        ADC a28
        TAX 
        LDA #$1E
        STA $1001,X
        LDA #$32
        STA f1000,X
        LDA a21
        CMP a23
        BNE b18AF
        LDA #$C0
        STA $1002,X
        LDA aA2
        AND #$01
        BEQ b18AA
        LDA #$C1
        STA $1002,X
b18AA   DEC aFF
        JMP j16BB

b18AF   LDA f0FFF,X
        AND #$4F
        STA f0FFF,X
        LDA #$80
        STA $1002,X
        JMP j16BB

j18BF   DEC a22
        JMP j18C4

j18C4   LDA a22
        CMP #$FF
        BNE b18CE
        LDA #$00
        STA a22
b18CE   JMP j16BB

j18D1   DEC a29
        LDA a28
        CMP #$01
        BNE b190D
        LDA $1002,X
        AND #$C0
        BEQ b18EA
        LDA a23
        CMP #$01
        BNE b18EA
        NOP 
        NOP 
        NOP 
        RTS 

b18EA   DEC a28
        LDA #$0F
        LDY #$00
        STA (screenRamLoPtr),Y
        LDA screenRamHiPtr
        CLC 
        ADC #$78
        STA screenRamHiPtr
        LDA #$07
        STA (screenRamLoPtr),Y
        LDY #$01
        LDX #$05
        LDA #$F0
        STA VICCRC   ;$900C - frequency of sound osc.3 (soprano)
        LDA #$03
        STA a1B
        JMP b1586

b190D   JMP j1971

j1910   LDA a28
        CLC 
        ASL 
        CLC 
        ADC a28
        STA a2D
j1919   LDA $1003,X
        STA f1000,X
        LDA $1004,X
        STA $1001,X
        LDA $1005,X
        STA $1002,X
        CPX a2D
        BEQ b18EA
        INX 
        INX 
        INX 
        JMP j1919

b1935   LDA $1002,X
        AND #$40
        BNE b1945
        JSR s19D8
        STA f0FFF,X
        JMP j1910

b1945   JSR s1B67
        STA $1005,X
        TXA 
        PHA 
        LDY #$03
        LDX #$05
        JSR b1586
        PLA 
        TAX 
        JMP j1910

j1959   LDA (bulletScreenRamLoPtr),Y
        CMP #$13
        BEQ b1968
        CMP #$14
        BEQ b1968
        CMP #$15
        BEQ b1968
        RTS 

b1968   JMP j1993

        .BYTE $0B,$68,$68
        JMP j1993

j1971   LDA $1002,X
        AND #$C0
        BNE b1935
        TXA 
        PHA 
b197A   DEX 
        DEX 
        DEX 
        LDA $1002,X
        AND #$40
        BEQ b197A
        LDA $1002,X
        STA a2D
        PLA 
        TAX 
        LDA a2D
        JSR s19DF
        JMP j19C6

j1993   PLA 
        PLA 
        LDA #$00
        STA a0B
        LDA a28
        CLC 
        ASL 
        CLC 
        ADC a28
        TAX 
j19A1   LDA f1000,X
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

b19B2   LDA $1001,X
        CMP bulletScreenRamHiPtr
        BNE b19A8
        LDA bulletScreenRamLoPtr
        STA screenRamLoPtr
        LDA bulletScreenRamHiPtr
        STA screenRamHiPtr
        LDY #$00
        JMP j18D1

j19C6   LDA f0FFF,X
        ORA #$80
        STA f0FFF,X
        JMP j1910

j19D1   LDA $1002,X
        ORA $1005,X
        RTS 

;-------------------------------------------------------------------------
; s19D8
;-------------------------------------------------------------------------
s19D8
        LDA $1002,X
        ORA f0FFF,X
        RTS 

;-------------------------------------------------------------------------
; s19DF
;-------------------------------------------------------------------------
s19DF
        ORA $1005,X
        STA $1005,X
        RTS 

;-------------------------------------------------------------------------
; s19E6
;-------------------------------------------------------------------------
s19E6
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
; j1A0A   
;---------------------------------------------------------------------------------
j1A0A   
        JMP j1B07

;-------------------------------------------------------------------------
; s1A0D
;-------------------------------------------------------------------------
s1A0D
        LDY #$00
        LDA (screenRamLoPtr),Y
        CMP #$07
        BEQ b1A08
        LDA (screenRamLoPtr),Y
        RTS 

        LDA #$FF
        STA VICCR5   ;$9005 - screen map & character map address
        JMP DrawBannerTopOfScreen

f1A20   .BYTE $EA,$0D,$1C,$1C,$1C,$0D,$FE,$FE
f1A28   .BYTE $FE,$FB,$FB,$0A,$19,$19,$19,$0A
f1A30   .BYTE $FB,$00,$01,$01,$01,$00,$81,$81
f1A38   .BYTE $81,$81,$81,$00,$01,$01,$01,$00
        .BYTE $81
;---------------------------------------------------------------------------------
; j1A41   
;---------------------------------------------------------------------------------
j1A41   
        PLA 
        PLA 
        LDA a07
        LDY #$08
b1A47   STA f1A20,Y
        DEY 
        BNE b1A47
        LDA a08
        LDY #$08
b1A51   STA f1A28,Y
        DEY 
        BNE b1A51
        LDA #$16
        STA a2D
        LDA #$80
        STA VICCRD   ;$900D - frequency of sound osc.4 (noise)
        JSR s1AFB
j1A63   LDX #$08
b1A65   LDA f1A20,X
        STA a03
        LDA f1A28,X
        STA a04
        TXA 
        PHA 
        JSR s1236
        LDA (screenRamLoPtr),Y
        CMP a2D
        BNE b1A85
        LDA #<p0200
        STA a05
        LDA #>p0200
        STA a06
        JSR s1253
b1A85   PLA 
        TAX 
        DEX 
        BNE b1A65
        LDX #$08
b1A8C   INC f1A20,X
        LDA f1A30,X
        BEQ b1A9B
        CMP #$81
        BNE b1A9E
        DEC f1A20,X
b1A9B   DEC f1A20,X
b1A9E   INC f1A28,X
        LDA f1A38,X
        BEQ b1AAD
        CMP #$81
        BNE b1AB0
        DEC f1A28,X
b1AAD   DEC f1A28,X
b1AB0   DEX 
        BNE b1A8C
        INC a2D
        LDA a2D
        CMP #$19
        BNE b1ABF
        LDA #$16
        STA a2D
b1ABF   LDX #$08
b1AC1   LDA f1A20,X
        STA a03
        LDA f1A28,X
        STA a04
        TXA 
        PHA 
        JSR s1236
        LDA (screenRamLoPtr),Y
        BNE b1ADF
        LDA a2D
        STA a05
        LDA #$01
        STA a06
        JSR s1253
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
        JMP j1A63

b1AF8   JMP j1B91

;-------------------------------------------------------------------------
; s1AFB
;-------------------------------------------------------------------------
s1AFB
        LDA #$00
        STA VICCRA   ;$900A - frequency of sound osc.1 (bass)
        STA VICCRB   ;$900B - frequency of sound osc.2 (alto)
        STA VICCRC   ;$900C - frequency of sound osc.3 (soprano)
        RTS 

j1B07   LDA a07
        STA a03
        LDA a08
        STA a04
        LDA #<p0200
        STA a05
        LDA #>p0200
        STA a06
        JSR s1253
        JMP j1A41

;-------------------------------------------------------------------------
; s1B1D
;-------------------------------------------------------------------------
s1B1D
        LDY #$00
        LDA #$20
b1B21   STA SCREEN_RAM + $002C,Y
        STA SCREEN_RAM + $0100,Y
        DEY 
        BNE b1B21
j1B2A   LDY #$04
b1B2C   LDA f1B70,Y
        STA SCREEN_RAM + $004A,Y
        LDA #$01
        STA COLOR_RAM + $004A,Y
        DEY 
        BNE b1B2C
        DEC aF0
        BEQ b1B3E
b1B3E   LDA aF0
        CLC 
        ADC #$B0
        STA SCREEN_RAM + $004E
        LDA #$10
        STA a2D
b1B4A   DEY 
        BNE b1B4A
        DEX 
        BNE b1B4A
        DEC a2D
        BNE b1B4A
        JSR DrawGrid
;-------------------------------------------------------------------------
; s1B57
;-------------------------------------------------------------------------
s1B57
        LDY aF1
        LDA f1D50,Y
        STA a22
        LDA f1D66,Y
        STA a23
        ASL 
        STA a21
        RTS 

;-------------------------------------------------------------------------
; s1B67
;-------------------------------------------------------------------------
s1B67
        LDA $1002,X
        AND #$80
        JMP j1B75

        NOP 
f1B70   .BYTE $EA,$1B,$1C,$20,$20
;---------------------------------------------------------------------------------
; j1B75   
;---------------------------------------------------------------------------------
j1B75   
        BEQ b1B7D
        LDA #$40
        STA $1002,X
        NOP 
b1B7D   JMP j19D1

;---------------------------------------------------------------------------------
; j1B80   
;---------------------------------------------------------------------------------
j1B80   
        LDA #>p0105
        STA aF1
        LDA #<p0105
        STA aF0
        JSR s1B57
        NOP 
        NOP 
        NOP 
        JMP j1B98

j1B91   JSR s1B1D
        LDA aF0
        BEQ b1BA7
j1B98   LDA #$00
        STA a28
        LDA #$0F
        STA VICCRE   ;$900E - sound volume
        JMP j1226

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

UpdateHiScore   
        CPY #$07
        BNE b1BBB
        BEQ DrawCurrentHiscore
j1BCA   LDY #$07
b1BCC   LDA SCREEN_RAM + $000E,Y
        STA currentHighScore - $01,Y
        DEY 
        BNE b1BCC

DrawCurrentHiscore   
        LDY #$0A
b1BD7   LDA highScoreText,Y
        STA SCREEN_RAM + $0048,Y
        LDA f10EF,Y
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
highScoreText   .BYTE $00,$1D,$1E
f1D45   .BYTE $1F
currentHighScore   .BYTE $B0,$B0,$B0,$B0,$B0,$B0,$B0,$B0
        .BYTE $B0,$B0
f1D50   .BYTE $00,$01,$02,$06,$04,$06,$07,$04
        .BYTE $05,$0B,$07,$08,$09,$07,$06,$06
        .BYTE $07,$08,$07,$08,$09,$00
f1D66   .BYTE $00,$07,$07,$05,$07,$06,$06,$09
        .BYTE $09,$03,$08,$08,$08,$09,$0A,$0B
        .BYTE $0A,$0A,$0B,$0B,$0B,$00,$00,$00
        .BYTE $00,$00,$FE,$FE,$00,$82,$82,$82
        .BYTE $FE,$00,$08,$08,$00,$08
;---------------------------------------------------------------------------------
; j1D8C   
;---------------------------------------------------------------------------------
j1D8C   
        INC aF1
        LDA aF1
        CMP #$14
        BNE b1D96
        DEC aF1
b1D96   LDY #$00
        LDA #$20
b1D9A   STA SCREEN_RAM + $002C,Y
        JMP j1DC7

j1DA0   LDY #$0B
b1DA2   LDA f1DF0,Y
        STA SCREEN_RAM + $009F,Y
        LDA #$03
        STA COLOR_RAM + $009F,Y
        DEY 
        BNE b1DA2
        INC aF0
        JMP j1B2A

;-------------------------------------------------------------------------
; s1DB5
;-------------------------------------------------------------------------
s1DB5
        LDA a28
        BEQ b1DBA
        RTS 

b1DBA   LDA a22
        BEQ b1DBF
        RTS 

b1DBF   PLA 
        PLA 
        JSR s1DD0
        JMP j1226

j1DC7   STA SCREEN_RAM + $012C,Y
        DEY 
        BNE b1D9A
        JMP j1DA0

;-------------------------------------------------------------------------
; s1DD0
;-------------------------------------------------------------------------
s1DD0
        JSR s1AFB
        LDA #$00
        STA VICCRD   ;$900D - frequency of sound osc.4 (noise)
        INC aF0
        LDA aF0
        CMP #$0A
        BEQ b1DE7
        CMP #$0B
        BEQ b1DE7
        JMP j1D8C

b1DE7   DEC aF0
        JMP j1D8C

        .BYTE $00,$00,$00,$00
f1DF0   .BYTE $00,$87,$92,$89,$84,$20,$9A,$81
        .BYTE $90,$90,$85,$84,$00,$00,$00
f1DFF   .BYTE $FF
