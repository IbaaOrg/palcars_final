<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\SimpleCityResource;
use Illuminate\Http\Resources\Json\JsonResource;

class SimpleCityResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $cityTranslations = [
            'Hebron' => 'الخليل',
            'Jenin' => 'جنين',
            'Ramallah' => 'رام الله',
            'Nablus' => 'نابلس',
            'Gaza' => 'غزة',
            'Jerusalem'=>'القدس',
            'Tulkarm'=>'طولكرم',
            'Alramlah'=>'الرملة',
            'Allyd'=>'اللد',
            'Jaffa'=>'يافا',
            'Haifa'=>'حيفا',
            'Besan'=>'بيسان',
            'Nasserah'=>'الناصرة',
            'Aka'=>'عكا',
            'Safad'=>'صفد',
            'Tabaria'=>'طبريا',
            'Beersheba'=>'بئر السبع',
        ];
        $city_ar = isset($cityTranslations[$this->city]) ? $cityTranslations[$this->city] : '';

        // Get the Arabic name for the city if it exists in the mapping, otherwise default to an empty string or original name
        $data=[
            'id'=> $this->id,
            'city'=>$this->city,
            'city_ar' => $city_ar,
        ];
        
        return $data;
        return parent::toArray($request);
    }
}
