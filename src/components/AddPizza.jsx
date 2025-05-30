import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

function AddPizza({ onPizzaAdded }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);

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
        <>
            <div
                className={`
                    hidden sm:flex fixed top-0 right-0 h-screen z-50 bg-zinc-800 shadow-lg flex-col items-center
                    transition-all duration-300
                    ${open ? "w-full max-w-sm sm:w-[24rem]" : "w-16"}
                    sm:rounded-l-lg sm:border-l border-zinc-700
                `}
            >
                <button
                    className="absolute top-4 right-4 bg-zinc-700 text-white rounded-full p-2 hover:bg-zinc-600 transition cursor-pointer"
                    onClick={() => setOpen((prev) => !prev)}
                    aria-label={open ? "Collapse" : "Expand"}
                >
                    {open ? <FiChevronRight size={24} /> : <FiChevronLeft size={24} />}
                </button>

                {open && (
                    <form
                        onSubmit={handleSubmit}
                        className="w-full flex flex-col gap-4 p-4 sm:p-8 mt-12"
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
                    </form>
                )}
            </div>
            <button
                className="sm:hidden fixed top-4 right-4 z-50 bg-zinc-700 text-white rounded-full p-2 hover:bg-zinc-600 transition cursor-pointer"
                onClick={() => setOpen((prev) => !prev)}
                aria-label={open ? "Collapse" : "Expand"}
            >
                {open ? <FiChevronRight size={24} /> : <FiChevronLeft size={24} />}
            </button>
        </>
    );
}

export default AddPizza;