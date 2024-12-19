import { Stack, StackProps } from 'aws-cdk-lib';
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from 'constructs';
import { LambdaRestApi } from "aws-cdk-lib/aws-apigateway";
import {HitCounter} from "./hitcounter";
import { TableViewer } from "cdk-dynamo-table-viewer";

export class CdkWorkshopStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const hello = new Function(this, "HelloHandler", {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset("lambda"),
      handler: "hello.handler",
    });

    const helloWithCounter = new HitCounter(this, "HelloHitCounter", {
      downstream: hello,
    });

    const gateway = new LambdaRestApi(this, "Endpoint", {
      handler: helloWithCounter.handler,
    });

    const tv = new TableViewer(this, 'ViewHitCounter', {
      title: 'Hello Hits',
      table: helloWithCounter.table
    });
  }
}
