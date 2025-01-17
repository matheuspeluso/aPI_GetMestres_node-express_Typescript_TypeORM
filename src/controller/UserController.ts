import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";

export class UserController {
    private userRepository = AppDataSource.getRepository(User);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const uid = request.params.uid; // uid é uma string

        const user = await this.userRepository.findOne({
            where: { uid }, // uid tratado como string
        });

        if (!user) {
            return response.status(404).json({ message: "Unregistered user" });
        }

        return response.status(200).json(user);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { firstName, lastName, age } = request.body;

        const user = Object.assign(new User(), {
            firstName,
            lastName,
            age,
        });

        const savedUser = await this.userRepository.save(user);

        return response.status(201).json(savedUser);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const uid = request.params.uid; // uid é uma string

        const userToRemove = await this.userRepository.findOneBy({ uid });

        if (!userToRemove) {
            return response.status(404).json({ message: "This user does not exist" });
        }

        await this.userRepository.remove(userToRemove);

        return response.status(200).json({ message: "User has been removed" });
    }
}
