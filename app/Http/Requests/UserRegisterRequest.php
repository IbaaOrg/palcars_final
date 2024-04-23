<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|min:3|regex:/^[\pL\s\-]+$/u',
            'email' => 'required|email:rfc,dns|unique:users',
            'password' => 'required|string|min:8|regex:/[A-Z]/|regex:/[a-z]/|regex:/[0-9]/|regex:/[@$!%*?&]/',
            'phone' => 'required|numeric|regex:/^05[0-9]{8}$/',
            'photo_user' => 'nullable|image|mimes:jpeg,png,jpg,gif',
            'photo_drivinglicense' => $this->input('role') === 'Renter' ? 'required|image|mimes:jpeg,png,jpg,gif' : 'nullable|image|mimes:jpeg,png,jpg,gif',
            'birthdate' => $this->input('role') === 'Renter' ? 'required|date|before_or_equal:' . Carbon::now()->subYears(18)->format('Y-m-d') : 'nullable|date|before_or_equal:' . Carbon::now()->subYears(18)->format('Y-m-d'),
            'description' => 'nullable',
            'role' => 'required|in:Admin,Renter,Company',
        ];

    }
    public function messages(){
        return [
            'name.required'=>__('messages.name required'),
        ];
    }
}
