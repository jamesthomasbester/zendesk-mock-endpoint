import { Router } from "express";
import data from "../data/pharmacy.json";
import status from "../data/status.json";

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

router.get("/order/tracking/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      const pharmacy =
        data.Pharmacy[Math.floor(Math.random() * data.Pharmacy.length)];
      res.status(200).json({
        name: pharmacy.name,
        address: pharmacy.address,
        city: pharmacy.city,
        state: pharmacy.state,
        zip_code: pharmacy.zip_code,
        phone: pharmacy.phone,
        orderNumber: id,
        trackingUrl: pharmacy.tracking_url
      });
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/order/status/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      res
        .status(200)
        .json({
          status:
            status.statuses[
              Math.floor(Math.random() * status.statuses.length - 1)
            ]
        });
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
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
export default router;
