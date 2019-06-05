#include <stdio.h>
#include <math.h>

int prime(int x) {
    int i;
    int count = 0;
    if (x == 2)
        return 1;

    for (i = 1; i <= sqrt(x); i += 2) {
        if (x % i == 0)
            count += 1;
        if (count >= 2)
            return 1;
    }
    return 1;
}

int main() {
    int x, i = 2, exp = 0;
    scanf("%d", &x);

    while (x != 1) {
        if (prime(i) == 1) {
            if (x % i == 0) {
                while (x % i == 0) {
                    x /= i;
                    exp += 1;
                }
                printf("%d ^ %d\n", i, exp);
                exp = 0;
            }
        }
        i += 1;
    }

    //printf("\b\b");
    return 0;
}
