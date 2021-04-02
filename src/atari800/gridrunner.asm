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
a8D = $8D
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
aA0 = $A0
aA1 = $A1
aA2 = $A2
aA3 = $A3
aA4 = $A4
aA5 = $A5
aA8 = $A8
aA9 = $A9
aAA = $AA
aAB = $AB
aAC = $AC
aAD = $AD
aD0 = $D0
aD1 = $D1
aD8 = $D8
;
; **** ZP POINTERS **** 
;
pA0 = $A0
;
; **** FIELDS **** 
;
f0600 = $0600
f0620 = $0620
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
f1000 = $1000
f100E = $100E
f100F = $100F
f101C = $101C
f1028 = $1028
f1077 = $1077
f10EF = $10EF
f1100 = $1100
f1190 = $1190
f11CB = $11CB
f1200 = $1200
f1243 = $1243
f1300 = $1300
;
; **** ABSOLUTE ADRESSES **** 
;
a0086 = $0086
a02E0 = $02E0
a02E1 = $02E1
a1027 = $1027
a11A1 = $11A1
a11A2 = $11A2
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
        LDX #$00
        LDA #$00
b3232   STA f1000,X
        STA f1100,X
        STA f1200,X
        STA f1300,X
        INX 
        BNE b3232
        LDA #$41
        STA a141B
        LDA #$00
        STA a141C
        LDA #$14
        STA a141D
        LDA #<f1000
        STA aA0
        LDA #>f1000
        STA aA1
        LDX #$00
b325A   LDA aA0
        STA f0600,X
        LDA aA1
        STA f0620,X
        LDA aA0
        CLC 
        ADC #$28
        STA aA0
        LDA aA1
        ADC #$00
        STA aA1
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
        LDX #$28
b3291   LDA f32A4,X
        CLC 
        SBC #$1F
        STA f0FFF,X
        DEX 
        BNE b3291
        LDA #$30
        STA CHBAS    ;CHBAS   shadow for CHBASE ($D409)
f32A4   =*+$02
;-------------------------------------------------------------------------
; j32A2
;-------------------------------------------------------------------------
j32A2
        JMP j32CD

        .TEXT "GRIDRUNNER  /@ 0000000  HI: 0000000  Z 0"
;-------------------------------------------------------------------------
; j32CD
;-------------------------------------------------------------------------
j32CD
        LDA #$14
        STA a1027
        LDA #$01
        STA aA2
        LDY #$00
        LDX #$3F
        LDA #$07
        JSR SETBV    ;$E45C (jmp) SETBV
        JSR s3C5D
        JSR s3D7B
;-------------------------------------------------------------------------
; j32E5
;-------------------------------------------------------------------------
j32E5
        JSR s3B39
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
; s3306
;-------------------------------------------------------------------------
s3306
        LDX aA3
        LDA f0600,X
        STA aA0
        LDA f0620,X
        STA aA1
        LDY aA4
        RTS 

;-------------------------------------------------------------------------
; s3315
;-------------------------------------------------------------------------
s3315
        JSR s3306
        LDA aA5
        STA (pA0),Y
        RTS 

;-------------------------------------------------------------------------
; s331D
;-------------------------------------------------------------------------
s331D
        JSR s3306
        LDA (pA0),Y
        RTS 

;-------------------------------------------------------------------------
; s3323
;-------------------------------------------------------------------------
s3323
        LDX #$00
        LDA #$00
b3327   STA f1028,X
        STA f1100,X
        STA f1200,X
        STA f1300,X
        DEX 
        BNE b3327
        RTS 

;-------------------------------------------------------------------------
; s3337
;-------------------------------------------------------------------------
s3337
        LDA #<p0102
        STA aA3
b333B   LDA #>p0102
        STA aA4
b333F   LDA #$01
        STA aA5
        JSR s3315
        INC aA4
        LDA aA4
        CMP #$27
        BNE b333F
        INC aA3
        LDA aA3
        CMP #$15
        BNE b333B
        RTS 

;-------------------------------------------------------------------------
; j3357
;-------------------------------------------------------------------------
j3357
        JSR s3323
        JSR s3337
        JSR s3374
        JMP j3403

;-------------------------------------------------------------------------
; s3363
;-------------------------------------------------------------------------
s3363
        LDA #<p2020
        STA aA0
b3367   LDA #>p2020
        STA aA1
