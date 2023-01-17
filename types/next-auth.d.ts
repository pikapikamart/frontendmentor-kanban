import { ISODateString } from "next-auth"


interface BaseUser {
  name?: string | null,
  email?: string | null,
  username?: string | null,
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: BaseUser
    expires: ISODateString;
  }

  interface User extends BaseUser {}
}

declare module "next-auth/jwt" {
  interface JWT extends BaseUser {}
}