import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Car } from "../../components/car";
import Carousel, { Dots, slidesToShowPlugin } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import { useMediaQuery } from "react-responsive";
import { SCREENS } from "../../components/responsive";
import carService from "../../services/carService";
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import { GetCars_cars } from "../../services/carService/__generated__/GetCars";
import { setTopCars } from "./slice";
import { useDispatch, useSelector } from "react-redux";
import { makeSelectTopCars } from "./selectors";
import { MoonLoader } from "react-spinners";

const TopCarsContainer = styled.div`
	${tw`
        max-w-screen-lg
        w-full
        flex
        flex-col
        items-center
        justify-center
        pr-4
        pl-4
        md:pl-0
        md:pr-0
        mb-10
    `}
`;

const Title = styled.h2`
	${tw`
        text-3xl
        lg:text-5xl
        text-black
        font-extrabold
    `}
`;

const CarsContainer = styled.div`
	${tw`
        w-full
        flex
        flex-wrap
        justify-center
        mt-7
        md:mt-10
    `}
`;

const CarouselContainer = styled(Carousel)`
	& > .BrainhubCarousel__arrows {
		${tw`
			bg-red-500
			hover:bg-red-400
			disabled:bg-gray-500
		`}
	}
`;

const EmptyCars = styled.div`
	${tw`
		flex
		w-full
		justify-center
		items-center
		text-sm
		text-gray-500
	`}
`;

const LoadingContainer = styled.div`
	${tw`
		flex
		mt-6
		w-full
		justify-center
		items-center
		text-base
		text-black
	`}
`;

const actionDispatch = (dispatch: Dispatch) => ({
	setTopCars: (cars: GetCars_cars[]) => dispatch(setTopCars(cars)),
});

const stateSelector = createSelector(makeSelectTopCars, (topCars) => ({
	topCars,
}));

const wait = (timeout: number) => new Promise((rs) => setTimeout(rs, timeout));

export function TopCars() {
	const [current, setCurrent] = useState(0);
	const [isloading, setIsloading] = useState(false);

	const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });

	const { setTopCars } = actionDispatch(useDispatch());

	const { topCars } = useSelector(stateSelector);

	const fetchTopCars = async () => {
		setIsloading(true);
		const cars = await carService.getCars().catch((err) => {
			console.error("Error:", err);
		});
		await wait(2000);

		if (cars) setTopCars(cars);
		setIsloading(false);
	};

	useEffect(() => {
		fetchTopCars();
	}, []);

	const isEmptyTopCars = !topCars || topCars.length === 0;

	const cars =
		(!isEmptyTopCars && topCars.map((car) => <Car {...car} />)) || [];

	// const cars = [
	// 	<Car {...testCar2} />,
	// 	<Car {...testCar} />,
	// 	<Car {...testCar2} />,
	// 	<Car {...testCar} />,
	// 	<Car {...testCar2} />,
	// ];

	const numberOfDots = isMobile ? cars.length : Math.ceil(cars.length / 3);

	return (
		<TopCarsContainer>
			<Title>Explore Our Top Deals</Title>
			<CarsContainer>
				{isloading && (
					<LoadingContainer>
						<MoonLoader loading size={40} />
					</LoadingContainer>
				)}
				{isEmptyTopCars && !isloading && <EmptyCars>No Cars To Show</EmptyCars>}
				{!isEmptyTopCars && !isloading && (
					<>
						<CarouselContainer
							value={current}
							onChange={setCurrent}
							slides={cars}
							plugins={[
								"clickToChange",
								"arrows",
								{
									resolve: slidesToShowPlugin,
									options: {
										numberOfSlides: 3,
									},
								},
							]}
							breakpoints={{
								640: {
									plugins: [
										"clickToChange",
										{
											resolve: slidesToShowPlugin,
											options: {
												numberOfSlides: 1,
											},
										},
									],
								},
								900: {
									plugins: [
										"clickToChange",
										{
											resolve: slidesToShowPlugin,
											options: {
												numberOfSlides: 2,
											},
										},
									],
								},
							}}
						/>
						<Dots value={current} onChange={setCurrent} number={numberOfDots} />
					</>
				)}
			</CarsContainer>
		</TopCarsContainer>
	);
}
