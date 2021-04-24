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
; ===========================================================================

; ---------------------------------------------------------------------------
                ; Enter supervisor mode
                move.l  #0,-(sp)        ; Move Data from Source to Destination
                move.w  #$20,-(sp) ; ' ' ; Move Data from Source to Destination
                trap    #1              ; Trap (#vector Exception)
                adda.l  #6,sp           ; Add Address

                move.b  #0,($FF8260).l  ; Set screen mode to 320x440x4bpp

                move.l  #byte_12F08,($15778).l ; Move Data from Source to Destination
                clr.w   ($1576E).l      ; Clear an Operand
                clr.w   ($1577E).l      ; Clear an Operand
                lea     (byte_13440).l,a0 ; Load Effective Address
                clr.l   d0              ; Clear an Operand
                move.w  #$C7,d1         ; Move Data from Source to Destination

;---------------------------------------------------------------------------------
; loc_125D2:                              
;---------------------------------------------------------------------------------
loc_125D2:                              
                move.l  d0,(a0)+        ; Move Data from Source to Destination
                addi.w  #$A0,d0         ; Add Immediate
                dbf     d1,loc_125D2    ; If False Decrement and Branch
                movea.l #(byte_13418+2),a0 ; Move Address
                jsr     LoadColorPalette       ; Jump to Subroutine
                move.l  #$16BAA,d0      ; Move Data from Source to Destination
                addi.l  #$100,d0        ; Add Immediate
                andi.l  #$FFFF00,d0     ; AND Immediate
                move.l  d0,($15766).l   ; Move Data from Source to Destination
                addi.l  #$7E00,d0       ; Add Immediate
                move.l  d0,($1576A).l   ; Move Data from Source to Destination
                addi.l  #$7E00,d0       ; Add Immediate
                move.l  d0,($15762).l   ; Move Data from Source to Destination

                move.l  #sub_12CF0,-(sp) ; Move Data from Source to Destination
                move.l  #byte_13400,-(sp) ; Move Data from Source to Destination
                move.w  #1,-(sp)        ; Move Data from Source to Destination
                clr.w   -(sp)           ; Clear an Operand
                trap    #$E             ; Trap (#vector Exception)
                adda.l  #$C,sp          ; Add Address

                move.l  #sub_12978,($70).l ; Move Data from Source to Destination
                move    #$3200,sr       ; Move Data from Source to Destination
                movea.l (byte_13408).l,a0 ; Move Address
                move.l  #$FFFFFE0C,(a0) ; Move Data from Source to Destination
                movea.l (byte_1340C).l,a0 ; Move Address
                move.l  #$FFFFFE0C,(a0) ; Move Data from Source to Destination
                clr.l   ($16B9A).l      ; Clear an Operand
                clr.l   ($16B9E).l      ; Clear an Operand
                move.b  #5,($16BA4).l   ; Move Data from Source to Destination
                bsr.w   sub_127F4       ; Branch to Subroutine
                move.b  #1,($16BA2).l   ; Move Data from Source to Destination
                bsr.w   loc_12F0A       ; Branch to Subroutine
                move.l  ($15766).l,d0   ; Move Data from Source to Destination
                lsr.l   #8,d0           ; Logical Shift Right
                lea     ($FF8201).l,a0  ; Load Effective Address
                movep.w d0,0(a0)        ; Move Peripheral Data
                movep.w d0,0(a0)        ; Move Peripheral Data
                bra.w   loc_127DA       ; Branch Always
; ---------------------------------------------------------------------------

loc_12696:                              ; CODE XREF: ROM:000127EC↓j
                move.w  #$3030,($15780).l ; Move Data from Source to Destination
                move.w  (byte_13404+2).l,(byte_13404).l ; Move Data from Source to Destination
                move.w  #$1E,(byte_13416).l ; Move Data from Source to Destination
                clr.b   ($16B90).l      ; Clear an Operand
                clr.b   ($16B92).l      ; Clear an Operand
                clr.b   ($16B94).l      ; Clear an Operand
                clr.b   ($16BA6).l      ; Clear an Operand
                bsr.w   sub_1276A       ; Branch to Subroutine
                clr.l   ($16B9A).l      ; Clear an Operand
                clr.l   ($16B9E).l      ; Clear an Operand
                move.b  #5,($16BA4).l   ; Move Data from Source to Destination
                bsr.w   sub_127F4       ; Branch to Subroutine
                move.b  #1,($16BA2).l   ; Move Data from Source to Destination
                lea     ($16784).l,a0   ; Load Effective Address
                move.w  #$F9,d0         ; Move Data from Source to Destination

loc_126F6:                              ; CODE XREF: ROM:000126F8↓j
                clr.l   (a0)+           ; Clear an Operand
                dbf     d0,loc_126F6    ; If False Decrement and Branch
                move.w  #$8C,(byte_13438).l ; Move Data from Source to Destination
                move.w  #$98,(byte_13418).l ; Move Data from Source to Destination
                bsr.w   sub_12FDA       ; Branch to Subroutine
                andi.w  #3,d0           ; AND Immediate
                addi.w  #1,d0           ; Add Immediate
                move.w  d0,($15774).l   ; Move Data from Source to Destination
                bsr.w   sub_12FDA       ; Branch to Subroutine
                andi.w  #1,d0           ; AND Immediate
                addi.w  #1,d0           ; Add Immediate
                move.w  d0,($15776).l   ; Move Data from Source to Destination
                lea     ($15784).l,a0   ; Load Effective Address
                move.w  #$3FF,d0        ; Move Data from Source to Destination

loc_1273A:                              ; CODE XREF: ROM:0001273C↓j
                clr.l   (a0)+           ; Clear an Operand
                dbf     d0,loc_1273A    ; If False Decrement and Branch
                move.w  #$FFFF,($16B88).l ; Move Data from Source to Destination
                move.l  #sub_12998,($15778).l ; Move Data from Source to Destination

loc_12752:                              ; CODE XREF: ROM:00012764↓j
                jsr     loc_12E50       ; Jump to Subroutine
                cmpi.b  #0,($16BA4).l   ; Compare Immediate
                beq.w   loc_127D6       ; Branch if Equal
                jmp     loc_12752       ; Jump

;-------------------------------------------------------------------------
; sub_1276A:
;-------------------------------------------------------------------------
sub_1276A:
                                   ; CODE XREF: ROM:000126C8↑p
                                        ; sub_12998+34↓p
                move.b  ($16BA6).l,d0   ; Move Data from Source to Destination
                andi.w  #3,d0           ; AND Immediate
                ext.w   d0              ; Sign Extend
                lea     (byte_127BE).l,a0 ; Load Effective Address
                asl.w   #1,d0           ; Arithmetic Shift Left
                move.w  (a0,d0.w),($FF8244).l ; Move Data from Source to Destination
                asl.w   #1,d0           ; Arithmetic Shift Left
                lea     (byte_127C6).l,a0 ; Load Effective Address
                lea     (a0,d0.w),a0    ; Load Effective Address
                move.b  (a0)+,d0        ; Move Data from Source to Destination
                move.b  ($16BA6).l,d1   ; Move Data from Source to Destination
                asr.b   #3,d1           ; Arithmetic Shift Right
                add.b   d1,d0           ; Add
                move.b  d0,($16BA8).l   ; Move Data from Source to Destination
                clr.b   ($16B92).l      ; Clear an Operand
                move.b  (a0)+,($16B93).l ; Move Data from Source to Destination
                move.b  (a0)+,($16B91).l ; Move Data from Source to Destination
                move.b  (a0)+,($16B95).l ; Move Data from Source to Destination
                rts                     ; Return from Subroutine

; ---------------------------------------------------------------------------
byte_127BE:     dc.b $07,$00,$04,$07,$00,$07,$07,$30
                                        ; DATA XREF: sub_1276A+C↑o
byte_127C6:     dc.b $02,$06,$64,$04,$03, $F,$64,$02
                                        ; DATA XREF: sub_1276A+1E↑o
                dc.b $04,$03,$32,$02,$04, $A,$46,$03
; ---------------------------------------------------------------------------

loc_127D6:                              ; CODE XREF: ROM:00012760↑j
                bsr.w   loc_12E50       ; Branch to Subroutine

loc_127DA:                              ; CODE XREF: ROM:00012692↑j
                                        ; ROM:000127E2↓j
                btst    #1,(byte_13438+2).l ; Test a Bit
                bne.s   loc_127DA       ; Branch if Not Equal

loc_127E4:                              ; CODE XREF: ROM:000127F0↓j
                btst    #1,(byte_13438+2).l ; Test a Bit
                bne.w   loc_12696       ; Branch if Not Equal
                bra.s   loc_127E4       ; Branch Always
; ---------------------------------------------------------------------------
                rte                     ; Return from Exception

; =============== S U B R O U T I N E =======================================


;-------------------------------------------------------------------------
; sub_127F4:
;-------------------------------------------------------------------------
sub_127F4:
                                   ; CODE XREF: ROM:0001266C↑p
                                        ; ROM:000126E0↑p
                movea.l ($15762).l,a0   ; Move Address
                bsr.w   sub_12E44       ; Branch to Subroutine
                lea     (byte_1324E).l,a0 ; Load Effective Address
                movea.l ($15762).l,a1   ; Move Address
                move.w  #$10,d0         ; Move Data from Source to Destination

loc_1280E:                              ; CODE XREF: sub_127F4+3E↓j
                move.w  #$A,d1          ; Move Data from Source to Destination

loc_12812:                              ; CODE XREF: sub_127F4+34↓j
                move.w  #2,d2           ; Move Data from Source to Destination
                movea.l ($15766).l,a2   ; Move Address
                bsr.w   sub_12D72       ; Branch to Subroutine
                addi.w  #8,d1           ; Add Immediate
                cmp.w   #$C0,d1         ; Compare
                blt.s   loc_12812       ; Branch if Less Than
                addi.w  #$10,d0         ; Add Immediate
                cmp.w   #$138,d0        ; Compare
                blt.s   loc_1280E       ; Branch if Less Than
                bsr.w   sub_12E24       ; Branch to Subroutine
                rts                     ; Return from Subroutine
