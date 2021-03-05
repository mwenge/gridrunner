import sys
import os

o = open("src/vic20/charset.asm", 'r')
charmap = {l[60:63].strip().upper():l[65:].strip() 
             for l in o.readlines() 
             if "CHARACTER" in l and l[65:].strip() != ""}


if len(sys.argv) < 2:
    print("No filename given")
    exit()

fn = sys.argv[1]
if not os.path.isfile(fn):
    print(fn + " does not exist")
    exit()

f = open(fn, 'r')
ls = f.readlines()
f.close()


p = ""
o = open(fn, 'w')

for k in charmap: o.write(charmap[k] + " = " + k + "\n")

for l in ls:
    is_cand = "current" in l and "Character" in l
    is_cand = is_cand or ("LoPtr)" in l)
    if not is_cand:
        o.write(p)
        p = l
        continue
    if "LDA" not in p or "$" not in p:
        o.write(p)
        p = l
        continue

    c = p[:16].rstrip()[-3:]
    if c not in charmap:
        o.write(p)
        p = l
        continue

    p = p[:16].rstrip()
    cn = charmap[c]
    p = p[:-3] + cn + '\n'
    o.write(p)
    p = l

o.write(p)
