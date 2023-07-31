"use strict";
const Truck = use("App/Models/Truck");
const TruckLog = use("App/Models/TruckLog");
const Notification = use("App/Models/Notification");

class TruckController {
  async index({ request, response }) {
    const page = request.input("page", 1);
    const perPage = 5;

    const trucks = await Truck.query().paginate(page, perPage);
    const trucksCount = await Truck.query().getCount();

    // input count are trucks that have intime but no outtime yet and not checked in truck table
    const inputCount = await TruckLog.query()
      .whereNotNull("in_time")
      .whereNull("out_time")
      .getCount();

    // output count are trucks that have intime and outtime and checked in truck table
    const outputCount = await TruckLog.query()
      .whereNotNull("in_time")
      .whereNotNull("out_time")
      .getCount();

    const truckData = await Promise.all(
      trucks.toJSON().data.map(async (truck) => {
        const inputLog = await TruckLog.query()
          .where("truck_id", truck.id)
          .whereNotNull("plate_number")
          .orderBy("in_time", "desc")
          .first();

        const outputLog = await TruckLog.query()
          .where("truck_id", truck.id)
          .whereNotNull("out_time")
          .orderBy("out_time", "desc")
          .first();

        return {
          truck_id: truck.id,
          tag: truck.tag,
          checked: truck.checked,
          last_input_log: inputLog || null,
          last_output_log: outputLog || null,
        };
      })
    );

    return response.status(200).json({
      data: truckData,
      meta: {
        perPage: truckData.length,
        currentPage: trucks.toJSON().page,
        lastPage: trucks.toJSON().lastPage,
        truck_count: trucksCount,
        input_count: inputCount,
        output_count: outputCount,
      },
    });
  }

  async input({ request, response }) {
    const { tag } = request.only(["tag"]);

    // Check if the truck with the given tag already exists
    const truck = await Truck.findBy("tag", tag);
    if (truck) {
      // If the truck already exists, throw an error
      return response
        .status(400)
        .json({ message: "Truck with this tag already exists." });
    }

    // If the truck does not exist, create a new truck and log
    const newTruck = await Truck.create({ tag });
    const log = new TruckLog();
    log.truck_id = newTruck.id;
    log.plate_number = null;
    log.in_time = null;
    log.out_time = null;
    await log.save();

    return response
      .status(201)
      .json({ message: "Input recorded successfully." });
  }

  async inputLog({ request, response }) {
    const { plate_number, in_time } = request.only(["plate_number", "in_time"]);

    let log = await TruckLog.query().where("plate_number", null).first();

    // If there is no available truck log, retry until one is found
    while (!log) {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before trying again
      log = await TruckLog.query().where("plate_number", null).first();
    }

    log.plate_number = plate_number;
    log.in_time = in_time;
    await log.save();

    return response
      .status(200)
      .json({ message: "Truck input recorded successfully." });
  }

  async output({ request, response }) {
    const { tag } = request.only(["tag"]);

    const truck = await Truck.findBy("tag", tag);
    if (!truck) {
      return response.status(400).json({ message: "Truck not found." });
    }

    // const log = await TruckLog.query()
    //   .where("truck_id", truck.id)
    //   .whereNotNull("plate_number")
    //   .whereNull("out_time")
    //   .first();

    if (truck.checked === 0) {
      truck.checked = 1;
      await truck.save();
    } else {
      return response
        .status(400)
        .json({ message: "Truck already checked out." });
    }

    return response.status(200).json({ message: "Truck output ready." });
  }

  async outputLog({ request, response, auth }) {
    const { plate_number, out_time } = request.only([
      "plate_number",
      "out_time",
    ]);

    const log = await TruckLog.query()
      .where("plate_number", plate_number)
      .whereNull("out_time")
      .first();

    if (!log) {
      return response
        .status(400)
        .json({ message: "Invalid truck plate number." });
    }

    log.out_time = out_time;
    await log.save();

    // Create a notification
    const user = await auth.getUser();
    await Notification.create({
      user_id: user.user_id,
      message: `Platenumber ${plate_number} is ready for output.`,
      is_read: false,
    });

    return response
      .status(200)
      .json({ message: "Truck output recorded successfully." });
  }
}

module.exports = TruckController;
