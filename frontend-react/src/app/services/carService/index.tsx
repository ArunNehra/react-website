import { apolloClient } from "../../graphql";
import { GET_ALL_CARS } from "./queries";
import { GetCars_cars } from "./__generated__/GetCars";

class CarService {
	public async getCars(): Promise<GetCars_cars[]> {
		const res = await apolloClient
			.query({ query: GET_ALL_CARS })
			.catch((err) => {
				throw err;
			});

		if (res && res.data) return res.data as GetCars_cars[];

		return [];
	}
}

export default new CarService();
