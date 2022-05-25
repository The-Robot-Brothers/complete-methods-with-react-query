import prismaClient from "../prisma"

type CreateUserProps = {
  username: string
  password: string
  is_admin: boolean
}

class CreateUserService {
  async execute({
    username,
    password,
    is_admin
  }: CreateUserProps) {
    const user = prismaClient.user.create({
      data: {
        username,
        password,
        is_admin
      }
    })

    return user
  }
}

export { CreateUserService }
