<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Api\CarControlle;
use App\Http\Controllers\LocaleController;
use App\Http\Controllers\Api\CarController;
use App\Http\Controllers\Api\BillController;
use App\Http\Controllers\Api\CityController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ColorController;
use App\Http\Controllers\Api\PriceController;
use App\Http\Controllers\Api\MethodController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\CarImageController;

use App\Http\Controllers\Api\DiscountController;
use App\Http\Controllers\Api\FavoriteController;

use App\Http\Controllers\Api\LocationController;
use App\Http\Controllers\Api\NotificationController;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::prefix('Admin')->group(function(){

});
Route::prefix('Company')->group(function(){
    
});
Route::prefix('Renter')->group(function(){
    
});

Route::middleware('auth:sanctum')->get('/user',[UserController::class,'getUser']);

/* function (Request $request) {
    return $request->user();
}); */

/* Route::middleware('auth:sanctum')->get('/user', [UserController::class,'infouser']);
 */
Route::group([
    'prefix' =>'{?locale?}',
    'where'=>['locale'=>'[a-zA-Z]{2}'],
    'middlewhare'=>'SetLocale',
    ] , function()
{
	
});
Route::get('/userscount', [UserController::class,'count']);

Route::get('/authuser',[UserController::class,'authuser']);
//register by any user
Route::post('/register',[UserController::class,'register']);
//login by registed user
Route::post('/login',[UserController::class,'login']);
//logout by user
Route::post('/logout',[UserController::class,'logout']);
//when you forget password 
Route::post('/password_forget',[UserController::class,'forgetPassword']);
//when you want reset your password
Route::post('/password_reset',[UserController::class,'resetPassword']);
//information of all users
Route::middleware('auth:sanctum','admin')->get('/users',[UserController::class,'index']);
//information of one user???
Route::get('/user/{id}',[UserController::class,'show']);
//delete one user
Route::middleware('auth:sanctum','admin')->delete('/users/{id}',[UserController::class,'destroy']);
//update users information؟؟؟
Route::middleware('auth:sanctum')->post('/users/{id}',[UserController::class,'update']);
//add color
Route::middleware('auth:sanctum','adminorcompany')->post('/colors',[ColorController::class,'store']);
//show all colors
Route::middleware('auth:sanctum','adminorcompany')->get('/colors',[ColorController::class,'index']);
//delete one color
Route::middleware('auth:sanctum','adminorcompany')->delete('/colors/{id}',[ColorController::class,'destroy']);
//update one color
Route::middleware('auth:sanctum','adminorcompany')->post('/colors/{id}',[ColorController::class,'update']);
//add car
Route::middleware('auth:sanctum','company')->post('/addcar',[CarController::class,'store']);
//delete car
Route::middleware('auth:sanctum','adminorcompany')->delete('/cars/{id}',[CarController::class,'destroy']);
//update information of car
Route::middleware('auth:sanctum','company')->post('/cars/update/{id}',[CarController::class,'update']);
//show information of all cars 
Route::get('/cars',[CarController::class,'index']);
//show detials of  car 
Route::get('/cars/{id}',[CarController::class,'show']);
//show my cars as company ه
Route::middleware('auth:sanctum','company')->get('/carsuser',[UserController::class,'carsOfUser']);
//show cars of company that you are choose
Route::get('/carsofcompany/{id}',[UserController::class,'carsOfChosenCompany']);

