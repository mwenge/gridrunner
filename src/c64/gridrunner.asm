;
; **** ZP ABSOLUTE ADRESSES **** 
;
a02 = $02
a03 = $03
a04 = $04
a05 = $05
a06 = $06
a07 = $07
a08 = $08
a09 = $09
a0A = $0A
a0B = $0B
a0C = $0C
a0D = $0D
a0E = $0E
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
a35 = $35
a36 = $36
aC5 = $C5
aFC = $FC
aFD = $FD
aFE = $FE
aFF = $FF
;
; **** ZP POINTERS **** 
;
p02 = $02
p06 = $06
p07 = $07
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
f0340 = $0340
f0360 = $0360
f03FF = $03FF
f040E = $040E
f040F = $040F
f041B = $041B
f04FA = $04FA
f04FD = $04FD
f054A = $054A
f054D = $054D
f0592 = $0592
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
f2000 = $2000
f2100 = $2100
fD7FF = $D7FF
fD8FA = $D8FA
fD8FD = $D8FD
fD94A = $D94A
fD94D = $D94D
fD992 = $D992
;
; **** ABSOLUTE ADRESSES **** 
;
a0002 = $0002
a0003 = $0003
a0427 = $0427
a0557 = $0557
a0558 = $0558
a055E = $055E
a055F = $055F
a0F0E = $0F0E
aD95E = $D95E
aD95F = $D95F
aDC11 = $DC11
;
; **** POINTERS **** 
;
p0101 = $0101
p0102 = $0102
p0116 = $0116
p0313 = $0313
p03F0 = $03F0
p0400 = $0400
p0450 = $0450
p05FF = $05FF
p070F = $070F
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

p0800   .BYTE $00,$0B,$08,$0A,$00,$9E,$32,$30,$36,$31,$00,$00,$00
        SEI 
        JMP (p8000)

        * = $8000

p8000   CMP (p83,X)
b8002   .BYTE $E2,$83 ;NOP #$83
        BRK #$00
        BRK #$00
        BRK #$00
        .BYTE $8F,$9D,$00 ;SAX $009D
        AND (pCA,X)
        BNE b8002
        JMP j8100

        NOP 
j8015   INX 
        CPX #$07
        BNE b8062
        JMP j8D8E

        NOP 
        NOP 
        NOP 
;-------------------------------------------------------------------------
; s8020
;-------------------------------------------------------------------------
s8020
        JSR s818B
        CMP #$07
        BEQ b8028
        RTS 

b8028   JMP j8ADE

        NOP 
        NOP 
        NOP 
        NOP 
        NOP 
j8030   AND #$1F
        CMP #$18
        BPL b803A
j8036   STA f1600,X
        RTS 

b803A   LDA a0C
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

b8050   LDA a0B
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
j8060   LDX #$00
b8062   LDA f040F,X
        CMP f041B,X
        BNE b8070
        JMP j8015

b806D   JMP j8D8E

b8070   BMI b806D
b8072   LDA f040F,X
        STA f041B,X
        INX 
        CPX #$07
        BNE b8072
f807F   =*+$02
        JMP j8D8E

        .BYTE $3C,$3D,$20,$31,$39,$38,$32,$20
        .BYTE $2B,$27,$2F,$20,$20,$2E,$22,$27
        .BYTE $2F,$2F,$20,$2A,$24,$22,$27,$20
        .BYTE $3A,$30,$20,$29,$27,$21,$24,$26
;-------------------------------------------------------------------------
; s80A0
;-------------------------------------------------------------------------
s80A0
        LDA a35
        CMP #$20
        BNE b80AA
        LDA #$01
        STA a35
b80AA   LDA #$30
        STA a0557
        STA a0558
        LDX a35
b80B4   INC a0558
        LDA a0558
        CMP #$3A
        BNE b80C6
        LDA #$30
        STA a0558
        INC a0557
b80C6   DEX 
        BNE b80B4
        LDX #$30
b80CB   JSR s8386
        DEX 
        BNE b80CB
        RTS 

