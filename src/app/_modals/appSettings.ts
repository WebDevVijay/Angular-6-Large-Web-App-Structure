export class AppSettings {

    // Local URL
    public static LocalURL = "http://127.0.0.1:8000/";
    // DEVELOPMENT URL
    public static UATURL = "http://127.0.0.1:8000/";
    // PRODUCTION  URL
    public static ProductionURL = "http://127.0.0.1:8000/";

    public static IsLocal = true;
    public static IsDevelopment = false;
    public static IsProduction = false;

    public static ApiURL = AppSettings.SetAPIURL();
    public static RegisterUser = AppSettings.ApiURL + 'RegisterUser';
    public static ValidateLogin = AppSettings.ApiURL + 'login';
    public static AddContactBook = AppSettings.ApiURL + 'AddContactBook';
    public static GetContactBookList = AppSettings.ApiURL + 'GetContactBookList';
    public static GetContactBookById = AppSettings.ApiURL + 'GetContactBookById';
    public static DeleteContactBookById = AppSettings.ApiURL + 'DeleteContactBookById';
    
    public static SetAPIURL() {
        if (AppSettings.IsLocal) {
            return AppSettings.LocalURL;
        }
        else if (AppSettings.IsDevelopment) {
            return AppSettings.UATURL;
        }
        else if (AppSettings.IsProduction) {
            return AppSettings.ProductionURL;
        }
    }
    // End System Admin
} 
