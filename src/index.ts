import express from "express";
import { createActor } from "xstate";
import orderMachine from "./machines/orderStateMachine.js";
import { Order } from "./models/orders.js";

async function fetchAndReturnActor(uuid: string) {
  // load from file
  try {
    const orderMachineResponse = await Order.findOne({ where: { uuid } });
    if (orderMachineResponse === null) return null;
    return createActor(orderMachine, {
      state: orderMachineResponse.dataValues.snapshot,
    });
  } catch (err) {
    console.error("Error finding machine:", err);
    return null;
  }
}

const app = express();
app.use(express.json());

// get Order information
app.get("/order/:uuid", async (req, res) => {
  const orderMachineActor = await fetchAndReturnActor(req.params.uuid);
  if (orderMachineActor === null) {
    res.status(404).json({ message: "Order not found" });
  } else {
    orderMachineActor.start();
    res.status(201).json({
      message: "OK",
      uuid: req.params.uuid,
      value: orderMachineActor.getSnapshot().value,
      context: orderMachineActor.getSnapshot().context,
    });
  }
});

app.get("/new_order", async (req, res) => {
  // get a uuid
  const uuid =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  const orderMachineActor = createActor(orderMachine).start();
  await Order.create({
    uuid,
    snapshot: orderMachineActor.getPersistedSnapshot(),
  });
  res.status(201).json({ order: uuid });
});

// Place an order
app.get("/place_order/:uuid", async (req, res) => {
  const orderMachineActor = await fetchAndReturnActor(req.params.uuid);
  if (orderMachineActor === null) {
    res.status(404).json({ message: "Order not found" });
  } else {
    orderMachineActor.start();
    orderMachineActor.send({ type: "PLACE_ORDER" });
    await Order.update(
      { snapshot: orderMachineActor.getPersistedSnapshot() },
      { where: { uuid: req.params.uuid } }
    );
    res.status(201).json({
      message: "OK",
      uuid: req.params.uuid,
      value: orderMachineActor.getSnapshot().value,
      context: orderMachineActor.getSnapshot().context,
    });
  }
});

// Cancel an order
app.get("/cancel_order/:uuid", async (req, res) => {
  const orderMachineActor = await fetchAndReturnActor(req.params.uuid);
  if (orderMachineActor === null) {
    res.status(404).json({ message: "Order not found" });
  } else {
    orderMachineActor.start();
    orderMachineActor.send({ type: "CANCEL_ORDER" });
    await Order.update(
      { snapshot: orderMachineActor.getPersistedSnapshot() },
      { where: { uuid: req.params.uuid } }
    );
    res.status(201).json({
      message: "OK",
      uuid: req.params.uuid,
      value: orderMachineActor.getSnapshot().value,
      context: orderMachineActor.getSnapshot().context,
    });
  }
});

// Complete an Order
app.get("/complete_order/:uuid", async (req, res) => {
  const orderMachineActor = await fetchAndReturnActor(req.params.uuid);
  if (orderMachineActor === null) {
    res.status(404).json({ message: "Order not found" });
  } else {
    orderMachineActor.start();
    orderMachineActor.send({ type: "COMPLETE_ORDER" });
    await Order.update(
      { snapshot: orderMachineActor.getPersistedSnapshot() },
      { where: { uuid: req.params.uuid } }
    );
    res.status(201).json({
      message: "OK",
      uuid: req.params.uuid,
      value: orderMachineActor.getSnapshot().value,
      context: orderMachineActor.getSnapshot().context,
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
