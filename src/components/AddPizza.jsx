import { useState } from "react";

function AddPizza({ onPizzaAdded }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:8080/addPizza", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, description }),
        })
            .then((res) => res.text())
            .then((msg) => {
                setMessage(msg);
                setName("");
                setDescription("");
                if (onPizzaAdded) onPizzaAdded();
            })
            .catch(() => setMessage("Error adding pizza"));
    };

    return (
        <div className="fixed top-0 right-0 h-screen max-w-sm sm:max-w-sm bg-zinc-800 shadow-lg flex flex-col items-center justify-center z-50 p-4 sm:p-8 transition-all duration-300 sm:rounded-l-lg sm:border-l border-zinc-700
            sm:w-[24rem] w-full">
            <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-4"
            >
                <h2 className="text-white text-2xl font-bold mb-2 text-center">Přidat pizzu</h2>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jméno pizzy"
                    required
                    className="p-3 rounded bg-zinc-900 text-white border border-zinc-700 focus:outline-none focus:border-red-600"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Popis pizzy"
                    required
                    rows={4}
                    className="p-3 rounded bg-zinc-900 text-white border border-zinc-700 focus:outline-none focus:border-red-600 resize-none"
                />
                <button
                    type="submit"
                    className="w-full py-3 bg-red-600 text-white font-bold rounded hover:bg-red-700 transition"
                >
                    Přidat
                </button>
                {message && (
                    <div className="text-lime-400 text-center mt-2">{message}</div>
                )}
            </form>
        </div>
    );
}

export default AddPizza;