j80D2   LDX #$20
b80D4   LDA f807F,X
        STA f0592,X
        LDA #$07
        STA fD992,X
        DEX 
        BNE b80D4
        JMP j8DC0

j80E5   LDA #$34
        STA a0427
        LDX #$07
        LDA #$30
b80EE   STA f040E,X
        DEX 
        BNE b80EE
        JMP j8C2D

b80F7   LDA aC5
        CMP #$29
        BEQ b80F7
        RTS 

        NOP 
        NOP 
j8100   LDA #>pD000
        STA a03
        LDA #<pD000
        STA a02
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
        LDA #<p0400
        STA a02
        LDA #>p0400
        STA a03
b8138   LDA a02
        STA f0340,X
        LDA a03
        STA f0360,X
        LDY #$00
        LDA #$20
b8146   STA (p02),Y
        INY 
        CPY #$28
        BNE b8146
        LDA a02
        CLC 
        ADC #$28
        STA a02
        LDA a03
        ADC #$00
        STA a03
        INX 
        CPX #$18
        BNE b8138
        JMP j8818

        RTS 

;-------------------------------------------------------------------------
; s8163
;-------------------------------------------------------------------------
s8163
        LDX a03
        LDY a02
        LDA f0340,X
        STA a06
        LDA f0360,X
        STA a07
        RTS 

;-------------------------------------------------------------------------
; s8172
;-------------------------------------------------------------------------
s8172
        JSR s8163
        LDA a04
        STA (p06),Y
        LDA a07
        CLC 
        ADC #$D4
        STA a07
        LDA a07
        LDA a07
        STA a07
        LDA a05
        STA (p06),Y
        RTS 

;-------------------------------------------------------------------------
; s818B
;-------------------------------------------------------------------------
s818B
        JSR s8163
        LDA (p06),Y
        RTS 

;-------------------------------------------------------------------------
; s8191
;-------------------------------------------------------------------------
s8191
        LDA #$00
        STA $D404    ;Voice 1: Control Register
        STA $D40B    ;Voice 2: Control Register
        LDA #$81
        STA $D404    ;Voice 1: Control Register
        STA $D40B    ;Voice 2: Control Register
        RTS 

;-------------------------------------------------------------------------
; s81A2
;-------------------------------------------------------------------------
s81A2
        LDA #$02
        STA a08
        LDA #>p083F
        STA a05
        LDA #<p083F
        STA a04
b81AE   LDA #$00
        STA $D412    ;Voice 3: Control Register
        LDA #$00
        STA $D412    ;Voice 3: Control Register
        LDA #$02
        STA a09
b81BC   LDA a09
        STA a03
        LDA a08
        STA a02
        JSR s8172
        JSR s8191
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
        STA a04
b81ED   LDA #$01
        STA a09
b81F1   LDA a09
        STA a02
        LDA a08
        STA a03
        JSR s8172
        JSR s8191
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
; s821B
;-------------------------------------------------------------------------
s821B
        LDA aC5
        CMP #$29
        BNE b821A
b8221   LDA aC5
        CMP #$29
        BEQ b8221
b8227   LDA aC5
        CMP #$29
        BNE b8227
        JMP b80F7

;-------------------------------------------------------------------------
; s8230
;-------------------------------------------------------------------------
s8230
        JMP j8233

j8233   LDA #$04
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
; s824F
;-------------------------------------------------------------------------
s824F
        LDA #$0F
        STA a0A
        LDA #$02
        STA $D408    ;Voice 2: Frequency Control - High-Byte
        LDA #$00
        STA $D404    ;Voice 1: Control Register
        STA $D40B    ;Voice 2: Control Register
        LDA #<p0116
        STA a04
j8264   LDA #>p0116
        STA a05
        LDA #$00
        STA $D40B    ;Voice 2: Control Register
        LDA #$81
        STA $D40B    ;Voice 2: Control Register
        LDA #$15
        STA a03
        LDA #$14
        CLC 
        SBC a0A
        STA a02
        JSR s8172
        LDA #$14
        CLC 
        ADC a0A
        STA a02
        JSR s8172
        LDA a03
        CLC 
        SBC a0A
        STA a03
        JSR s8172
        LDA #$14
        STA a02
        JSR s8172
        LDA #$14
        SBC a0A
        STA a02
        JSR s8172
        INC a04
        LDA a04
        CMP #$19
        BNE b82AE
        LDA #$16
