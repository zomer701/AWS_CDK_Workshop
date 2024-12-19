import {Code, Function, IFunction, Runtime} from "aws-cdk-lib/aws-lambda";
import {Construct} from "constructs";
import {AttributeType, Table, TableEncryption} from "aws-cdk-lib/aws-dynamodb";
import { aws_dynamodb as dynamodb } from 'aws-cdk-lib';
export interface HitCounterProps {
    /** the function for which we want to count url hits **/
    downstream: IFunction;
}


export class HitCounter extends Construct {
    public readonly handler: Function;
    public readonly table: Table;

    constructor(scope: Construct, id: string, props: HitCounterProps) {
        super(scope, id);

        this.table = new Table(this, "Hits", {
            partitionKey: { name: "path", type: AttributeType.STRING },
            encryption: dynamodb.TableEncryption.AWS_MANAGED
        });

        this.handler = new Function(this, "HitCounterHandler", {
            runtime: Runtime.NODEJS_18_X,
            handler: "hitcounter.handler",
            code: Code.fromAsset("lambda"),
            environment: {
                DOWNSTREAM_FUNCTION_NAME: props.downstream.functionName,
                HITS_TABLE_NAME: this.table.tableName,
            },
        });

        this.table.grantReadWriteData(this.handler);

        props.downstream.grantInvoke(this.handler);
    }
}