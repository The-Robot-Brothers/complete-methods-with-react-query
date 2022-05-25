import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { DeleteUserController } from "./controllers/DeleteUserController";
import { ListUserByIdController } from "./controllers/ListUserByIdController";
import { ListUserController } from "./controllers/ListUserController";
import { UpdateUserController } from "./controllers/UpdateUserController";

const router = Router()

router.get("/users", new ListUserController().handle)
router.get("/users/:id", new ListUserByIdController().handle)
router.post("/users", new CreateUserController().handle)
router.put("/users/:id", new UpdateUserController().handle)
router.delete("/users/:id", new DeleteUserController().handle)

export { router };