b82AE   STA a09
        LDX a0A
b82B2   JSR s8380
        DEX 
        BNE b82B2
        LDA #<p0800
        STA a04
        LDA #>p0800
        STA a05
        LDA #$14
        STA a02
        JSR s8172
        LDA #$14
        CLC 
        SBC a0A
        STA a02
        JSR s8172
        LDA #$14
        CLC 
        ADC a0A
        STA a02
        JSR s8172
        LDA #$15
        STA a03
        JSR s8172
        LDA #$14
        CLC 
        SBC a0A
        STA a02
        JMP j8400

j82EC   LDX #$00
b82EE   LDA f8E00,X
        STA f2000,X
        LDA f8F00,X
        STA f2100,X
        DEX 
        BNE b82EE
        JMP j8100

j8300   LDA #$0F
        STA $D418    ;Select Filter Mode and Volume
        LDA #$A0
        STA $D40F    ;Voice 3: Frequency Control - High-Byte
        LDA #$04
        STA $D413    ;Voice 3: Attack / Decay Cycle Control
        LDA #$00
        STA $D414    ;Voice 3: Sustain / Release Cycle Control
        JSR s81A2
        JSR s824F
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
        .BYTE $EA,$EA,$EA,$EA,$EA,$EA,$EA,$EA,$EA,$EA,$EA,$EA,$EA,$EA,$EA
        JMP j83A0

;-------------------------------------------------------------------------
; s8373
;-------------------------------------------------------------------------
s8373
        LDA aDC11
        EOR #$FF
        STA a0E
        RTS 

        .BYTE $EA,$EA,$EA,$EA,$EA
;-------------------------------------------------------------------------
; s8380
;-------------------------------------------------------------------------
s8380
        LDA a0A
        CMP #$00
        BEQ b8392
;-------------------------------------------------------------------------
; s8386
;-------------------------------------------------------------------------
s8386
        LDA #$00
j8388   STA a30
b838A   DEC a30
        BNE b838A
b838E   DEC a30
        BNE b838E
b8392   RTS 

j8393   JSR s8470
        JSR s821B
        JMP j83A3

        NOP 
        NOP 
        NOP 
        NOP 
j83A0   JMP j8393

j83A3   JSR s84F8
        JSR s859B
        JSR s8635
        JSR s86D7
        JSR s8753
        JSR s889A
        JSR s88C9
        JSR s89A0
        JSR s8AC8
        JMP j83E8

;---------------------------------------------------------------------------------
; s83C1   
;---------------------------------------------------------------------------------
s83C1   
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
        JMP j82EC

        PLA 
        TAY 
        PLA 
        TAX 
        PLA 
        RTI 

;---------------------------------------------------------------------------------
; j83E8   
;---------------------------------------------------------------------------------
j83E8   
        LDX #$15
b83EA   DEX 
        BNE b83EA
        JMP j83A0

        .BYTE $EA,$EA,$EA,$EA,$EA,$EA,$EA,$EA,$EA,$EA
        JMP j83A0

        NOP 
        NOP 
        NOP 
;---------------------------------------------------------------------------------
; j8400   
;---------------------------------------------------------------------------------
j8400   
        JSR s8172
        LDA a09
        STA a04
        DEC a0A
        LDA a0A
        CMP #$FF
        BEQ b841A
        LDA #$0F
        CLC 
        SBC a0A
        STA $D418    ;Select Filter Mode and Volume
        JMP j8264

b841A   LDA #<p0D07
        STA a04
        LDA #>p0D07
        STA a05
        LDA #>p1514
        STA a03
        LDA #<p1514
        STA a02
        JSR s8172
        LDA #$0F
        STA $D418    ;Select Filter Mode and Volume
        JSR s8450
        LDA #$08
        STA $D418    ;Select Filter Mode and Volume
        JSR s8450
        LDA #$02
        STA $D418    ;Select Filter Mode and Volume
        JSR s8450
        LDA #$00
        STA $D40B    ;Voice 2: Control Register
        LDA #$0F
        STA $D418    ;Select Filter Mode and Volume
        RTS 

