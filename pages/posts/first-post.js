import Link from "next/link";
import Head from "next/head";
import { useState } from "react";
import axios from "axios";
import Residents from "../../components/Residents";
import Layout from "../../components/layout/layout";

export default function FirstPost() {
	const [name, setName] = useState("Timmy");
	const [planet, setPlanet] = useState("");
	const [film, setFilm] = useState("");
	const [residents, setResidents] = useState([]);

	const changeName = () => {
		if (name === "Timmy") {
			setName("Matteel");
		}
		if (name === "Matteel") {
			setName("Timmy");
		}
		if (name === "Jeffy") {
			setName("Timmy");
		}
	};

	const getInfo = async () => {
		let random = Math.floor(Math.random() * 10) + 1;
		let planet = await axios.get(`https://swapi.dev/api/planets/${random}`);
		let filmInfo = await axios.get(planet.data.films[0]);
		console.log(planet.data);
		Promise.all([planet, filmInfo]).then(() => {
			setResidents(planet.data.residents);
			setPlanet(planet.data.name);
			setFilm(filmInfo.data.title);
		});
	};
	console.log(residents);
	return (
		<Layout>
			<Head>
				<title>Star Wars Stuff</title>
			</Head>
			<h1>{name}</h1>
			{planet === "" ? (
				<h1>Favourite Star Wars Planet? </h1>
			) : (
				<h1>Favourite Star Wars Planet is {planet}</h1>
			)}
			{film === "" ? (
				<h2>Where's it featured?</h2>
			) : (
				<h2>it features in {film}</h2>
			)}
			<h2></h2>
			<button onClick={() => changeName()}>click for names</button>
			<button onClick={() => getInfo()}>click for planets</button>

			{residents.length != 0 ? (
				residents.map((resident) => {
					return <Residents character={resident} />;
				})
			) : (
				<h1>loading...</h1>
			)}

			<Link href="/">
				<a> back to home</a>
			</Link>
		</Layout>
	);
}
