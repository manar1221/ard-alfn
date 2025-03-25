<?php

use App\Http\Livewire\AboutComponent;
use App\Http\Livewire\ContactComponent;
use App\Http\Livewire\GalleryComponent;
use App\Http\Livewire\HomeComponent;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });

// Route::get('/dashboard', function () {
//     return redirect('/');
// })->name('dashboard');

// Route::get('/dashboard', function () {
//     return view('dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });


Route::get('/',HomeComponent::class)->name('home.index');

Route::get('about',AboutComponent::class)->name('about');
Route::get('contact',ContactComponent::class)->name('contact');
Route::get('gallery',GalleryComponent::class)->name('gallery');


require __DIR__.'/auth.php';
