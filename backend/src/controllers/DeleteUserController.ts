import { Request, Response } from "express";
import { DeleteUserService } from "../services/DeleteUserService";

class DeleteUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.params

    const service = new DeleteUserService()

    try {
      await service.execute(id)

      return response.status(200).json({
        message: 'User deleted with success',
        status: 200
      })
    } catch (error) {
      return response.status(400).json({
        message: 'Bad request',
        status: 401
      })
    }

  }
}

export { DeleteUserController };

