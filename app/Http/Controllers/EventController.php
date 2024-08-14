<?php

namespace App\Http\Controllers;
use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $events = Event::with('team')->get();
        return response()->json($events);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:155',
            'event_date' => 'required|date|before_or_equal:today',
            'team_id' => 'required|exists:teams,id',
        ]);

        $event = Event::create($request->only('name', 'event_date', 'team_id'));
        return response()->json($event, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event)
    {
        $event->load('team');
        return response()->json($event);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event)
    {
        $request->validate([
            'name' => 'required|string|max:155',
            'event_date' => 'required|date|before_or_equal:today',
            'team_id' => 'required|exists:teams,id',
        ]);

        $event->update($request->only('name', 'event_date', 'team_id'));
        return response()->json($event);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        $event->delete();
        return response()->json(null, 204);
    }
}
