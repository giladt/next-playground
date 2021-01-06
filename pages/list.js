import Link from "next/link";
import { useState, useEffect } from "react";

List.getInitialProps = async () => {
	const response = await fetch("http://localhost:3004/vehicles/");
	const ownersList = await response.json();
	return { ownersList };
};

export default function List({ ownersList }) {
	const [owners, setOwners] = useState(ownersList);

	// const loadData = async () => {

	// 	setOwners(ownersList);
	// 	console.log(owners);
	// };

	// useEffect(() => {
	// 	loadData();
	// }, []);

	return (
		<div>
			{owners.map((e, index) => (
				<div key={index}>
					<Link as={`/${e.vehicle}/${e.ownerName}`} href="/[vehicle]/[person]">
						<a>
							Navigate to {e.ownerName}'s {e.vehicle}
						</a>
					</Link>
				</div>
			))}
		</div>
	);
}
