<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Employee;
use Illuminate\Http\Request;
use App\Http\Traits\ResponseTrait;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckEmployee
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    use ResponseTrait;

    public function handle(Request $request, Closure $next): Response
    {
        $user=Auth::user();
        if($user && $user->role==='Company'){
            return $next($request);
        }
        $employee=Employee::where('email',$user->email)->first();
        if ($employee && $employee->company->role === 'Company') {
            Auth::login($employee->company);
            return $next($request);
        }
        return response()->json(['message' => 'Unauthorized'], 401);

    }
}
