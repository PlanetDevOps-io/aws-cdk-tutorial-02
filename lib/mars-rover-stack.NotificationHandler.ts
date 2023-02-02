import { SNS } from '@aws-sdk/client-sns';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';

const topicArn = process.env.TOPIC_ARN
const tableName = process.env.TABLE_NAME
export const handler = async (event: any) => {
    const dynamoClient = new DynamoDBClient({});
    const documentClient = DynamoDBDocument.from(dynamoClient);
    const sns = new SNS({})

    const body = JSON.parse(event.body)

    try {
        await sns.subscribe({
            TopicArn: topicArn,
            Protocol: 'email',
            Endpoint: body.email
        })

        await documentClient.put({
            TableName: tableName,
            Item: {
                email: body.email
            }
        })
    } catch (e) {
        console.error(e.message)

        return {
            statusCode: 500,
            body: ''
        }
    }

    return {
        statusCode: 201,
        body: ''
    }
}