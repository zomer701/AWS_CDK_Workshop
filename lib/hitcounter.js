"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HitCounter = void 0;
const aws_lambda_1 = require("aws-cdk-lib/aws-lambda");
const constructs_1 = require("constructs");
const aws_dynamodb_1 = require("aws-cdk-lib/aws-dynamodb");
class HitCounter extends constructs_1.Construct {
    constructor(scope, id, props) {
        super(scope, id);
        this.table = new aws_dynamodb_1.Table(this, "Hits", {
            partitionKey: { name: "path", type: aws_dynamodb_1.AttributeType.STRING },
        });
        this.handler = new aws_lambda_1.Function(this, "HitCounterHandler", {
            runtime: aws_lambda_1.Runtime.NODEJS_18_X,
            handler: "hitcounter.handler",
            code: aws_lambda_1.Code.fromAsset("lambda"),
            environment: {
                DOWNSTREAM_FUNCTION_NAME: props.downstream.functionName,
                HITS_TABLE_NAME: this.table.tableName,
            },
        });
        this.table.grantReadWriteData(this.handler);
        props.downstream.grantInvoke(this.handler);
    }
}
exports.HitCounter = HitCounter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGl0Y291bnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhpdGNvdW50ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsdURBQTBFO0FBQzFFLDJDQUFxQztBQUNyQywyREFBOEQ7QUFROUQsTUFBYSxVQUFXLFNBQVEsc0JBQVM7SUFJckMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUM1RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWpCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxvQkFBSyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUU7WUFDakMsWUFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsNEJBQWEsQ0FBQyxNQUFNLEVBQUU7U0FDN0QsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLHFCQUFRLENBQUMsSUFBSSxFQUFFLG1CQUFtQixFQUFFO1lBQ25ELE9BQU8sRUFBRSxvQkFBTyxDQUFDLFdBQVc7WUFDNUIsT0FBTyxFQUFFLG9CQUFvQjtZQUM3QixJQUFJLEVBQUUsaUJBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1lBQzlCLFdBQVcsRUFBRTtnQkFDVCx3QkFBd0IsRUFBRSxLQUFLLENBQUMsVUFBVSxDQUFDLFlBQVk7Z0JBQ3ZELGVBQWUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVM7YUFDeEM7U0FDSixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUU1QyxLQUFLLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDL0MsQ0FBQztDQUNKO0FBekJELGdDQXlCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29kZSwgSUZ1bmN0aW9uLCBGdW5jdGlvbiwgUnVudGltZX0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1sYW1iZGFcIjtcbmltcG9ydCB7Q29uc3RydWN0fSBmcm9tIFwiY29uc3RydWN0c1wiO1xuaW1wb3J0IHtBdHRyaWJ1dGVUeXBlLCBUYWJsZX0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1keW5hbW9kYlwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEhpdENvdW50ZXJQcm9wcyB7XG4gICAgLyoqIHRoZSBmdW5jdGlvbiBmb3Igd2hpY2ggd2Ugd2FudCB0byBjb3VudCB1cmwgaGl0cyAqKi9cbiAgICBkb3duc3RyZWFtOiBJRnVuY3Rpb247XG59XG5cblxuZXhwb3J0IGNsYXNzIEhpdENvdW50ZXIgZXh0ZW5kcyBDb25zdHJ1Y3Qge1xuICAgIHB1YmxpYyByZWFkb25seSBoYW5kbGVyOiBGdW5jdGlvbjtcbiAgICBwdWJsaWMgcmVhZG9ubHkgdGFibGU6IFRhYmxlO1xuXG4gICAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM6IEhpdENvdW50ZXJQcm9wcykge1xuICAgICAgICBzdXBlcihzY29wZSwgaWQpO1xuXG4gICAgICAgIHRoaXMudGFibGUgPSBuZXcgVGFibGUodGhpcywgXCJIaXRzXCIsIHtcbiAgICAgICAgICAgIHBhcnRpdGlvbktleTogeyBuYW1lOiBcInBhdGhcIiwgdHlwZTogQXR0cmlidXRlVHlwZS5TVFJJTkcgfSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5oYW5kbGVyID0gbmV3IEZ1bmN0aW9uKHRoaXMsIFwiSGl0Q291bnRlckhhbmRsZXJcIiwge1xuICAgICAgICAgICAgcnVudGltZTogUnVudGltZS5OT0RFSlNfMThfWCxcbiAgICAgICAgICAgIGhhbmRsZXI6IFwiaGl0Y291bnRlci5oYW5kbGVyXCIsXG4gICAgICAgICAgICBjb2RlOiBDb2RlLmZyb21Bc3NldChcImxhbWJkYVwiKSxcbiAgICAgICAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgICAgICAgICAgRE9XTlNUUkVBTV9GVU5DVElPTl9OQU1FOiBwcm9wcy5kb3duc3RyZWFtLmZ1bmN0aW9uTmFtZSxcbiAgICAgICAgICAgICAgICBISVRTX1RBQkxFX05BTUU6IHRoaXMudGFibGUudGFibGVOYW1lLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy50YWJsZS5ncmFudFJlYWRXcml0ZURhdGEodGhpcy5oYW5kbGVyKTtcblxuICAgICAgICBwcm9wcy5kb3duc3RyZWFtLmdyYW50SW52b2tlKHRoaXMuaGFuZGxlcik7XG4gICAgfVxufSJdfQ==