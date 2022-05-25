import prismaClient from "../prisma"

class ListUserByIdService {
  async execute(user_id: string) {
    const list = prismaClient.user.findUnique({
      where: {
        id: user_id
      }
    })

    return list
  }
}

export { ListUserByIdService }