b336B   DEC aA1
        BNE b336B
        DEC aA0
        BNE b3367
        RTS 

;-------------------------------------------------------------------------
; s3374
;-------------------------------------------------------------------------
s3374
        LDY #$F0
b3376   JSR s3363
        JSR s3363
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
        STA aA5
        JSR s33B4
        DEC a81
        LDA #$3F
        STA aA5
        JSR s33B4
        TXA 
        TAY 
b33AA   JSR s3363
        DEY 
        BNE b33AA
        DEX 
        BNE b338E
        RTS 

;-------------------------------------------------------------------------
; s33B4
;-------------------------------------------------------------------------
s33B4
        TXA 
        PHA 
        LDA #$14
        STA aA3
        LDA #$14
        CLC 
        SBC a81
        STA aA4
        JSR s3315
        LDX aD8
        LDA aA3
        CLC 
        SBC a81
        STA aA3
        JSR s3315
        LDA #$14
        STA aA4
        JSR s3315
        LDA aA4
        CLC 
        ADC a81
        STA aA4
        JSR s3315
        LDA #$14
        STA aA3
        JSR s3315
        PLA 
        TAX 
        RTS 

b33EB   LDX #$02
b33ED   LDY #$F0
b33EF   DEY 
        BNE b33EF
        DEX 
        BNE b33ED
        LDA aA0
        STA $D200    ;POT0
        INC aA0
        LDA aA0
        CMP #$80
        BNE b33EB
        RTS 

;-------------------------------------------------------------------------
; j3403
;-------------------------------------------------------------------------
j3403
        JSR s3337
        LDA #$14
        STA a82
        STA a81
        STA aA3
        STA aA4
        LDA #$03
        STA aA5
        JSR s3315
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
        STA aA0
        JSR b33EB
        LDA #$A8
        STA $D201    ;POT1
        LDA #$01
        STA aA0
        JSR b33EB
        LDA #$A3
        STA $D201    ;POT1
        LDA #$01
        STA aA0
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
        LDX aD8
        LDA f3D15,X
        STA aAC
        LDA f3D39,X
        STA aA9
        STA aAA
        LDA #$10
        STA aA8
        STA aAB
        LDA f3D5A,X
        STA a8D
        STA a8C
        JMP j3543

;-------------------------------------------------------------------------
; s34A4
;-------------------------------------------------------------------------
s34A4
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
        STA aA4
        LDA a82
        STA aA3
        JSR s331D
        CMP #$01
        BEQ b34CE
        CMP #$03
        BEQ b34CE
        JSR s3B23
b34CE   LDA a81
        STA aA4
        LDA a82
        STA aA3
        LDA #$01
        STA aA5
        JSR s3315
        LDA a84
        AND #$01
        BEQ b34EF
        DEC aA3
        LDA aA3
        CMP #$0C
        BNE b34EF
        LDA #$0D
        STA aA3
b34EF   LDA a84
        AND #$02
        BEQ b34FF
        INC aA3
        LDA aA3
        CMP #$15
        BNE b34FF
        DEC aA3
b34FF   LDA a84
        AND #$04
        BEQ b350F
        DEC aA4
        LDA aA4
        CMP #$00
        BNE b350F
        INC aA4
b350F   LDA a84
        AND #$08
        BEQ b351F
        INC aA4
        LDA aA4
        CMP #$27
        BNE b351F
        DEC aA4
b351F   JSR s331D
        CMP #$01
        BEQ b352C
        JSR s3B23
        JMP j3534

b352C   LDA aA4
        STA a81
        LDA aA3
        STA a82
;-------------------------------------------------------------------------
; j3534
;-------------------------------------------------------------------------
j3534
        LDA a82
        STA aA3
        LDA a81
        STA aA4
        LDA #$03
        STA aA5
        JMP s3315

;-------------------------------------------------------------------------
; j3543
;-------------------------------------------------------------------------
j3543
        LDA #$02
        STA ATRACT   ;ATRACT  screen attract counter
        JSR s34A4
        JSR s3565
        JSR s356B
        JSR s35F9
        JSR s3674
        JSR s37AF
        JSR s3816
        JSR s3875
        JSR s3DAC
        JMP j3543

;-------------------------------------------------------------------------
; s3565
;-------------------------------------------------------------------------
s3565
        LDY #$20
b3567   DEY 
        BNE b3567
        RTS 

