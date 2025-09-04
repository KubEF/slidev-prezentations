def gcd(a, b):
    a, b = abs(a), abs(b)
    while b != 0:
        a, b = b, a % b
    return a


in_data = input("Введите числа через пробел: ").split()
numbers = []

for d in in_data:
    pos_d = d[1:] if d[0] == "-" else d
    if not pos_d.isnumeric():
        continue
    numbers.append(int(d))

for i in range(len(numbers)):
    for j in range(i, len(numbers)):
        a = numbers[i]
        b = numbers[j]
        if gcd(a, b) == 1:
            print(f"({a}, {b})", end=" ")
