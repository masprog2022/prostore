"use server";
import { signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { signInSchema } from "../constants/validators";

// Sign in the user with credentials
export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = signInSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });
    await signIn("credentials", user);
    return { success: true, message: "User signed in successfully" };
  } catch (error) {
    if (isRedirectError(error)) {
      //return { success: false, message: "Redirect error occurred" };
      throw error;
    }
    return { success: false, message: "Invalid email or password" };
  }
}

// Sign out the user

export async function signOutUser() {
  await signOut();
}
