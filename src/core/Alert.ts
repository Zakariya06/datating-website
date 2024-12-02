export class Alert {
    public static alert(title: string, message?: string) {
        window.alert(
            message
                ? `${title}
        ${message}`
                : title
        );
    }
}

export default Alert;
