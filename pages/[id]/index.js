import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Note = ({ note }) => {
	const [motto, setMotto] = useState("loading...");
	const router = useRouter();

	const {
		query: { species },
	} = router;

	const speciesMotto = () => {
		if (species === "Twi'lek") {
			setMotto("headtails are the best");
		}
		if (species === "Wookiee") {
			setMotto("Smugglers rock!");
		}
		if (species === "Kel Dor") {
			setMotto("I love metal masks");
		}
	};

	useEffect(() => {
		speciesMotto();
	}, []);

	return (
		<>
			<h3>
				your post is called {note.title} and it says something like "
				{note.description}"
			</h3>

			<h2>{motto}</h2>
		</>
	);
};

Note.getInitialProps = async ({ query: { id } }) => {
	const getNoteData = await fetch(`http://localhost:3000/api/notes/${id}`);
	const { data } = await getNoteData.json();

	return { note: data };
};

export default Note;
