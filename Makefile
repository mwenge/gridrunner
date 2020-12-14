.PHONY: all clean run

D64_IMAGE = "bin/gridrunner.d64"
D64_ORIG_IMAGE = "orig/gridrunner.d64"
X64 = x64
X64SC = x64sc
C1541 = c1541

all: clean d64 run
original: clean d64_orig run_orig

gridrunner.prg: src/gridrunner.tas
	64tass -Wall --cbm-prg -o bin/gridrunner.prg -L bin/list-co1.txt -l bin/labels.txt src/gridrunner.tas
	md5sum bin/gridrunner.prg orig/gridrunner.prg

d64: gridrunner.prg
	$(C1541) -format "gridrunner,rq" d64 $(D64_IMAGE)
	$(C1541) $(D64_IMAGE) -write bin/gridrunner.prg "gridrunner"
	$(C1541) $(D64_IMAGE) -list

d64_orig:
	$(C1541) -format "gridrunner,rq" d64 $(D64_LLAMASOFT_IMAGE)
	$(C1541) $(D64_LLAMASOFT_IMAGE) -write orig/gridrunner.prg "gridrunner"
	$(C1541) $(D64_LLAMASOFT_IMAGE) -list

run: d64
	$(X64) -verbose $(D64_IMAGE)

run_orig: d64
	$(X64) -verbose -moncommands bin/labels.txt $(D64_ORIG_IMAGE)

run: d64

clean:
	-rm $(D64_IMAGE) $(D64_ORIG_IMAGE) $(D64_HOKUTO_IMAGE)
	-rm bin/gridrunner.prg
	-rm bin/*.txt
