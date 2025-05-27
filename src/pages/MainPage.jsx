import {useEffect, useState} from "react";
import PizzaCard from "../components/PizzaCard.jsx";

function MainPage() {
    const [pizzas, setPizzas] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/getAllPizzas')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setPizzas(data);
            })
            .catch(err => console.log(err));
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
            </div>
        </>
    );
}

export default MainPage;