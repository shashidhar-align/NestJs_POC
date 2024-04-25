import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { DatabaseService } from "src/database/database.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private databaseService: DatabaseService,
    private jwtService: JwtService
  ) {}

  async login(email: string, password: string) {
    console.log(email, password);
    // Step 1: Fetch a user with the given email
    const user = await this.databaseService.user.findUnique({
      where: { email: email },
    });

    // If no user is found, throw an error
    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    // Step 2: Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If password does not match, throw an error
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid password");
    }

    // Step 3: Generate a JWT containing the user's ID and return it
    return {
      user,
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }
}
