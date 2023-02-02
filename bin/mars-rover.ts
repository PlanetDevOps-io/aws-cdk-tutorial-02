#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { MarsRoverStack } from '../lib/mars-rover-stack';
import { PermissionsBoundaryPolicyStack } from '../lib/permissions-boundary-policy-stack';

const app = new cdk.App();

new PermissionsBoundaryPolicyStack(app, 'PermissionsBoundaryPolicyStack', {
    description: 'GTZ Permissions Boundary Policy Stack'
})

new MarsRoverStack(app, 'MarsRoverStackStack', {
    description: 'AWS CDK Workshop tutorial stack',
});