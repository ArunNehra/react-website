import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { ICar } from "../../../typings/car";
import { Car } from "../../components/car";
import Carousel, { Dots, slidesToShowPlugin } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import { useMediaQuery } from "react-responsive";
import { SCREENS } from "../../components/responsive";
import carService from "../../services/carService";

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

export function TopCars() {
	const [current, setCurrent] = useState(0);

	const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });

	const fetchTopCars = async () => {
		const cars = await carService.getCars().catch((err) => {
			console.error("Error:", err);
		});

		console.log("Cars:", cars);
	};

	const testCar: ICar = {
		name: "Audi S3 Car",
		mileage: "10k",
		thumbnailSrc:
			"https://cdn.jdpower.com/Models/640x480/2017-Audi-S3-PremiumPlus.jpg",
		dailyPrice: 70,
		monthlyPrice: 1600,
		gearType: "Auto",
		gasType: "Petrol",
	};

	const testCar2: ICar = {
		name: "HONDA cITY 5 Seater Car",
		mileage: "20k",
		thumbnailSrc:
			"https://shinewiki.com/wp-content/uploads/2019/11/honda-city.jpg",
		dailyPrice: 50,
		monthlyPrice: 1500,
		gearType: "Auto",
		gasType: "Petrol",
	};

	useEffect(() => {
		fetchTopCars();
	}, []);
	const cars = [
		<Car {...testCar2} />,
		<Car {...testCar} />,
		<Car {...testCar2} />,
		<Car {...testCar} />,
		<Car {...testCar2} />,
	];

	const numberOfDots = isMobile ? cars.length : Math.ceil(cars.length / 3);

	return (
		<TopCarsContainer>
			<Title>Explore Our Top Deals</Title>
			<CarsContainer>
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
				{isMobile && (
					<Dots value={current} onChange={setCurrent} number={numberOfDots} />
				)}
			</CarsContainer>
		</TopCarsContainer>
	);
}
