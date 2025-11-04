import { useState } from "react";
import { authDto, authSchema } from "../validations/auth-validate";
import { useForm } from "react-hook-form";
import { auth } from "../services/login";
import { ZodObject, ZodString } from "zod";
import { $strip } from "zod/v4/core";
export function useAuthHook() {
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const forms = useForm<authDto>({
        resolver: zodResolver(authSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const resetStates = async() => {
        setIsFetching(false);
        setError(null);
        setError(null);

        try {
           const data  = forms.getValues();
           console.log("Current form values:", data);

           // appelle du service
           await auth.AuthService(data);
        } catch (error) {
            console.error("Error resetting form:", error);
        }
    }


    return {
        ...forms,
        isFetching, 
        error,
        resetStates
};
}

function zodResolver(authSchema: ZodObject<{ email: ZodString; password: ZodString; }, $strip>): import("react-hook-form").Resolver<{ email: string; password: string; }, any, { email: string; password: string; }> | undefined {
    throw new Error("Function not implemented.");
}
