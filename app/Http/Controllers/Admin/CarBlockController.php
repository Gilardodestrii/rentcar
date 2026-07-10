<?php

namespace App\Http\Controllers\Admin;

use App\Models\CarBlock;
use App\Models\Car;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Inertia\Response;

class CarBlockController extends Controller
{
    public function index(Request $request): Response
    {
        $query = CarBlock::with('car');

        if ($request->has('car_id') && $request->car_id !== '') {
            $query->where('car_id', $request->car_id);
        }

        $blocks = $query->latest()->paginate(15)->through(fn($b) => [
            'id' => $b->id,
            'car' => $b->car ? [
                'id' => $b->car->id,
                'brand' => $b->car->brand,
                'model' => $b->car->model,
                'plate_number' => $b->car->plate_number,
            ] : null,
            'start_date' => $b->start_date->format('Y-m-d'),
            'end_date' => $b->end_date->format('Y-m-d'),
            'reason' => $b->reason,
            'is_recurring' => $b->is_recurring,
        ]);

        $cars = Car::all()->map(fn($c) => [
            'id' => $c->id,
            'label' => "{$c->brand} {$c->model} ({$c->plate_number})",
        ]);

        return inertia('Admin/CarBlocks/Index', [
            'blocks' => $blocks,
            'cars' => $cars,
            'filters' => $request->only(['car_id']),
        ]);
    }

    public function create(): Response
    {
        $cars = Car::all()->map(fn($c) => [
            'id' => $c->id,
            'label' => "{$c->brand} {$c->model} ({$c->plate_number})",
        ]);

        return inertia('Admin/CarBlocks/Create', [
            'cars' => $cars,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'car_id' => 'required|exists:cars,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'reason' => 'required|string|max:500',
            'is_recurring' => 'boolean',
            'recurrence_end' => 'nullable|date|after:end_date',
        ]);

        CarBlock::create($validated);

        return redirect()->route('admin.car-blocks.index')
            ->with('success', 'Blokir jadwal berhasil ditambahkan');
    }

    public function edit(CarBlock $carBlock): Response
    {
        $cars = Car::all()->map(fn($c) => [
            'id' => $c->id,
            'label' => "{$c->brand} {$c->model} ({$c->plate_number})",
        ]);

        return inertia('Admin/CarBlocks/Edit', [
            'block' => [
                'id' => $carBlock->id,
                'car_id' => $carBlock->car_id,
                'start_date' => $carBlock->start_date->format('Y-m-d'),
                'end_date' => $carBlock->end_date->format('Y-m-d'),
                'reason' => $carBlock->reason,
                'is_recurring' => $carBlock->is_recurring,
                'recurrence_end' => $carBlock->recurrence_end?->format('Y-m-d'),
            ],
            'cars' => $cars,
        ]);
    }

    public function update(Request $request, CarBlock $carBlock)
    {
        $validated = $request->validate([
            'car_id' => 'required|exists:cars,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'reason' => 'required|string|max:500',
            'is_recurring' => 'boolean',
            'recurrence_end' => 'nullable|date|after:end_date',
        ]);

        $carBlock->update($validated);

        return redirect()->route('admin.car-blocks.index')
            ->with('success', 'Blokir jadwal berhasil diupdate');
    }

    public function destroy(CarBlock $carBlock)
    {
        $carBlock->delete();

        return redirect()->route('admin.car-blocks.index')
            ->with('success', 'Blokir jadwal berhasil dihapus');
    }
}
