import { PaginationParams } from "../../util/types/paginationHelpers";
import {
  CustomerCreationRequestHandler,
  GetAllCustomerRequestHandler,
  GetCustomerRequestHandler,
} from "./customer-type";

const createCustomerSerializer: CustomerCreationRequestHandler = (
  req,
  res,
  next
) => {
  const { customerCreated } = res.locals;
  res.locals.customerToRespond = {
    uuid: customerCreated.uuid,
    name: customerCreated.name,
    contact: {
      email: customerCreated.email,
      phone: customerCreated.phone,
    },
    document: {
      cpf: customerCreated.cpf,
      cnpj: customerCreated.cnpj,
    },
    createdAt: customerCreated.createdAt.toISOString(),
    updatedAt: customerCreated.updatedAt.toISOString(),
  };
  next();
};

const paginationSerializer: GetAllCustomerRequestHandler = (req, res, next) => {
  const PaginationParams = req.query;
  let offset = 0;
  let limit = 50;

  if (PaginationParams.offset) {
    offset = Number(PaginationParams.offset);
  }

  if (PaginationParams.limit) {
    limit = Number(PaginationParams.limit);
  }

  res.locals.paginationParamsSerializer = { offset, limit };

  next();
};

const getCustomerSerializer: GetCustomerRequestHandler = (req, res, next) => {
  const { id } = req.params;

  res.locals.uuid = id;

  next();
};

export {
  createCustomerSerializer,
  paginationSerializer,
  getCustomerSerializer,
};
