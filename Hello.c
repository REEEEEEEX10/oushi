#include<stdio.h>

void areaSquare();
void areaCircle();
void areaRectangle();

int main(){
    char temp;
    printf("enter the operation, s, c, or r :");
    scanf(" %c", &temp);
    if(temp=='s')
    {
        areaSquare();
    }
    else if(temp=='c')
    {
        areaCircle();
    }
    else if(temp=='r')
    {
        areaRectangle();
    }
    else
    {
        printf("Invalid option. Please enter s, c, or r.\n");
    }
    return 0;
}

void areaSquare()
{
    float areaS,n;
    printf("enter the side of a square :");
    scanf("%f", &n);

    areaS=n*n;
    printf("Area of square is : %.2f\n", areaS);

}
void areaCircle()
{
    float radius;
    float areaC;
    printf("enter the radius of circle :");
    scanf("%f", &radius);

    areaC=3.14159 * radius * radius;
    printf("area of circle is : %.2f\n", areaC);

}
void areaRectangle()
{
    float length;
    float breadth;
    float areaR;
    printf("enter length of a rectangle :");
    scanf("%f", &length);
    printf("enter breadth of a rectangle :");
    scanf("%f", &breadth);

    areaR=length * breadth;
    printf("area of rectangle is :%.2f\n", areaR);
}