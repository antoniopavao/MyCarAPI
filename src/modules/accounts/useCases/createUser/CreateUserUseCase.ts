import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "../../dtos/ICreateUsersDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({
        name,
        email,
        password,
        driver_license,
    }: ICreateUserDTO): Promise<void> {
        const userExists = await this.usersRepository.findByEmail(email);

        if (userExists) {
            throw new Error(`User ${email} already exists`);
        }
        const passwordHash = await hash(password, 8);

        await this.usersRepository.create({
            name,
            email,
            password: passwordHash,
            driver_license,
        });
    }
}
export { CreateUserUseCase };
