import { Request, Response } from "express";
import { ListUserByIdService } from "../services/ListUserByIdService";

class ListUserByIdController {
  async handle(request: Request, response: Response) {
    const { id } = request.params

    const service = new ListUserByIdService()

    const users = await service.execute(id)

    return response.status(200).json(users)
  }
}

export { ListUserByIdController };

