import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CreateUserSchema } from "@/api/user.api";
import type { CreateUserInput } from "@/api/user.api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
    mode: "create" | "edit";
    initialValues?: Partial<CreateUserInput>;
    onSubmit: (data: CreateUserInput) => Promise<void>;
};

export function UserForm({mode, initialValues, onSubmit}: Props) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<CreateUserInput>({
        resolver: zodResolver(CreateUserSchema),
        defaultValues: {
            role: "USER",
            ...initialValues,
        },
    });

    return (
        <Card className="max-w-md">
            <CardHeader>
                <CardTitle>Create User</CardTitle>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <Label>Name</Label>
                    <Input {...register("name")} />
                    {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
                    )}
                </div>

                <div>
                    <Label>Email</Label>
                    <Input type="email" {...register("email")} />
                    {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                    )}
                </div>

                <div>
                    <Label>Password</Label>
                    <Input type="password" {...register("password")} />
                    {errors.password && (
                    <p className="text-sm text-destructive">
                        {errors.password.message}
                    </p>
                    )}
                </div>

                <div>
                    <Label>Role</Label>
                    <Select
                    defaultValue="USER"
                    onValueChange={(v) => setValue("role", v as any)}
                    >
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="USER">User</SelectItem>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                    </SelectContent>
                    </Select>
                    {errors.role && (
                    <p className="text-sm text-destructive">{errors.role.message}</p>
                    )}
                </div>

                <Button type="submit" disabled={isSubmitting}>
                    {mode === "create" ? "Create User" : "Update User"}
                </Button>
                </form>
            </CardContent>
        </Card>
    );
};