;-------------------------------------------------------------------------
; s356B
;-------------------------------------------------------------------------
s356B
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
        STA aA4
        LDA a88
        STA aA3
        JSR s331D
        CMP #$0A
        BEQ b35CB
        CMP #$09
        BEQ b35C4
        JSR s35F2
b35C4   LDA #$0A
        STA aA5
        JMP j35EF

b35CB   LDA #$01
        STA aA5
        JSR s3315
        LDA #$09
        STA aA5
        DEC a88
        LDA a88
        CMP #$02
        BNE b35E3
        LDA #$00
        STA a86
        RTS 

b35E3   STA aA3
        JSR s331D
        CMP #$01
        BEQ j35EF
        JSR s35F2
;-------------------------------------------------------------------------
; j35EF
;-------------------------------------------------------------------------
j35EF
        JMP s3315

;-------------------------------------------------------------------------
; s35F2
;-------------------------------------------------------------------------
s35F2
        JSR s371B
        JSR s3A18
        RTS 

;-------------------------------------------------------------------------
; s35F9
;-------------------------------------------------------------------------
s35F9
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
        STA aA4
        LDA #$15
        STA aA3
        LDA #$00
        STA aA5
        JSR s3315
        INC a8A
        LDA a8A
        CMP #$27
        BNE b3624
        LDA #$02
        STA a8A
b3624   STA aA4
        LDA #$04
        STA aA5
        JSR s3315
        LDA a8B
        STA aA3
        LDA #<p00
        STA aA4
        LDA #>p00
        STA aA5
        JSR s3315
        INC a8B
        LDA a8B
        CMP #$14
        BNE b3648
        LDA #$02
        STA a8B
b3648   STA aA3
        LDA #$02
        STA aA5
        JSR s3315
        DEC a8C
        BNE b3673
        LDA a8D
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
        STA aA5
        LDA #$FF
        SBC a90
        STA $D202    ;POT2
        LDA #$14
        STA aA3
        LDA a8E
        STA aA4
        JSR s331D
        CMP #$07
        BNE b36A5
        LDA #$08
        STA aA5
b36A5   LDA #$14
        STA aA3
b36A9   JSR s3315
        DEC aA3
        LDA aA3
        CMP #$01
        BNE b36A9
        LDA #$05
        STA aA5
        LDA a90
        STA aA4
        LDA a8F
        STA aA3
        JSR s331D
        CMP #$05
        BNE b36CB
        LDA #$06
        STA aA5
b36CB   LDA #$01
        STA (pA0),Y
        INC a90
        LDA a90
        STA aA4
        JSR s331D
        CMP #$07
        BEQ b36E3
        CMP #$08
        BEQ b36E3
        JMP s3315

b36E3   LDA #$01
        STA aA5
        LDA #$14
        STA aA3
        LDA a8E
        STA aA4
b36EF   JSR s3315
        DEC aA3
        LDA aA3
        CMP #$01
        BNE b36EF
        LDA #$00
        STA a91
        LDA #$00
        STA $D203    ;POT3
        LDA a90
        STA aA4
        LDA a8F
        STA aA3
        LDA #$0E
        STA aA5
f3711   =*+$02
        JMP s3315

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
        STA aA5
        CMP #$01
        BNE b3739
        LDX #$06
        LDY #$01
        JSR s3743
        JSR s375D
b3739   JSR s3315
        LDA #$00
        STA a86
        PLA 
        PLA 
        RTS 

;-------------------------------------------------------------------------
; s3743
;-------------------------------------------------------------------------
s3743
        TXA 
        PHA 
b3745   INC f100E,X
        LDA f100E,X
        CMP #$1A
        BNE b3757
        LDA #$10
        STA f100E,X
        DEX 
        BNE b3745
b3757   PLA 
        TAX 
        DEY 
        BNE s3743
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
        LDA #<f1028
        STA aA0
        LDA #>f1028
        STA aA1
        LDY #$00
b37C2   LDA (pA0),Y
        CMP #$01
        BEQ b37CB
        JSR s37D8
b37CB   INC aA0
        BNE b37C2
        INC aA1
        LDA aA1
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
        STA (pA0),Y
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
        STA (pA0),Y
        RTS 

b3809   LDA aA0
        STA f0680,X
        LDA aA1
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
        STA aA0
        LDA f06C0,X
        STA aA1
        LDY #$00
        LDA #$01
        STA (pA0),Y
        LDA aA0
        CLC 
        ADC #$28
        STA aA0
        LDA aA1
        ADC #$00
        STA aA1
        LDA (pA0),Y
        CMP #$03
        BNE b3853
        JMP j3A48

