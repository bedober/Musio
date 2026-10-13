<?php

use Illuminate\Support\Facades\Artisan;

Artisan::command('musio:status', function (): void {
    $this->info('Musio Laravel scaffold is ready for installation.');
})->purpose('Check the Musio Laravel scaffold');
