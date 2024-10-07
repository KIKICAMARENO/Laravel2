<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = Auth::user()->tasks;
        return response()->json($tasks);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|string|max:255',
            'completed' => 'boolean',
            'due_date' => 'nullable|date',
            'shared_with' => 'nullable|string|max:255',
        ]);

        try {
            $task = Auth::user()->tasks()->create($request->all());
            return response()->json($task, 201);
        } catch (\Exception $e) {
            Log::error('Error creating task: '.$e->getMessage());
            return response()->json(['error' => 'Unable to create task'], 500);
        }
    }

    public function show(Task $task)
    {
        if ($task->user_id != Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        return response()->json($task);
    }

    public function update(Request $request, Task $task)
    {
        if ($task->user_id != Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'sometimes|required|string|max:255',
            'completed' => 'boolean',
            'due_date' => 'nullable|date',
            'shared_with' => 'nullable|string|max:255',
        ]);

        try {
            $task->update($request->all());
            return response()->json($task);
        } catch (\Exception $e) {
            Log::error('Error updating task: '.$e->getMessage());
            return response()->json(['error' => 'Unable to update task'], 500);
        }
    }

    public function destroy(Task $task)
    {
        if ($task->user_id != Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        try {
            $task->delete();
            return response()->json(null, 204);
        } catch (\Exception $e) {
            Log::error('Error deleting task: '.$e->getMessage());
            return response()->json(['error' => 'Unable to delete task'], 500);
        }
    }

    public function filterByStatus($status)
    {
        $tasks = Auth::user()->tasks()->where('status', $status)->get();
        return response()->json($tasks);
    }
}