//add images of car
Route::middleware('auth:sanctum','company')->post('/carimage',[CarImageController::class,'store']);
//delete image
Route::middleware('auth:sanctum','company')->delete('/carimages/{id}', [CarImageController::class, 'destroy']);
//show one image of car
// Route::middleware('auth:sanctum')->get('/cars',[CarController::class,'index']);
//add comment
Route::middleware('auth:sanctum','renter')->post('/comments',[CommentController::class,'store']);
//delete comment
Route::middleware('auth:sanctum','renter')->delete('/comments/{id}',[CommentController::class,'destroy']);
//update comment
Route::middleware('auth:sanctum','renter')->post('/comments/update/{id}',[CommentController::class,'update']);
//all comments of each car
Route::get('/getReviewes/{id}',[CarController::class,'reviews']);
//add to favorite list
Route::middleware('auth:sanctum','renter')->post('/favorites',[FavoriteController::class,'store']);
//remove one item
Route::middleware('auth:sanctum','renter')->delete('/favorites/{id}',[FavoriteController::class,'destroy']);
//remove all item
Route::middleware('auth:sanctum','renter')->patch('/favorites/clear',[FavoriteController::class,'destroyAll']);
//get favoirtes of user
Route::middleware('auth:sanctum','renter')->get('/favorites',[FavoriteController::class,'index']);

//add prices of each car??
Route::middleware('auth:sanctum','company')->post('/prices',[PriceController::class,'store']);
//delete all price of cars???
Route::middleware('auth:sanctum','company')->delete('/pricesofcar/{id}',[PriceController::class,'deleteAllPricesofcar']);
//prices of chosen car 
Route::middleware('auth:sanctum','company')->get('/prices/{id}',[CarController::class,'pricesOfCar']);
//add discounts
Route::middleware('auth:sanctum','company')->post('/discounts',[DiscountController::class,'store']);
//delete discounts 
Route::middleware('auth:sanctum','company')->delete('/discounts/{id}',[DiscountController::Class,'destroy']);
//update discount
Route::middleware('auth:sanctum','company')->post('/discounts/update/{id}',[DiscountController::class,'update']);
//get dicount of chosen car
Route::middleware('auth:sanctum','renterorcompany')->get('/getdiscounts/{id}',[CarController::class,'discountsOfCar']);
//index all discounts
Route::get('/showalldiscounts',[DiscountController::class,'index']);
//discounts as company 
Route::middleware('auth:sanctum','company')->get('/getMyDiscounts',[DiscountController::class,'getMyDiscounts']);
//show all cities
Route::get('/showallcities',[CityController::class,'index']);
//add city 
Route::middleware('auth:sanctum','admin')->post('/addCity',[CityController::class,'store']);
//update one city 
Route::middleware('auth:sanctum','admin')->post('/city/{id}',[CityController::class,'update']);
//delete one city 
Route::middleware('auth:sanctum','admin')->delete('/city/delete/{id}',[CityController::class,'destroy']);
//add location 
Route::middleware('auth:sanctum','company')->post('/addLocation',[LocationController::class,'store']);
//update one location 
Route::middleware('auth:sanctum','company')->post('/location/{id}',[LocationController::class,'update']);
//delete one location 
Route::middleware('auth:sanctum','company')->delete('/location/delete/{id}',[LocationController::class,'destroy']);
//show all location in that city
//show all locationes
Route::get('/showAllLocations',[LocationController::class,'index']);
//show alll my location as company 
Route::middleware('auth:sanctum','company')->get('/showLocationsOfMyCompany',[LocationController::class,'allLocationsOfMyCompany']);
//show all location of  chosen company   
Route::get('/showLocationsOfCompany/{id}',[LocationController::class,'allLocationsOfCompany']);
//show all location in chosen city
Route::get('/allLocationsInCity/{id}',[LocationController::class,'allLocationsInCity']);
Route::get('/alllocationpickup',[LocationController::class,'allLocationPickup']);
Route::get('/alllocationdropoff',[LocationController::class,'allLocationDropoff']);
Route::get('/alllocationpickupdropoff',[LocationController::class,'allLocationPickupDropoff']);
//location of company('pickup')
Route::get('/alllocationpickup/{id}',[LocationController::class,'allLocationsPickupOfCompany']);
//location of comapny('dropoff')
Route::get('/alllocationdropoff/{id}',[LocationController::class,'allLocationsDropoffOfCompany']);
Route::get('/carsInSpecifiedeLocations',[CarController::class,'carsInSpecifiedeLocations']);
//send message
Route::middleware('auth:sanctum','renterorcompany')->post('/messagesStore',[MessageController::class,'store']);
//update content of message 
Route::middleware('auth:sanctum','renterorcompany')->post('/messages/update/{id}',[MessageController::class,'update']);
//delete message 
Route::middleware('auth:sanctum','renterorcompany')->delete('/messages/delete/{id}',[MessageController::class,'destroy']);
//message that i recieved 
Route::middleware('auth:sanctum','renterorcompany')->get('/messagesRecieved',[MessageController::class,'messagesRecieved']);
//message that i send
Route::middleware('auth:sanctum','renterorcompany')->get('/messagesSend',[MessageController::class,'messagesSend']);
//show one message
Route::middleware('auth:sanctum','renterorcompany')->get('/showmessage/{id}',[MessageController::class,'show']);
Route::middleware('auth:sanctum','company')->post('/sendNoteToAllRenters',[NotificationController::class,'sendNoteToAllRenters']);
Route::middleware('auth:sanctum')->post('/sendNoteToSpeceficUser',[NotificationController::class,'sendNoteToSpeceficUser']);
Route::middleware('auth:sanctum')->get('/getAllRecivedNotes',[NotificationController::class,'getAllRecivedNotes']);
Route::middleware('auth:sanctum')->get('/getAllSendNotes',[NotificationController::class,'getAllSendNotes']);


