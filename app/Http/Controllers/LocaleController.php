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
            'Home', 'Cars','Car', 'About', 'ContactUs', 'Register', 'Login', 'Arabic', 'English','DiscountsList','DiscountsDetails','AddDiscount',
            'Search','SearchTitle', 'Dashbord', 'Vehicles', 'AddVehicles', 'EditVehicles', 'VehiclesList','Title','ExpiredDate','Value','Type',
            'Filter', 'ID', 'CarNumber', 'Make', 'Model', 'Catrgory', 'Description', 'Year','Oprations','WriteMessage','ChooseCarNumber',
            'Seats', 'Doors', 'Bags', 'FuelType', 'FuelFull', 'Operation', 'View', 'Update','EnterDescriptionOfDiscount','informationValid',
            'Delete', 'Chats', 'UserName', 'Account', 'Email', 'Phone', 'Birthdate','Send','ChooseType','exValue','SendNotes','SendNote',
            'EditProfile', 'Information', 'Booking', 'Messages', 'Faviorites', 'pickup','UpdateDiscountInformation','ToSpecificUser',
            'dropoff', 'location', 'date', 'time', 'FullName', 'Password', 'PhotoUser','percentage','fixed','DiscountValue','day',
            'Birthdate', 'SignUp', 'LogOut', 'SignInWithGoogle', 'Enteryouremail', 'Enteryourpassword','DiscountUpdatedSuccessfully',
            'Company','Renter','choose','Enteryourname','Phone','Enteryourphone','PhotoUser','PhotoDrivinglicense','Enteryourbirthdate','description'=>'description','enter'=>'enter'
            ,'Discountsanddeals','BrowseNow','AllCars','ContactWithCompany','vision','Howitworks','Features','Partenership','BussinessRelation','Socials','Deals','Community','Blog',
            'OurTeams','join','Inviteafrind','AboutPalCars','enterlocation','returncar','pickupdate','pickuptime','dropoffdate','dropofftime','SignUpWithGoogle','pickupdropoff','Specialoffers','viewdeals','Sitestatistics','Cities','Users','Categoriesofcar'
            ,'Day','Hour','Second','Minute','Save','map','descmap','reset','Make','entermake','model','entermodel','type','SUV',  'Sedan','Convertible','Crossover','Minivan','Pickuptrucks','StationWagon','Hatchback','Gas','Deisel','Electrecity'
            ,    'Fueltype','Gear','Manual','Automatic','Capacity','person','priceperday','Min','Max','Rent','User','PriceBeforeDiscount','PriceAfterDiscount'
,'forgetPassword','account','signnow','valid','photolicense','givepoint','yes','no','ToAllUsers','Comapny','addNote','Note','Choose User',        ];

        // Fetch data from language files
        $data = [];
        foreach ($keys as $key) {
            $data[$key] = Lang::get("messages.$key");
        }
        return response()->json($data);

        // Return the localized response
    }

}
