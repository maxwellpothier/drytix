import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import NumberForm from "./NumberForm";

interface User {
  id: number;
  name: string;
}

const TaskForm = (props: { setToggle; triggerUpdate }) => {
  const { setToggle, triggerUpdate } = props;

  const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  const supabase = createClient(supabaseUrl, supabaseKey);

  const [name, setName] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState();
  const [showNumberForm, setShowNumberForm] = useState(false);

  const getCustomers = async () => {
    let { data: customers, error } = await supabase
      .from("customer")
      .select("id, name");

    setUsers(customers);
  };

  const getUserById = async (id: number) => {
    let { data: customer, error } = await supabase
      .from("customer")
      .select("name")
      .eq("id", id);
    return customer[0].name;
  };

  useEffect(() => {
    getCustomers();
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleUserIdChange = async (e) => {
    setSelectedUser(e.target.value);
    const name: any = await getUserById(e.target.value);
    setName(name);
  };

  const handleItemChange = (e) => {
    setSelectedItem(e.target.value);
  };

  const addJob = async () => {
    const { data, error } = await supabase
      .from("job")
      .insert([
        {
          cleaner_id: 1,
          customer_id: selectedUser,
          item_id: 1,
          is_finished: false,
          cost: 90.0,
          picked_up: false,
          items: items,
        },
      ])
      .select();
    setItems([]);
    triggerUpdate(true);
  };

  const addItem = () => {
    if (selectedItem) {
      setItems([...items, selectedItem]);
      setSelectedItem("");
    }
  };

  useEffect(() => {
    addItem();
  }, [selectedItem]);

  return (
    <div>
      <h2>New Drycleaning Drop Off</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <select value={selectedUser} onChange={handleUserIdChange}>
          <option value="">Select a user</option>
          {users.map((user) => {
            return (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            );
          })}
        </select>
        <button
          onClick={() => {
            setShowNumberForm(!showNumberForm);
          }}
        >
          {!showNumberForm ? "Add User" : "Cancel"}
        </button>
      </div>
      {showNumberForm && (
        <NumberForm
          triggerUpdate={triggerUpdate}
          setCurrentUser={setSelectedUser}
        />
      )}

      <br />
      <label>
        Name:
        <input
          contentEditable="false"
          type="text"
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <br />
      <br />

      <label>
        Add Item:
        <select value={selectedItem} onChange={handleItemChange}>
          <option value="">Select an item</option>
          <option value="Pants">Pants</option>
          <option value="Shirt">Shirt</option>
          <option value="Suit">Suit</option>
          <option value="Dress">Dress</option>
        </select>
      </label>
      {/* <button type="button" onClick={addItem}>
        Add
      </button> */}

      <div>
        <ListWithRemoveButton list={items} setItems={setItems} />
      </div>
      <button
        onClick={() => {
          addJob();
        }}
      >
        Add Job
      </button>
      <button
        onClick={() => {
          setToggle(false);
        }}
      >
        Close
      </button>
    </div>
  );
};

// Modify ListItem component
const ListItem = ({ name, onRemove, setItems }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        border: "1px solid #ddd",
        marginBottom: "5px",
        backgroundColor: "gray",
        borderRadius: "10px",
      }}
    >
      <span>{name}</span>
      <button
        onClick={() => {
          onRemove();
        }}
      >
        Remove
      </button>
    </div>
  );
};

const ListWithRemoveButton = (props: { list: any; setItems: any }) => {
  const list = props.list;
  const setItems = props.setItems;

  const handleRemoveItem = (index) => {
    let updatedItems = [...list];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  useEffect(() => {
    setItems(list);
  }, [list]);

  return (
    <div>
      <h2>Items in order</h2>
      {list.map((item, index) => (
        <ListItem
          key={index}
          name={item}
          onRemove={() => handleRemoveItem(index)}
          setItems={setItems} // Pass setItems function as a prop
        />
      ))}
    </div>
  );
};

export default TaskForm;
