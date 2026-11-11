import UIKit
import RNNotifications

@main
class AppDelegate: UIResponder, UIApplicationDelegate {

  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    RNNotifications.startMonitorNotifications()

    return true
  }

     func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken withDeviceToken: Data) {
    RNNotifications.didRegisterForRemoteNotifications(withDeviceToken: withDeviceToken)
  }

   func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
    RNNotifications.didFailToRegisterForRemoteNotificationsWithError(error)
  }

   func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable: Any],
                 fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
    RNNotifications.didReceiveBackgroundNotification(userInfo, withCompletionHandler: completionHandler)
  }
}

