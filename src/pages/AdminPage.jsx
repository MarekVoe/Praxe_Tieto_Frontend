import {useEffect, useState} from "react";
import AdminPizzaRow from "../components/AdminPizzaRow.jsx";
import Navbar from "../components/Navbar.jsx";

function AdminPage() {
    const [pizzas, setPizzas] = useState([]);

    const fetchPizzas = () => {
        fetch('http://localhost:8080/getAllPizzas')
            .then(res => res.json())
            .then(data => setPizzas(data))
            .catch(err => console.log(err));
    };

    useEffect(() => {
        fetchPizzas();
    }, []);

    const handlePizzaDeleted = (id) => {
        setPizzas(pizzas.filter(pizza => pizza.id !== id));
    };

    return (
        <div className="relative min-h-screen bg-[#010101] flex flex-col">
            <div className="mb-16">
                <Navbar />
            </div>
            <div className="overflow-x-auto w-full min-w-0 flex-1">
                <table className="w-full bg-zinc-900 rounded-lg shadow-md">
                    <thead>
                    <tr>
                        <th className="px-4 py-3 text-left text-gray-300">ID</th>
                        <th className="px-4 py-3 text-left text-gray-300">Jméno</th>
                        <th className="px-4 py-3 text-left text-gray-300">Popisek</th>
                        <th className="px-4 py-3 text-center text-gray-300">Upvotes</th>
                        <th className="px-4 py-3 text-center text-gray-300">Akce</th>
                    </tr>
                    </thead>
                    <tbody>
                    {pizzas.map((pizza) => (
                        <AdminPizzaRow
                            key={pizza.id}
                            id={pizza.id}
                            name={pizza.name}
                            description={pizza.description}
                            upvotes={pizza.upvotes}
                            onPizzaDeleted={handlePizzaDeleted}
                        />
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminPage;