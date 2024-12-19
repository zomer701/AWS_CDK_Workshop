import { IFunction, Function } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { Table } from "aws-cdk-lib/aws-dynamodb";
export interface HitCounterProps {
    /** the function for which we want to count url hits **/
    downstream: IFunction;
}
export declare class HitCounter extends Construct {
    readonly handler: Function;
    readonly table: Table;
    constructor(scope: Construct, id: string, props: HitCounterProps);
}