; End of function sub_127F4


; =============== S U B R O U T I N E =======================================


;-------------------------------------------------------------------------
; LoadColorPalette:
;-------------------------------------------------------------------------
LoadColorPalette:
                                   ; CODE XREF: ROM:000125E2↑p
                lea     ($FF8240).l,a1  ; Load Effective Address
                move.w  #$F,d1          ; Move Data from Source to Destination

loc_12844:                              ; CODE XREF: LoadColorPalette+C↓j
                move.w  (a0)+,(a1)+     ; Move Data from Source to Destination
                dbf     d1,loc_12844    ; If False Decrement and Branch
                rts                     ; Return from Subroutine


; =============== S U B R O U T I N E =======================================


;-------------------------------------------------------------------------
; sub_1284C:
;-------------------------------------------------------------------------
sub_1284C:
                                   ; CODE XREF: ROM:00012E5C↓p

; FUNCTION CHUNK AT 0001295C SIZE 0000001C BYTES

                bsr.w   sub_1301E       ; Branch to Subroutine
                tst.w   ($16B88).l      ; Test an Operand
                bmi.s   loc_12872       ; Branch if Minus
                move.w  ($16B88).l,d0   ; Move Data from Source to Destination
                move.w  ($16B8A).l,d1   ; Move Data from Source to Destination
                move.w  #7,d2           ; Move Data from Source to Destination
                lea     ((byte_1324E+$20)).l,a0 ; Load Effective Address
                bsr.w   sub_12D72       ; Branch to Subroutine

loc_12872:                              ; CODE XREF: sub_1284C+A↑j
                clr.w   d0              ; Clear an Operand
                move.w  (byte_13410+2).l,d1 ; Move Data from Source to Destination
                lea     ((byte_1324E+$112)).l,a0 ; Load Effective Address
                move.w  #7,d2           ; Move Data from Source to Destination
                bsr.w   sub_12D72       ; Branch to Subroutine
                move.w  #$C0,d1         ; Move Data from Source to Destination
                move.w  (byte_13410).l,d0 ; Move Data from Source to Destination
                lea     ((byte_1324E+$122)).l,a0 ; Load Effective Address
                bsr.w   sub_12D72       ; Branch to Subroutine
                btst    #0,($1577E).l   ; Test a Bit
                beq.s   loc_128DE       ; Branch if Equal
                move.w  #8,d2           ; Move Data from Source to Destination
                move.w  #8,d1           ; Move Data from Source to Destination
                move.w  ($16B84).l,d0   ; Move Data from Source to Destination
                lea     ($13390).l,a0   ; Load Effective Address

loc_128BA:                              ; CODE XREF: sub_1284C+7A↓j
                bsr.w   sub_12D72       ; Branch to Subroutine
                addi.w  #8,d1           ; Add Immediate
                cmp.w   #$C0,d1         ; Compare
                blt.s   loc_128BA       ; Branch if Less Than
                move.w  ($15782).l,d0   ; Move Data from Source to Destination
                move.w  ($16B86).l,d1   ; Move Data from Source to Destination
                lea     ((byte_1324E+$132)).l,a0 ; Load Effective Address
                bsr.w   sub_12D72       ; Branch to Subroutine

loc_128DE:                              ; CODE XREF: sub_1284C+58↑j
                btst    #1,($1577E).l   ; Test a Bit
                beq.s   loc_1295C       ; Branch if Equal
                move.w  ($1577C).l,d3   ; Move Data from Source to Destination
                asl.w   #2,d3           ; Arithmetic Shift Left
                move.w  #7,d2           ; Move Data from Source to Destination

loc_128F4:                              ; CODE XREF: sub_1284C+E6↓j
                move.w  (byte_13418).l,d0 ; Move Data from Source to Destination
                move.w  (byte_13438).l,d1 ; Move Data from Source to Destination
                lea     (byte_133F0).l,a0 ; Load Effective Address
                sub.w   d3,d0           ; Subtract
                bsr.s   sub_12936       ; Branch to Subroutine
                sub.w   d3,d1           ; Subtract
                bsr.s   sub_12936       ; Branch to Subroutine
                add.w   d3,d0           ; Add
                bsr.s   sub_12936       ; Branch to Subroutine
                add.w   d3,d0           ; Add
                bsr.s   sub_12936       ; Branch to Subroutine
                add.w   d3,d1           ; Add
                bsr.s   sub_12936       ; Branch to Subroutine
                add.w   d3,d1           ; Add
                bsr.s   sub_12936       ; Branch to Subroutine
                sub.w   d3,d0           ; Subtract
                bsr.s   sub_12936       ; Branch to Subroutine
                sub.w   d3,d0           ; Subtract
                bsr.s   sub_12936       ; Branch to Subroutine
                subi.w  #8,d3           ; Subtract Immediate
                bmi.w   locret_12FEE    ; Branch if Minus
                subi.w  #1,d2           ; Subtract Immediate
                bne.s   loc_128F4       ; Branch if Not Equal
                rts                     ; Return from Subroutine
; End of function sub_1284C


; =============== S U B R O U T I N E =======================================


;-------------------------------------------------------------------------
; sub_12936:
;-------------------------------------------------------------------------
sub_12936:
                                   ; CODE XREF: sub_1284C+BC↑p
                                        ; sub_1284C+C0↑p ...
                tst.w   d0              ; Test an Operand
                bmi.w   locret_12FEE    ; Branch if Minus
                cmp.w   #$130,d0        ; Compare
                bge.w   locret_12FEE    ; Branch if Greater or Equal
                tst.w   d1              ; Test an Operand
                bmi.w   locret_12FEE    ; Branch if Minus
                cmp.w   #$C0,d1         ; Compare
                bge.w   locret_12FEE    ; Branch if Greater or Equal
                move.w  d3,-(sp)        ; Move Data from Source to Destination
                bsr.w   sub_12D72       ; Branch to Subroutine
                move.w  (sp)+,d3        ; Move Data from Source to Destination
                rts                     ; Return from Subroutine
; End of function sub_12936

; ---------------------------------------------------------------------------
; START OF FUNCTION CHUNK FOR sub_1284C

loc_1295C:                              ; CODE XREF: sub_1284C+9A↑j
                move.w  (byte_13418).l,d0 ; Move Data from Source to Destination
                move.w  (byte_13438).l,d1 ; Move Data from Source to Destination
                lea     ((byte_1324E+$10)).l,a0 ; Load Effective Address
                move.w  #4,d2           ; Move Data from Source to Destination
                jmp     sub_12D72       ; Jump
; END OF FUNCTION CHUNK FOR sub_1284C

; =============== S U B R O U T I N E =======================================


;-------------------------------------------------------------------------
; sub_12978:
;-------------------------------------------------------------------------
sub_12978:
                                   ; DATA XREF: ROM:00012632↑o
                movem.l d0-a6,-(sp)     ; Move Multiple Registers
                tst.w   ($1576E).l      ; Test an Operand
                beq.s   loc_1298A       ; Branch if Equal
                clr.w   ($1576E).l      ; Clear an Operand

loc_1298A:                              ; CODE XREF: sub_12978+A↑j
                movea.l ($15778).l,a0   ; Move Address
                jsr     (a0)            ; Jump to Subroutine
                movem.l (sp)+,d0-a6     ; Move Multiple Registers
                rte                     ; Return from Exception
; End of function sub_12978


; =============== S U B R O U T I N E =======================================


;-------------------------------------------------------------------------
; sub_12998:
;-------------------------------------------------------------------------
sub_12998:
                                   ; DATA XREF: ROM:00012748↑o
                subi.w  #1,(byte_13404).l ; Subtract Immediate
                bpl.s   loc_129DA       ; Branch if Plus
                addi.b  #1,($16BA6).l   ; Add Immediate
                addi.b  #1,($16BA4).l   ; Add Immediate
                cmpi.b  #9,($16BA4).l   ; Compare Immediate
                blt.s   loc_129C4       ; Branch if Less Than
                move.b  #8,($16BA4).l   ; Move Data from Source to Destination

loc_129C4:                              ; CODE XREF: sub_12998+22↑j
                move.b  #1,($16BA2).l   ; Move Data from Source to Destination
                bsr.w   sub_1276A       ; Branch to Subroutine
                move.w  (byte_13404+2).l,(byte_13404).l ; Move Data from Source to Destination

loc_129DA:                              ; CODE XREF: sub_12998+8↑j
                addi.w  #1,($1577C).l   ; Add Immediate
                btst    #1,($1577E).l   ; Test a Bit
                beq.s   loc_12A1A       ; Branch if Equal
                btst    #6,($1577D).l   ; Test a Bit
                beq.s   loc_12A1A       ; Branch if Equal
                clr.w   ($1577C).l      ; Clear an Operand
                bclr    #1,($1577E).l   ; Test a Bit and Clear
                clr.b   (byte_13438+2).l ; Clear an Operand
                subi.b  #1,($16BA4).l   ; Subtract Immediate
                move.b  #1,($16BA2).l   ; Move Data from Source to Destination

loc_12A1A:                              ; CODE XREF: sub_12998+52↑j
                                        ; sub_12998+5C↑j
                move.w  ($1577C).l,($FF8250).l ; Move Data from Source to Destination
                move.w  ($16B8C).l,d0   ; Move Data from Source to Destination
                move.w  ($16B8E).l,d1   ; Move Data from Source to Destination
                bsr.w   sub_13178       ; Branch to Subroutine
                clr.b   (a1)            ; Clear an Operand
                move.w  (byte_13418).l,d0 ; Move Data from Source to Destination
                move.w  d0,($16B8C).l   ; Move Data from Source to Destination
                move.w  (byte_13438).l,d1 ; Move Data from Source to Destination
                move.w  d1,($16B8E).l   ; Move Data from Source to Destination
                bsr.w   sub_13178       ; Branch to Subroutine
                move.b  #$FE,(a1)       ; Move Data from Source to Destination
                btst    #1,(byte_13438+2).l ; Test a Bit
                beq.s   loc_12A86       ; Branch if Equal
                btst    #1,($1577E).l   ; Test a Bit
                bne.s   loc_12A86       ; Branch if Not Equal
                tst.w   ($16B88).l      ; Test an Operand
                bpl.s   loc_12A86       ; Branch if Plus
                move.w  (byte_13438).l,($16B8A).l ; Move Data from Source to Destination
                move.w  (byte_13418).l,($16B88).l ; Move Data from Source to Destination

