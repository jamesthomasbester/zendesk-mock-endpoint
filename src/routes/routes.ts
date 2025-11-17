import { Router } from "express";
import data from "../data/pharmacy.json";
import status from "../data/status.json";
import fullOrders from "../data/full_orders.json";

type RequestBody = {
  orderNumber: string;
};

type trackingResponse = {
  name: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  phone: string;
  orderNumber: string;
};

const router = Router();

router.post("/order/tracking/", async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token && token === "MockToken") {
      const id = req.body.order_code;
      if (id.startsWith("MPRS")) {
        const order = fullOrders.orders.find((item) => item.order_code === id);
        if (order) {
          res.status(200).json({
            name: order.pharmacy.name,
            address: order.pharmacy.address,
            city: order.pharmacy.city,
            state: order.pharmacy.state,
            zip_code: order.pharmacy.zip_code,
            phone: order.pharmacy.phone,
            orderNumber: order.order_code,
            trackingUrl: order.pharmacy.tracking_url
          });
        } else {
          res.status(404).json({ message: "Order not found" });
        }
      } else {
        res.status(400).json({
          message: `
                Incorrect Request Body, Please format requests:
                    {
                        "orderNumber": "MPRS**insert order number**"
                    }
                `
        });
      }
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/order/status/", async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token && token === "MockToken") {
      const id = req.body.order_code;
      if (id.startsWith("MPRS")) {
        const order = fullOrders.orders.find((item) => item.order_code === id);
        if (order) {
          res.status(200).json({
            status: order.status
          });
        } else {
          res.status(404).json({ message: "Order not found" });
        }
      } else {
        res.status(400).json({
          message: `
                Incorrect Request Body, Please format requests:
                    {
                        "orderNumber": "MPRS**insert order number**"
                    }
                `
        });
      }
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/order/tracking/random", async (req, res) => {
  try {
    const pharmacy =
      data.Pharmacy[Math.floor(Math.random() * data.Pharmacy.length)];
    res.status(200).json({
      name: pharmacy.name,
      address: pharmacy.address,
      city: pharmacy.city,
      state: pharmacy.state,
      zip_code: pharmacy.zip_code,
      phone: pharmacy.phone,
      orderNumber: pharmacy.id,
      trackingUrl: pharmacy.tracking_url
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/order/status/random", async (req, res) => {
  try {
    res.status(200).json({
      status:
        status.statuses[Math.floor(Math.random() * status.statuses.length - 1)]
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
export default router;
