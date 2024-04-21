<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Validator;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Dynamically set the application locale based on user's selection
        $this->app->singleton('translator', function ($app) {
            $locale = $app['session']->get('locale', 'en'); // Change 'en' to your default locale
            $app->setLocale($locale);
            return $app->make('translator');
        });

        // Override the default validation error messages with the ones in the language files
        Validator::extendImplicit('custom_validation', function ($attribute, $value, $parameters, $validator) {
            return false;
        });

        Validator::replacer('custom_validation', function ($message, $attribute, $rule, $parameters) {
            return trans('validation.'.$rule);
        });
    }
}
