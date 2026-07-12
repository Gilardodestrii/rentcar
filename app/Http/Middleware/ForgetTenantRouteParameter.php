<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ForgetTenantRouteParameter
{
    public function handle(Request $request, Closure $next)
    {
        $request->route()?->forgetParameter('tenant');

        return $next($request);
    }
}
