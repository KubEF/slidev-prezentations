def gcd(a, b):
    a, b = abs(a), abs(b)
    while b != 0:
        a, b = b, a % b
    return a


in_data = input("Введите числа через пробел: ").split()
numbers = []
