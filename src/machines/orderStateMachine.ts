import { assign, setup} from "xstate";

const orderMachine = setup({
  types: {
    context: {} as {
      orderStatus: string;
    },
    events: {} as
      | { type: "PLACE_ORDER" }
      | { type: "CANCEL_ORDER" }
      | { type: "COMPLETE_ORDER" },
  },
}).createMachine({
  id: "orderStateMachine",
  initial: "idle",
  context: {
    orderStatus: "IDLE",
  },
  states: {
    idle: {
      on: {
        PLACE_ORDER: {
          target: "processing",
          actions: assign({ orderStatus: () => "PROCESSING" }),
        },
        CANCEL_ORDER: {
          target: "cancelled",
          actions: assign({ orderStatus: () => "PROCESSING" }),
        },
      },
    },
    processing: {
      on: {
        COMPLETE_ORDER: {
          target: "completed",
          actions: assign({ orderStatus: () => "COMPLETED" }),
        },
        CANCEL_ORDER: {
          target: "cancelled",
          actions: assign({ orderStatus: () => "CANCELLED" }),
        },
      },
    },
    completed: {
      type: "final",
    },
    cancelled: {
      type: "final",
    },
  },
});

export default orderMachine;