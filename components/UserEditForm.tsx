import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

interface User {
  id: number;
  name: string;
  email: string;
  phone_number: string;
}

interface UserEditFormProps {
  user: User;
  onClose: () => void;
  onUpdate: () => void;
  triggerUpdate: (flag: boolean) => void;
}

const UserEditForm: React.FC<UserEditFormProps> = ({
  user,
  onClose,
  onUpdate,
  triggerUpdate,
}) => {
  const [editUserName, setEditUserName] = useState(user.name);
  const [editUserEmail, setEditUserEmail] = useState(user.email);
  const [editUserPhoneNumber, setEditUserPhoneNumber] = useState(
    user.phone_number
  );

  const deleteUser = async () => {
    const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log(user.id);

    const { error: itemDeletionError } = await supabase
      .from("job")
      .delete()
      .eq("customer_id", user.id);

    const { error: userDeletionError } = await supabase
      .from("customer")
      .delete()
      .eq("id", user.id);
    onUpdate();
    triggerUpdate(true);
  };

  const editUser = async () => {
    try {
      const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
      const supabaseKey: string =
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
      const supabase = createClient(supabaseUrl, supabaseKey);
      // Update the user information in the database
      const { data, error } = await supabase
        .from("customer")
        .update({
          name: editUserName,
          email: editUserEmail,
          phone_number: editUserPhoneNumber,
        })
        .eq("id", user.id)
        .single(); // Assuming the user ID is unique

      if (!error) {
        console.log("User updated successfully:", data);
        // Trigger the update callback to refresh the user list
        onUpdate();
        // Close the form
        onClose();
      } else {
        console.error("Error updating user:", error);
        // Handle error, display a message, etc.
      }
    } catch (error) {
      console.error("Error updating user:", error);
      // Handle error, display a message, etc.
    }
  };

  return (
    <div className="user-edit-form">
      <h2>Edit User</h2>
      <label>
        Name:
        <input
          type="text"
          value={editUserName}
          onChange={(e) => setEditUserName(e.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="text"
          value={editUserEmail}
          onChange={(e) => setEditUserEmail(e.target.value)}
        />
      </label>
      <label>
        Phone Number:
        <input
          type="text"
          value={editUserPhoneNumber}
          onChange={(e) => setEditUserPhoneNumber(e.target.value)}
        />
      </label>
      <button onClick={editUser}>Save</button>
      <button onClick={onClose}>Cancel</button>
      <button style={{ backgroundColor: "#ff5555" }} onClick={deleteUser}>
        Delete
      </button>
    </div>
  );
};

export default UserEditForm;