;-------------------------------------------------------------------------
; s8450
;-------------------------------------------------------------------------
s8450
        LDA #$18
        STA a0A
b8454   LDA a0A
        STA $D408    ;Voice 2: Frequency Control - High-Byte
        LDA #$00
        STA $D40B    ;Voice 2: Control Register
        LDA #$11
        STA $D40B    ;Voice 2: Control Register
        LDX #$02
b8465   JSR s8380
        DEX 
        BNE b8465
        DEC a0A
        BNE b8454
        RTS 

;-------------------------------------------------------------------------
; s8470
;-------------------------------------------------------------------------
s8470
        DEC a0D
        BEQ b8475
        RTS 

b8475   JSR s8373
        LDA a0B
        STA a02
        LDA a0C
        STA a03
        JSR s818B
        CMP #$07
        BEQ b848A
        JSR s8BEC
b848A   LDA #<p0800
        STA a04
        LDA #>p0800
        STA a05
        JSR s8172
        LDA a0E
        AND #$01
        BEQ b84A7
        DEC a03
        LDA a03
        CMP #$0E
        BNE b84A7
        LDA #$0F
        STA a03
b84A7   LDA a0E
        AND #$02
        BEQ b84B9
        INC a03
        LDA a03
        CMP #$16
        BNE b84B9
        LDA #$15
        STA a03
b84B9   LDA a0E
        AND #$04
        BEQ b84CB
        DEC a02
        LDA a02
        CMP #$00
        BNE b84CB
        LDA #$01
        STA a02
b84CB   LDA a0E
        AND #$08
        BEQ b84DD
        INC a02
        LDA a02
        CMP #$27
        BNE b84DD
        LDA #$26
        STA a02
b84DD   JSR s818B
        BEQ b84E5
        JSR s89AB
b84E5   LDA a02
        STA a0B
        LDA a03
        STA a0C
        LDA #>p0D07
        STA a05
        LDA #<p0D07
        STA a04
        JMP s8172

;-------------------------------------------------------------------------
; s84F8
;-------------------------------------------------------------------------
s84F8
        DEC a0F
        BEQ b84FD
b84FC   RTS 

b84FD   LDA #$18
        STA a0F
        JSR s8573
        LDA a11
        CMP #$FF
        BNE b8522
        LDA a0E
        AND #$10
        BEQ b84FC
        LDA a0B
        STA a10
        LDA a0C
        STA a11
        DEC a11
        LDA #<p4008
        STA a12
        LDA #>p4008
        STA a13
b8522   LDA a10
        STA a02
        LDA a11
        STA a03
        JSR s818B
        CMP a12
        BEQ b8538
        CMP #$00
        BEQ b8538
        JSR s87CB
b8538   LDA #>p0800
        STA a05
        LDA #<p0800
        STA a04
        JSR s8172
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
        STA a03
        JSR s818B
        BEQ b8568
        JSR s87CB
b8568   LDA a12
        STA a04
        LDA #$01
        STA a05
        JMP s8172

;-------------------------------------------------------------------------
; s8573
;-------------------------------------------------------------------------
s8573
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
; s859B
;-------------------------------------------------------------------------
s859B
        LDA a0D
        CMP #$01
        BEQ b85A2
b85A1   RTS 

b85A2   DEC a14
        BNE b85A1
        LDA #$02
        STA a14
        LDA #$00
        STA a02
        LDA a15
        STA a03
        LDA #$20
        STA a04
        JSR s8172
        INC a15
        LDA a15
        CMP #$16
        BNE b85C5
        LDA #$03
        STA a15
b85C5   LDA a15
        STA a03
        LDA #>p0101
        STA a05
        LDA #<p0101
        STA a04
        JSR s8172
        LDA #$16
        STA a03
        LDA a16
        STA a02
        LDA #$20
        JSR s85F8
        INC a16
        LDA a16
        CMP #$27
        BNE b85ED
        LDA #$01
        STA a16
