import { useEffect, useState } from "react";
import PizzaCard from "../components/PizzaCard.jsx";
import AddPizza from "../components/AddPizza.jsx";
import Navbar from "../components/Navbar.jsx";

function MainPage() {
    const [pizzas, setPizzas] = useState([]);

    const fetchPizzas = () => {
        fetch('http://localhost:8080/getAllPizzas')
            .then(res => res.json())
            .then(data => {
                setPizzas(data);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        fetchPizzas();
    }, []);

    return (
        <div className="relative min-h-screen bg-[#010101]">
            <Navbar />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-8 pr-0 md:pr-[24rem]">
                {pizzas.map((pizza) => (
                    <PizzaCard
                        key={pizza.id}
                        id={pizza.id}
                        name={pizza.name}
                        description={pizza.description}
                        upvotes={pizza.upvotes}
                    />
                ))}
            </div>
            <AddPizza onPizzaAdded={fetchPizzas} />
        </div>
    );
}

export default MainPage;