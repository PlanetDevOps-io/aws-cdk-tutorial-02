import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';

export class MarsRoverStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const topic = new Topic(this, 'Topic')

    const table = new Table(this, 'Table', {
      partitionKey: {
        name: 'email',
        type: AttributeType.STRING
      }
    })

    const notificationHandler = new NodejsFunction(this, 'NotificationHandler', {
      environment: {
        TOPIC_ARN: topic.topicArn,
        TABLE_NAME: table.tableName
      }
    })

    const api = new RestApi(this, 'Api')

    const subscribeResource = api.root.addResource('subscribe')
    subscribeResource.addMethod('POST', new LambdaIntegration(notificationHandler))

  }
}