b85ED   LDA a16
        STA a02
        LDA #$02
        STA a04
        JMP j85FD

;-------------------------------------------------------------------------
; s85F8
;-------------------------------------------------------------------------
s85F8
        STA a04
        JMP s8172

j85FD   JSR s8172
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

;-------------------------------------------------------------------------
; s862F
;-------------------------------------------------------------------------
s862F
        LDA #$03
        STA $D40F    ;Voice 3: Frequency Control - High-Byte
        RTS 

;-------------------------------------------------------------------------
; s8635
;-------------------------------------------------------------------------
s8635
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
        STA a05
        LDA a19
        STA a04
        LDA #$15
        STA a1D
b865A   LDA a1D
        STA a03
        LDA a1C
        STA a02
        JSR s8172
        DEC a1D
        LDA a1D
        CMP #$02
        BNE b865A
        LDA a1A
        STA a03
        LDA a1B
        STA a02
        JSR s818B
        CMP a19
        BEQ b86A2
        LDA #<p0800
        STA a04
        LDA #>p0800
        STA a05
        JSR s8172
        INC a1B
        LDA a1B
        STA a02
        JSR s8020
        CMP a19
        BEQ b86A2
        LDA #$01
        STA a05
        LDA a19
        CLC 
        SBC #$01
        STA a04
        JMP s8172

b86A2   LDA #$15
        STA a03
        LDA a1C
        STA a02
        LDA #>p0800
        STA a05
        LDA #<p0800
        STA a04
b86B2   JSR s8172
        DEC a03
        LDA a03
        CMP #$02
        BNE b86B2
        LDA a1A
        STA a03
        LDA #>p070F
        STA a05
        LDA #<p070F
        STA a04
        LDA #$00
        STA a18
        JMP s8172

;-------------------------------------------------------------------------
; s86D0
;-------------------------------------------------------------------------
s86D0
        DEC a0F
        INC a19
        LDA a19
        RTS 

;-------------------------------------------------------------------------
; s86D7
;-------------------------------------------------------------------------
s86D7
        LDA a17
        CMP #$05
        BEQ b86DE
        RTS 

b86DE   DEC a17
        LDA #>p0450
        STA a20
        LDA #<p0450
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
b8701   CMP f871F,X
        BEQ b870C
        DEX 
        BNE b8701
        JMP b86EE

b870C   CPX #$07
        BEQ b8719
        INX 
        LDA f871F,X
        STA (p1F),Y
        JMP b86EE

b8719   JSR s8728
        JMP b86EE

f871F   .BYTE $EA,$18,$0D,$0E,$0F,$10,$11
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
; s8753
;-------------------------------------------------------------------------
s8753
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
        STA a02
        LDA f101F,X
        STA a03
        LDY #$00
        LDA (p02),Y
        CMP #$07
        BNE b8781
        JMP j8ADE

b8781   LDA #$00
        STA (p02),Y
        LDA a03
        CLC 
        ADC #$D4
        STA a03
        LDA #$08
        STA (p02),Y
        LDA f0FFF,X
        CLC 
        ADC #$28
        STA f0FFF,X
        LDA f101F,X
        ADC #$00
        STA f101F,X
        STA a03
        LDA f0FFF,X
        STA a02
        LDA (p02),Y
        CMP #$20
        BNE b87B4
        LDA #$FF
        STA f101F,X
        RTS 

b87B4   CMP #$07
        BNE b87BB
        JMP j8ADE

b87BB   LDA #$0A
        STA (p02),Y
        LDA a03
        CLC 
        ADC #$D4
        STA a03
        LDA #$01
        STA (p02),Y
        RTS 

;-------------------------------------------------------------------------
; s87CB
;-------------------------------------------------------------------------
s87CB
        LDX #$07
b87CD   CMP f871F,X
        BEQ b87D9
        DEX 
        BNE b87CD
        JMP j8A11

        RTS 

