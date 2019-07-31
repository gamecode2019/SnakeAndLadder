const Logger: any = console;

Logger.warn = function(message?: any, ...optionalParams: any[]): void{
    console.warn(message,optionalParams);
}