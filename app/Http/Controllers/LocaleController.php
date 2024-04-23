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
            'Home', 'Cars', 'About', 'ContactUs', 'Register', 'Login', 'Arabic', 'English',
            'Search', 'Dashbord', 'Vehicles', 'AddVehicles', 'EditVehicles', 'VehiclesList',
            'Filter', 'ID', 'CarNumber', 'Make', 'Model', 'Catrgory', 'Description', 'Year',
            'Seats', 'Doors', 'Bags', 'FuelType', 'FuelFull', 'Operation', 'View', 'Update',
            'Delete', 'Chats', 'UserName', 'Account', 'Email', 'Phone', 'Birthdate',
            'EditProfile', 'Information', 'Booking', 'Messages', 'Faviorites', 'pickup',
            'dropoff', 'location', 'date', 'time', 'FullName', 'Password', 'PhotoUser',
            'Birthdate', 'SignUp', 'LogOut', 'SignInWithGoogle', 'Enteryouremail', 'Enteryourpassword',
            'Company','Renter','choose','Enteryourname','Phone','Enteryourphone','PhotoUser','PhotoDrivinglicense','Enteryourbirthdate','description'=>'description','enter'=>'enter'
            ,'Discountsanddeals','BrowseNow','AllCars','ContactWithCompany','vision','Howitworks','Features','Partenership','BussinessRelation','Socials','Deals','Community','Blog',
            'OurTeams','join','Inviteafrind','AboutPalCars','enterlocation','returncar','pickupdate','pickuptime','dropoffdate','dropofftime','SignUpWithGoogle'
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
