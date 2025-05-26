import './App.css'
import PizzaCard from "./components/PizzaCard.jsx";

function App() {
  // Ukázková data pro pizzy
  const pizzas = [
    { id: 1, name: "Margherita", upvotes: 12, downvotes: 2 },
    { id: 2, name: "Pepperoni", upvotes: 20, downvotes: 3 },
    { id: 3, name: "Quattro Formaggi", upvotes: 15, downvotes: 1 },
    { id: 4, name: "Hawaiian", upvotes: 8, downvotes: 10 },
    { id: 5, name: "Vegetarian", upvotes: 10, downvotes: 0 },
    { id: 6, name: "Capricciosa", upvotes: 9, downvotes: 2 },
    { id: 7, name: "Diavola", upvotes: 14, downvotes: 4 },
    { id: 8, name: "Funghi", upvotes: 11, downvotes: 1 },
    { id: 9, name: "Prosciutto", upvotes: 13, downvotes: 2 },
    { id: 10, name: "Tonno", upvotes: 7, downvotes: 5 },
  ];

  return (
    <>
        <div className="flex flex-wrap w-full h-auto p-8 gap-4">
            {pizzas.map((pizza) => (
                <div key={pizza.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
                    <PizzaCard
                      id={pizza.id}
                      name={pizza.name}
                      upvotes={pizza.upvotes}
                      downvotes={pizza.downvotes}
                    />
                </div>
            ))}
        </div>
    </>
  )
}

export default App
