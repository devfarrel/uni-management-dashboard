import { useNavigate } from "react-router-dom";
import { UserForm } from "@/components/users/UsersForm";
import type { CreateUserInput } from "@/api/user.api";
import { toast } from "sonner";
import { useUsers } from "@/hooks/useUsers";

export default function AddUserPage() {
    const navigate = useNavigate();
    const { createUser } = useUsers();

    const handleCreateUser = async (data: CreateUserInput) => {
      await toast.promise(
        createUser(data),
        {
          loading: "Creating user...",
          success: "User created successfully!",
          error: "Failed to create user.",
        }
      )
      navigate("/users")
    }

    return (
        <div>
            <UserForm
              mode="create"
              onSubmit={handleCreateUser}
            />
        </div>
    );
}