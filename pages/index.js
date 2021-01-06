import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

const Index = (props) => {
	const [species, setSpecies] = useState("select a species");
	const router = useRouter();
	let notes = props.data;

	const handleChange = (e) => {
		setSpecies(e.target.value);
	};

	const handleDelete = async (note) => {
		console.log(note);
		try {
			const deleteThis = await fetch(
				`http://localhost:3000/api/notes/${note}`,
				{
					method: "DELETE",
				}
			);
		} catch (error) {
			console.log("ballsed up");
		} finally {
			router.push("/");
		}
	};

	return (
		<>
			<h1>select your species</h1>

			<select value={species} onChange={handleChange}>
				<option value="select">select your option</option>
				<option value="Wookiee">Wookiee</option>
				<option value="Twi'lek">Twi'lek</option>
				<option value="Kel Dor">Kel Dor</option>
			</select>

			<h1>List of things:</h1>

			{notes.map((note) => {
				return (
					<div key={note._id}>
						<h2>{note.title}</h2>
						<h3>{note.description}</h3>
						<Link href={{ pathname: `/${note._id}`, query: { species } }}>
							<button>view</button>
						</Link>
						<Link href={`/${note._id}/edit`}>
							<button>edit</button>
						</Link>
						<button onClick={() => handleDelete(note._id)}>delete</button>
					</div>
				);
			})}
			<Link href={{ pathname: `/new`, query: { species } }}>
				<button>create your own</button>
			</Link>
		</>
	);
};

// this allows us to run some code server side before the page gets rendered
Index.getInitialProps = async () => {
	const dataFromApi = await axios.get("http://localhost:3000/api/notes");
	let notes = dataFromApi.data;
	return notes;
};

export default Index;
