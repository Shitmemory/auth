"use client";

import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import {
  UpdateUserInfoSchema,
  UpdateUserInfoInput,
} from "@/validators/update-user-info-validator";
import { useForm } from "react-hook-form";
import { User } from "next-auth";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { Ghost, PencilIcon } from "lucide-react";
import { updateUserInfoAction } from "@/actions/update-user-info-action";
import { SignupInput } from "@/validators/signup-validator";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type UpdateUserInfoFormProps = { user: User };

export const UpdateUserInfoForm = ({ user }: UpdateUserInfoFormProps) => {
  const [success, setSuccess] = useState("");
  const { data: session, update } = useSession(); // this is to enable us to display the updated username to the ui
  const router = useRouter();

  const { id, name: defaultName } = user;

  const form = useForm<UpdateUserInfoInput>({
    resolver: valibotResolver(UpdateUserInfoSchema),
    defaultValues: { id, name: defaultName || "" }, // i rename name thats being passed in to defaultname within this scope to enhance readability
  });

  const { handleSubmit, control, formState, setError } = form; // the methods are in their own scope so i have to pass it directly to Form so i can use these methods in Form

  const submit = async (values: UpdateUserInfoInput) => {
    console.log(values); // submit is passed to handleSubmit as an argument which means that submit receives all the values that were submitted
    const res = await updateUserInfoAction(values);

    if (res.success) {
      // update the session
      const updateduser = res.data;

      if (session?.user) {
        await update({
          // there is two parts to this, just using the update function wont do anything by itself
          ...session,
          user: {
            ...session.user,
            name: updateduser.name, // spreading in the current session, current user then overriding the name
          },
        });
      }

      router.refresh();
      setSuccess("User information updated successfully");
    } else {
      switch (res.statusCode) {
        case 400:
          const nestedErrors = res.error.nested;

          for (const key in nestedErrors) {
            setError(key as keyof UpdateUserInfoInput, {
              message: nestedErrors[key]?.[0],
            });
          }
          break;
        case 401:
        case 500:
        default:
          const error = res.error || "Internal Server Error";
          setError("name", { message: error });
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="bg-yellow-600 transition-colors hover:bg-yellow-600/80"
        >
          <PencilIcon />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User Information</DialogTitle>
          <DialogDescription>
            Update your user information below.
          </DialogDescription>

          <div className="my-2 h-1 bg-muted" />

          <Form {...form}>
            {" "}
            {/* */}
            <form onSubmit={handleSubmit(submit)} className="space-y-4">
              {" "}
              {/* handleSubmit expects to receive an object every time */}{" "}
              {/* When we pass regular html tags as children in react hook form, the html tags will share the same types as the react hook form  */}
              <FormField
                control={control} // this is needed for the ...field to work correctly
                name="name"
                render={({ field }) => (
                  // I could create my own ForzmField component and design it in a way that it always returns something thereby eliminating the need to use a return statement every time.

                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />

                      {/* field is a outline for what the input should contain for types and it also acts as the bridge to get the users input from the front end and provide this info to the back end */}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {success && (
                <p className="text-sm font-medium text-green-600">{success}</p>
              )}
              <FormField name="id" render={() => <FormMessage />} />
              {/* I dont need to use the return statement when using an arrow function that spans one line */}
              <Button
                type="submit"
                disabled={formState.isSubmitting}
                className="w-full"
              >
                Update
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

// this successfully updated the db name but in the UI on the profile page we are still our name
// we logged in creating a session so in order for it to know it has updated we have to tell auth.js that it has updated the session.
// if we got our user info from the db we wouldnt have to do this
