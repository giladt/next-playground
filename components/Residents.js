import { useState, useEffect } from "react";
import axios from "axios";

function Residents({ character }) {
	const [char, setChar] = useState("");

	const getInfo = async () => {
		let data = await axios.get(character);
		console.log(data.data.name);
		setChar(data.data.name);
	};

	useEffect(() => {
		getInfo();
	}, [char]);

	return <h2>{char}</h2>;
}

export default Residents;
