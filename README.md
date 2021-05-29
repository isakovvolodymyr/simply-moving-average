
API for calculate Simple Moving Average.

#Install:
bash app.sh build

bash app.sh createDB

bash app.sh up

#Env variables in .env file

#Swagger
{apiDomain}/api/doc

#Request
GET {apiDomain}/api/v1/rates/{period}

{period}: type: integer, possibility values: [7, 25, 99]

Example: localhost:3000/api/v1/rates/7
