<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use OpenApi\Annotations as OA;

/**
 * @OA\Info(
 *     version="1.0",
 *     title="Tech Dev API",
 *     description="API desenvolvida para o desafio da Gazin-tech",
 *     @OA\Contact(
 *          email="caiogrechic50@gmail.com"
 *     )
 * )
*/
class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;
}
