<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Http\Traits\ResponseTrait;
use Symfony\Component\HttpFoundation\Response;

class Admin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    use ResponseTrait;

    public function handle(Request $request, Closure $next): Response
    {
        if(auth()->user()->isAdmin()){
            return $next($request);
        }else {
            return $this->fail("user isn't admin",401);
        }
    }
}