loc_12A86:                              ; CODE XREF: sub_12998+C6↑j
                                        ; sub_12998+D0↑j ...
                tst.w   ($16B88).l      ; Test an Operand
                bmi.s   loc_12ADA       ; Branch if Minus
                move.w  ($16B88).l,d0   ; Move Data from Source to Destination
                move.w  ($16B8A).l,d1   ; Move Data from Source to Destination
                bsr.w   sub_13178       ; Branch to Subroutine
                clr.b   (a1)            ; Clear an Operand
                clr.b   -1(a1)          ; Clear an Operand
                subi.w  #8,($16B8A).l   ; Subtract Immediate
                cmpi.w  #8,($16B8A).l   ; Compare Immediate
                bge.s   loc_12AC0       ; Branch if Greater or Equal
                move.w  #$FFFF,($16B88).l ; Move Data from Source to Destination
                bra.s   loc_12ADA       ; Branch Always
; ---------------------------------------------------------------------------

loc_12AC0:                              ; CODE XREF: sub_12998+11C↑j
                move.w  ($16B88).l,d0   ; Move Data from Source to Destination
                move.w  ($16B8A).l,d1   ; Move Data from Source to Destination
                bsr.w   sub_13178       ; Branch to Subroutine
                move.b  #$FF,(a1)       ; Move Data from Source to Destination
                move.b  #$FF,-1(a1)     ; Move Data from Source to Destination

loc_12ADA:                              ; CODE XREF: sub_12998+F4↑j
                                        ; sub_12998+126↑j
                bsr.w   sub_12FF0       ; Branch to Subroutine
                btst    #0,($1577E).l   ; Test a Bit
                beq.s   loc_12B54       ; Branch if Equal
                addi.w  #7,($15782).l   ; Add Immediate
                move.w  ($16B84).l,d0   ; Move Data from Source to Destination
                asr.w   #4,d0           ; Arithmetic Shift Right
                move.w  (byte_13418).l,d1 ; Move Data from Source to Destination
                asr.w   #4,d1           ; Arithmetic Shift Right
                cmp.w   d0,d1           ; Compare
                beq.w   loc_12B24       ; Branch if Equal
                move.w  ($15782).l,d0   ; Move Data from Source to Destination
                cmp.w   d0,d1           ; Compare
                bne.s   loc_12B2E       ; Branch if Not Equal
                move.w  (byte_13438).l,d1 ; Move Data from Source to Destination
                asr.w   #4,d1           ; Arithmetic Shift Right
                move.w  ($16B86).l,d2   ; Move Data from Source to Destination
                asr.w   #4,d2           ; Arithmetic Shift Right
                cmp.w   d1,d2           ; Compare
                bne.s   loc_12B2E       ; Branch if Not Equal

loc_12B24:                              ; CODE XREF: sub_12998+16A↑j
                bsr.w   sub_13082       ; Branch to Subroutine
                move.w  ($15782).l,d0   ; Move Data from Source to Destination

loc_12B2E:                              ; CODE XREF: sub_12998+176↑j
                                        ; sub_12998+18A↑j
                cmp.w   ($16B84).l,d0   ; Compare
                ble.s   loc_12B8C       ; Branch if Less or Equal
                bclr    #0,($1577E).l   ; Test a Bit and Clear
                bsr.w   sub_12CC6       ; Branch to Subroutine
                beq.s   loc_12B8C       ; Branch if Equal
                move.w  ($15782).l,d0   ; Move Data from Source to Destination
                move.w  ($16B86).l,d1   ; Move Data from Source to Destination
                bsr.w   sub_12C96       ; Branch to Subroutine

loc_12B54:                              ; CODE XREF: sub_12998+14E↑j
                subi.b  #1,($15780).l   ; Subtract Immediate
                bpl.s   loc_12B8C       ; Branch if Plus
                move.b  ($15781).l,($15780).l ; Move Data from Source to Destination
                move.w  #8,($15782).l   ; Move Data from Source to Destination
                move.w  (byte_13410).l,($16B84).l ; Move Data from Source to Destination
                move.w  (byte_13410+2).l,($16B86).l ; Move Data from Source to Destination
                bset    #0,($1577E).l   ; Test a Bit and Set

loc_12B8C:                              ; CODE XREF: sub_12998+19C↑j
                                        ; sub_12998+1AA↑j ...
                move.w  (byte_13410).l,d0 ; Move Data from Source to Destination
                add.w   ($15774).l,d0   ; Add
                cmp.w   #$127,d0        ; Compare
                blt.s   loc_12BA2       ; Branch if Less Than
                move.w  #8,d0           ; Move Data from Source to Destination

loc_12BA2:                              ; CODE XREF: sub_12998+204↑j
                move.w  d0,(byte_13410).l ; Move Data from Source to Destination
                move.w  (byte_13410+2).l,d0 ; Move Data from Source to Destination
                add.w   ($15776).l,d0   ; Add
                cmp.w   #$B8,d0         ; Compare
                blt.s   loc_12BBE       ; Branch if Less Than
                move.w  #8,d0           ; Move Data from Source to Destination

loc_12BBE:                              ; CODE XREF: sub_12998+220↑j
                move.w  d0,(byte_13410+2).l ; Move Data from Source to Destination
                tst.b   ($16B92).l      ; Test an Operand
                beq.s   loc_12BEC       ; Branch if Equal
                subi.b  #1,($16B94).l   ; Subtract Immediate
                bpl.w   locret_12FEE    ; Branch if Plus
                move.b  ($16B95).l,($16B94).l ; Move Data from Source to Destination
                subi.b  #1,($16B92).l   ; Subtract Immediate
                bra.s   loc_12C3C       ; Branch Always
; ---------------------------------------------------------------------------

loc_12BEC:                              ; CODE XREF: sub_12998+232↑j
                subi.b  #1,($16B90).l   ; Subtract Immediate
                bpl.w   locret_12FEE    ; Branch if Plus
                move.b  ($16B91).l,($16B90).l ; Move Data from Source to Destination
                move.b  ($16B93).l,d0   ; Move Data from Source to Destination
                addi.b  #3,d0           ; Add Immediate
                ext.w   d0              ; Sign Extend
                cmp.w   (byte_13416).l,d0 ; Compare
                bge.w   locret_12FEE    ; Branch if Greater or Equal
                bclr    #3,($1577E).l   ; Test a Bit and Clear
                bsr.w   sub_12FDA       ; Branch to Subroutine
                btst    #0,d0           ; Test a Bit
                beq.s   loc_12C32       ; Branch if Equal
                bset    #3,($1577E).l   ; Test a Bit and Set

loc_12C32:                              ; CODE XREF: sub_12998+290↑j
                move.b  ($16B93).l,($16B92).l ; Move Data from Source to Destination

loc_12C3C:                              ; CODE XREF: sub_12998+252↑j
                bsr.w   sub_12CC6       ; Branch to Subroutine
                move.w  #$10,2(a0)      ; Move Data from Source to Destination
                move.w  #8,4(a0)        ; Move Data from Source to Destination
                move.l  #(byte_1324E+$30),6(a0) ; Move Data from Source to Destination
                move.w  #5,$E(a0)       ; Move Data from Source to Destination
                clr.w   $12(a0)         ; Clear an Operand
                move.b  ($16BA8).l,$13(a0) ; Move Data from Source to Destination
                clr.w   $14(a0)         ; Clear an Operand
                move.w  #3,(a0)         ; Move Data from Source to Destination
                btst    #2,($16BA6).l   ; Test a Bit
                beq.s   loc_12C7E       ; Branch if Equal
                move.w  $12(a0),$14(a0) ; Move Data from Source to Destination

loc_12C7E:                              ; CODE XREF: sub_12998+2DE↑j
                btst    #3,($1577E).l   ; Test a Bit
                beq.w   locret_12FEE    ; Branch if Equal
                move.w  #$130,2(a0)     ; Move Data from Source to Destination
                neg.w   $12(a0)         ; Negate
                rts                     ; Return from Subroutine
; End of function sub_12998


; =============== S U B R O U T I N E =======================================


;-------------------------------------------------------------------------
; sub_12C96:
;-------------------------------------------------------------------------
sub_12C96:
                                   ; CODE XREF: sub_12998+1B8↑p
                                        ; ROM:000131C6↓j
                move.w  d0,2(a0)        ; Move Data from Source to Destination
                move.w  d1,4(a0)        ; Move Data from Source to Destination
                move.l  #(byte_1324E+$152),6(a0) ; Move Data from Source to Destination
                move.w  #$2020,$A(a0)   ; Move Data from Source to Destination
                move.w  #3,$C(a0)       ; Move Data from Source to Destination
                move.w  #6,$E(a0)       ; Move Data from Source to Destination
                move.w  #1,(a0)         ; Move Data from Source to Destination
                bsr.w   sub_13156       ; Branch to Subroutine
                move.b  #1,(a1)         ; Move Data from Source to Destination
                rts                     ; Return from Subroutine
; End of function sub_12C96


; =============== S U B R O U T I N E =======================================


;-------------------------------------------------------------------------
; sub_12CC6:
;-------------------------------------------------------------------------
sub_12CC6:
                                   ; CODE XREF: sub_12998+1A6↑p
                                        ; sub_12998:loc_12C3C↑p
                tst.w   (byte_13416).l  ; Test an Operand
                bne.s   loc_12CD2       ; Branch if Not Equal
                clr.w   d2              ; Clear an Operand
                rts                     ; Return from Subroutine
; ---------------------------------------------------------------------------

