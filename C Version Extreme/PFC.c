#include <stdio.h>
#include <math.h>

int prime(unsigned long long x)
{
    int count = 0;
    if (x == 2)
        return 1;

    for (unsigned long long i = 1; i <= (unsigned long long)sqrt(x); i++)
    {
        if (x % i == 0)
            count++;
        if (count >= 2)
            return 0;
    }
    return 1;
}

int main()
{
    unsigned long long x;
    unsigned long long i = 2;
    unsigned int exp = 0;
    unsigned long long lim = floor(sqrt(x));

    printf("Craft JJ Industries Extreme PFC\n");
    printf("Value supported: unsigned long long [+2, +18,446,744,073,709,551,615]\n");

    do
    {
        printf("Enter an integer greater than 1: ");
        scanf("%llu", &x);
    } while (x < 2);

    while (1)
    {
        if (x == 1)
            break;
        if (i > lim)
        {
            printf("%llu^1 * ", x);
            break;
        }   

        if (prime(i) == 1)
        {
            if (x % i == 0)
            {
                while (x % i == 0)
                {
                    x /= i;
                    exp++;
                }
                printf("%llu^%u * ", i, exp);
                exp = 0;
                lim = floor(sqrt(x));
            }
        }
        if (i == 2)
            i++;
        else
            i += 2;
    }
    printf("\b\b");
    return 0;
}