b87D9   DEX 
        BEQ b87EC
        LDA f871F,X
        STA a04
        LDA #$07
        STA a05
        LDA #$FF
        STA a11
        JMP j8801

b87EC   LDA #<p0800
        STA a04
        LDA #>p0800
        STA a05
        LDA #$FF
        STA a11
        JSR s8172
        JSR s888A
        PLA 
        PLA 
        RTS 

j8801   PLA 
        PLA 
        JMP s8172

;-------------------------------------------------------------------------
; s8806
;-------------------------------------------------------------------------
s8806
        LDX #$28
b8808   LDA f881F,X
        STA f03FF,X
        LDA f8847,X
        STA fD7FF,X
        DEX 
        BNE b8808
        RTS 

j8818   JSR s8806
        JMP j8D57

        NOP 
f881F   .BYTE $EA,$21,$22,$24,$25,$22,$23,$26
        .BYTE $26,$27,$22,$20,$20,$19,$1A,$20
        .BYTE $30,$30,$30,$30,$30,$30,$30,$20
        .BYTE $20,$1D,$1E,$20,$30,$30,$30,$30
        .BYTE $30,$30,$30,$20,$20,$07,$20,$20
f8847   .BYTE $34,$03,$03,$03,$03,$04,$04,$04
        .BYTE $04,$04,$04,$01,$01,$07,$07,$01
        .BYTE $03,$03,$03,$03,$03,$03,$03,$01
        .BYTE $01,$07,$07,$01,$0E,$0E,$0E,$0E
        .BYTE $0E,$0E,$0E,$01,$01,$0D,$01,$01
        .BYTE $04
b8870   TXA 
        PHA 
b8872   INC f040F,X
        LDA f040F,X
        CMP #$3A
        BNE b8884
        LDA #$30
        STA f040F,X
        DEX 
        BNE b8872
b8884   PLA 
        TAX 
        DEY 
        BNE b8870
        RTS 

;-------------------------------------------------------------------------
; s888A
;-------------------------------------------------------------------------
s888A
        LDX #$06
        LDY #$0A
        JSR b8870
        LDA #<p03F0
        STA a22
        LDA #>p03F0
        STA a23
b8899   RTS 

;-------------------------------------------------------------------------
; s889A
;-------------------------------------------------------------------------
s889A
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
; s88C9
;-------------------------------------------------------------------------
s88C9
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
        STA a02
        LDA f11FF,X
        STA a03
        LDA #<p0800
        STA a04
        LDA #>p0800
        STA a05
        JSR s8995
        LDX a27
        LDA f12FF,X
        AND #$40
        BNE b892A
        LDA f10FE,X
        STA f10FF,X
        LDA f11FE,X
        STA f11FF,X
        STA a03
        LDA f10FF,X
        STA a02
        LDA #>p0313
        STA a05
        LDA #<p0313
        STA a04
        JSR s8172
j8924   LDX a27
        DEX 
        BNE b88E6
        RTS 

b892A   LDA f12FF,X
        AND #$02
        BNE b8935
        INC a02
        INC a02
b8935   DEC a02
        JSR s818B
        BEQ b8990
        LDX a27
        JSR s8AE9
        STA a02
        INC a03
        LDA a03
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
j896A   LDA a02
        STA f10FF,X
        LDA a03
        STA f11FF,X
        LDA #$03
        STA a05
        LDA a26
        STA a04
        JSR s8172
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
        JMP s8172

b899F   RTS 

;-------------------------------------------------------------------------
; s89A0
;-------------------------------------------------------------------------
s89A0
        LDA a0D
        CMP #$FF
        BNE b899F
        LDA #$80
        STA a0D
        RTS 

;-------------------------------------------------------------------------
; s89AB
;-------------------------------------------------------------------------
s89AB
        LDX #$07
b89AD   CMP f871F,X
        BEQ b89B8
        DEX 
        BNE b89AD
        JMP s8BEC

b89B8   LDA a0B
        STA a02
        LDA a0C
        STA a03
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
        JSR b8870
b8A28   LDX #$04
        LDY #$01
        JSR s8A99
        LDA #$FF
        STA a11
        PLA 
        PLA 
        LDX a24