loc_12CD2:                              ; CODE XREF: sub_12CC6+6↑j
                lea     ($15784).l,a0   ; Load Effective Address

loc_12CD8:                              ; CODE XREF: sub_12CC6+1A↓j
                tst.w   (a0)            ; Test an Operand
                beq.s   loc_12CE2       ; Branch if Equal
                lea     $40(a0),a0      ; Load Effective Address
                bra.s   loc_12CD8       ; Branch Always
; ---------------------------------------------------------------------------

loc_12CE2:                              ; CODE XREF: sub_12CC6+14↑j
                subi.w  #1,(byte_13416).l ; Subtract Immediate
                move.w  #1,d2           ; Move Data from Source to Destination
                rts                     ; Return from Subroutine


;-------------------------------------------------------------------------
; sub_12CF0:
;-------------------------------------------------------------------------
sub_12CF0:
                                   ; DATA XREF: ROM:00012618↑o
                btst    #1,($1577E).l   ; Test a Bit
                bne.w   locret_12FEE    ; Branch if Not Equal
                move.b  (a0),(byte_13438+2).l ; Move Data from Source to Destination
                move.b  1(a0),(byte_1343C).l ; Move Data from Source to Destination
                move.b  2(a0),(byte_1343E).l ; Move Data from Source to Destination
                movem.w d0-d1,-(sp)     ; Move Multiple Registers
                move.b  (byte_1343E).l,d1 ; Move Data from Source to Destination
                neg.b   d1              ; Negate
                ext.w   d1              ; Sign Extend
                move.w  (byte_13438).l,d0 ; Move Data from Source to Destination
                add.w   d1,d0           ; Add
                cmp.w   #$50,d0 ; 'P'   ; Compare
                bge.s   loc_12D32       ; Branch if Greater or Equal
                move.w  #$50,d0 ; 'P'   ; Move Data from Source to Destination

loc_12D32:                              ; CODE XREF: sub_12CF0+3C↑j
                cmp.w   #$B7,d0         ; Compare
                ble.s   loc_12D3C       ; Branch if Less or Equal
                move.w  #$B7,d0         ; Move Data from Source to Destination

loc_12D3C:                              ; CODE XREF: sub_12CF0+46↑j
                move.w  d0,(byte_13438).l ; Move Data from Source to Destination
                move.b  (byte_1343C).l,d1 ; Move Data from Source to Destination
                ext.w   d1              ; Sign Extend
                move.w  (byte_13418).l,d0 ; Move Data from Source to Destination
                add.w   d1,d0           ; Add
                cmp.w   #8,d0           ; Compare
                bge.s   loc_12D5C       ; Branch if Greater or Equal
                move.w  #8,d0           ; Move Data from Source to Destination

loc_12D5C:                              ; CODE XREF: sub_12CF0+66↑j
                cmp.w   #$12F,d0        ; Compare
                ble.s   loc_12D66       ; Branch if Less or Equal
                move.w  #$12F,d0        ; Move Data from Source to Destination

loc_12D66:                              ; CODE XREF: sub_12CF0+70↑j
                move.w  d0,(byte_13418).l ; Move Data from Source to Destination
                movem.w (sp)+,d0-d1     ; Move Multiple Registers
                rts                     ; Return from Subroutine
; End of function sub_12CF0


; =============== S U B R O U T I N E =======================================


;-------------------------------------------------------------------------
; sub_12D72:
;-------------------------------------------------------------------------
sub_12D72:
                                   ; CODE XREF: sub_127F4+28↑p
                                        ; sub_1284C+22↑p ...
                movem.l d0-d1/a0,-(sp)  ; Move Multiple Registers
                asl.w   #2,d1           ; Arithmetic Shift Left
                lea     (byte_13440).l,a4 ; Load Effective Address
                move.l  (a4,d1.w),d1    ; Move Data from Source to Destination
                lea     (a1,d1.w),a4    ; Load Effective Address
                move.w  (byte_1324E+$110).l,d1 ; Move Data from Source to Destination
                move.w  d0,d4           ; Move Data from Source to Destination
                andi.w  #$F,d4          ; AND Immediate
                asr.w   #1,d0           ; Arithmetic Shift Right
                andi.w  #$1F8,d0        ; AND Immediate
                lea     (a4,d0.w),a4    ; Load Effective Address
                move.l  a4,d0           ; Move Data from Source to Destination
                sub.l   a1,d0           ; Subtract
                move.l  d0,(a2)+        ; Move Data from Source to Destination

loc_12DA2:                              ; CODE XREF: sub_12D72+A8↓j
                clr.l   d0              ; Clear an Operand
                move.w  (a0)+,d0        ; Move Data from Source to Destination
                ror.l   d4,d0           ; Rotate Right (Without Extend)
                move.l  d0,d3           ; Move Data from Source to Destination
                eori.l  #$FFFFFFFF,d3   ; Exclusive OR Immediate
                and.w   d3,(a4)         ; AND Logical
                and.w   d3,2(a4)        ; AND Logical
                and.w   d3,4(a4)        ; AND Logical
                and.w   d3,6(a4)        ; AND Logical
                swap    d3              ; Swap Register Halves
                and.w   d3,8(a4)        ; AND Logical
                and.w   d3,$A(a4)       ; AND Logical
                and.w   d3,$C(a4)       ; AND Logical
                and.w   d3,$E(a4)       ; AND Logical
                btst    #0,d2           ; Test a Bit
                beq.s   loc_12DE0       ; Branch if Equal
                or.w    d0,(a4)         ; Inclusive-OR Logical
                swap    d0              ; Swap Register Halves
                or.w    d0,8(a4)        ; Inclusive-OR Logical
                swap    d0              ; Swap Register Halves

loc_12DE0:                              ; CODE XREF: sub_12D72+62↑j
                btst    #1,d2           ; Test a Bit
                beq.s   loc_12DF2       ; Branch if Equal
                or.w    d0,2(a4)        ; Inclusive-OR Logical
                swap    d0              ; Swap Register Halves
                or.w    d0,$A(a4)       ; Inclusive-OR Logical
                swap    d0              ; Swap Register Halves

loc_12DF2:                              ; CODE XREF: sub_12D72+72↑j
                btst    #2,d2           ; Test a Bit
                beq.s   loc_12E04       ; Branch if Equal
                or.w    d0,4(a4)        ; Inclusive-OR Logical
                swap    d0              ; Swap Register Halves
                or.w    d0,$C(a4)       ; Inclusive-OR Logical
                swap    d0              ; Swap Register Halves

loc_12E04:                              ; CODE XREF: sub_12D72+84↑j
                btst    #3,d2           ; Test a Bit
                beq.s   loc_12E16       ; Branch if Equal
                or.w    d0,6(a4)        ; Inclusive-OR Logical
                swap    d0              ; Swap Register Halves
                or.w    d0,$E(a4)       ; Inclusive-OR Logical
                swap    d0              ; Swap Register Halves

loc_12E16:                              ; CODE XREF: sub_12D72+96↑j
                lea     $A0(a4),a4      ; Load Effective Address
                dbf     d1,loc_12DA2    ; If False Decrement and Branch
                movem.l (sp)+,d0-d1/a0  ; Move Multiple Registers
                rts                     ; Return from Subroutine
; End of function sub_12D72


; =============== S U B R O U T I N E =======================================


;-------------------------------------------------------------------------
; sub_12E24:
;-------------------------------------------------------------------------
sub_12E24:
                                   ; CODE XREF: sub_127F4+40↑p
                movea.l ($15766).l,a0   ; Move Address
                move.w  #$1F3F,d0       ; Move Data from Source to Destination
                movea.l ($15762).l,a1   ; Move Address
                movea.l ($1576A).l,a2   ; Move Address

loc_12E3A:                              ; CODE XREF: sub_12E24+1A↓j
                move.l  (a1),(a0)+      ; Move Data from Source to Destination
                move.l  (a1)+,(a2)+     ; Move Data from Source to Destination
                dbf     d0,loc_12E3A    ; If False Decrement and Branch
                rts                     ; Return from Subroutine
; End of function sub_12E24


;---------------------------------------------------------------------------------
; sub_12E44:                              
;---------------------------------------------------------------------------------
;-------------------------------------------------------------------------
; sub_12E44:
;-------------------------------------------------------------------------
sub_12E44:
                                   
        ; CODE XREF: sub_127F4+6↑p
                move.w  #$1F3F,d0       ; Move Data from Source to Destination

loc_12E48:                              ; CODE XREF: sub_12E44+6↓j
                clr.l   (a0)+           ; Clear an Operand
                dbf     d0,loc_12E48    ; If False Decrement and Branch
                rts                     ; Return from Subroutine

;---------------------------------------------------------------------------------
; loc_12E50:                              
;---------------------------------------------------------------------------------
loc_12E50:                              
        ; CODE XREF: ROM:loc_12752↑p
                                        ; ROM:loc_127D6↑p
                movea.l ($15766).l,a1   ; Move Address
                movea.l (byte_13408).l,a2 ; Move Address
                bsr.w   sub_1284C       ; Branch to Subroutine
                move.l  #$FFFFFE0C,(a2) ; Move Data from Source to Destination
                tst.b   ($16BA2).l      ; Test an Operand
                beq.w   loc_12E74       ; Branch if Equal
                bsr.w   loc_12F0A       ; Branch to Subroutine

loc_12E74:                              ; CODE XREF: ROM:00012E6C↑j
                                        ; ROM:00012E7A↓j
                tst.w   ($1576E).l      ; Test an Operand
                bne.s   loc_12E74       ; Branch if Not Equal
                move.l  ($15766).l,d0   ; Move Data from Source to Destination
                lsr.l   #8,d0           ; Logical Shift Right
                lea     ($FF8201).l,a0  ; Load Effective Address
                movep.w d0,0(a0)        ; Move Peripheral Data
                movep.w d0,0(a0)        ; Move Peripheral Data
                move.w  #1,($1576E).l   ; Move Data from Source to Destination
                move.w  #1,d0           ; Move Data from Source to Destination

