"use server"
import * as v from "valibot"
import { SignupSchema } from "@/validators/signup-validator"
import argon2 from "argon2"

type Res = 
| { success: true }
| { success: false, error: v.FlatErrors<undefined>, statusCode: 400 }
| { success: false, error: string, statusCode: 500 }

export async function signupUserAction(values: unknown): Promise<Res> {
    const parsedValues = v.safeParse(SignupSchema, values);
    
    if (!parsedValues.success) {
        const flatErrors = v.flatten(parsedValues.issues);
        return { success: false, error: flatErrors, statusCode: 400}
    }

    const { name, email, password}  = parsedValues.output;

    console.log("success", name, email, password)
    
    try {
        // Todo hash password
        const hashPassword = await argon2.hash(password)

        console.log( { name, email, password: hashPassword})

       return { success: true }

    } catch(err) {
        console.error(err);
        return { success: false, error: "Internal server error", statusCode: 500}
    }
}