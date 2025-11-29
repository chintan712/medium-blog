import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { decode, verify } from 'hono/jwt';
import { createPostInput , updatePostInput} from '@chintan_07/medium-common';

export const postRouter = new Hono<{
    Bindings: { 
        DATABASE_URL: string,
        JWT_SECRET: string,
    },
    Variables : {
      userid: string
    }
}>();



postRouter.use('/*', async (c, next) =>{
    const authHeader  = c.req.header("Authorization") || "";
    const user = await verify(authHeader, c.env.JWT_SECRET);

    if(user){
        c.set("userid", user.id as string);
        await next();
    }
    else{
        return c.json({error: 'Unauthorized'}, 403)
    } 

})

postRouter.post('/', async (c) => {
  const autherID = c.get("userid");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();  
  const {success} = createPostInput.safeParse(body);
  if(!success){
    c.status(411)
    return c.json({
        message: "Invalid Input"
    })
  }
  try {
      const post = await prisma.post.create({
      data: { 
        title: body.title,
        content: body.content,
        authorId : autherID,
      }
    })
    return c.json({
      id : post.id
    })
  } catch(error){
    console.log(error);
    return c.text("error while creating the post")
  }
})

postRouter.put('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  const body = await c.req.json();
  const {success} = updatePostInput.safeParse(body);
  if(!success){
    c.status(411)
    return c.json({
        message: "Invalid Input"
    })
  }

  try{
      const post = await prisma.post.update({
      where: { 
        id: body.id 
      }, 
      data: { 
        title: body.title,
        content: body.content,
        authorId : body.authorId,
      }
    })
    return c.json({
      id : post.id
    })
  } catch(error){
    console.log(error);
    return c.text("error while updating the post")
  }
})
postRouter.get('/bulk', async (c) => { //add pagination later
	const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const posts =  await prisma.post.findMany({
    select:{
      id: true,
      title: true,
      content: true,
      author: {
        select : {
          name: true
        }
      }
    }
  })

  return c.json({
    posts
  })
})

postRouter.get('/:id', async (c) => {
	const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const postId = c.req.param("id");

  try{
      const post = await prisma.post.findFirst({
      where: { 
        id: postId 
      }, 
      select:{
        id: true,
        title: true,
        content: true,
        author: {
          select : {
            name: true
          }
        }
    }
    })
    return c.json({
      post
    })
  }catch(error){
    console.log(error);
    return c.text("error while fetching the post")
  }
})