loc_12E9E:                              ; CODE XREF: ROM:00012EA4↓j
                cmp.w   ($1576E).l,d0   ; Compare
                beq.s   loc_12E9E       ; Branch if Equal
                movea.l (byte_1340C).l,a0 ; Move Address

;---------------------------------------------------------------------------------
; MainGameLoop
;---------------------------------------------------------------------------------
MainGameLoop:                              ; CODE XREF: ROM:00012EDA↓j
                move.l  (a0)+,d0        ; Move Data from Source to Destination
                bmi.s   loc_12EDC       ; Branch if Minus
                movea.l ($1576A).l,a1   ; Move Address
                adda.l  d0,a1           ; Add Address
                movea.l ($15762).l,a2   ; Move Address
                adda.l  d0,a2           ; Add Address
                move.w  #7,d0           ; Move Data from Source to Destination

loc_12EC4:                              ; CODE XREF: ROM:00012ED6↓j
                move.w  #3,d1           ; Move Data from Source to Destination

loc_12EC8:                              ; CODE XREF: ROM:00012ECA↓j
                move.l  (a2)+,(a1)+     ; Move Data from Source to Destination
                dbf     d1,loc_12EC8    ; If False Decrement and Branch
                lea     $90(a1),a1      ; Load Effective Address
                lea     $90(a2),a2      ; Load Effective Address
                dbf     d0,loc_12EC4    ; If False Decrement and Branch
                bra.s   MainGameLoop       ; Branch Always
; ---------------------------------------------------------------------------

loc_12EDC:                              ; CODE XREF: ROM:00012EAE↑j
                move.l  ($15766).l,d4   ; Move Data from Source to Destination
                move.l  ($1576A).l,($15766).l ; Move Data from Source to Destination
                move.l  d4,($1576A).l   ; Move Data from Source to Destination
                move.l  (byte_13408).l,d4 ; Move Data from Source to Destination
                move.l  (byte_1340C).l,(byte_13408).l ; Move Data from Source to Destination
                move.l  d4,(byte_1340C).l ; Move Data from Source to Destination
; ---------------------------------------------------------------------------
byte_12F08:     dc.b $4E, $75
; ---------------------------------------------------------------------------

loc_12F0A:                              ; CODE XREF: ROM:00012678↑p
                                        ; ROM:00012E70↑p
                movea.l ($15762).l,a0   ; Move Address
                movea.l a0,a1           ; Move Address
                move.w  #$13F,d0        ; Move Data from Source to Destination

loc_12F16:                              ; CODE XREF: ROM:00012F18↓j
                clr.l   (a0)+           ; Clear an Operand
                dbf     d0,loc_12F16    ; If False Decrement and Branch
                lea     ($16B9A).l,a3   ; Load Effective Address
                move.w  #7,d3           ; Move Data from Source to Destination
                move.w  #$14,d0         ; Move Data from Source to Destination
                move.w  #0,d1           ; Move Data from Source to Destination
                move.w  #8,d2           ; Move Data from Source to Destination

loc_12F32:                              ; CODE XREF: ROM:00012F58↓j
                lea     ($132BE).l,a0   ; Load Effective Address
                move.b  (a3)+,d4        ; Move Data from Source to Destination
                ext.w   d4              ; Sign Extend
                asl.w   #4,d4           ; Arithmetic Shift Left
                lea     (a0,d4.w),a0    ; Load Effective Address
                movem.l d3/a3,-(sp)     ; Move Multiple Registers
                movea.l ($1576A).l,a2   ; Move Address
                bsr.w   sub_12D72       ; Branch to Subroutine
                movem.l (sp)+,d3/a3     ; Move Multiple Registers
                addi.w  #$10,d0         ; Add Immediate
                dbf     d3,loc_12F32    ; If False Decrement and Branch
                move.w  #$AA,d0         ; Move Data from Source to Destination
                clr.w   d1              ; Clear an Operand
                move.w  #4,d2           ; Move Data from Source to Destination
                lea     ((byte_1324E+$10)).l,a0 ; Load Effective Address
                move.b  ($16BA4).l,d3   ; Move Data from Source to Destination
                ext.w   d3              ; Sign Extend
                subi.w  #1,d3           ; Subtract Immediate
                bmi.s   loc_12F8A       ; Branch if Minus

loc_12F7A:                              ; CODE XREF: ROM:00012F86↓j
                move.w  d3,-(sp)        ; Move Data from Source to Destination
                bsr.w   sub_12D72       ; Branch to Subroutine
                addi.w  #$10,d0         ; Add Immediate
                move.w  (sp)+,d3        ; Move Data from Source to Destination
                dbf     d3,loc_12F7A    ; If False Decrement and Branch

loc_12F8A:                              ; CODE XREF: ROM:00012F78↑j
                movea.l ($15766).l,a0   ; Move Address
                movea.l ($1576A).l,a2   ; Move Address
                move.w  #$13F,d0        ; Move Data from Source to Destination

loc_12F9A:                              ; CODE XREF: ROM:00012F9E↓j
                move.l  (a1),(a2)+      ; Move Data from Source to Destination
                move.l  (a1)+,(a0)+     ; Move Data from Source to Destination
                dbf     d0,loc_12F9A    ; If False Decrement and Branch
                clr.b   ($16BA2).l      ; Clear an Operand
                rts                     ; Return from Subroutine

; =============== S U B R O U T I N E =======================================


;-------------------------------------------------------------------------
; sub_12FAA:
;-------------------------------------------------------------------------
sub_12FAA:
                                   ; CODE XREF: ROM:00013100↓p
                                        ; ROM:000131BA↓p
                lea     ($16B9A).l,a4   ; Load Effective Address
                add.b   d1,(a4,d0.w)    ; Add

loc_12FB4:                              ; CODE XREF: sub_12FAA+24↓j
                cmpi.b  #$A,(a4,d0.w)   ; Compare Immediate
                blt.s   loc_12FD0       ; Branch if Less Than
                subi.b  #$A,(a4,d0.w)   ; Subtract Immediate
                subi.w  #1,d0           ; Subtract Immediate
                bmi.s   loc_12FD0       ; Branch if Minus
                addi.b  #1,(a4,d0.w)    ; Add Immediate
                bra.s   loc_12FB4       ; Branch Always
; ---------------------------------------------------------------------------

loc_12FD0:                              ; CODE XREF: sub_12FAA+10↑j
                                        ; sub_12FAA+1C↑j
                move.b  #1,($16BA2).l   ; Move Data from Source to Destination
                rts                     ; Return from Subroutine
; End of function sub_12FAA


; =============== S U B R O U T I N E =======================================


;-------------------------------------------------------------------------
; sub_12FDA:
;-------------------------------------------------------------------------
sub_12FDA:
                                   ; CODE XREF: ROM:0001270C↑p
                                        ; ROM:0001271E↑p ...
                move.w  (byte_13414).l,d0 ; Move Data from Source to Destination
                mulu.w  #$5E5,d0        ; Unsigned Multiply
                addi.w  #$29,d0 ; ')'   ; Add Immediate
                move.w  d0,(byte_13414).l ; Move Data from Source to Destination

locret_12FEE:                           ; CODE XREF: sub_1284C+DE↑j
                                        ; sub_12936+2↑j ...
                rts                     ; Return from Subroutine
; End of function sub_12FDA


; =============== S U B R O U T I N E =======================================


;-------------------------------------------------------------------------
; sub_12FF0:
;-------------------------------------------------------------------------
sub_12FF0:
                                   ; CODE XREF: sub_12998:loc_12ADA↑p
                lea     ($15784).l,a0   ; Load Effective Address
                move.w  #$1E,d7         ; Move Data from Source to Destination

loc_12FFA:                              ; CODE XREF: sub_12FF0+12↓j
                tst.w   (a0)            ; Test an Operand
                bne.s   loc_13008       ; Branch if Not Equal

loc_12FFE:                              ; CODE XREF: sub_12FF0+2C↓j
                lea     $40(a0),a0      ; Load Effective Address
                dbf     d7,loc_12FFA    ; If False Decrement and Branch
                rts                     ; Return from Subroutine
; ---------------------------------------------------------------------------

loc_13008:                              ; CODE XREF: sub_12FF0+C↑j
                lea     (byte_13242).l,a1 ; Load Effective Address
                move.w  (a0),d0         ; Move Data from Source to Destination
                subi.w  #1,d0           ; Subtract Immediate
                asl.w   #2,d0           ; Arithmetic Shift Left
                movea.l (a1,d0.w),a1    ; Move Address
                jsr     (a1)            ; Jump to Subroutine
                bra.s   loc_12FFE       ; Branch Always
; End of function sub_12FF0


; =============== S U B R O U T I N E =======================================


;-------------------------------------------------------------------------
; sub_1301E:
;-------------------------------------------------------------------------
sub_1301E:
                                   ; CODE XREF: sub_1284C↑p
                lea     ($15784).l,a3   ; Load Effective Address
                move.w  #$1E,d7         ; Move Data from Source to Destination

loc_13028:                              ; CODE XREF: sub_1301E+12↓j
                tst.w   (a3)            ; Test an Operand
                bne.s   loc_13036       ; Branch if Not Equal

loc_1302C:                              ; CODE XREF: sub_1301E+34↓j
                lea     $40(a3),a3      ; Load Effective Address
                dbf     d7,loc_13028    ; If False Decrement and Branch
                rts                     ; Return from Subroutine
; ---------------------------------------------------------------------------

loc_13036:                              ; CODE XREF: sub_1301E+C↑j
                movea.l 6(a3),a0        ; Move Address
                move.w  2(a3),d0        ; Move Data from Source to Destination
                move.w  4(a3),d1        ; Move Data from Source to Destination
                move.w  $E(a3),d2       ; Move Data from Source to Destination
                movem.l d7/a3,-(sp)     ; Move Multiple Registers
                bsr.w   sub_12D72       ; Branch to Subroutine
                movem.l (sp)+,d7/a3     ; Move Multiple Registers
                bra.s   loc_1302C       ; Branch Always
; End of function sub_1301E

