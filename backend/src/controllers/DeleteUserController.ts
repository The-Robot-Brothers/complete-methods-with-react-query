import { Request, Response } from "express";
import { DeleteUserService } from "../services/DeleteUserService";

class DeleteUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.params

    const service = new DeleteUserService()

    await service.execute(id)

    return response.status(204).json('User deleted with success')
  }
}

export { DeleteUserController };