b3853   CMP #$00
        BEQ b386C
        CMP #$04
        BEQ b386C
        LDA aA0
        STA f0680,X
        LDA aA1
        STA f06C0,X
        LDA #$0B
        STA (pA0),Y
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
        STA aA4
        LDA f0900,X
        STA aA3
        LDA #$01
        STA aA5
        STX a9E
        LDA f0A00,X
        AND #$80
        BEQ b38A9
        JSR s3315
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
        INC aA4
        INC aA4
b38BD   DEC aA4
        JSR s331D
        CMP #$03
        BNE b38C9
        JMP j3A48

b38C9   LDX a9E
        CMP #$01
        BEQ b3908
        INC aA3
        LDA aA3
        CMP #$15
        BNE b38FD
        LDA #$01
        STA f0800,X
        STA aA4
        LDA #$0D
        STA f0900,X
        STA aA3
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
        STA aA5
        PLA 
        TAX 
        JMP j3929

b38FD   LDA f0A00,X
        EOR #$03
        STA f0A00,X
        JMP j38B2

b3908   LDA aA4
        STA f0800,X
        LDA aA3
        STA f0900,X
        JMP j38EF

b3915   LDA f07FF,X
        STA f0800,X
        STA aA4
        LDA f08FF,X
        STA f0900,X
        STA aA3
        LDA #$1F
        STA aA5
;-------------------------------------------------------------------------
; j3929
;-------------------------------------------------------------------------
j3929
        JSR s3315
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

b3941   LDA aAC
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
        CMP aA9
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
        DEC aAC
        LDA aA9
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
        CMP aA4
        BEQ b3990
b398C   DEX 
        BNE b3985
        RTS 

b3990   LDA f0900,X
        CMP aA3
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
        JSR s3743
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
        STA aA5
        LDA #$00
        STA a86
        JSR s3315
        PLA 
        PLA 
        PLA 
        PLA 
        LDX #$05
        LDY #$01
        JSR s3743
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
        JSR s331D
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
        STA aA4
        LDA a82
        STA aA3
        LDA #$01
        STA aA5
        JSR s3315
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
        STA aA5
        JSR s3AA6
        LDX aD0
        INX 
        LDA #$3E
        STA aA5
        JSR s3AAD
        JSR s3B08
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
        STA aA4
        LDA f0B20,X
        STA aA3
        STX a90
        JSR s331D
        CMP aD1
        BNE b3AF9
        JSR s3315
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
; s3B08
;-------------------------------------------------------------------------
s3B08
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
; s3B39
;-------------------------------------------------------------------------
s3B39
        JSR s3323
        INC a1027
        LDA a1027
        CMP #$1A
        BNE b3B49
        DEC a1027
b3B49   LDA #$00
        STA $D208    ;AUDCTL
        INC aD8
        LDA aD8
        CMP #$20
        BNE b3B5A
        LDA #$1F
        STA aD8
b3B5A   JSR s3B80
        LDA #$FC
        STA $D200    ;POT0
        LDA #$FF
        STA $D202    ;POT2
        LDA #$AA
        STA $D201    ;POT1
        STA $D203    ;POT3
        LDX #$00
        STX $D207    ;POT7
b3B74   JSR s3363
        DEX 
        BNE b3B74
        LDA #$04
        STA a140F
        RTS 

;-------------------------------------------------------------------------
; s3B80
;-------------------------------------------------------------------------
s3B80
        LDA #$06
        STA a140F
        LDX #$13
b3B87   LDA f3BAA,X
        CLC 
        SBC #$1F
        STA f1190,X
        DEX 
        BNE b3B87
        LDX aD8
b3B95   INC a11A2
        LDA a11A2
        CMP #$1A
        BNE b3BA7
        LDA #$10
        STA a11A2
        INC a11A1
b3BA7   DEX 
        BNE b3B95
f3BAA   RTS 

        .TEXT "ENTER GRID AREA 0"
f3BBC   .TEXT "0 DESIGNED AND PROGRAMMED BY JEFF MINTER"
f3BE4   .TEXT "   COPYRIGHT 1983 BY LLAMASOFT SOFTWARE "
f3C0C   .TEXT "   PRESS FIRE TO BEGIN OR UP FOR LEVELS "
f3C34   .TEXT "  MAY THE POWER OF THE GRID PRESERVE YOU"
        .TEXT " "
