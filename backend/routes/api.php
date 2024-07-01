<?php

use App\Http\Controllers\Api\DesenvolvedorController;
use App\Http\Controllers\Api\NivelController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('niveis')->group(function () {
    Route::post('/', [NivelController::class, 'store'])->name('niveis.store');
    Route::get('/', [NivelController::class, 'index'])->name('niveis.index');
    Route::put('/{id}', [NivelController::class, 'update'])->name('niveis.update');
    Route::delete('/{id}', [NivelController::class, 'destroy'])->name('niveis.destroy');
});

Route::prefix('desenvolvedores')->group(function () {
    Route::post('/', [DesenvolvedorController::class, 'store'])->name('desenvolvedores.store');
    Route::get('/', [DesenvolvedorController::class, 'index'])->name('desenvolvedores.index');
    Route::get('/{id}', [DesenvolvedorController::class, 'show'])->name('desenvolvedores.show');
    Route::put('/{id}', [DesenvolvedorController::class, 'update'])->name('desenvolvedores.update');
    Route::delete('/{id}', [DesenvolvedorController::class, 'destroy'])->name('desenvolvedores.destroy');
});
