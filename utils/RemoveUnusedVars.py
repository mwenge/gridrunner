import sys
import os

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

vs = [l for l in ls if " = " in l]
code = [l for l in ls if " = " not in l]

used = [v for v in vs for l in code if v.split()[0] in l]
unused = [v for v in vs if v not in used]

o = open(fn, 'w')
ol = [l for l in ls if l not in unused]
o.write(''.join(ol))


