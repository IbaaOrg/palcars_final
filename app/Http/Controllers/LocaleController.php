<?php

namespace App\Http\Controllers;

use messages;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Lang;
use App\Http\Controllers\LocaleController;

class LocaleController extends Controller
{
    //
    public function local(Request $request)
    {
        // Determine the desired language from the request (e.g., from query parameter or headers)
        $locale = $request->input('lang','en'); // Default to English if language not specified

        // Set the application locale
        app()->setLocale($locale);

        // Define the keys for translation
        $keys = [
            'Home', 'Cars','Car', 'About', 'ContactUs', 'Register', 'Login', 'nomaintained','Arabic', 'English','DiscountsList','DiscountsDetails','AddDiscount',
            'Search','SearchTitle', 'Dashbord', 'Vehicles', 'AddVehicles', 'EditVehicles', 'VehiclesList','Title','ExpiredDate','Value','Type',
            'Filter', 'ID', 'CarNumber', 'Make', 'Model', 'Catrgory', 'Description', 'Year','Oprations','WriteMessage','ChooseCarNumber',
            'Seats', 'Doors', 'Bags', 'FuelType', 'FuelFull', 'Operation', 'View', 'Update','EnterDescriptionOfDiscount','informationValid',
            'Delete', 'Chats', 'UserName', 'Account', 'Email', 'Phone', 'Birthdate','Send','ChooseType','exValue','SendNotes','SendNote',
            'EditProfile', 'Information', 'Booking', 'Messages', 'Faviorites', 'pickup','UpdateDiscountInformation','ToSpecificUser',
            'dropoff', 'location', 'date', 'time', 'FullName', 'Password', 'PhotoUser','DiscountType','percentage','fixed','DiscountValue','day',
            'Birthdate', 'SignUp', 'LogOut', 'SignInWithGoogle', 'Enteryouremail', 'Enteryourpassword','DiscountUpdatedSuccessfully',
            'Company','Renter','choose','Enteryourname','Phone','Enteryourphone','PhotoUser','PhotoDrivinglicense','Enteryourbirthdate','description'=>'description','enter'=>'enter'
            ,'Discountsanddeals','BrowseNow','AllCars','ContactWithCompany','vision','Howitworks','Features','Partenership','BussinessRelation','Socials','Deals','Community','Blog',
            'OurTeams','join','Inviteafrind','AboutPalCars','enterlocation','returncar','pickupdate','pickuptime','dropoffdate','dropofftime','SignUpWithGoogle','pickupdropoff','Specialoffers','viewdeals','Sitestatistics','Cities','Users','Categoriesofcar'
            ,'Day','Hour','Second','Minute','Save','map','descmap','reset','Make','entermake','model','entermodel','type','SUV',  'Sedan','Convertible','Crossover','Minivan','Pickuptrucks','StationWagon','Hatchback','Gas','Deisel','Electrecity'
            ,    'Fueltype','Gear','Manual','Automatic','Capacity','person','priceperday','Min','Max','Rent','User','PriceBeforeDiscount','PriceAfterDiscount'
,'forgetPassword','account','signnow','valid','photolicense','givepoint','yes','no','ToAllUsers','Comapny','addNote','Note','Choose User',        
            'WelcomeAbout','WelcomeEnd','mission','missionabout','chooseus','chooseAbout',  'chooseitemone','chooseitemtwo', 'chooseitemthree','chooseitemfour','chooseitemfive','ourteam','sendemail','socialmedia','officelocation','comment','Comment','MyComments','commentcar','Since','mynotes','notnotes','nonotes','notee','notesfrom','thenote','nocomment','notcomment','On','rating','please',
            'DrivinglicensePhoto','Home', 'Cars', 'About', 'ContactUs', 'Register', 'Login', 'Arabic', 'English',
            'Search', 'Dashbord', 'Vehicles', 'AddVehicles', 'EditVehicles', 'VehiclesList',
            'Filter', 'ID', 'CarNumber', 'Make', 'Model', 'Catrgory', 'Description', 'Year','moredetials',
            'Seats', 'Doors', 'Bags', 'FuelType', 'FuelFull', 'Operation', 'View', 'Update','Code','PhoneNumber','enteraddress','donelocation','Information','Reviews','EditProfile','BookingCompany','MyBooking',
            'Delete', 'Chats', 'UserName', 'Account', 'Email', 'Phone', 'Birthdate','JobTitle','UpdateEmployeeInfo','Emailaddress','Enteremail','renterslist','pickupdropoff','pickup','MyProfile','In','booking','TotalPrice','notBook','carsBooking',
            'EditProfile', 'Information', 'Booking', 'Messages', 'Faviorites', 'pickup','employeelist','belowlist','AddEmployee','AddNewEmployee','Points','TotalProfit','Location','City','UpdateLocation','locationsuccesed','ChooseType',
            'dropoff', 'location', 'date', 'time', 'FullName', 'Password', 'PhotoUser','EditWorkingHours','Address','StartDate','enterjobtitle','rentersbelow','Bookings','notrenters','Booking','From','To','Method','AddLocation','Cityoflocation','savechange',
            'Birthdate', 'SignUp', 'LogOut', 'SignInWithGoogle', 'Enteryouremail', 'Enteryourpassword','starthour','endhour','InformationUpdated','AllBookings','RentalCount','RenterBillsList','expensesfrom','locationsbelow','LocationType','DifferentLocation',
            'Company','Renter','choose','Enteryourname','Phone','Enteryourphone','PhotoUser','PhotoDrivinglicense','Enteryourbirthdate','description'=>'description','enter'=>'enter','Pickupdate','Dropoffdate','locationslist','enterlocation','ChooseCity'
            ,'Discountsanddeals','BrowseNow','AllCars','ContactWithCompany','vision','Howitworks','Features','Partenership','BussinessRelation','Socials','Deals','Community','Blog','billbelow','CancelOrder','notexpenses','LocationName','Dropoff','donelocation',
            'OurTeams','join','Inviteafrind','AboutPalCars','enterlocation','returncar','pickupdate','pickuptime','dropoffdate','dropofftime','SignUpWithGoogle','pickupdropoff','Specialoffers','viewdeals','Sitestatistics','Cities','Users','Categoriesofcar','enterfuelfull','EditCar','StartTime','EndTime'
            ,'Day','Hour','Second','Minute','Save','save','map','descmap','reset','Make','entermake','model','entermodel','type','SUV',  'Sedan','Convertible','Crossover','Minivan','Pickuptrucks','StationWagon','Hatchback','Gas','Deisel','Electrecity','selectgear','selectfueltype','choosecolor','chooseday','Save'
            ,    'Fueltype','Gear','Manual','Automatic','Capacity','person','priceperday','Min','Max','Rent','listed','Status','Category','Cancel','AddCar','ManufacturingCompany','ColorCar','fourimage','imageandprice','image','price','Images','notworkinghours', 'AddWorkingHours' ,'Prices','imageselected','SelectCompany','selectcategory'
,'forgetPassword','account','signnow','valid','photolicense','givepoint','yes','no','RentedVehicles','maintainedvehicles','WorkingHours','Employees','Renters','Chats','Expenses','Locations','Discounts','Notes','addandmanage','Welcome'  ,'Bookings' ,'todaydate','entercarnumber','entercarmodel'
,'ViewAllCars','NoComments','pleaseLogin','VehiclesDetails','norentedcar','selectnumberofbag','selectnumberofdoor','selectnumberofseat'
   ];

        // Fetch data from language files
        $data = [];
        foreach ($keys as $key) {
            $data[$key] = Lang::get("messages.$key");
        }
        return response()->json($data);

        // Return the localized response
    }

}
