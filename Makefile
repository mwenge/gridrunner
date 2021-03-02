.PHONY: all clean run

D64_IMAGE = "bin/gridrunner.d64"
XVIC_IMAGE = "bin/gridrunner-vic20.prg"
X64 = x64
XVIC = xvic
X64SC = x64sc
C1541 = c1541

all: clean d64 run
vic: clean vic runvic

gridrunner.prg: src/c64/gridrunner.asm
	64tass -Wall -Wno-implied-reg --cbm-prg -o bin/gridrunner.prg -L bin/list-co1.txt -l bin/labels.txt src/c64/gridrunner.asm
	md5sum bin/gridrunner.prg bin/gridrunner-bench.prg

gridrunner-vic20.prg: src/vic20/gridrunner.asm
	64tass -Wall -Wno-implied-reg --cbm-prg -o bin/gridrunner-vic20.prg -L bin/list-co1.txt -l bin/labels.txt src/vic20/gridrunner.asm
	md5sum bin/gridrunner-vic20.prg orig/gridrunnervic20.prg

d64: gridrunner.prg
	$(C1541) -format "gridrunner,rq" d64 $(D64_IMAGE)
	$(C1541) $(D64_IMAGE) -write bin/gridrunner.prg "gridrunner"
	$(C1541) $(D64_IMAGE) -list

runvic: gridrunner-vic20.prg
	$(XVIC) -verbose $(XVIC_IMAGE)

run: d64
	$(X64) -verbose $(D64_IMAGE)

clean:
	-rm $(D64_IMAGE)
	-rm $(XVIC_IMAGE)
	-rm bin/gridrunner.prg
	-rm bin/gridrunner-vic20.prg
	-rm bin/*.txt
