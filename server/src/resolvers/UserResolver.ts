import { verify, hash } from "argon2";
import {
  Arg,
  Ctx,
  Field,
  ID,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { User } from "../entities/User";
import { UserResponse } from "../objectTypes";
import { Context } from "../types";

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req, redis }: Context): Promise<User | null> {
    const { userId } = req.session;
    console.log({ session: req.session });

    redis.keys("*", (err, reply) => {
      if (err) {
        return console.log({ err });
      }
      console.log({ reply });
    });
    if (!userId) {
      console.log("NO USER ID HERE");
      return null;
    }
    const user = await User.findOne(userId);
    console.log({ user });
    if (!user) {
      return null;
    }
    console.log("RETURNING");
    return user;
  }

  @Query(() => User, { nullable: true })
  async userById(@Arg("id", () => ID!) id: number): Promise<User | null> {
    const user = await User.findOne(id);
    if (!user) {
      return null;
    }
    return user;
  }

  @Query(() => User, { nullable: true })
  async userByName(
    @Arg("name", () => String) name: string
  ): Promise<User | null> {
    const user = await User.findOne({ where: { name } });
    if (!user) {
      return null;
    }
    return user;
  }

  @Query(() => [User])
  users(): Promise<User[]> {
    return User.find({});
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("name", () => String) name: string,
    @Arg("password", () => String) password: string,
    @Ctx() { req }: Context
  ): Promise<UserResponse> {
    // check if user already exists
    const userAlreadyExists = await User.findOne({ where: { name } });
    if (userAlreadyExists) {
      return {
        error: {
          field: "name",
          message: "a user with that name already exists",
        },
      };
    }

    // hash password
    const hashedPassword = await hash(password);

    // create user
    const user = User.create({ name, password: hashedPassword });
    const savedUser = await user.save();

    req.session.userId = savedUser.id;
    console.log(req.session);

    return {
      user: savedUser,
    };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("name", () => String!) name: string,
    @Arg("password", () => String!) password: string,
    @Ctx() { req }: Context
  ): Promise<UserResponse> {
    // check if user exists
    const user = await User.findOne({ where: { name } });
    if (!user) {
      return {
        error: {
          field: "name",
          message: "a user with that name does not exist",
        },
      };
    }

    // check if password is correct
    const passwordIsValid = await verify(user.password, password);
    if (!passwordIsValid) {
      return {
        error: {
          field: "password",
          message: "incorrect password",
        },
      };
    }

    req.session.userId = user.id;
    console.log(req.session);

    return {
      user,
    };
  }
}
