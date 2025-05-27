import {BsHeart, BsHeartFill} from "react-icons/bs";
import {useState} from "react";

function PizzaCard(props) {
    const [clicked, setClicked] = useState(false);
    const [animate, setAnimate] = useState(false);

    const handleClick = () => {
        setClicked(!clicked);
        setAnimate(true);
        setTimeout(() => setAnimate(false), 200);
        console.log("Clicked on pizza with ID:", props.id);
        console.log("Token:", localStorage.getItem("token"));

        fetch('http://localhost:8080/votes/vote/' + props.id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            }
        });
    }

    return (
        <div className="relative w-72 bg-zinc-800 rounded-lg shadow-md p-6 flex flex-col m-6">
                    <span
                        className="absolute top-0 left-0 bg-amber-400 text-white text-xs font-semibold px-2 py-1 rounded-xl">
                        {props.id}
                    </span>
            <div>
                <h2 className="text-white text-xl font-bold mb-2">{props.name}</h2>
            </div>
            <div className="absolute bottom-0 text-gray-400 right-4 flex">
                <button
                    className="flex items-center rounded-full p-2 cursor-pointer"
                    onClick={handleClick}
                >
                            <span
                                className={`transition-transform duration-200 ${
                                    animate ? "scale-125" : "scale-100"
                                }`}
                            >
                                {clicked ? <BsHeartFill className="text-red-500"/> : <BsHeart/>}
                            </span>
                    <span className="ml-1">{props.upvotes}</span>
                </button>
            </div>
        </div>
    );
}

export default PizzaCard;