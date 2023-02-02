import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Effect, ManagedPolicy, PolicyStatement } from 'aws-cdk-lib/aws-iam';

export class PermissionsBoundaryPolicyStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        new ManagedPolicy(this, 'PermissionsBoundaryPolicy', {
            managedPolicyName: 'GTZ-PermissionsBoundaryPolicy',
            statements: [
                new PolicyStatement({
                    effect: Effect.DENY,
                    actions: ['iam:*'],
                    resources: ['*'],
                }),
            ],
        });

    }
}
