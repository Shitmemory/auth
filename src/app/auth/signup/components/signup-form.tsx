import { SignupInput, SignupSchema } from "@/validators/signup-validator";
import { useForm } from "react-hook-form";
import {valibotResolver} from "@hookform/resolvers/valibot";

export default function SignupForm() {
    const form = useForm<SignupInput>({
        resolver: valibotResolver(SignupSchema),
        defaultValues: { name: "", email: "", password: "", confirmPassword: "" }
    })

    const {} = form

    const submit = async (values: SignupInput) => {
        console.log(values);
    }
    
    return (
         <div>SignupForm</div>
         )
}