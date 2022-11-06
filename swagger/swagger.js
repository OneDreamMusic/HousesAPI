// this file was generated by serverless-auto-swagger
            module.exports = {
  "swagger": "2.0",
  "info": {
    "title": "houses-api",
    "version": "1"
  },
  "paths": {
    "/house": {
      "post": {
        "summary": "createHouse",
        "description": "Create object",
        "operationId": "createHouse.post./house",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "description": "Body required in the request",
            "required": true,
            "schema": {
              "$ref": "#/definitions/HouseSchemaRequest"
            }
          }
        ],
        "responses": {
          "201": {
            "description": "Resource has been created",
            "schema": {
              "$ref": "#/definitions/HouseSchemaResponse"
            }
          },
          "400": {
            "description": "Bad Request"
          }
        }
      }
    },
    "/house/{id}": {
      "get": {
        "summary": "getHouse",
        "description": "Return object by id",
        "operationId": "getHouse.get./house/{id}",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "The resource has been fetched",
            "schema": {
              "$ref": "#/definitions/HouseSchemaResponse"
            }
          },
          "404": {
            "description": "Not found"
          }
        }
      },
      "put": {
        "summary": "updateHouse",
        "description": "Update object",
        "operationId": "updateHouse.put./house/{id}",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "description": "Body required in the request",
            "required": true,
            "schema": {
              "$ref": "#/definitions/HouseSchemaRequest"
            }
          },
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "The resource has been fetched",
            "schema": {
              "$ref": "#/definitions/HouseSchemaResponse"
            }
          },
          "400": {
            "description": "Bad Request"
          }
        }
      },
      "delete": {
        "summary": "deleteHouse",
        "description": "Delete object by id",
        "operationId": "deleteHouse.delete./house/{id}",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "204": {
            "description": "Successfully deleted"
          },
          "404": {
            "description": "Not found"
          }
        }
      }
    },
    "/houses": {
      "get": {
        "summary": "listHouse",
        "description": "List objects",
        "operationId": "listHouse.get./houses",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "Return all created object",
            "schema": {
              "$ref": "#/definitions/HouseSchemaListResponse"
            }
          }
        }
      }
    }
  },
  "definitions": {
    "HouseSchemaRequest": {
      "properties": {
        "type": {
          "title": "HouseSchemaRequest.type",
          "type": "string"
        },
        "price": {
          "title": "HouseSchemaRequest.price",
          "type": "number"
        },
        "square_meters": {
          "title": "HouseSchemaRequest.square_meters",
          "type": "number"
        },
        "storeys": {
          "title": "HouseSchemaRequest.storeys",
          "type": "number"
        },
        "available": {
          "title": "HouseSchemaRequest.available",
          "type": "boolean"
        },
        "address": {
          "properties": {
            "city": {
              "title": "HouseSchemaRequest.address.city",
              "type": "string"
            },
            "zip_code": {
              "title": "HouseSchemaRequest.address.zip_code",
              "type": "string"
            },
            "street": {
              "title": "HouseSchemaRequest.address.street",
              "type": "string"
            },
            "apartment_number": {
              "title": "HouseSchemaRequest.address.apartment_number",
              "type": "number"
            }
          },
          "required": [
            "city",
            "zip_code",
            "street",
            "apartment_number"
          ],
          "additionalProperties": false,
          "title": "HouseSchemaRequest.address",
          "type": "object"
        }
      },
      "required": [
        "type",
        "price",
        "square_meters",
        "storeys",
        "available",
        "address"
      ],
      "additionalProperties": false,
      "title": "HouseSchemaRequest",
      "type": "object"
    },
    "HouseSchemaResponse": {
      "allOf": [
        {
          "$ref": "#/definitions/HouseSchemaRequest"
        },
        {
          "properties": {
            "houseID": {
              "title": "houseID",
              "type": "string"
            }
          },
          "required": [
            "houseID"
          ],
          "additionalProperties": false,
          "type": "object"
        }
      ],
      "title": "HouseSchemaResponse"
    },
    "HouseSchemaListResponse": {
      "items": {
        "$ref": "#/definitions/HouseSchemaResponse",
        "title": "HouseSchemaListResponse.[]"
      },
      "title": "HouseSchemaListResponse.[]",
      "type": "array"
    }
  },
  "securityDefinitions": {}
};