b8A37   LDA f10FF,X
        CMP a02
        BEQ b8A42
b8A3E   DEX 
        BNE b8A37
        RTS 

b8A42   LDA f11FF,X
        CMP a03
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

b8A6D   LDA #>p070F
        STA a05
        LDA #<p070F
        STA a04
        DEC a24
        JMP s8172

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
        JMP b8870

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
        JMP j8C2D

        JSR s818B
        CMP #$07
        BEQ j8ADE
        JMP s8172

j8ADE   LDX #$F6
        TXS 
        NOP 
        NOP 
        NOP 
        JMP j8D78

        RTS 

        NOP 
;-------------------------------------------------------------------------
; s8AE9
;-------------------------------------------------------------------------
s8AE9
        CMP #$07
        BEQ j8ADE
        LDA f10FF,X
b8AF0   RTS 

        CMP #$20
        BEQ b8AF0
        JMP j8ADE

j8AF8   LDA #$0F
        STA a33
        LDA a0B
        LDX #$08
b8B00   STA f1500,X
        DEX 
        BNE b8B00
        LDA a0C
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
        STA a05
        LDA #<p0800
        STA a04
b8B3D   LDA f1500,X
        STA a02
        LDA f1600,X
        STA a03
        STX a27
        JSR s818B
        CMP a2D
        BNE b8B53
        JSR s8172
b8B53   LDX a27
        DEX 
        BNE b8B3D
        LDA #$14
b8B5A   JMP j8B60

        DEX 
        BNE b8B5A
j8B60   INC a2D
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
        STA a02
        LDA f1600,X
        STA a03
        LDA #$01
        STA a05
        LDA a2D
        STA a04
        JSR s8BBB
        BNE b8BAE
        JSR s8172
b8BAE   JMP j8BD2

j8BB1   DEC a33
        BMI b8BB8
        JMP j8B24

b8BB8   JMP j8C17

;-------------------------------------------------------------------------
; s8BBB
;-------------------------------------------------------------------------
s8BBB
        STX a27
        JMP s818B

f8BC0   .BYTE $EA,$00,$01,$01,$01,$00,$80,$80
f8BC8   .BYTE $80,$80,$80,$00,$01,$01,$01,$00
        .BYTE $80
        NOP 
j8BD2   LDX a27
        DEX 
        BNE b8B6E
        LDX #$10
b8BD9   JSR s8386
        DEX 
        BNE b8BD9
        LDA #$00
        STA $D404    ;Voice 1: Control Register
        LDA #$81
        STA $D404    ;Voice 1: Control Register
        JMP j8BB1

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
        JMP j8ADE

b8BFB   RTS 

;-------------------------------------------------------------------------
; s8BFC
;-------------------------------------------------------------------------
s8BFC
        LDA #<p0450
        STA a07
        LDA #>p0450
        STA a08
        LDY #$00
b8C06   LDA #$20
b8C08   STA (p07),Y
        INC a07
        BNE b8C08
        INC a08
        LDA a08
        CMP #$08
        BNE b8C06
        RTS 

j8C17   JSR s8BFC
        NOP 
        NOP 
        NOP 
        DEC a0427
        LDA a0427
        CMP #$30
        BEQ b8C2A
        JMP j8D5E

b8C2A   JMP j8060

j8C2D   LDX #$F6
        TXS 
        JSR s8BFC
        LDX #$12
b8C35   LDA f8C50,X
        STA f04FD,X
        LDA #$0E
        STA fD8FD,X
        LDA f8C62,X
        STA f054D,X
        LDA #$01
        STA fD94D,X
        DEX 
        BNE b8C35
f8C50   =*+$02
        JMP j8C75

        .BYTE $20,$29,$28,$3A,$3A,$3E,$27,$20
        .BYTE $20,$2F,$3A,$28,$3A,$24,$30,$26
        .BYTE $2F
f8C62   .BYTE $20,$27,$26,$3A,$27,$22,$20,$21
        .BYTE $22,$24,$25,$20,$28,$22,$27,$28
        .BYTE $20,$30,$30
