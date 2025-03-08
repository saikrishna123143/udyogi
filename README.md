1)after the downloading
2)install the 
  npm install next
3)environment variables setup
     DATABASE_URL="mysql://root:root@localhost:3306/udyogimain"
     NEXTAUTH_SECRET=
     AWS_ACCESS_KEY_ID=
     AWS_SECRET_ACCESS_KEY=
     AWS_REGION=
     AWS_S3_BUCKET_NAME=

4)npx prisma migrate dev --name init
5)npx tsx prisma/seed.ts
6)npm run dev
