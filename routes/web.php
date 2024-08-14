<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/teams/create', function () {
    return Inertia::render('TeamForm');
})->name('teams.create');

Route::get('/events/create', function () {
    return Inertia::render('EventForm');
})->name('events.create');

Route::get('/teams', function () {
    return Inertia::render('TeamList');
})->name('teams.index');

Route::get('/events', function () {
    return Inertia::render('EventList');
})->name('events.index');

require __DIR__.'/auth.php';
