import { Field, Float, ObjectType } from "type-graphql";

@ObjectType()
export class ExchangeRate {
  @Field()
  from: string;

  @Field()
  to: string;

  @Field(() => Float)
  rate: number;
}