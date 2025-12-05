import dotenv from 'dotenv';
import z from 'zod';
dotenv.config();

const configSchema = z.object({
  DATABASE_URL: z.string(),
  ACCESS_TOKEN_SECRET: z.string(),
  ACCESS_TOKEN_EXPIRE_IN: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_EXPIRE_IN: z.string(),
  SECRECT_API_KEY: z.string(),
  ADMIN_NAME: z.string(),
  ADMIN_EMAIL: z.string(),
  ADMIN_PASSWORD: z.string(),
  ADMIN_PHONE_NUMBER: z.string().length(10)
})


const configServer = configSchema.safeParse(process.env)

if(configServer.success) {
  console.log('Validate successfully')
} else {
  console.log('Error when validate env file: ', configServer.error)
  process.exit(1)
}

const envConfig = configServer.data
export default envConfig;
