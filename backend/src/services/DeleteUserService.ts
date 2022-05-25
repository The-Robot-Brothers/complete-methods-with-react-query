import prismaClient from "../prisma"

class DeleteUserService {
  async execute(user_id: string) {
    const user = prismaClient.user.delete({
      where: {
        id: user_id
      }
    })

    return user
  }
}

export { DeleteUserService }

