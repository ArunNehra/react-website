import { Field, InputType, Int } from '@nestjs/graphql';
import {Max, Min} from 'class-validator';
@InputType()
export class NewCarInput {
  @Field()
  name: string;

  @Field((type => Int))
  @Max(1000)
  @Min(50, {message: "Daily price can't be that low"})
  dailyPrice: number;

  @Field((type => Int))
  @Max(25000)
  @Min(1500)
  monthlyPrice: number;

  @Field()
  mileage: string;

  @Field()
  gasType: string;

  @Field()
  gearType: string;

  @Field()
  thumbnailSrc: string;
}
