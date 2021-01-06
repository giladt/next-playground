import { useRouter } from "next/router";
import Layout from "../../components/layout/layout";

Person.getInitialProps = async (context) => {
	if (!context.req) {
		return { ownersList: [] };
	}

	// the context pulls the information we need from the URL
	const { query } = context;
	const response = await fetch(
		`http://localhost:3004/vehicles/?ownerName=${query.person}&vehicle=${query.vehicle}`
	);
	console.log("initial props", response);
	const ownersList = await response.json();
	return { ownersList };
};

export default function Person({ ownersList }) {
	const router = useRouter();

	console.log(ownersList);

	const { vehicle, person, copilots } = router.query;

	return (
		<Layout>
			<h2>
				{person}'s {vehicle}
			</h2>
			{/* <h3>co-Pilots:</h3>
			<ul>
				{this.state.user.username ? (
					copilots.map((copilot, index) => <li key={index}>{copilot}</li>)
				) : (
					<li>loading..</li>
				)}
			</ul> */}
		</Layout>
	);
}
