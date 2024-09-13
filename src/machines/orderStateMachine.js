import { assign } from "xstate";

const orderStateMachine = {
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
};

export default orderStateMachine;