Route::get('/showAllMethods',[MethodController::class,'index']);
Route::middleware('auth:sanctum','admin')->post('/insert',[MethodController::class,'insert']);
Route::middleware('auth:sanctum','renterorcompany')->get('/showChoosenMethod/{id}',[MethodController::class,'show']);
Route::middleware('auth:sanctum','renter')->post('/updateMethod/{id}',[MethodController::class,'update']);
Route::middleware('auth:sanctum','renter')->delete('/deleteChoosenMethod/{id}',[MethodController::class,'destroy']);

Route::middleware('auth:sanctum')->get('/countNotifications',[NotificationController::class,'countNotifications']);
Route::middleware('auth:sanctum')->get('/notifications',[NotificationController::class,'allNotifications']);

Route::middleware('auth:sanctum')->get('/allNotifications',[NotificationController::class],'allNotifications');

Route::middleware('auth:sanctum','company')->get('/showAllbills',[BillController::class,'index']);
Route::middleware('auth:sanctum','renter')->post('/storeBill',[BillController::class,'store']);
Route::middleware('auth:sanctum','renterorcompany')->get('/showBill/{id}',[BillController::class,'show']);
Route::middleware('auth:sanctum','renter')->post('/updateBill/{id}',[BillController::class,'update']);
Route::middleware('auth:sanctum','renter')->delete('/destroyBill/{id}',[BillController::class,'destroy']);
Route::middleware('auth:sanctum','company')->get('/showAllBillsOfMyCompany',[BillController::class,'allBillsOfMyCompany']);
Route::middleware('auth:sanctum','renter')->get('/allBillsOfRenter',[BillController::class,'allBillsOfRenter']);

Route::middleware('auth:sanctum')->get('/allNotifications',[NotificationController::class,'allNotifications']);
Route::middleware('auth:sanctum')->get('/notes/{id}',[NotificationController::class,'show']);
Route::post('/local', [LocaleController::class, 'local']);
Route::middleware('auth:sanctum')->get('/markallread',[NotificationController::class,'marksAllRead']);
Route::middleware('auth:sanctum','renter')->get('/getMyComments',[CommentController::class,'getMyComments']);
Route::middleware('auth:sanctum','company')->get('/getAllcomentsOfMyCar',[CommentController::class,'getAllcomentsOfMyCar']);
Route::middleware('auth:sanctum','company')->get('/getAllrenterUsers',[UserController::class,'getRenters']);
//Route::get('stripe',[BillController::class,'stripe']);
//Route::post('stripe',[BillController::class,'stripePost'])->name('stripe.post');

?>