import {BsFillHandThumbsUpFill, BsHandThumbsDown, BsHandThumbsUp, BsHeart, BsHeartFill} from "react-icons/bs";
import {useState} from "react";

function PizzaCard(props) {
    const [clicked, setClicked] = useState(false);
    const [votes, setVotes] = useState(0);

    return (
        <div className="relative w-72 bg-zinc-800 rounded-lg shadow-md p-6 flex flex-col m-6">
            <span className="absolute top-0 left-0 bg-amber-400 text-white text-xs font-semibold px-2 py-1 rounded-xl">
                {props.id}
            </span>
            <div>
                <h2 className="text-white text-xl font-bold mb-2">{props.name}</h2>
            </div>
            <div className="absolute bottom-0 text-gray-400 right-4 flex">
                <button
                    className="flex items-center rounded-full p-2 cursor-pointer"
                    onClick={() => {
                        setClicked(!clicked);
                        setVotes(clicked ? votes - 1 : votes + 1);
                    }}
                >
                    {clicked ? <BsHeartFill className="text-red-500" /> : <BsHeart />}
                    <span className="ml-1">{votes}</span>
                </button>
            </div>
        </div>
    );
}

export default PizzaCard;