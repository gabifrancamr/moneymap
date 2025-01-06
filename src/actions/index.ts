import { typeSignUpSchema } from "@/components/signUpForm/SignUpForm"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from "../../prisma/db"

const SECRET_KEY = process.env.JWT_SECRET_KEY as string

export async function createNewUser(data: typeSignUpSchema) {
    try {
      const user = await db.user.findUnique({
        where: {
          email: data.email,
        },
      })
  
      if (user === null) {
        const hashedPassword = await bcrypt.hash(data.password, 10)
  
        const user = await db.user.create({
          data: {
            name: data.name,
            email: data.email,
            password: hashedPassword,
          },
        })
  
        const token = jwt.sign(
          { id: user.id, email: user.email },
          SECRET_KEY,
          {
            expiresIn: '1h',
          },
        )
  
        return { status: 'success', token }
      } else {
        return { status: 'notNull' }
      }
    } catch (error) {
      console.log(error)
      return { status: 'error' }
    }
  }