; ---------------------------------------------------------------------------
                bsr.w   sub_1309E       ; Branch to Subroutine
                bpl.s   loc_1306A       ; Branch if Plus
                cmpi.b  #$FF,(a1)       ; Compare Immediate
                bne.w   loc_13142       ; Branch if Not Equal
                move.w  #$FFFF,($16B88).l ; Move Data from Source to Destination

loc_1306A:                              ; CODE XREF: ROM:00013058↑j
                move.w  4(a0),d0        ; Move Data from Source to Destination
                addi.w  #4,d0           ; Add Immediate
                cmp.w   #$C0,d0         ; Compare
                bge.w   loc_13142       ; Branch if Greater or Equal
                move.w  d0,4(a0)        ; Move Data from Source to Destination
                bra.w   loc_1314E       ; Branch Always

; =============== S U B R O U T I N E =======================================


;-------------------------------------------------------------------------
; sub_13082:
;-------------------------------------------------------------------------
sub_13082:
                                   ; CODE XREF: sub_12998:loc_12B24↑p
                                        ; sub_1309E+14↓p
                btst    #1,($1577E).l   ; Test a Bit
                bne.w   locret_12FEE    ; Branch if Not Equal
                clr.w   ($1577C).l      ; Clear an Operand
                bset    #1,($1577E).l   ; Test a Bit and Set
                rts                     ; Return from Subroutine
; End of function sub_13082


; =============== S U B R O U T I N E =======================================


;-------------------------------------------------------------------------
; sub_1309E:
;-------------------------------------------------------------------------
sub_1309E:
                                   ; CODE XREF: ROM:00013054↑p
                                        ; ROM:000130C0↓p ...
                bsr.w   sub_13156       ; Branch to Subroutine
                tst.b   (a1)            ; Test an Operand
                bpl.w   locret_12FEE    ; Branch if Plus
                cmpi.b  #$FE,(a1)       ; Compare Immediate
                bne.w   loc_130BC       ; Branch if Not Equal
                move.l  a1,-(sp)        ; Move Data from Source to Destination
                bsr.w   sub_13082       ; Branch to Subroutine
                movea.l (sp)+,a1        ; Move Address
                move.b  #$FE,(a1)       ; Move Data from Source to Destination

loc_130BC:                              ; CODE XREF: sub_1309E+E↑j
                tst.b   (a1)            ; Test an Operand
                rts                     ; Return from Subroutine
; End of function sub_1309E

; ---------------------------------------------------------------------------
                bsr.w   sub_1309E       ; Branch to Subroutine
                bpl.w   loc_1310E       ; Branch if Plus
                cmpi.b  #$FF,(a1)       ; Compare Immediate
                bne.w   loc_13142       ; Branch if Not Equal
                move.w  ($16B88).l,d0   ; Move Data from Source to Destination
                move.w  ($16B8A).l,d1   ; Move Data from Source to Destination
                bsr.w   sub_13178       ; Branch to Subroutine
                clr.b   (a1)            ; Clear an Operand
                move.w  #$FFFF,($16B88).l ; Move Data from Source to Destination
                subi.l  #$10,6(a0)      ; Subtract Immediate
                addi.w  #1,$C(a0)       ; Add Immediate
                move.w  #7,d0           ; Move Data from Source to Destination
                move.w  #1,d1           ; Move Data from Source to Destination
                bsr.w   sub_12FAA       ; Branch to Subroutine
                cmpi.w  #4,$C(a0)       ; Compare Immediate
                bge.s   loc_13142       ; Branch if Greater or Equal
                rts                     ; Return from Subroutine
; ---------------------------------------------------------------------------

loc_1310E:                              ; CODE XREF: ROM:000130C4↑j
                clr.b   (a1)            ; Clear an Operand
                subi.b  #1,$A(a0)       ; Subtract Immediate
                bpl.s   loc_1314E       ; Branch if Plus
                move.b  $B(a0),$A(a0)   ; Move Data from Source to Destination
                addi.l  #$10,6(a0)      ; Add Immediate
                subi.w  #1,$C(a0)       ; Subtract Immediate
                bpl.s   loc_1314E       ; Branch if Plus
                move.w  #2,(a0)         ; Move Data from Source to Destination
                move.w  #7,$E(a0)       ; Move Data from Source to Destination
                move.l  #byte_133E0,6(a0) ; Move Data from Source to Destination
                rts                     ; Return from Subroutine
; ---------------------------------------------------------------------------

loc_13142:                              ; CODE XREF: ROM:0001305E↑j
                                        ; ROM:00013076↑j ...
                clr.w   (a0)            ; Clear an Operand
                addi.w  #1,(byte_13416).l ; Add Immediate
                rts                     ; Return from Subroutine
; ---------------------------------------------------------------------------

loc_1314E:                              ; CODE XREF: ROM:0001307E↑j
                                        ; ROM:00013116↑j ...
                bsr.s   sub_13156       ; Branch to Subroutine
                move.b  1(a0),(a1)      ; Move Data from Source to Destination
                rts                     ; Return from Subroutine

; =============== S U B R O U T I N E =======================================


;-------------------------------------------------------------------------
; sub_13156:
;-------------------------------------------------------------------------
sub_13156:
                                   ; CODE XREF: sub_12C96+26↑p
                                        ; sub_1309E↑p ...
                move.w  4(a0),d2        ; Move Data from Source to Destination
                andi.w  #$F8,d2         ; AND Immediate
                move.w  d2,d3           ; Move Data from Source to Destination
                asl.w   #2,d3           ; Arithmetic Shift Left
                add.w   d2,d3           ; Add
                move.w  2(a0),d2        ; Move Data from Source to Destination
                asr.w   #4,d2           ; Arithmetic Shift Right
                add.w   d2,d3           ; Add
                lea     ($16784).l,a1   ; Load Effective Address
                lea     (a1,d3.w),a1    ; Load Effective Address
                rts                     ; Return from Subroutine
; End of function sub_13156


; =============== S U B R O U T I N E =======================================


;-------------------------------------------------------------------------
; sub_13178:
;-------------------------------------------------------------------------
sub_13178:
                                   ; CODE XREF: sub_12998+98↑p
                                        ; sub_12998+B6↑p ...
                andi.w  #$F8,d1         ; AND Immediate
                move.w  d1,d2           ; Move Data from Source to Destination
                asl.w   #2,d2           ; Arithmetic Shift Left
                add.w   d1,d2           ; Add
                asr.w   #4,d0           ; Arithmetic Shift Right
                add.w   d0,d2           ; Add
                lea     ($16784).l,a1   ; Load Effective Address
                lea     (a1,d2.w),a1    ; Load Effective Address
                rts                     ; Return from Subroutine
; End of function sub_13178

; ---------------------------------------------------------------------------
                move.w  ($1577C).l,d0   ; Move Data from Source to Destination
                asl.w   #2,d0           ; Arithmetic Shift Left
                andi.w  #$30,d0 ; '0'   ; AND Immediate
                lea     ((byte_1324E+$30)).l,a1 ; Load Effective Address
                lea     (a1,d0.w),a1    ; Load Effective Address
                move.l  a1,6(a0)        ; Move Data from Source to Destination
                bsr.w   sub_1309E       ; Branch to Subroutine
                bpl.s   loc_131DA       ; Branch if Plus
                move.w  #6,d0           ; Move Data from Source to Destination
                move.w  #5,d1           ; Move Data from Source to Destination
                bsr.w   sub_12FAA       ; Branch to Subroutine
                move.w  2(a0),d0        ; Move Data from Source to Destination
                move.w  4(a0),d1        ; Move Data from Source to Destination
                bra.w   sub_12C96       ; Branch Always
; ---------------------------------------------------------------------------

loc_131CA:                              ; CODE XREF: ROM:000131E8↓j
                                        ; ROM:000131F4↓j ...
                neg.w   $12(a0)         ; Negate
                tst.w   $14(a0)         ; Test an Operand
                bne.s   loc_131DA       ; Branch if Not Equal
                addi.w  #8,4(a0)        ; Add Immediate

loc_131DA:                              ; CODE XREF: ROM:000131B0↑j
                                        ; ROM:000131D2↑j
                move.w  $12(a0),d0      ; Move Data from Source to Destination
                bmi.s   loc_131EC       ; Branch if Minus
                add.w   2(a0),d0        ; Add
                cmp.w   #$130,d0        ; Compare
                bge.s   loc_131CA       ; Branch if Greater or Equal
                bra.s   loc_131F6       ; Branch Always
; ---------------------------------------------------------------------------

loc_131EC:                              ; CODE XREF: ROM:000131DE↑j
                add.w   2(a0),d0        ; Add
                cmp.w   #8,d0           ; Compare
                blt.s   loc_131CA       ; Branch if Less Than

loc_131F6:                              ; CODE XREF: ROM:000131EA↑j
                move.w  d0,2(a0)        ; Move Data from Source to Destination
                move.w  $14(a0),d0      ; Move Data from Source to Destination
                bpl.s   loc_13214       ; Branch if Plus
                add.w   4(a0),d0        ; Add
                cmp.w   #8,d0           ; Compare
                bge.s   loc_13230       ; Branch if Greater or Equal

loc_1320A:                              ; CODE XREF: ROM:00013222↓j
                neg.w   $14(a0)         ; Negate
                add.w   $14(a0),d0      ; Add
                bra.s   loc_13230       ; Branch Always
; ---------------------------------------------------------------------------

loc_13214:                              ; CODE XREF: ROM:000131FE↑j
                add.w   4(a0),d0        ; Add
                cmp.w   #$B8,d0         ; Compare
                ble.s   loc_13230       ; Branch if Less or Equal
                tst.w   $14(a0)         ; Test an Operand
                bne.s   loc_1320A       ; Branch if Not Equal
                move.w  $12(a0),d1      ; Move Data from Source to Destination
                bmi.s   loc_1322C       ; Branch if Minus
                neg.w   d1              ; Negate

loc_1322C:                              ; CODE XREF: ROM:00013228↑j
                move.w  d1,$14(a0)      ; Move Data from Source to Destination

