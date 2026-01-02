import { useNavigate } from "react-router-dom";
import { UserForm } from "@/components/users/UsersForm";
import { createUser } from "@/api/user.api";

export default function AddUserPage() {
    const navigate = useNavigate();

    return (
        <div>
            <UserForm
              mode="create"
              onSubmit={async (data) => {
                await createUser(data);
                navigate("/users");
              }}
            />
        </div>
    );
}