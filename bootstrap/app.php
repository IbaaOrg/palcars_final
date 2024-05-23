<?php

use App\Http\Middleware\Admin;
use App\Http\Middleware\Renter;
use App\Http\Middleware\Company;
use App\Http\Middleware\CheckEmployee;
use Illuminate\Foundation\Application;
use App\Http\Middleware\AdminOrCompany;
use App\Http\Middleware\ChangeLanguage;
use App\Http\Middleware\RenterOrCompany;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Mcamara\LaravelLocalization\Middleware\LocaleCookieRedirect;
use Mcamara\LaravelLocalization\Middleware\LocaleSessionRedirect;
use Mcamara\LaravelLocalization\Middleware\LaravelLocalizationRoutes;
use Mcamara\LaravelLocalization\Middleware\LaravelLocalizationViewPath;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        //
        $middleware->alias([
            'admin'=>Admin::class,
            'company'=>Company::class,
            'renter'=>Renter::class,
            'adminorcompany'=>AdminOrCompany::class,
            'renterorcompany'=>RenterOrCompany::class,
            'checkemployee'=>CheckEmployee::class,
            'localize'                => LaravelLocalizationRoutes::class,
            'localizationRedirect'    => LaravelLocalizationRedirectFilter::class,
            'localeSessionRedirect'   => LocaleSessionRedirect::class,
            'localeCookieRedirect'    => LocaleCookieRedirect::class,
            'localeViewPath'          => LaravelLocalizationViewPath::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
