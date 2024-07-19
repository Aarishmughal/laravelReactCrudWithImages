<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ItemController;

Route::apiResource('items', ItemController::class);