;-------------------------------------------------------------------------
; s3C5D
;-------------------------------------------------------------------------
s3C5D
        LDA #$00
        STA COLOR2   ;COLOR2  shadow for COLPF2 ($D018)
        JSR s3323
        LDA #$02
        STA a1408
        STA a140B
        STA a1411
        STA a1414
        LDA #$01
        STA aD8
        JSR s3B80
        LDX #$28
b3C7C   LDA f3BBC,X
        CLC 
        SBC #$1F
        STA f1077,X
        LDA f3BE4,X
        CLC 
        SBC #$1F
        STA f10EF,X
        LDA f3C0C,X
        CLC 
        SBC #$1F
        STA f11CB,X
        LDA f3C34,X
        CLC 
        SBC #$1F
        STA f1243,X
        DEX 
        BNE b3C7C
b3CA3   LDX #$20
b3CA5   JSR s3363
        LDA STRIG0   ;STRIG0  shadow for TRIG0 ($D001)
        BEQ b3CCB
        DEX 
        BNE b3CA5
        LDA STICK0   ;STICK0  shadow for PORTA lo ($D300)
        EOR #$FF
        AND #$01
        BEQ b3CA3
        INC aD8
        LDA aD8
        CMP #$20
        BNE b3CC5
        LDA #$01
        STA aD8
b3CC5   JSR s3B80
        JMP b3CA3

b3CCB   LDA #$04
        STA a1408
        STA a140B
        STA a1411
        STA a1414
        STA a140F
        DEC aD8
        JSR s3323
        LDA #$33
        STA COLOR2   ;COLOR2  shadow for COLPF2 ($D018)
        LDA #$02
        STA aA2
        RTS 

;-------------------------------------------------------------------------
; j3CEB
;-------------------------------------------------------------------------
j3CEB
        DEC a1027
        DEC aD8
        LDA a1027
        CMP #$10
        BEQ b3D02
        DEC a1027
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

b3D0A   LDA aAC
        BEQ b3D0F
        RTS 

b3D0F   LDX #$F6
        TXS 
        JMP j32E5

f3D15   .BYTE $01,$01,$01,$02,$02,$02,$03,$03
        .BYTE $03,$04,$04,$04,$05,$05,$05,$06
        .BYTE $06,$06,$06,$06,$06,$06,$06,$06
        .BYTE $06,$06,$06,$06,$06,$06,$06,$06
        .BYTE $06,$06,$06,$06
f3D39   .BYTE $06,$06,$0C,$04,$06,$0C,$04,$06
        .BYTE $08,$04,$06,$0C,$04,$06,$08,$04
        .BYTE $06,$08,$0A,$0C,$0E,$10,$12,$14
        .BYTE $16,$18,$1A,$1C,$1E,$20,$22,$24
        .BYTE $26
f3D5A   .BYTE $14,$12,$10,$0E,$0D,$0C,$0B,$0A
        .BYTE $09,$09,$09,$09,$09,$09,$09,$08
        .BYTE $08,$08,$08,$08,$08,$08,$07,$07
        .BYTE $07,$06,$06,$06,$06,$06,$06,$06
        .BYTE $06
;-------------------------------------------------------------------------
; s3D7B
;-------------------------------------------------------------------------
s3D7B
        LDX #$07
        LDA #$10
b3D7F   STA f100E,X
        DEX 
        BNE b3D7F
        RTS 

;-------------------------------------------------------------------------
; j3D86
;-------------------------------------------------------------------------
j3D86
        LDX #$00
b3D88   LDA f100F,X
        CMP f101C,X
        BEQ b3D94
        BPL b3D9C
        BMI b3D99
b3D94   INX 
        CPX #$07
        BNE b3D88
b3D99   JMP j32A2

b3D9C   LDX #$00
b3D9E   LDA f100F,X
        STA f101C,X
        INX 
        CPX #$07
        BNE b3D9E
        JMP j32A2

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
b3DBB   JSR s3363
        DEX 
        BNE b3DBB
        LDA CH       ;CH      keyboard FIFO byte
        CMP #$FF
        BNE b3DB4
b3DC8   LDA #$FF
        STA CH       ;CH      keyboard FIFO byte
        LDX #$20
b3DCF   JSR s3363
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
