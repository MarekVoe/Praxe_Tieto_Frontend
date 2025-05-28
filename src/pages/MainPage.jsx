import { useEffect, useState } from "react";
import PizzaCard from "../components/PizzaCard.jsx";
import AddPizza from "../components/AddPizza.jsx";

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
        <>
            <div className="flex flex-wrap w-full h-auto p-8 gap-4">
                {pizzas.map((pizza) => (
                    <div key={pizza.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
                        <PizzaCard
                            id={pizza.id}
                            name={pizza.name}
                            upvotes={pizza.upvotes}
                        />
                    </div>
                ))}
                <AddPizza onPizzaAdded={fetchPizzas} />
            </div>
        </>
    );
}

export default MainPage;