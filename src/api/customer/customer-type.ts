import { RequestHandler } from "express";
import { Model } from "sequelize-typescript";
import { Optional } from "sequelize/types";
import {
  PaginationParams,
  PaginationParamsSerializer,
} from "../../util/types/paginationHelpers";

type CustomerAttributes = {
  uuid: string;
  name: string;
  cpf?: string;
  cnpj?: string;
  email: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
};

type SingleCustomer = CustomerAttributes | null;

type CustomerCreationAttributes = Optional<
  CustomerAttributes,
  "uuid" | "createdAt" | "updatedAt"
>;

type CustomerCreationRequest = {
  name: string;
  document: {
    cpf?: string;
    cnpj?: string;
  };
  contact: {
    email: string;
    phone?: string;
  };
};

type CustomerResponse = CustomerCreationRequest & {
  uuid: string;
  createdAt: string;
  updatedAt: string;
};

export abstract class CustomerModel extends Model<
  CustomerAttributes,
  CustomerCreationAttributes
> {}

export type CustomerCreationRequestHandler = RequestHandler<
  {}, // path params
  CustomerResponse, // response
  CustomerCreationRequest, // request
  {}, // query params
  {
    customerToCreate: CustomerCreationAttributes;
    customerCreated: CustomerAttributes;
    customerToRespond: CustomerResponse;
  }
>;

export type GetAllCustomerRequestHandler = RequestHandler<
  {}, // params
  CustomerAttributes[], // response
  {}, // request
  PaginationParams, // query
  {
    paginationParamsSerializer: PaginationParamsSerializer;
    customersToRespond: CustomerAttributes[];
  } // local
>;

export type GetCustomerRequestHandler = RequestHandler<
  {
    id: string;
  }, // path params
  SingleCustomer, // response
  {}, // request
  {}, // query params
  {
    uuid: string;
    customerToRespond: SingleCustomer;
  }
>;
