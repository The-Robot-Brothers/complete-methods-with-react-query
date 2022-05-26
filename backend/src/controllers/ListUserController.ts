import { Request, Response } from "express";
import { ListUserService } from "../services/ListUserService";

class ListUserController {
  async handle(request: Request, response: Response) {
    const service = new ListUserService()

    try {
      const users = await service.execute()

      return response.status(200).json(users)
    } catch (error) {
      return response.status(400).json({
        message: 'Bad request',
        status: 400
      })
    }

  }
}

export { ListUserController };