loc_13230:                              ; CODE XREF: ROM:00013208↑j
                                        ; ROM:00013212↑j ...
                move.w  d0,4(a0)        ; Move Data from Source to Destination
                bsr.w   sub_13156       ; Branch to Subroutine
                cmpi.b  #1,(a1)         ; Compare Immediate
                beq.s   loc_131CA       ; Branch if Equal
                bra.w   loc_1314E       ; Branch Always
; ---------------------------------------------------------------------------
byte_13242:     dc.b $00,$01,$30,$C0,$00,$01,$30,$54
                                        ; DATA XREF: sub_12FF0:loc_13008↑o
                dc.b $00,$01,$31,$92
byte_1324E:     dc.b $03,$00,$03,$00,$03,$00,$FF,$FF
                                        ; DATA XREF: sub_127F4+A↑o
                dc.b $03,$00,$03,$00,$03,$00,$03,$00
                dc.b $01,$00,$03,$80,$07,$C0,$0F,$E0
                dc.b $53,$94,$47,$C4,$6F,$EC,$7F,$FC
                dc.b $03,$00,$07,$80,$07,$80,$03,$00
                dc.b $03,$00,$03,$00,$03,$00,$03,$00
                dc.b $03,$F8,$00,$0E,$3F,$F3,$FC,$FF
                dc.b $FF,$3F,$CF,$FC,$70,$00,$1F,$C0
                dc.b $01,$F8,$06,$7C,$19,$FC,$07,$38
                dc.b $1C,$E0,$3F,$98,$3F,$60,$1F,$80
                dc.b $0F,$C0,$1B,$E0,$1B,$28,$1B,$EC
                dc.b $0A,$6C,$03,$EC,$03,$F8,$01,$C0
                dc.b $1F,$80,$3E,$60,$3F,$98,$1C,$E0
                dc.b $07,$38,$19,$FC,$06,$FC,$01,$F8
                dc.b $3F,$FC,$00,$0C,$30,$3C,$30,$CC
                dc.b $33,$0C,$3C,$0C,$3F,$FC,$00,$00
                dc.b $0F,$00,$00,$00,$03,$00,$03,$00
                dc.b $03,$00,$03,$00,$0F,$C0,$00,$00
                dc.b $3F,$FC,$00,$0C,$00,$0C,$1F,$FC
                dc.b $18,$00,$18,$06,$1F,$FE,$00,$00
                dc.b $3F,$FC,$00,$0C,$00,$0C,$03,$FC
                dc.b $00,$0C,$30,$0C,$3F,$FC,$00,$00
                dc.b $18,$00,$00,$C0,$38,$C0,$3F,$F8
                dc.b $00,$C0,$00,$C0,$00,$C0,$00,$00
                dc.b $3F,$FE,$00,$06,$30,$00,$3F,$F8
                dc.b $00,$0C,$60,$0C,$7F,$F8,$00,$00
                dc.b $1F,$F8,$00,$0C,$30,$00,$3F,$F8
                dc.b $30,$0C,$30,$0C,$1F,$F8,$00,$00
                dc.b $3F,$FC,$30,$0C,$00,$30,$00,$C0
                dc.b $03,$00,$03,$00,$03,$00,$00,$00
                dc.b $1F,$F8,$00,$0C,$30,$0C,$1F,$F8
                dc.b $30,$0C,$30,$0C,$1F,$F8,$00,$00
                dc.b $1F,$F8,$00,$0C,$30,$0C,$1F,$FC
                dc.b $00,$0C,$70,$0C,$3F,$F8,$00,$00
                dc.b $00,$07,$FF,$80,$34,$00,$4F,$E0
                dc.b $13,$BF,$13,$BF,$4F,$E0,$34,$00
                dc.b $FF,$C0,$01,$80,$11,$88,$03,$C0
                dc.b $16,$68,$3F,$FC,$2D,$B4,$38,$1C
                dc.b $10,$08,$00,$00,$06,$00,$87,$0C
                dc.b $CD,$9F,$68,$F3,$38,$60,$10,$00
                dc.b $00,$00,$01,$80,$07,$00,$0E,$00
                dc.b $03,$C0,$00,$70,$00,$1C,$00,$30
                dc.b $00,$E0,$00,$00,$00,$00,$00,$00
                dc.b $01,$80,$01,$80,$00,$00,$00,$00
                dc.b $00,$00,$00,$00,$01,$80,$03,$C0
                dc.b $07,$E0,$07,$E0,$03,$C0,$01,$80
                dc.b $00,$00,$08,$10,$05,$A0,$02,$40
                dc.b $07,$E0,$07,$E0,$02,$40,$05,$A0
                dc.b $08,$10,$09,$90,$06,$60,$06,$60
                dc.b $09,$90,$09,$90,$06,$60,$06,$60
                dc.b $09,$90
byte_133E0:     dc.b $10,$08,$18,$18,$1D,$B8,$17,$E8
                                        ; DATA XREF: ROM:00013138↑o
                dc.b $02,$C0,$03,$C0,$02,$C0,$01,$80
byte_133F0:     dc.b $30,$06,$00,$30,$63,$00,$00,$0C
                                        ; DATA XREF: sub_1284C+B4↑o
                dc.b $31,$80,$00,$30,$CC,$03,$00,$C0
byte_13400:     dc.b $01,$00,$01,$01    ; DATA XREF: ROM:0001261E↑o
byte_13404:     dc.b $04,$16,$0B,$B8    ; DATA XREF: ROM:0001269E↑w
                                        ; sub_12998↑w ...
byte_13408:     dc.b $00,$01,$37,$60    ; DATA XREF: ROM:00012640↑r
                                        ; ROM:00012E56↑r ...
byte_1340C:     dc.b $00,$01,$47,$60    ; DATA XREF: ROM:0001264C↑r
                                        ; ROM:00012EA6↑r ...
byte_13410:     dc.b $00,$0E,$00,$85    ; DATA XREF: sub_1284C+40↑r
                                        ; sub_12998+1D8↑r ...
byte_13414:     dc.b $B0                ; DATA XREF: sub_12FDA↑r
                                        ; sub_12FDA+E↑w
                dc.b $87
byte_13416:     dc.b $00,$06            ; DATA XREF: ROM:000126A8↑w
                                        ; sub_12998+276↑r ...
byte_13418:     dc.b $00,$57,$00,$00,$00,$07,$07,$00
                                        ; DATA XREF: ROM:00012704↑w
                                        ; sub_1284C:loc_128F4↑r ...
                dc.b $07,$07,$00,$70,$00,$77,$07,$70
                dc.b $07,$77,$FF,$90,$00,$00,$00,$00
                dc.b $00,$00,$00,$00,$00,$00,$00,$00
byte_13438:     dc.b $00,$66,$F8,$00    ; DATA XREF: ROM:000126FC↑w
                                        ; sub_1284C+AE↑r ...
byte_1343C:     dc.b $FF,$00            ; DATA XREF: sub_12CF0+12↑w
                                        ; sub_12CF0+52↑r
byte_1343E:     dc.b $00,$00            ; DATA XREF: sub_12CF0+1A↑w
                                        ; sub_12CF0+26↑r
