import { Easing, Notifier, NotifierComponents } from "react-native-notifier"

export enum AlertType {
  ERROR = 'error',
  SUCCESS = 'success',
  WARNING = 'warn',
  INFO = 'info',
}

export const ShowAlert = (title: string, message: string, type: AlertType = AlertType.SUCCESS) => {
  Notifier.showNotification({
    title,
    description: message,
    duration: 4000,
    showAnimationDuration: 800,
    showEasing: Easing.bounce,
    hideOnPress: true,
    swipeEasing: Easing.linear,
    Component: NotifierComponents.Alert,
    componentProps: {
      alertType: type,
    },
  })
}