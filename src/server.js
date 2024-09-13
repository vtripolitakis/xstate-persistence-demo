import orderStateMachine from "./machines/orderStateMachine.js";
import express from "express";
import { createMachine, createActor } from "xstate";
import { Order } from "./models/models.js";

async function fetchAndReturnActor(uuid) {
  // load from file
  try {
    const orderMachine = createMachine(orderStateMachine);
    const orderMachineResponse = await Order.findOne({ where: { uuid } });
    return createActor(orderMachine, {
      state: orderMachineResponse.snapshot
    });
  } catch (err) {
    console.error("Error reading file:", err);
    return null;
  }
}

const app = express();
app.use(express.json());

// get Order information
app.get("/order/:uuid", async (req, res) => {
  const orderMachineActor = await fetchAndReturnActor(req.params.uuid);
  orderMachineActor.start();
  res
    .status(201)
    .json({
      message: "OK",
      uuid: req.params.uuid,
      value: orderMachineActor.getSnapshot().value,
      context: orderMachineActor.getSnapshot().context,
    });
});

app.get("/new_order", async (req, res) => {
  // get a uuid
  const uuid =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  const orderMachine = createMachine(orderStateMachine);
  const orderMachineActor = createActor(orderMachine).start();
  await Order.create({ uuid, snapshot: orderMachineActor.getPersistedSnapshot() });
  res.status(201).json({ order: uuid });
});

// Place an order
app.get("/place_order/:uuid", async (req, res) => {
  const orderMachineActor = await fetchAndReturnActor(req.params.uuid);
  orderMachineActor.start();
  orderMachineActor.send({ type: "PLACE_ORDER" });
  await Order.update({ snapshot: orderMachineActor.getPersistedSnapshot() }, { where: { uuid: req.params.uuid } });
  res.status(201).json({ message: "OK", uuid: req.params.uuid,uuid: req.params.uuid,
    value: orderMachineActor.getSnapshot().value,
    context: orderMachineActor.getSnapshot().context, });
});

// Complete an Order
app.get("/complete_order/:uuid", async (req, res) => {
  const orderMachineActor = await fetchAndReturnActor(req.params.uuid);
  orderMachineActor.start();
  orderMachineActor.send({ type: "COMPLETE_ORDER" });
  await Order.update({ snapshot: orderMachineActor.getPersistedSnapshot() }, { where: { uuid: req.params.uuid } });
  res.status(201).json({ message: "OK", uuid: req.params.uuid,uuid: req.params.uuid,
    value: orderMachineActor.getSnapshot().value,
    context: orderMachineActor.getSnapshot().context, });
});



app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
