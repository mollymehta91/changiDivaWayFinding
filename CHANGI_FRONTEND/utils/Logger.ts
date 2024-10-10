const Logger = () => {
    const INFO = (message: string) => {
        console.info(`[INFO] ${new Date().toISOString()}: ${message}`);
      };
    
    const ERROR = (message: string, error: any, display: boolean) => {
        error ? console.error(`[ERROR] ${new Date().toISOString()}: ${message}`, error) : console.error(`[ERROR] ${new Date().toISOString()}: ${message}`);
        if (display &&  process.env.ENV == 'dev') {
            // Optional display logic, e.g., showing an alert
            alert(message); // Example: show alert if display is true
        }
    };

    return { INFO, ERROR };
}  

export default Logger;