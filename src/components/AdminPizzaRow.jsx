import { BsTrash, BsTrashFill } from "react-icons/bs";
import { useState } from "react";

function AdminPizzaRow({ id, name, description, upvotes, onPizzaDeleted }) {
    const [clicked, setClicked] = useState(false);

    const handleDelete = () => {
        setClicked(true);
        fetch(`http://localhost:8080/deletePizza/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    onPizzaDeleted(id);
                } else {
                    console.error("Failed to delete pizza");
                }
            })
            .catch(error => console.error("Error deleting pizza:", error));
    };

    return (
        <tr className="bg-zinc-800 border-b border-zinc-700">
            <td className="px-4 py-3 text-white font-mono">{id}</td>
            <td className="px-4 py-3 text-white">{name}</td>
            <td className="px-4 py-3 text-gray-300">{description || "No description available."}</td>
            <td className="px-4 py-3 text-white text-center">{upvotes}</td>
            <td className="px-4 py-3 text-center">
                <button
                    className="flex items-center mx-auto p-2 cursor-pointer text-white bg-red-500 rounded"
                    onClick={handleDelete}
                >
                    <span className="mr-2">
                        {clicked ? <BsTrashFill /> : <BsTrash />}
                    </span>
                    Smazat
                </button>
            </td>
        </tr>
    );
}

export default AdminPizzaRow;