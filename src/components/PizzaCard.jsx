import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useEffect, useState } from "react";

function PizzaCard(props) {
    const [clicked, setClicked] = useState(false);
    const [animate, setAnimate] = useState(false);
    const [token, setToken] = useState("");
    const [upvotes, setUpvotes] = useState(0);

    useEffect(() => {
        fetch('http://localhost:8080/votes/getVotes/' + props.id)
            .then(res => res.json())
            .then(data => setUpvotes(data))
            .catch(err => console.log(err));

        const voted = JSON.parse(localStorage.getItem("votedPizzas") || "[]");
        setClicked(voted.includes(props.id));
    }, [props.id]);

    const handleClick = () => {
        setClicked(!clicked);
        setAnimate(true);
        setTimeout(() => setAnimate(false), 200);

        function updateVotes() {
            fetch('http://localhost:8080/votes/getVotes/' + props.id)
                .then(response => response.json())
                .then(data => setUpvotes(data))
                .catch(err => console.log(err));
        }

        fetch("http://localhost:8080/votes/generateToken")
            .then(response => response.text())
            .then(data => {
                setToken(data);

                const url = !clicked
                    ? 'http://localhost:8080/votes/vote/' + props.id
                    : 'http://localhost:8080/votes/unvote/' + props.id;

                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': data,
                    },
                })
                    .then(response => {
                        if (response.ok) {
                            return response.text();
                        } else {
                            throw new Error("Response not OK");
                        }
                    })
                    .then(() => {
                        // Update localStorage
                        let voted = JSON.parse(localStorage.getItem("votedPizzas") || "[]");
                        if (!clicked) {
                            voted.push(props.id);
                        } else {
                            voted = voted.filter(id => id !== props.id);
                        }
                        localStorage.setItem("votedPizzas", JSON.stringify(voted));
                        updateVotes();
                    })
                    .catch(error => console.error("Error:", error));
            });
    };

    return (
        <div className="relative w-72 bg-zinc-800 rounded-lg shadow-md p-6 flex flex-col m-6">
            <span className="absolute top-0 left-0 bg-red-700 text-white text-xs font-semibold px-2 py-1 rounded-xl">
                {props.id}
            </span>
            <div>
                <h2 className="text-white text-xl font-bold mb-2">{props.name}</h2>
                <p className="text-gray-300">
                    {props.description || "No description available."}
                </p>
            </div>
            <div className="absolute bottom-0 text-gray-400 right-4 flex">
                <button
                    className="flex items-center rounded-full p-2 cursor-pointer"
                    onClick={handleClick}
                >
                    <span
                        className={`transition-transform duration-200 ${animate ? "scale-125 rotate-12 opacity-75" : "scale-100 opacity-100"}`}
                    >
                        {clicked ? <BsHeartFill className="text-red-500" /> : <BsHeart />}
                    </span>
                    <span className="ml-1">{upvotes}</span>
                </button>
            </div>
        </div>
    );
}

export default PizzaCard;