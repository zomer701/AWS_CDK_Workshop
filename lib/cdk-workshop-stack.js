"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CdkWorkshopStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_lambda_1 = require("aws-cdk-lib/aws-lambda");
const aws_apigateway_1 = require("aws-cdk-lib/aws-apigateway");
const hitcounter_1 = require("./hitcounter");
const cdk_dynamo_table_viewer_1 = require("cdk-dynamo-table-viewer");
class CdkWorkshopStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const hello = new aws_lambda_1.Function(this, "HelloHandler", {
            runtime: aws_lambda_1.Runtime.NODEJS_18_X,
            code: aws_lambda_1.Code.fromAsset("lambda"),
            handler: "hello.handler",
        });
        const helloWithCounter = new hitcounter_1.HitCounter(this, "HelloHitCounter", {
            downstream: hello,
        });
        const gateway = new aws_apigateway_1.LambdaRestApi(this, "Endpoint", {
            handler: helloWithCounter.handler,
        });
        const tv = new cdk_dynamo_table_viewer_1.TableViewer(this, 'ViewHitCounter', {
            title: 'Hello Hits',
            table: helloWithCounter.table
        });
    }
}
exports.CdkWorkshopStack = CdkWorkshopStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrLXdvcmtzaG9wLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2RrLXdvcmtzaG9wLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQUFnRDtBQUNoRCx1REFBaUU7QUFFakUsK0RBQTJEO0FBQzNELDZDQUF3QztBQUN4QyxxRUFBc0Q7QUFFdEQsTUFBYSxnQkFBaUIsU0FBUSxtQkFBSztJQUN6QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQWtCO1FBQzFELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE1BQU0sS0FBSyxHQUFHLElBQUkscUJBQVEsQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFO1lBQy9DLE9BQU8sRUFBRSxvQkFBTyxDQUFDLFdBQVc7WUFDNUIsSUFBSSxFQUFFLGlCQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztZQUM5QixPQUFPLEVBQUUsZUFBZTtTQUN6QixDQUFDLENBQUM7UUFFSCxNQUFNLGdCQUFnQixHQUFHLElBQUksdUJBQVUsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLEVBQUU7WUFDL0QsVUFBVSxFQUFFLEtBQUs7U0FDbEIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxPQUFPLEdBQUcsSUFBSSw4QkFBYSxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUU7WUFDbEQsT0FBTyxFQUFFLGdCQUFnQixDQUFDLE9BQU87U0FDbEMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxFQUFFLEdBQUcsSUFBSSxxQ0FBVyxDQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRTtZQUNqRCxLQUFLLEVBQUUsWUFBWTtZQUNuQixLQUFLLEVBQUUsZ0JBQWdCLENBQUMsS0FBSztTQUM5QixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUF2QkQsNENBdUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3RhY2ssIFN0YWNrUHJvcHMgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBDb2RlLCBGdW5jdGlvbiwgUnVudGltZSB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtbGFtYmRhXCI7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcbmltcG9ydCB7IExhbWJkYVJlc3RBcGkgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWFwaWdhdGV3YXlcIjtcbmltcG9ydCB7SGl0Q291bnRlcn0gZnJvbSBcIi4vaGl0Y291bnRlclwiO1xuaW1wb3J0IHsgVGFibGVWaWV3ZXIgfSBmcm9tIFwiY2RrLWR5bmFtby10YWJsZS12aWV3ZXJcIjtcblxuZXhwb3J0IGNsYXNzIENka1dvcmtzaG9wU3RhY2sgZXh0ZW5kcyBTdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgY29uc3QgaGVsbG8gPSBuZXcgRnVuY3Rpb24odGhpcywgXCJIZWxsb0hhbmRsZXJcIiwge1xuICAgICAgcnVudGltZTogUnVudGltZS5OT0RFSlNfMThfWCxcbiAgICAgIGNvZGU6IENvZGUuZnJvbUFzc2V0KFwibGFtYmRhXCIpLFxuICAgICAgaGFuZGxlcjogXCJoZWxsby5oYW5kbGVyXCIsXG4gICAgfSk7XG5cbiAgICBjb25zdCBoZWxsb1dpdGhDb3VudGVyID0gbmV3IEhpdENvdW50ZXIodGhpcywgXCJIZWxsb0hpdENvdW50ZXJcIiwge1xuICAgICAgZG93bnN0cmVhbTogaGVsbG8sXG4gICAgfSk7XG5cbiAgICBjb25zdCBnYXRld2F5ID0gbmV3IExhbWJkYVJlc3RBcGkodGhpcywgXCJFbmRwb2ludFwiLCB7XG4gICAgICBoYW5kbGVyOiBoZWxsb1dpdGhDb3VudGVyLmhhbmRsZXIsXG4gICAgfSk7XG5cbiAgICBjb25zdCB0diA9IG5ldyBUYWJsZVZpZXdlcih0aGlzLCAnVmlld0hpdENvdW50ZXInLCB7XG4gICAgICB0aXRsZTogJ0hlbGxvIEhpdHMnLFxuICAgICAgdGFibGU6IGhlbGxvV2l0aENvdW50ZXIudGFibGVcbiAgICB9KTtcbiAgfVxufVxuIl19