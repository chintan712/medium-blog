import { Hono } from "hono";
import { decode, sign, verify } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { signupInput, signinInput } from "@chintan_07/medium-common";

export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET: string,
	}
}>;

userRouter.post('/signup', async (c) => {
  
  const body = await c.req.json();
  const result = signupInput.safeParse(body);
  if(!result.success){
    c.status(411)
    return c.json({
        message: "Invalid Input",
        error: result.error
    })
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  try {
    const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: body.password,
    }
  })
  const token= await sign({id : user.id}, c.env.JWT_SECRET)

  return c.json({
    jwt : token
  })

  } catch (error) {
    console.log(error);
    return c.text("invalid user creation")
  }
})

userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())


  const body = await c.req.json();
  const result = signinInput.safeParse(body);
  console.log(result);
  if(!result.success){
    c.status(411)
    return c.json({
        message: "Invalid Input",
        error: result.error
    })
  }
  try {
    const user = await prisma.user.findFirst({
    where: {
      email: body.email,
      password: body.password,
    }
  })
  console.log(body?.email + " " + body?.password);
  if(!user || user.password !== body.password){
    return c.json({error: 'Unauthorized'}, 403)
  }

  const token = await sign({id : user.id} , c.env.JWT_SECRET)

  return c.json({
    jwt : token
  })}
  catch (error) {
    console.log(error);
    c.status(411)
    return c.text("invalid")
  }
})

userRouter.get('/all', async (c) => {
    const authHeader = c.req.header('Authorization');
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
    // const user = await verify(authHeader || "", c.env.JWT_SECRET);

    const users = await prisma.user.findMany();

    return c.json(users);   
})