byte_13440:     dc.b $00,$00,$00,$00,$00,$00,$00,$A0
                                        ; DATA XREF: ROM:000125C6↑o
                                        ; sub_12D72+6↑o
                dc.b $00,$00,$01,$40,$00,$00,$01,$E0
                dc.b $00,$00,$02,$80,$00,$00,$03,$20
                dc.b $00,$00,$03,$C0,$00,$00,$04,$60
                dc.b $00,$00,$05,$00,$00,$00,$05,$A0
                dc.b $00,$00,$06,$40,$00,$00,$06,$E0
                dc.b $00,$00,$07,$80,$00,$00,$08,$20
                dc.b $00,$00,$08,$C0,$00,$00,$09,$60
                dc.b $00,$00,$0A,$00,$00,$00,$0A,$A0
                dc.b $00,$00,$0B,$40,$00,$00,$0B,$E0
                dc.b $00,$00,$0C,$80,$00,$00,$0D,$20
                dc.b $00,$00,$0D,$C0,$00,$00,$0E,$60
                dc.b $00,$00,$0F,$00,$00,$00,$0F,$A0
                dc.b $00,$00,$10,$40,$00,$00,$10,$E0
                dc.b $00,$00,$11,$80,$00,$00,$12,$20
                dc.b $00,$00,$12,$C0,$00,$00,$13,$60
                dc.b $00,$00,$14,$00,$00,$00,$14,$A0
                dc.b $00,$00,$15,$40,$00,$00,$15,$E0
                dc.b $00,$00,$16,$80,$00,$00,$17,$20
                dc.b $00,$00,$17,$C0,$00,$00,$18,$60
                dc.b $00,$00,$19,$00,$00,$00,$19,$A0
                dc.b $00,$00,$1A,$40,$00,$00,$1A,$E0
                dc.b $00,$00,$1B,$80,$00,$00,$1C,$20
                dc.b $00,$00,$1C,$C0,$00,$00,$1D,$60
                dc.b $00,$00,$1E,$00,$00,$00,$1E,$A0
                dc.b $00,$00,$1F,$40,$00,$00,$1F,$E0
                dc.b $00,$00,$20,$80,$00,$00,$21,$20
                dc.b $00,$00,$21,$C0,$00,$00,$22,$60
                dc.b $00,$00,$23,$00,$00,$00,$23,$A0
                dc.b $00,$00,$24,$40,$00,$00,$24,$E0
                dc.b $00,$00,$25,$80,$00,$00,$26,$20
                dc.b $00,$00,$26,$C0,$00,$00,$27,$60
                dc.b $00,$00,$28,$00,$00,$00,$28,$A0
                dc.b $00,$00,$29,$40,$00,$00,$29,$E0
                dc.b $00,$00,$2A,$80,$00,$00,$2B,$20
                dc.b $00,$00,$2B,$C0,$00,$00,$2C,$60
                dc.b $00,$00,$2D,$00,$00,$00,$2D,$A0
                dc.b $00,$00,$2E,$40,$00,$00,$2E,$E0
                dc.b $00,$00,$2F,$80,$00,$00,$30,$20
                dc.b $00,$00,$30,$C0,$00,$00,$31,$60
                dc.b $00,$00,$32,$00,$00,$00,$32,$A0
                dc.b $00,$00,$33,$40,$00,$00,$33,$E0
                dc.b $00,$00,$34,$80,$00,$00,$35,$20
                dc.b $00,$00,$35,$C0,$00,$00,$36,$60
                dc.b $00,$00,$37,$00,$00,$00,$37,$A0
                dc.b $00,$00,$38,$40,$00,$00,$38,$E0
                dc.b $00,$00,$39,$80,$00,$00,$3A,$20
                dc.b $00,$00,$3A,$C0,$00,$00,$3B,$60
                dc.b $00,$00,$3C,$00,$00,$00,$3C,$A0
                dc.b $00,$00,$3D,$40,$00,$00,$3D,$E0
                dc.b $00,$00,$3E,$80,$00,$00,$3F,$20
                dc.b $00,$00,$3F,$C0,$00,$00,$40,$60
                dc.b $00,$00,$41,$00,$00,$00,$41,$A0
                dc.b $00,$00,$42,$40,$00,$00,$42,$E0
                dc.b $00,$00,$43,$80,$00,$00,$44,$20
                dc.b $00,$00,$44,$C0,$00,$00,$45,$60
                dc.b $00,$00,$46,$00,$00,$00,$46,$A0
                dc.b $00,$00,$47,$40,$00,$00,$47,$E0
                dc.b $00,$00,$48,$80,$00,$00,$49,$20
                dc.b $00,$00,$49,$C0,$00,$00,$4A,$60
                dc.b $00,$00,$4B,$00,$00,$00,$4B,$A0
                dc.b $00,$00,$4C,$40,$00,$00,$4C,$E0
                dc.b $00,$00,$4D,$80,$00,$00,$4E,$20
                dc.b $00,$00,$4E,$C0,$00,$00,$4F,$60
                dc.b $00,$00,$50,$00,$00,$00,$50,$A0
                dc.b $00,$00,$51,$40,$00,$00,$51,$E0
                dc.b $00,$00,$52,$80,$00,$00,$53,$20
                dc.b $00,$00,$53,$C0,$00,$00,$54,$60
                dc.b $00,$00,$55,$00,$00,$00,$55,$A0
                dc.b $00,$00,$56,$40,$00,$00,$56,$E0
                dc.b $00,$00,$57,$80,$00,$00,$58,$20
                dc.b $00,$00,$58,$C0,$00,$00,$59,$60
                dc.b $00,$00,$5A,$00,$00,$00,$5A,$A0
                dc.b $00,$00,$5B,$40,$00,$00,$5B,$E0
                dc.b $00,$00,$5C,$80,$00,$00,$5D,$20
                dc.b $00,$00,$5D,$C0,$00,$00,$5E,$60
                dc.b $00,$00,$5F,$00,$00,$00,$5F,$A0
                dc.b $00,$00,$60,$40,$00,$00,$60,$E0
                dc.b $00,$00,$61,$80,$00,$00,$62,$20
                dc.b $00,$00,$62,$C0,$00,$00,$63,$60
                dc.b $00,$00,$64,$00,$00,$00,$64,$A0
                dc.b $00,$00,$65,$40,$00,$00,$65,$E0
                dc.b $00,$00,$66,$80,$00,$00,$67,$20
                dc.b $00,$00,$67,$C0,$00,$00,$68,$60
                dc.b $00,$00,$69,$00,$00,$00,$69,$A0
                dc.b $00,$00,$6A,$40,$00,$00,$6A,$E0
                dc.b $00,$00,$6B,$80,$00,$00,$6C,$20
                dc.b $00,$00,$6C,$C0,$00,$00,$6D,$60
                dc.b $00,$00,$6E,$00,$00,$00,$6E,$A0
                dc.b $00,$00,$6F,$40,$00,$00,$6F,$E0
                dc.b $00,$00,$70,$80,$00,$00,$71,$20
                dc.b $00,$00,$71,$C0,$00,$00,$72,$60
                dc.b $00,$00,$73,$00,$00,$00,$73,$A0
                dc.b $00,$00,$74,$40,$00,$00,$74,$E0
                dc.b $00,$00,$75,$80,$00,$00,$76,$20
                dc.b $00,$00,$76,$C0,$00,$00,$77,$60
                dc.b $00,$00,$78,$00,$00,$00,$78,$A0
                dc.b $00,$00,$79,$40,$00,$00,$79,$E0
                dc.b $00,$00,$7A,$80,$00,$00,$7B,$20
                dc.b $00,$00,$7B,$C0,$00,$00,$7C,$60
                dc.b $00,$00,$14,$08,$00,$00,$6D,$D0
                dc.b $00,$00,$14,$20,$00,$00,$37,$38
                dc.b $00,$00,$1E,$48,$00,$00,$14,$18
                dc.b $00,$00,$23,$30,$00,$00,$16,$B8
                dc.b $00,$00,$14,$18,$00,$00,$50,$90
                dc.b $00,$00,$50,$90,$00,$00,$14,$10
                dc.b $00,$00,$37,$38,$00,$00,$14,$10
                dc.b $00,$00,$14,$00,$00,$00,$37,$58
                dc.b $00,$00,$37,$38,$00,$00,$23,$40
                dc.b $00,$00,$23,$40,$00,$00,$23,$38
                dc.b $00,$00,$52,$80,$00,$00,$78,$00
                dc.b $00,$00,$3F,$E8,$FF,$FF,$FE,$0C
                dc.b $00,$00,$0F,$70,$00,$00,$14,$70
                dc.b $00,$00,$19,$70,$00,$00,$1E,$70
                dc.b $00,$00,$23,$70,$00,$00,$28,$70
                dc.b $00,$00,$2D,$70,$00,$00,$32,$70
                dc.b $00,$00,$37,$70,$00,$00,$3C,$70
                dc.b $00,$00,$41,$70,$00,$00,$46,$70
                dc.b $00,$00,$4B,$70,$00,$00,$50,$70
                dc.b $00,$00,$55,$70,$00,$00,$5A,$70
                dc.b $00,$00,$5F,$70,$00,$00,$64,$70
                dc.b $00,$00,$69,$70,$00,$00,$6E,$70
                dc.b $00,$00,$73,$70,$00,$00,$3E,$48
                dc.b $00,$00,$3F,$E8,$FF,$FF,$FE,$0C
                dc.b $00,$00,$53,$28,$00,$00,$1E,$A8
                dc.b $00,$00,$1E,$D8,$00,$00,$1F,$00
                dc.b $00,$00,$53,$80,$FF,$FF,$FE,$0C
                dc.b $00,$00,$53,$38,$00,$00,$2D,$B8
                dc.b $00,$00,$2D,$D8,$00,$00,$2D,$F0
                dc.b $00,$00,$53,$70,$FF,$FF,$FE,$0C
                dc.b $00,$00,$53,$40,$00,$00,$3C,$C0
                dc.b $00,$00,$3C,$D8,$00,$00,$3C,$E8
                dc.b $00,$00,$53,$68,$00,$00,$69,$E8
                dc.b $00,$00,$69,$D8,$00,$00,$69,$C0
                dc.b $FF,$FF,$FE,$0C,$00,$00,$69,$D8
                dc.b $00,$00,$69,$C0,$00,$00,$53,$48
                dc.b $00,$00,$41,$C8,$00,$00,$41,$D8
                dc.b $00,$00,$41,$E0,$00,$00,$53,$60
                dc.b $00,$00,$64,$E0,$00,$00,$64,$D8
                dc.b $00,$00,$64,$C8,$00,$00,$53,$48
                dc.b $00,$00,$46,$C8,$00,$00,$46,$D8
                dc.b $00,$00,$46,$E0,$00,$00,$53,$60
                dc.b $00,$00,$5F,$E0,$00,$00,$5F,$D8
                dc.b $00,$00,$5F,$C8,$00,$00,$53,$50
                dc.b $00,$00,$4B,$D0,$00,$00,$4B,$D8
                dc.b $00,$00,$4B,$D8,$00,$00,$53,$58
                dc.b $00,$00,$5A,$D8,$00,$00,$5A,$D8
                dc.b $00,$00,$5A,$D0,$00,$00,$53,$50
                dc.b $00,$00,$50,$D0,$00,$00,$50,$D8
                dc.b $00,$00,$50,$D8,$00,$00,$53,$58
                dc.b $00,$00,$55,$D8,$00,$00,$55,$D8
                dc.b $00,$00,$55,$D0,$FF,$FF,$FE,$0C
                dc.b $FF,$FF,$FE,$0C,$00,$00,$00,$00
                dc.b $00,$00,$00,$00,$00,$00,$00,$00
                dc.b $00,$00,$00,$00,$00,$00,$00,$00
                dc.b $00,$00,$00,$00,$00,$00,$00,$00
                dc.b $00,$00,$00,$00,$00,$00,$00,$00
                dc.b $00,$00,$00,$00,$00,$00,$00,$00
                dc.b $00,$00,$00,$00,$00,$00,$00,$00
                dc.b $00,$00,$00,$00,$00,$00,$00,$00
                dc.b $00,$00,$00,$00,$00,$00,$00,$00
                dc.b $00,$00,$00,$00,$00,$00,$00,$00
                dc.b $00,$00,$00,$00,$00,$00,$00,$00
                dc.b $00,$00,$00,$00,$00,$00,$00,$00
                dc.b $00,$00,$00,$00,$00,$00,$00,$00
                dc.b $00,$00,$00,$00,$00,$00,$00,$00
                dc.b $00,$00,$00,$00,$00,$00,$00,$00
                dc.b $00,$00,$00,$00,$00,$00,$00,$00
                dc.b $00,$00,$00,$00,$00,$00,$00,$00
                dc.b $00,$00,$00,$00,$00,$00,$00,$00
                dc.b $00,$00
; end of 'ROM'


                END
