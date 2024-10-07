<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'description', 'status', 'completed', 'due_date', 'shared_with'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
