import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";

class CreateUserController {
  async handle(request: Request, response: Response) {
    const user = request.body

    const service = new CreateUserService()

    try {
      const newUser = await service.execute(user)

      return response.status(200).json(newUser)
    } catch (error) {
      return response.status(400).json({
        message: 'Bad request',
        status: 400
      })
    }
  }
}

export { CreateUserController };

