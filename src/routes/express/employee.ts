import { Container } from "../../infra/core/container";
import { EmployeeController } from "../../employee/employee_controller";
import { Router } from "express";
import { expressRouterAdapter } from "../adapters/express-router";

export default (_: Router) => {
  const router = Router();
  const controller: EmployeeController = Container.get(EmployeeController);

  router.get("", expressRouterAdapter(controller, controller.getAllEmployee));
  router.post("", expressRouterAdapter(controller, controller.createEmployee));
  router.get("/:id", expressRouterAdapter(controller, controller.findEmployee));
  router.patch(
    ":id",
    expressRouterAdapter(controller, controller.updateEmployee)
  );
  router.delete(
    "/:id",
    expressRouterAdapter(controller, controller.removeEmployee)
  );

  _.use("/employees", router);
};
