"use server";
import { authFormSchema, parseStringify } from "../utils";
import { createSessionClient, createAdminClient } from "../appwrite";
const formSchema = authFormSchema("sign-up");
import z from "zod";
import { ID } from "node-appwrite";
import { cookies } from "next/headers";
export const signIn = async (userData: z.infer<typeof formSchema>) => {
  try {
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(
      userData.email,
      userData.password
    );
    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    return parseStringify(session);
  } catch (error) {
    return error.response;
  }
};

export const signUp = async (userData: z.infer<typeof formSchema>) => {
  try {
    const { account } = await createAdminClient();

    const newUserAccount = await account.create(
      ID.unique(),
      userData.email,
      userData.password,
      `${userData.firstName} ${userData.lastName}`
    );
    const session = await account.createEmailPasswordSession(
      userData.email,
      userData.password
    );

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUserAccount);
  } catch (error) {
    console.error(error);
  }
};

// ... your initilization functions

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();
    return parseStringify(user);
  } catch (error) {
    return null;
  }
}

export const logoutAccount = async () => {
  try {
    const { account } = await createAdminClient();
    cookies().delete("appwrite-session");
    await account.deleteSession("current");
  } catch (error) {
    return null;
  }
};
