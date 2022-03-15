import { Customer } from "./customer-model";
import {
  CustomerCreationRequestHandler,
  GetAllCustomerRequestHandler,
  GetCustomerRequestHandler,
} from "./customer-type";

const persistCustomer: CustomerCreationRequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { customerToCreate } = res.locals;
    res.locals.customerCreated = await Customer.create(customerToCreate);
    next();
  } catch (error) {
    next(error);
  }
};

const getAllCustomersBusiness: GetAllCustomerRequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { offset, limit } = res.locals.paginationParamsSerializer;
    res.locals.customersToRespond = await Customer.findAll({ offset, limit });
    next();
  } catch (error) {
    next(error);
  }
};

const getCustomerById: GetCustomerRequestHandler = async (req, res, next) => {
  try {
    const { uuid } = res.locals;
    res.locals.customerToRespond = await Customer.findByPk(uuid);
    next();
  } catch (error) {
    next(error);
  }
};

export { persistCustomer, getAllCustomersBusiness, getCustomerById };