j8C75   INC a0427
        LDA a0427
        CMP #$3A
        BNE b8C82
        DEC a0427
b8C82   INC a35
        LDA a35
        CMP #$20
        BNE b8C8C
        DEC a35
b8C8C   LDX a35
        LDA f8CB4,X
        STA a2A
        LDA f8CD4,X
        STA a2B
        LDA f8CF4,X
        STA a34
b8C9D   INC a055F
        LDA a055F
        CMP #$3A
        BNE b8CAF
        LDA #$30
        STA a055F
        INC a055E
b8CAF   DEX 
        BNE b8C9D
f8CB4   =*+$02
        JMP j8D70

        .BYTE $01,$02,$02,$03,$03,$03,$04,$04
        .BYTE $04,$04,$05,$05,$10,$06,$06,$06
        .BYTE $06,$06,$06,$06,$06,$06,$06,$06
        .BYTE $06,$06,$07,$07,$07,$07,$07
f8CD4   .BYTE $07,$06,$06,$06,$07,$07,$08,$08
        .BYTE $09,$0C,$0C,$0A,$0A,$03,$0F,$10
        .BYTE $10,$11,$12,$13,$14,$14,$14,$15
        .BYTE $15,$16,$16,$16,$17,$03,$18,$18
f8CF4   .BYTE $19,$10,$10,$10,$0F,$0E,$0D,$0C
        .BYTE $0B,$0A,$09,$09,$09,$09,$09,$09
        .BYTE $09,$08,$08,$08,$08,$07,$07,$07
        .BYTE $07,$07,$07,$07,$07,$07,$06,$06
        .BYTE $05
        NOP 
j8D16   LDA #$30
        STA a36
b8D1A   LDA a36
        STA aD95F
        STA aD95E
        LDX a36
b8D24   JSR s8D52
        JSR s8D66
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
        JMP j8300

;-------------------------------------------------------------------------
; s8D52
;-------------------------------------------------------------------------
s8D52
        LDA #$20
        JMP j8388

j8D57   LDA a35
b8D5A   =*+$01
        STA a35
        JMP j8D8E

j8D5E   DEC a0427
        DEC a35
        JMP j8C2D

;-------------------------------------------------------------------------
; s8D66
;-------------------------------------------------------------------------
s8D66
        STX a27
        LDA #$40
        SBC a27
        STA $D401    ;Voice 1: Frequency Control - High-Byte
        RTS 

j8D70   LDA #$0F
        STA $D418    ;Select Filter Mode and Volume
        JMP j8D16

j8D78   LDA #<p0800
        STA a04
        LDA #>p0800
        STA a05
        LDA a0B
        STA a02
        LDA a0C
        STA a03
        JSR s8172
        JMP j8AF8

j8D8E   LDA #$01
        STA a35
        LDX #$0E
b8D94   LDA f8DE0,X
        STA f04FA,X
        LDA #$03
        STA fD8FA,X
        LDA f8DF0,X
        STA f054A,X
        LDA #$01
        STA fD94A,X
        DEX 
        BNE b8D94
        JMP j80D2

b8DB0   LDA aDC11
        CMP #$EF
        BNE b8DBA
        JMP j8DC6

b8DBA   CMP #$FE
        BNE b8DB0
        INC a35
j8DC0   JSR s80A0
        JMP b8DB0

j8DC6   DEC a35
        JMP j80E5

        BCS b8D5A
        .BYTE $EA,$EA,$EA,$EA,$EA,$EA,$EA,$EA
        .BYTE $EA,$EA,$EA,$EA,$EA,$EA,$EA,$EA
        .BYTE $EA,$EA,$EA
f8DE0   .BYTE $EA,$29,$1B,$20,$2C,$27,$2A,$2A
        .BYTE $20,$2D,$24,$26,$3A,$27,$22,$20
f8DF0   .BYTE $EA,$27,$26,$3A,$27,$22,$20,$3E
        .BYTE $27,$3B,$27,$3E,$20,$30,$30,$20
.include "charset.asm"
        .BYTE $30,$00


