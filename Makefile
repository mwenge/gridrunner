.PHONY: all clean run

D64_IMAGE = "bin/gridrunner.d64"
XVIC_IMAGE = "bin/gridrunner-vic20.prg"
XATARI_IMAGE = "bin/gridrunner.xex"
X64 = x64
XVIC = xvic
X64SC = x64sc
C1541 = c1541
XATARI = atari800

all: clean d64 run
vic: clean vic runvic

gridrunner.prg: src/c64/gridrunner.asm
	64tass -Wall -Wno-implied-reg --cbm-prg -o bin/gridrunner.prg -L bin/list-co1.txt -l bin/labels.txt src/c64/gridrunner.asm
	md5sum bin/gridrunner.prg bin/gridrunner-bench.prg

gridrunner-vic20.prg: src/vic20/gridrunner.asm
	64tass -Wall -Wno-implied-reg --cbm-prg -o bin/gridrunner-vic20.prg -L bin/list-co1.txt -l bin/labels.txt src/vic20/gridrunner.asm
	md5sum bin/gridrunner-vic20.prg orig/gridrunnervic20.prg

gridrunner.xex: src/atari800/gridrunner.asm
	64tass -Wall -Wno-implied-reg --atari-xex -o bin/gridrunner.xex -L bin/list-co1.txt -l bin/labels.txt src/atari800/gridrunner.asm
	# the original xex file has an incorrect end-byte which we need to patch here.
	dd if=bin/patch-atari-end-byte.bin of=bin/gridrunner.xex bs=1 seek=4 count=1 conv=notrunc
	md5sum bin/gridrunner.xex orig/gridrunner.xex

d64: gridrunner.prg
	$(C1541) -format "gridrunner,rq" d64 $(D64_IMAGE)
	$(C1541) $(D64_IMAGE) -write bin/gridrunner.prg "gridrunner"
	$(C1541) $(D64_IMAGE) -list

runvic: gridrunner-vic20.prg
	$(XVIC) -verbose $(XVIC_IMAGE)

runatari: gridrunner.xex
	$(XATARI) -win-height 800 -win-width 1200 $(XATARI_IMAGE)

run: d64
	$(X64) -verbose $(D64_IMAGE)

clean:
	-rm $(D64_IMAGE)
	-rm $(XVIC_IMAGE)
	-rm bin/gridrunner.prg
	-rm bin/gridrunner.xex
	-rm bin/gridrunner-vic20.prg
	-rm bin/*.txt
