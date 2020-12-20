f = open("src/charset.asm", 'r')

c = 0
while True:
    l = f.readline()
    if not l:
        break
    bs = l[8:38].replace("$","").split(',')
    bins = [(bin(int(b, 16))[2:].zfill(8)) for b in bs]
    print(l.strip())
    h = ("0" + format(c, 'x'))[-2:]
    print((" " * 40) + "; $" + h)
    c += 1
    for b in bins:
        print((" " * 40) + "; " + b + "   " + b.replace("0", " ").replace("1","*"))
    print()
