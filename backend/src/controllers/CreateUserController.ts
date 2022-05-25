import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";

class CreateUserController {
  async handle(request: Request, response: Response) {
    const user = request.body

    const service = new CreateUserService()

    const newUser = await service.execute(user)

    return response.status(202).json(newUser)
  }
}

export { CreateUserController };

