import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import AWS from "aws-sdk";
import { v4 } from "uuid";
import * as yup from "yup";

const docClient = new AWS.DynamoDB.DocumentClient();
const tableName = "HousesTable";
const headers = {
  "content-type": "application/json",
};
const schema = yup.object().shape({
  type: yup.string().required(),
  price: yup.number().required(),
  square_meters: yup.number().required(),
  storeys: yup.number().required(),
  available: yup.bool().required(),
  address: yup.object().shape({
    city: yup.string().required(),
    zip_code: yup.string().max(6).required(),
    street: yup.string().required(),
    apartment_number: yup.number().required(),
  }),
});

export const createHouse = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const reqBody = JSON.parse(event.body as string);

    await schema.validate(reqBody, { abortEarly: false });

    const house = {
      ...reqBody,
      houseID: v4(),
    };

    await docClient
      .put({
        TableName: tableName,
        Item: house,
      })
      .promise();

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify(house),
    };
  } catch (e) {
    return handleError(e);
  }
};

class HttpError extends Error {
  constructor(public statusCode: number, body: Record<string, unknown> = {}) {
    super(JSON.stringify(body));
  }
}

const fetchHouseById = async (id: string) => {
  const output = await docClient
    .get({
      TableName: tableName,
      Key: {
        houseID: id,
      },
    })
    .promise();

  if (!output.Item) {
    throw new HttpError(404, { error: "not found" });
  }
  return output.Item;
};

const handleError = (e: unknown) => {
  if (e instanceof yup.ValidationError) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        errors: e.errors,
      }),
    };
  }

  if (e instanceof SyntaxError) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: `invalid request body format : ${e.message}` }),
    };
  }

  if (e instanceof HttpError) {
    return {
      statusCode: e.statusCode,
      headers,
      body: e.message,
    };
  }
  throw e;
};

export const getHouse = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const house = await fetchHouseById(event.pathParameters?.id as string);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(house),
    };
  } catch (e) {
    return handleError(e);
  }
};
export const updateHouse = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const id = event.pathParameters?.id as string;
    await fetchHouseById(id);

    const reqBody = JSON.parse(event.body as string);

    await schema.validate(reqBody, { abortEarly: false });

    const house = {
      ...reqBody,
      houseID: id,
    };

    await docClient
      .put({
        TableName: tableName,
        Item: house,
      })
      .promise();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(house),
    };
  } catch (e) {
    return handleError(e);
  }
};

export const deleteHouse = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const id = event.pathParameters?.id as string;
    const house = await fetchHouseById(id);

    await docClient
      .delete({
        TableName: tableName,
        Key: {
          houseID: id,
        },
      })
      .promise();
    return {
      statusCode: 204,
      body: "",
    };
  } catch (e) {
    return handleError(e);
  }
};

export const listHouse = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const output = await docClient
    .scan({
      TableName: tableName,
    })
    .promise();
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(output.Items),
  };
};
