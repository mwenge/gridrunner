.PHONY: all clean run

D64_IMAGE = "bin/gridrunner.d64"
XVIC_IMAGE = "bin/gridrunnervic20.prg"
D64_ORIG_IMAGE = "orig/gridrunner.d64"
X64 = x64
XVIC = xvic
X64SC = x64sc
C1541 = c1541

all: clean d64 run
original: clean d64_orig run_orig
vic: clean vic runvic

gridrunner.prg: src/gridrunner.asm
	64tass -Wall -Wno-implied-reg --cbm-prg -o bin/gridrunner.prg -L bin/list-co1.txt -l bin/labels.txt src/gridrunner.asm
	md5sum bin/gridrunner.prg orig/gridrunner.prg

gridrunnervic20.prg: src/gridrunnervic20.asm
	64tass -Wall -Wno-implied-reg --cbm-prg -o bin/gridrunnervic20.prg -L bin/list-co1.txt -l bin/labels.txt src/gridrunnervic20.asm
	md5sum bin/gridrunnervic20.prg orig/gridrunnervic20.prg

d64: gridrunner.prg
	$(C1541) -format "gridrunner,rq" d64 $(D64_IMAGE)
	$(C1541) $(D64_IMAGE) -write bin/gridrunner.prg "gridrunner"
	$(C1541) $(D64_IMAGE) -list

d64_orig:
	$(C1541) -format "gridrunner,rq" d64 $(D64_LLAMASOFT_IMAGE)
	$(C1541) $(D64_LLAMASOFT_IMAGE) -write orig/gridrunner.prg "gridrunner"
	$(C1541) $(D64_LLAMASOFT_IMAGE) -list

runvic: gridrunnervic20.prg
	$(XVIC) -verbose $(XVIC_IMAGE)

run_orig: d64
	$(X64) -verbose -moncommands bin/labels.txt $(D64_ORIG_IMAGE)

run: d64

clean:
	-rm $(D64_IMAGE) $(D64_ORIG_IMAGE) $(D64_HOKUTO_IMAGE)
	-rm bin/gridrunner.prg
	-rm bin/*.txt
