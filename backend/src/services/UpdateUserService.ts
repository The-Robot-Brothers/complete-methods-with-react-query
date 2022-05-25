import prismaClient from "../prisma"

type UpdateUserProps = {
  username: string
  password: string
  is_admin: boolean
}

class UpdateUserService {
  async execute(user_id: string, {
    username,
    password,
    is_admin
  }: UpdateUserProps) {
    const user = prismaClient.user.update({
      where: {
        id: user_id
      },
      data: {
        username,
        password,
        is_admin
      }
    })

    return user
  }
}

export { UpdateUserService }
