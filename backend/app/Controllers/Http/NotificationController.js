"use strict";

const Notification = use("App/Models/Notification");
const moment = require("moment");

class NotificationController {
  async index({ request, response, auth }) {
    try {
      const user = await auth.getUser();

      const notifications = await Notification.query()
        .where("user_id", user.user_id)
        .orderBy("created_at", "desc")
        .fetch();

      const new_notifications = notifications.toJSON().map((notification) => {
        let timeunit = "day";
        let ago = moment().diff(notification.created_at, "days");

        if (ago === 0) {
          timeunit = "hour";
          ago = moment().diff(notification.created_at, "hours");
        }

        if (ago === 0) {
          timeunit = "minute";
          ago = moment().diff(notification.created_at, "minutes");
        }

        if (ago === 0) {
          timeunit = "second";
          ago = moment().diff(notification.created_at, "seconds");
        }

        return { ...notification, ago, timeunit };
      });

      const unreadNotificationsCount = new_notifications.reduce(
        (count, notification) => (notification.is_read ? count : count + 1),
        0
      );

      return response.json({
        notifications: new_notifications,
        unreadCount: unreadNotificationsCount,
      });

      // return response.json(new_notifications);
    } catch (e) {
      console.log(e);
      return response.status(500).json({ message: "Internal server error." });
    }
  }

  // async markNotificationAsRead({ request, response, auth }) {
  //   try {
  //     const { notification_id } = request.only(["notification_id"]);
  //     const user = await auth.getUser();

  //     const notification = await Notification.query()
  //       .where("user_id", user.user_id)
  //       .where("id", notification_id)
  //       .first();

  //     if (!notification) {
  //       return response
  //         .status(404)
  //         .json({ message: "Notification not found." });
  //     }

  //     notification.is_read = true;
  //     await notification.save();

  //     return notification;
  //   } catch (e) {
  //     console.log(e);
  //     return response.status(500).json({ message: "Internal server error." });
  //   }
  // }

  async markAllNotificationsAsRead({ response, auth }) {
    try {
      const user = await auth.getUser();

      const notifications = await Notification.query()
        .where("user_id", user.user_id)
        .where("is_read", false)
        .fetch();

      // Mark all fetched notifications as read
      await Promise.all(
        notifications.rows.map(async (notification) => {
          notification.is_read = true;
          await notification.save();
        })
      );

      return response
        .status(200)
        .json({ message: "All notifications marked as read." });
    } catch (e) {
      console.log(e);
      return response.status(500).json({ message: "Internal server error." });
    }
  }
}

module.exports = NotificationController;
