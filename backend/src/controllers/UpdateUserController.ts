import { Request, Response } from "express";
import { UpdateUserService } from "../services/UpdateUserService";

class UpdateUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.params
    const {
      username,
      password,
      is_admin
    } = request.body

    const service = new UpdateUserService()

    const user = await service.execute(
      id,
      {
        username,
        password,
        is_admin
      }
    )

    return response.status(203).json(user)

  }
}

export { UpdateUserController };

